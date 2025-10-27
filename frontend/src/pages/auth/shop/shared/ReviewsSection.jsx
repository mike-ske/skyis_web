import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext';

const ReviewsSection = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    recommend: true
  });
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = () => {
    // Load reviews from localStorage or API
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  };

  const saveReviews = (updatedReviews) => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to leave a review');
      return;
    }

    if (!newReview.title.trim() || !newReview.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const review = {
      id: Date.now(),
      productId,
      userId: user.id,
      userName: user.email,
      userAvatar: user.avatar || null,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      recommend: newReview.recommend,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
      verified: user.hasOrders || false
    };

    const updatedReviews = [review, ...reviews];
    saveReviews(updatedReviews);

    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      recommend: true
    });

    setIsSubmitting(false);
  };

  const markHelpful = (reviewId, isHelpful) => {
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          helpful: isHelpful ? review.helpful + 1 : review.helpful,
          notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
        };
      }
      return review;
    });
    saveReviews(updatedReviews);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const getFilteredAndSortedReviews = () => {
    let filtered = [...reviews];

    if (filterRating) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'helpful':
          return b.helpful - a.helpful;
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const renderStars = (rating, interactive = false, size = 20) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? "button" : undefined}
          onClick={interactive ? () => setNewReview(prev => ({ ...prev, rating: i })) : undefined}
          disabled={!interactive}
          className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}
        >
          <Star
            size={size}
            className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        </button>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const averageRating = getAverageRating();
  const distribution = getRatingDistribution();
  const filteredReviews = getFilteredAndSortedReviews();
  const totalReviews = reviews.length;
  const recommendPercentage = reviews.length > 0
    ? Math.round((reviews.filter(r => r.recommend).length / reviews.length) * 100)
    : 0;
    return (
    <section className="max-w-[100rem] mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Overview */}
        <div className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating}
          </div>
          <div className="flex justify-center mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-sm text-gray-600">
            Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2 mb-6">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = distribution[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <button
                key={rating}
                onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                className={`w-full flex items-center space-x-2 text-sm hover:bg-gray-50 p-2 rounded transition-colors ${
                  filterRating === rating ? 'bg-teal-50' : ''
                }`}
              >
                <span className="w-12 text-gray-700">{rating} star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-gray-600">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Recommendation */}
        {totalReviews > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="bg-teal-100 p-2 rounded-full">
                <ThumbsUp size={16} className="text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{recommendPercentage}%</p>
                <p className="text-gray-600">would recommend</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Reviews List */}
    <div className="lg:col-span-2">
      {/* Write Review Form */}
      {user && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex space-x-1">
                {renderStars(newReview.rating, true, 28)}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Sum up your experience"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                maxLength={100}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Share your thoughts about this product"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {newReview.comment.length}/500 characters
              </p>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newReview.recommend}
                  onChange={(e) => setNewReview(prev => ({ ...prev, recommend: e.target.checked }))}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="text-sm text-gray-700">
                  I would recommend this product
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      {!user && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            Please <a href="/login" className="font-semibold underline">log in</a> to write a review
          </p>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">
          {filteredReviews.length} {filteredReviews.length === 1 ? 'Review' : 'Reviews'}
        </h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-600 font-semibold text-sm">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900">{review.userName}</p>
                      {review.verified && (
                        <span className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                          <Check size={12} />
                          <span>Verified Purchase</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 mb-2">
                {renderStars(review.rating, false, 16)}
              </div>

              <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
              <p className="text-gray-700 text-sm mb-3 leading-relaxed">{review.comment}</p>

              {review.recommend && (
                <div className="flex items-center space-x-2 text-teal-600 text-sm mb-3">
                  <ThumbsUp size={14} />
                  <span>Recommends this product</span>
                </div>
              )}

              <div className="flex items-center space-x-4 pt-3 border-t">
                <button
                  onClick={() => markHelpful(review.id, true)}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                >
                  <ThumbsUp size={14} />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button
                  onClick={() => markHelpful(review.id, false)}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ThumbsDown size={14} />
                  <span>Not Helpful ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  </section>
);

};
export default ReviewsSection;