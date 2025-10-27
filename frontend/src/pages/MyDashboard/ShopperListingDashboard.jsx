import React, { useState } from 'react';
import { 
  Add,
  ArrowLeft,
  ArrowRight,
  Camera,
  CloseCircle,
  Setting4,
  SearchNormal1
} from 'iconsax-reactjs';

const ShopperListingDashboard = () => {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'view', 'edit'
  const [selectedListing, setSelectedListing] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    listingType: 'buy',
    size: '',
    color: '',
    price: '',
    minimumRentalDuration: '',
    description: '',
    negotiable: false,
    photos: []
  });

  // Mock listings data
  const [listings, setListings] = useState([
    {
      id: 1,
      itemName: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      category: 'Luxury',
      listingType: 'auction',
      size: 'M',
      color: 'Black',
      price: '₦500,000,000.00',
      rating: 4.5,
      reviews: '(4.5)',
      description: 'A "Yohji", 2 buttons, Irish cream, deconstructed 3-layered knitted peak lapel suit',
      status: 'Live',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
    },
    {
      id: 2,
      itemName: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      category: 'Fashion',
      listingType: 'buy',
      size: 'L',
      color: 'Beige',
      price: '₦500,000,000.00',
      rating: 4.5,
      reviews: '(4.5)',
      description: 'A stylish casual shirt perfect for everyday wear',
      status: 'Live',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
    },
    {
      id: 3,
      itemName: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      category: 'Fashion',
      listingType: 'rent',
      size: 'S',
      color: 'Floral',
      price: '₦500,000,000.00',
      rating: 4.5,
      reviews: '(4.5)',
      description: 'Beautiful floral dress perfect for summer occasions',
      status: 'Live',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
    },
    {
      id: 4,
      itemName: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      category: 'Luxury',
      listingType: 'auction',
      size: 'M',
      color: 'Black',
      price: '₦500,000,000.00',
      rating: 4.5,
      reviews: '(4.5)',
      description: 'Elegant black dress for formal occasions',
      status: 'Live',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
    },
    {
      id: 5,
      itemName: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      category: 'Fashion',
      listingType: 'buy',
      size: 'L',
      color: 'Beige',
      price: '₦500,000,000.00',
      rating: 4.5,
      reviews: '(4.5)',
      description: 'Comfortable casual wear for daily use',
      status: 'Live',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
    },
    {
      id: 6,
      itemName: 'A Swarovski Embellished Sweet Heart Neck, Ruffled Train Mermaid Bridal Gown/Dress',
      category: 'Fashion',
      listingType: 'rent',
      size: 'S',
      color: 'Floral',
      price: '₦500,000,000.00',
      rating: 4.5,
      reviews: '(4.5)',
      description: 'Stylish floral pattern dress for rent',
      status: 'Live',
      image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
    }
  ]);

  const handleOpenListModal = () => {
    setIsListModalOpen(true);
    setCurrentStep(1);
    setModalMode('create');
    setFormData({
      itemName: '',
      category: '',
      listingType: 'buy',
      size: '',
      color: '',
      price: '',
      minimumRentalDuration: '',
      description: '',
      negotiable: false,
      photos: []
    });
  };

  const handleViewListing = (listing) => {
    setSelectedListing(listing);
    setModalMode('view');
    setIsListModalOpen(true);
  };

  const handleEditListing = (listing) => {
    setSelectedListing(listing);
    setModalMode('edit');
    setFormData({
      itemName: listing.itemName,
      category: listing.category,
      listingType: listing.listingType,
      size: listing.size || '',
      color: listing.color || '',
      price: listing.price,
      minimumRentalDuration: listing.minimumRentalDuration || '',
      description: listing.description,
      negotiable: false,
      photos: []
    });
    setCurrentStep(1);
    setIsListModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsListModalOpen(false);
    setCurrentStep(1);
    setSelectedListing(null);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save listing logic here
      if (modalMode === 'create') {
        const newListing = {
          id: listings.length + 1,
          ...formData,
          status: 'Live',
          rating: 4.5,
          reviews: '(4.5)',
          image: 'https://res.cloudinary.com/drgk8rmny/image/upload/v1756767694/image_17_esvm14.png'
        };
        setListings([...listings, newListing]);
      }
      handleCloseModal();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getListingTypeColor = (type) => {
    switch (type) {
      case 'auction':
        return 'bg-gray-200 text-gray-700';
      case 'buy':
        return 'bg-gray-200 text-gray-700';
      case 'rent':
        return 'bg-gray-200 text-gray-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-orange-400' : 'text-gray-300'}`}>★</span>
    ));
  };

  const renderModalContent = () => {
    if (modalMode === 'view') {
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">View Listing</h2>
            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
              <CloseCircle size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="border rounded-xl overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <img 
                  src={selectedListing?.image} 
                  alt={selectedListing?.itemName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-sm text-gray-600">
              {selectedListing?.description}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Item name:</span>
                <span className="text-gray-600 text-right max-w-xs">{selectedListing?.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Category:</span>
                <span className="text-gray-600">{selectedListing?.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Price:</span>
                <span className="text-gray-600">{selectedListing?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Size:</span>
                <span className="text-gray-600">{selectedListing?.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Color:</span>
                <span className="text-gray-600">{selectedListing?.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Listing type</span>
                <span className="text-gray-600 capitalize">{selectedListing?.listingType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {selectedListing?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (modalMode === 'edit') {
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Listing</h2>
              <p className="text-sm text-gray-600">Review, edit, or update your store's product listings easily.</p>
            </div>
            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
              <CloseCircle size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Item name</label>
              <input
                type="text"
                value={formData.itemName}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent"
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select category</option>
                <option value="Luxury">Luxury</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Listing type</label>
              <div className="flex space-x-2">
                {['buy', 'rent', 'auction'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('listingType', type)}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium capitalize transition-colors ${
                      formData.listingType === type
                        ? 'bg-[#0B3B38] text-white border-[#0B3B38]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Photo of items</label>
              <p className="text-sm text-gray-600 mb-3">Upload up to 4 photos</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              <div className="flex space-x-2 mt-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-12 h-8 bg-gray-200 rounded border-2 border-red-200"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Create mode - multi-step form
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">List New Item</h2>
            <p className="text-sm text-gray-600">Step {currentStep} of 4: {
              currentStep === 1 ? 'Item Details' :
              currentStep === 2 ? 'Photos' :
              currentStep === 3 ? 'Pricing & Details' :
              'Review'
            }</p>
          </div>
          <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
            <CloseCircle size={24} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#0B3B38] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Item name</label>
              <input
                type="text"
                value={formData.itemName}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent"
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select category</option>
                <option value="Luxury">Luxury</option>
                <option value="Fashion">Fashion</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Listing type</label>
              <div className="flex space-x-2">
                {['buy', 'rent', 'auction'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('listingType', type)}
                    className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium capitalize transition-colors ${
                      formData.listingType === type
                        ? 'bg-[#0B3B38] text-white border-[#0B3B38]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Photo of items</label>
              <p className="text-sm text-gray-600 mb-3">Upload up to 4 photos</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">
                  <span className="font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
              <div className="flex space-x-2 mt-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-12 h-8 bg-gray-200 rounded border-2 border-red-200"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Size</label>
              <select
                value={formData.size}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Color</label>
              <select
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select color</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
                <option value="Beige">Beige</option>
                <option value="Floral">Floral</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Price in (NGN)</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent"
                placeholder="0.00"
              />
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="negotiable"
                  checked={formData.negotiable}
                  onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                  className="w-4 h-4 text-[#0B3B38] bg-gray-100 border-gray-300 rounded focus:ring-[#0B3B38]"
                />
                <label htmlFor="negotiable" className="ml-2 text-sm text-gray-600">Make item negotiable</label>
              </div>
            </div>

            {formData.listingType === 'rent' && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Minimum rental duration</label>
                <select
                  value={formData.minimumRentalDuration}
                  onChange={(e) => handleInputChange('minimumRentalDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select duration</option>
                  <option value="1 day">1 day</option>
                  <option value="3 days">3 days</option>
                  <option value="1 week">1 week</option>
                  <option value="1 month">1 month</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent"
                placeholder="Describe your item"
              />
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review your listing</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Item name:</span>
                  <p className="text-gray-600 mt-1">{formData.itemName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-900">Category:</span>
                    <p className="text-gray-600">{formData.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Listing type:</span>
                    <p className="text-gray-600 capitalize">{formData.listingType}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-900">Price:</span>
                    <p className="text-gray-600">₦{formData.price}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Size:</span>
                    <p className="text-gray-600">{formData.size}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Color:</span>
                  <p className="text-gray-600">{formData.color}</p>
                </div>
              </div>
              {formData.description && (
                <div>
                  <span className="font-medium text-gray-900">Description:</span>
                  <p className="text-gray-600 text-sm mt-1">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              currentStep === 1 
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft size={16} />
            <span>Previous</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-2 bg-[#0B3B38] text-white rounded-lg hover:bg-[#0a2f2d] transition-colors"
          >
            <span>{currentStep === 4 ? 'Publish Listing' : 'Next'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
      
        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Listings</h1>
                  <p className="text-gray-600">Keep track of all your personal listings from one place.</p>
                </div>
                <button 
                  onClick={handleOpenListModal}
                  className="mt-4 sm:mt-0 rounded-full flex items-center space-x-2 px-6 py-3 bg-[#0B3B38] text-white hover:bg-[#0a2f2d] transition-colors"
                >
                  <Add size={20} />
                  <span className="font-medium">Add new listing</span>
                </button>
              </div>
            </div>

            {/* Listings Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">All available listings</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <SearchNormal1 size={16} className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="text-gray-800 pl-10 pr-4 py-2 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0B3B38] focus:border-transparent text-sm w-48"
                  />
                </div>
                <button className="text-gray-800 flex items-center rounded-full space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Setting4 size={16} />
                  <span className="text-sm font-medium">Filter</span>
                </button>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-[4/3] bg-white p-4 overflow-hidden">
                      <img 
                        src={listing.image}
                        alt={listing.itemName}
                        className="w-full h-full rounded-xl object-cover"
                      />
                      
                      {/* Listing type badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getListingTypeColor(listing.listingType)}`}>
                          {listing.listingType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      {renderStars(listing.rating)}
                      <span className="text-xs text-gray-500 ml-2">{listing.reviews}</span>
                    </div>
                    
                    {/* Price */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.price}</h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {listing.itemName}
                    </p>
                    
                    {/* Action Button */}
                    <button 
                      onClick={() => handleViewListing(listing)}
                      className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      Manage listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isListModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
          <div 
            className={`bg-white h-full w-full max-w-md lg:max-w-lg transform transition-transform duration-300 ease-in-out overflow-y-auto ${
              isListModalOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopperListingDashboard;