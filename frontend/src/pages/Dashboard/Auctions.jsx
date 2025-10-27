import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, X, Clock, Upload, ChevronDown } from 'lucide-react';

const Auctions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    duration: '60',
    description: ''
  });

  const [auctions, setAuctions] = useState([
    {
      id: 1,
      title: 'A Swarovski Embellished Sweet Heart Neck Wedding Dress',
      image: 'https://storage.googleapis.com/a1aa/image/282b4507-d20d-4f3f-6c1e-3940c7e17ee1.jpg',
      minimumBid: 500000,
      timeAllotted: 60,
      timeRemaining: 32,
      bidders: 8,
      currentBid: 1500000,
      status: 'active',
      category: 'Wedding Dresses',
      description: 'Elegant wedding dress with Swarovski crystal embellishments'
    },
    {
      id: 2,
      title: 'Designer Evening Gown with Crystal Beading',
      image: 'https://storage.googleapis.com/a1aa/image/282b4507-d20d-4f3f-6c1e-3940c7e17ee1.jpg',
      minimumBid: 300000,
      timeAllotted: 120,
      timeRemaining: 75,
      bidders: 12,
      currentBid: 850000,
      status: 'active',
      category: 'Evening Wear',
      description: 'Stunning evening gown with intricate crystal beading'
    },
    {
      id: 3,
      title: 'Vintage Haute Couture Collection Piece',
      image: 'https://storage.googleapis.com/a1aa/image/282b4507-d20d-4f3f-6c1e-3940c7e17ee1.jpg',
      minimumBid: 750000,
      timeAllotted: 180,
      timeRemaining: 5,
      bidders: 15,
      currentBid: 2200000,
      status: 'ending_soon',
      category: 'Vintage',
      description: 'Rare vintage haute couture piece from renowned designer'
    }
  ]);

  // Sample bids data
  const [bids] = useState([
    { id: 1, bidder: 'Binaebi Taribo', amount: 510000, time: '12:30 PM', avatar: 'B' },
    { id: 2, bidder: 'Sarah Johnson', amount: 485000, time: '12:25 PM', avatar: 'S' },
    { id: 3, bidder: 'Michael Chen', amount: 460000, time: '12:20 PM', avatar: 'M' },
    { id: 4, bidder: 'Emma Wilson', amount: 435000, time: '12:15 PM', avatar: 'E' },
    { id: 5, bidder: 'David Brown', amount: 410000, time: '12:10 PM', avatar: 'D' }
  ]);

  // Filter auctions based on search term
  const filteredAuctions = auctions.filter(auction =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Format time remaining
  const formatTimeRemaining = (minutes) => {
    if (minutes === 0) return 'Ended';
    if (minutes < 60) return `${minutes}mins`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}hr ${remainingMins}mins` : `${hours}hr`;
  };

  // Get status color for time remaining
  const getTimeRemainingColor = (minutes, status) => {
    if (status === 'ended') return 'text-red-600';
    if (minutes <= 10) return 'text-red-600 font-semibold';
    if (minutes <= 30) return 'text-orange-600 font-semibold';
    return 'font-semibold';
  };

  // Modal handlers
  const openModal = (modalType, auction = null) => {
    setActiveModal(modalType);
    setSelectedAuction(auction);
    if (auction && modalType === 'edit') {
      setFormData({
        title: auction.title,
        category: auction.category,
        price: auction.minimumBid.toString(),
        duration: auction.timeAllotted.toString(),
        description: auction.description
      });
    } else {
      setFormData({
        title: '',
        category: 'Wedding Dresses',
        price: '',
        duration: '60',
        description: ''
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedAuction(null);
    setFormData({
      title: '',
      category: '',
      price: '',
      duration: '60',
      description: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (isEdit = false) => {
    if (isEdit && selectedAuction) {
      setAuctions(prev => prev.map(auction => 
        auction.id === selectedAuction.id 
          ? { 
              ...auction, 
              title: formData.title,
              category: formData.category,
              minimumBid: parseInt(formData.price),
              timeAllotted: parseInt(formData.duration),
              description: formData.description
            }
          : auction
      ));
    } else {
      const newAuction = {
        id: auctions.length + 1,
        title: formData.title,
        category: formData.category,
        minimumBid: parseInt(formData.price),
        timeAllotted: parseInt(formData.duration),
        description: formData.description,
        image: 'https://storage.googleapis.com/a1aa/image/282b4507-d20d-4f3f-6c1e-3940c7e17ee1.jpg',
        timeRemaining: parseInt(formData.duration),
        bidders: 0,
        currentBid: parseInt(formData.price),
        status: 'active'
      };
      setAuctions(prev => [...prev, newAuction]);
    }
    closeModal();
  };

  // Create New Auction Modal
  const CreateAuctionModal = () => (
    <div className={`fixed inset-0 z-50 ${activeModal === 'create' ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
      <div className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ${activeModal === 'create' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 font-semibold text-xl">Create New Auction</h2>
              <p className="text-gray-600 text-base mt-1">List your item for auction and let bidders compete for the best price.</p>
            </div>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Title</label>
              <input
                type="text"
                placeholder="e.g Vintage Chanel Bag"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-full text-gray-700 text-base placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="appearance-none w-full border border-gray-300 rounded-full text-gray-700 text-base px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
                >
                  <option value="Wedding Dresses">Wedding Dresses</option>
                  <option value="Evening Wear">Evening Wear</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Casual Wear">Casual Wear</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Starting price (NGN)</label>
              <input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full border border-gray-300 rounded-full text-gray-700 text-base placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Duration</label>
              <div className="relative">
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="appearance-none w-full border border-gray-300 rounded-full text-gray-700 text-base px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
                >
                  <option value="30">30 mins</option>
                  <option value="60">60 mins</option>
                  <option value="90">90 mins</option>
                  <option value="120">120 mins</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Description</label>
              <textarea
                rows="4"
                placeholder="Describe your item"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-gray-700 text-base placeholder-gray-400 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
              />
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-2">Photo of items</h3>
              <p className="text-gray-600 text-sm mb-3">Upload up to 4 photos</p>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer py-12 text-center text-gray-500 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
                <div className="mb-3 p-4 rounded-full bg-gray-100 text-gray-400">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="font-semibold text-[#0F766E] text-base">Click to upload</span>
                <span className="text-sm"> or drag and drop</span>
                <span className="block text-gray-400 text-xs mt-1">SVG, PNG, JPG or GIF (max. 800×400px)</span>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-100 text-gray-700 rounded-full px-6 py-3 text-base font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(false)}
                className="flex-1 bg-[#0F766E] text-white rounded-full px-6 py-3 text-base font-medium hover:bg-[#0d665a] transition-colors"
              >
                Create Auction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Auction Modal
  const EditAuctionModal = () => (
    <div className={`fixed inset-0 z-50 ${activeModal === 'edit' ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
      <div className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ${activeModal === 'edit' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900 font-semibold text-xl">Edit Auction</h2>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 text-base mb-8">Update your auction details below.</p>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full border border-gray-300 rounded-full text-gray-700 text-base px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Category</label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="appearance-none w-full border border-gray-300 rounded-full text-gray-700 text-base px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
                >
                  <option value="Wedding Dresses">Wedding Dresses</option>
                  <option value="Evening Wear">Evening Wear</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Casual Wear">Casual Wear</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Starting price (NGN)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full border border-gray-300 rounded-full text-gray-700 text-base px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Duration</label>
              <div className="relative">
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="appearance-none w-full border border-gray-300 rounded-full text-gray-700 text-base px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
                >
                  <option value="30">30 mins</option>
                  <option value="60">60 mins</option>
                  <option value="90">90 mins</option>
                  <option value="120">120 mins</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-base mb-2 font-medium">Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg text-gray-700 text-base px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E]"
              />
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold text-base mb-2">Photo of items</h3>
              <p className="text-gray-600 text-sm mb-3">Upload up to 4 photos</p>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer py-12 text-center text-gray-500 hover:border-[#0F766E] hover:text-[#0F766E] transition-colors">
                <div className="mb-3 p-4 rounded-full bg-gray-100 text-gray-400">
                  <Upload className="w-6 h-6" />
                </div>
                <span className="font-semibold text-[#0F766E] text-base">Click to upload</span>
                <span className="text-sm"> or drag and drop</span>
                <span className="block text-gray-400 text-xs mt-1">SVG, PNG, JPG or GIF (max. 800×400px)</span>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-100 text-gray-700 rounded-full px-6 py-3 text-base font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(true)}
                className="flex-1 bg-[#0F766E] text-white rounded-full px-6 py-3 text-base font-medium hover:bg-[#0d665a] transition-colors"
              >
                Update Auction
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // View Bids Modal
  const ViewBidsModal = () => (
    <div className={`fixed inset-0 z-50 ${activeModal === 'view_bids' ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
      <div className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 ${activeModal === 'view_bids' ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-900 font-semibold text-xl">View Bids</h2>
            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 overflow-hidden mb-4">
            <img 
              src={selectedAuction?.image || ''} 
              alt={selectedAuction?.title || ''} 
              className="w-full h-48 object-cover"
            />
          </div>

          <p className="text-gray-600 text-base mb-6">
            {selectedAuction?.description || selectedAuction?.title}
          </p>

          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">Recent Bids</h3>
            <div className="flex items-center gap-2 bg-red-100 rounded-full px-3 py-2">
              <Clock className="w-4 h-4 text-red-500" />
              <span className="text-red-600 text-sm font-semibold">
                {formatTimeRemaining(selectedAuction?.timeRemaining || 0)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {bids.map((bid) => (
              <div key={bid.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-700 font-semibold text-base flex items-center justify-center">
                    {bid.avatar}
                  </div>
                  <span className="text-gray-900 text-base font-medium">{bid.bidder}</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 text-base font-semibold">
                    {formatCurrency(bid.amount)}
                  </p>
                  <p className="text-gray-500 text-sm">{bid.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-green-800 font-semibold text-base">Highest Bid</span>
                <span className="text-green-800 font-bold text-xl">
                  {formatCurrency(selectedAuction?.currentBid || 0)}
                </span>
              </div>
              <p className="text-green-600 text-sm mt-1">{selectedAuction?.bidders} bidders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
            Auctions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Manage your auction listings
          </p>
        </div>
        <button 
          onClick={() => openModal('create')}
          className="bg-[#0F766E] text-white rounded-full px-6 py-3 text-base font-medium flex items-center gap-2 hover:bg-[#0d665a] transition-colors duration-200 shadow-lg hover:shadow-xl self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Auction</span>
        </button>
      </div>

      {/* Auctions Section */}
      <section className="bg-white rounded-lg p-6 space-y-6 max-w-full overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="font-semibold text-black text-lg">
            All auctions ({filteredAuctions.length})
          </h3>
          <input 
            className="bg-[#F1F3F5] rounded-full py-3 px-4 text-base placeholder:text-gray-500 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#0F766E]" 
            placeholder="Search auctions..." 
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredAuctions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base">
              {searchTerm ? 'No auctions found matching your search.' : 'No auctions available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <article 
                key={auction.id}
                className="border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative">
                  <img 
                    alt={auction.title}
                    className="w-full h-48 object-cover" 
                    src={auction.image}
                  />
                  {auction.status === 'ending_soon' && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Ending Soon
                    </span>
                  )}
                  {auction.status === 'ended' && (
                    <span className="absolute top-3 right-3 bg-gray-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      Ended
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-sm text-gray-700 space-y-2 mb-4 flex-1">
                    <div className="flex justify-between">
                      <span>Minimum bid:</span>
                      <span className="font-semibold">{formatCurrency(auction.minimumBid)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time allotted:</span>
                      <span>{auction.timeAllotted} mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time remaining:</span>
                      <span className={getTimeRemainingColor(auction.timeRemaining, auction.status)}>
                        {formatTimeRemaining(auction.timeRemaining)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Number of bidders:</span>
                      <span>{auction.bidders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current bid amount:</span>
                      <span className="font-semibold">{formatCurrency(auction.currentBid)}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-gray-800 font-medium text-base leading-relaxed">
                        {auction.title}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-auto pt-4">
                    <button 
                      onClick={() => openModal('view_bids', auction)}
                      className="flex items-center justify-center gap-2 border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View bids</span>
                    </button>
                    <button 
                      onClick={() => openModal('edit', auction)}
                      className="flex items-center justify-center gap-2 border border-gray-300 rounded-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 flex-1"
                      disabled={auction.status === 'ended'}
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit auction</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Modals */}
      <CreateAuctionModal />
      <EditAuctionModal />
      <ViewBidsModal />
    </div>
  );
};

export default Auctions;