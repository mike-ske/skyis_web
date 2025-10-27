import React, { useState, useRef } from 'react';
// Import Iconsax React icons
import { 
  Lock1 as Lock,           // Lock icon
  Shop as Store,           // Store/Shop icon
  Headphone as Headphones, // Headphone icon
  Eye,                     // Eye icon
  ArrowLeft,               // Arrow left
  ArrowRight,              // Arrow right
  DocumentUpload as Upload, // Upload icon
  Sms as Mail,             // Email/SMS icon
  Call as Phone,           // Phone call icon
  Location as MapPin,      // Location pin icon
  Document as FileText,    // Document icon
  TickCircle as Check,     // Check/tick icon
  CloseCircle as X,        // Close icon
  Refresh as Loader2,      // Loading spinner
  Star1 as Star,           // Star icon
  Heart,                   // Heart icon
  ShoppingCart             // Shopping cart icon
} from 'iconsax-reactjs';
import { GalleryThumbnailsIcon } from 'lucide-react';



const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Business Basics
    storeName: '',
    category: '',
    businessReg: '',
    registrationDoc: null,
    storeDescription: '',
    
    // Step 2: Brand your store
    storeLogo: null,
    storeBanner: null,
    
    // Step 3: Contact & operations
    businessEmail: '',
    phoneNumber: '',
    businessAddress: '',
    refundPolicy: '',
    
    // Step 4: Final confirmation
    termsAgreed: false
  });

  const [errors, setErrors] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  const fileInputRefs = {
    registrationDoc: useRef(null),
    storeLogo: useRef(null),
    storeBanner: useRef(null)
  };

 // Your steps array with Iconsax icons
const steps = [
  {
    id: 'business-basics',
    title: 'Business Basics',
    subtitle: 'Verify to continue onboarding',
    icon: Lock,
    component: BusinessBasicsForm
  },
  {
    id: 'brand-store',
    title: 'Brand your store',
    subtitle: 'Please provide your company details',
    icon: Store,
    component: BrandStoreForm
  },
  {
    id: 'contact-operations',
    title: 'Contact & operations',
    subtitle: 'Choose your preferred service.',
    icon: Headphones,
    component: ContactOperationsForm
  },
  {
    id: 'store-preview',
    title: 'Store preview',
    subtitle: 'Start collaborating with your team',
    icon: Eye,
    component: StorePreviewForm
  }
];

  const validateStep = (stepIndex) => {
    const newErrors = {};
    
    switch (stepIndex) {
      case 0: // Business Basics
        if (!formData.storeName.trim()) newErrors.storeName = 'Store name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.businessReg.trim()) newErrors.businessReg = 'Business registration number is required';
        if (!formData.registrationDoc) newErrors.registrationDoc = 'Registration document is required';
        if (!formData.storeDescription.trim()) newErrors.storeDescription = 'Store description is required';
        break;
        
      case 1: // Brand store
        if (!formData.storeLogo) newErrors.storeLogo = 'Store logo is required';
        if (!formData.storeBanner) newErrors.storeBanner = 'Store banner is required';
        break;
        
      case 2: // Contact & operations
        if (!formData.businessEmail.trim()) newErrors.businessEmail = 'Business email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) newErrors.businessEmail = 'Invalid email format';
        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.businessAddress.trim()) newErrors.businessAddress = 'Business address is required';
        if (!formData.refundPolicy.trim()) newErrors.refundPolicy = 'Refund policy is required';
        break;
        
      case 3: // Store preview
        if (!formData.termsAgreed) newErrors.termsAgreed = 'You must agree to the terms of service';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
    
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload SVG, PNG, JPG or GIF files only.';
    }
    
    if (file.size > maxSize) {
      return 'File size must be less than 5MB.';
    }
    
    // Additional validation for logos and banners
    if (type === 'storeLogo') {
      const img = new Image();
      return new Promise((resolve) => {
        img.onload = () => {
          if (img.width > 400 || img.height > 400) {
            resolve('Logo dimensions should not exceed 400x400px.');
          } else {
            resolve(null);
          }
        };
        img.src = URL.createObjectURL(file);
      });
    }
    
    if (type === 'storeBanner') {
      const img = new Image();
      return new Promise((resolve) => {
        img.onload = () => {
          if (img.width > 800 || img.height > 400) {
            resolve('Banner dimensions should not exceed 800x400px.');
          } else {
            resolve(null);
          }
        };
        img.src = URL.createObjectURL(file);
      });
    }
    
    return null;
  };

  const handleFileUpload = async (file, fieldName) => {
    setUploadStatus(prev => ({ ...prev, [fieldName]: 'uploading' }));
    
    const validationError = await validateFile(file, fieldName);
    
    if (validationError) {
      setErrors(prev => ({ ...prev, [fieldName]: validationError }));
      setUploadStatus(prev => ({ ...prev, [fieldName]: 'error' }));
      return;
    }
    
    // Simulate upload delay
    setTimeout(() => {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
      setUploadStatus(prev => ({ ...prev, [fieldName]: 'success' }));
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const nextStep = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newCompletedSteps = [...completedSteps];
    if (!newCompletedSteps.includes(currentStep)) {
      newCompletedSteps.push(currentStep);
    }
    setCompletedSteps(newCompletedSteps);
    
    if (currentStep === steps.length - 1) {
      // Final step - show success and send email
      setShowSuccess(true);
      setTimeout(() => {
        setEmailSent(true);
      }, 2000);
    } else {
      setCurrentStep(currentStep + 1);
    }
    
    setIsLoading(false);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    // Only allow going to completed steps or the next immediate step
    if (completedSteps.includes(stepIndex) || stepIndex === Math.max(...completedSteps, -1) + 1) {
      setCurrentStep(stepIndex);
    }
  };

  function BusinessBasicsForm() {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Business Basics</h1>
          <p className="text-gray-600">Tell us about your fashion store</p>
        </div>
        
        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">Store name</label>
          <input
            type="text"
            value={formData.storeName}
            onChange={(e) => handleInputChange('storeName', e.target.value)}
            className={`w-full border text-gray-400 rounded-xl py-4 px-6 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent ${
              errors.storeName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="enter your store name"
          />
          {errors.storeName && (
            <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
              <X className="w-4 h-4 mr-1" />
              {errors.storeName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-base font-medium text-gray-900 mb-3">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full border text-gray-400 rounded-xl py-4 px-6 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent appearance-none ${
                errors.category ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <option value="">Select your store category</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
              <option value="footwear">Footwear</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.category}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Business registration number</label>
            <input
              type="text"
              value={formData.businessReg}
              onChange={(e) => handleInputChange('businessReg', e.target.value)}
              className={`w-full text-gray-400 border rounded-xl py-4 px-6 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent ${
                errors.businessReg ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="enter business registration number"
            />
            {errors.businessReg && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.businessReg}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Upload registration document</label>
            <div
              onClick={() => fileInputRefs.registrationDoc.current?.click()}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer py-12 text-center transition-all duration-300 hover:border-teal-700 hover:bg-teal-50 ${
                errors.registrationDoc ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <div className="mb-4 p-4 bg-gray-100 rounded-full">
                {uploadStatus.registrationDoc === 'uploading' ? (
                  <Loader2 className="w-6 h-6 text-teal-700 animate-spin" />
                ) : uploadStatus.registrationDoc === 'success' ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <span className="text-teal-900 font-semibold text-base">Click to upload</span>
              <span className="text-gray-600 text-sm mt-1">or drag and drop</span>
              <p className="text-xs text-gray-400 mt-2">
                SVG, PNG, JPG or GIF <span className="text-gray-300">(max. 800×400px)</span>
              </p>
              <input
                ref={fileInputRefs.registrationDoc}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(file, 'registrationDoc');
                }}
                className="hidden"
              />
            </div>
            {uploadStatus.registrationDoc === 'success' && (
              <p className="mt-2 text-sm text-green-600 flex items-center animate-slideDown">
                <Check className="w-4 h-4 mr-1" />
                File uploaded successfully
              </p>
            )}
            {errors.registrationDoc && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.registrationDoc}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Short store description</label>
            <textarea
              value={formData.storeDescription}
              onChange={(e) => handleInputChange('storeDescription', e.target.value)}
              rows={4}
              className={`w-full text-gray-400 border rounded-xl py-4 px-6 text-base resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent ${
                errors.storeDescription ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Describe what makes your store unique"
            />
            {errors.storeDescription && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.storeDescription}
              </p>
            )}
          </div>
        </div>
      );
    }

    function BrandStoreForm() {
      return (
        <div className="space-y-10 animate-fadeIn max-w-lg">
          <div className="mb-8 m-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Brand your store</h1>
            <p className="text-gray-600">Upload your visuals and choose your style</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Store logo</label>
            <div
              onClick={() => fileInputRefs.storeLogo.current?.click()}
              className={`flex flex-col items-center justify-center border border-dashed rounded-xl cursor-pointer py-12 text-center transition-all duration-300 hover:border-teal-700 hover:bg-teal-50 ${
                errors.storeLogo ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <div className="mb-4 p-4 bg-gray-100 rounded-full">
                {uploadStatus.storeLogo === 'uploading' ? (
                  <Loader2 className="w-6 h-6 text-teal-700 animate-spin" />
                ) : uploadStatus.storeLogo === 'success' ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <span className="text-teal-900 font-semibold text-base">Click to upload</span>
              <span className="text-gray-600 text-sm mt-1">or drag and drop</span>
              <p className="text-xs text-gray-400 mt-2">
                SVG, PNG, JPG or GIF <span className="text-gray-300">(max. 800×400px)</span>
              </p>
              <input
                ref={fileInputRefs.storeLogo}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(file, 'storeLogo');
                }}
                className="hidden"
              />
            </div>
            {uploadStatus.storeLogo === 'success' && (
              <p className="mt-2 text-sm text-green-600 flex items-center animate-slideDown">
                <Check className="w-4 h-4 mr-1" />
                Logo uploaded successfully
              </p>
            )}
            {errors.storeLogo && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.storeLogo}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Store cover banner</label>
            <div
              onClick={() => fileInputRefs.storeBanner.current?.click()}
              className={`flex flex-col items-center justify-center border border-dashed rounded-xl cursor-pointer py-12 text-center transition-all duration-300 hover:border-teal-700 hover:bg-teal-50 ${
                errors.storeBanner ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <div className="mb-4 p-4 bg-gray-100 rounded-full">
                {uploadStatus.storeBanner === 'uploading' ? (
                  <Loader2 className="w-6 h-6 text-teal-700 animate-spin" />
                ) : uploadStatus.storeBanner === 'success' ? (
                  <Check className="w-6 h-6 text-green-600" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <span className="text-teal-900 font-semibold text-base">Click to upload</span>
              <span className="text-gray-600 text-sm mt-1">or drag and drop</span>
              <p className="text-xs text-gray-400 mt-2">
                SVG, PNG, JPG or GIF <span className="text-gray-300">(max. 800×400px)</span>
              </p>
              <input
                ref={fileInputRefs.storeBanner}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(file, 'storeBanner');
                }}
                className="hidden"
              />
            </div>
            {uploadStatus.storeBanner === 'success' && (
              <p className="mt-2 text-sm text-green-600 flex items-center animate-slideDown">
                <Check className="w-4 h-4 mr-1" />
                Banner uploaded successfully
              </p>
            )}
            {errors.storeBanner && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.storeBanner}
              </p>
            )}
          </div>
        </div>
      );
    }

    function ContactOperationsForm() {
      return (
        <div className="space-y-8 animate-fadeIn max-w-xl">
          <div className="mb-8 m-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact & operations</h1>
            <p className="text-gray-600">Setup your business contact details</p>
          </div>
          
          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Business email</label>
            <div className={`flex items-center border rounded-xl overflow-hidden transition-all duration-200 ${
              errors.businessEmail ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700'
            }`}>
              <div className="flex items-center justify-center w-14 h-14 text-gray-400 border-r border-gray-200">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                value={formData.businessEmail}
                onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                className="flex-1 text-gray-400 h-14 px-4 text-base focus:outline-none"
                placeholder="johndoe@example.com"
              />
            </div>
            {errors.businessEmail && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.businessEmail}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Phone number</label>
            <div className={`flex items-center border rounded-xl overflow-hidden transition-all duration-200 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700'
            }`}>
              <div className="flex items-center justify-center w-14 h-14 text-gray-400 border-r border-gray-200">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="flex-1 text-gray-400 h-14 px-4 text-base focus:outline-none"
                placeholder="+234-81000000000"
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Business address</label>
            <div className={`flex items-center border rounded-xl overflow-hidden transition-all duration-200 ${
              errors.businessAddress ? 'border-red-500' : 'border-gray-300 hover:border-gray-400 focus-within:border-teal-700 focus-within:ring-2 focus-within:ring-teal-700'
            }`}>
              <div className="flex items-center justify-center w-14 h-14 text-gray-400 border-r border-gray-200">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={formData.businessAddress}
                onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                className="flex-1 text-gray-400 h-14 px-4 text-base focus:outline-none"
                placeholder="123 fashion street, city, state, zip"
              />
            </div>
            {errors.businessAddress && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.businessAddress}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base font-medium text-gray-900 mb-3">Refund/return policy</label>
            <textarea
              value={formData.refundPolicy}
              onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
              rows={4}
              className={`w-full text-gray-400 border rounded-xl py-4 px-6 text-base resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent ${
                errors.refundPolicy ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Describe your refund and return policy"
            />
            {errors.refundPolicy && (
              <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
                <X className="w-4 h-4 mr-1" />
                {errors.refundPolicy}
              </p>
            )}
          </div>
        </div>
      );
    }

    function StorePreviewForm() {
      return (
        <div className="animate-fadeIn">
          <div className="mb-8 m-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Store preview</h1>
            <p className="text-gray-600">Review your store setup before completion</p>
          </div>
          
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4 text-blue-700 font-bold text-2xl">
              {formData.storeName.charAt(0).toUpperCase() || 'S'}
            </div>
            <h2 className="font-bold text-xl text-gray-700 mb-2">
              {formData.storeName || 'Your Store'}
            </h2>
            <span className="inline-block bg-gray-300 text-gray-600 text-sm rounded-md px-3 py-1">
              {formData.category || 'Category'}
            </span>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Sample Product 1 */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1566479179817-0b0e7f04d4f6?w=400&h=300&fit=crop"
                  alt="Sample product"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-gray-300 text-gray-600 text-xs rounded-md px-2 py-1">
                  Featured
                </span>
              </div>
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">(4.5)</span>
              </div>
              <p className="font-bold text-gray-900 mb-2">₦25,000.00</p>
              <p className="text-sm text-gray-500 mb-4">Premium fashion item with excellent quality and design</p>
              <div className="flex justify-between items-center text-gray-400">
                <button className="hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-gray-900 transition-colors">
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>

            {/* Sample Product 2 */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="relative rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop"
                  alt="Sample product"
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-300 text-green-800 text-xs rounded-md px-2 py-1">
                  New
                </span>
              </div>
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">(4.8)</span>
              </div>
              <p className="font-bold text-gray-900 mb-2">₦35,000.00</p>
              <p className="text-sm text-gray-500 mb-4">Trendy fashion piece perfect for any occasion</p>
              <div className="flex justify-between items-center text-gray-400">
                <button className="hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1 text-sm hover:border-gray-900 transition-colors">
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 mb-8">
            <input
              type="checkbox"
              id="terms"
              checked={formData.termsAgreed}
              onChange={(e) => handleInputChange('termsAgreed', e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-teal-100 focus:ring-teal-900 mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-teal-900 hover:underline">Terms of Service</a> and <a href="#" className="text-teal-900 hover:underline">Privacy Policy</a>
            </label>
          </div>
          {errors.termsAgreed && (
            <p className="mt-2 text-sm text-red-600 flex items-center animate-slideDown">
              <X className="w-4 h-4 mr-1" />
              {errors.termsAgreed}
            </p>
          )}
        </div>
      );
    }

    const CurrentStepComponent = steps[currentStep].component;

    return (
      <div className="min-h-screen bg-white flex">
        {/* Sidebar Navigation */}
        <div className="w-96  bg-gray-100 flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6">
                <div className="flex items-center space-x-2">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img 
                            alt="Skyis Logo" 
                            className="w-auto transition-transform duration-200 hover:scale-105" 
                            src="https://res.cloudinary.com/drgk8rmny/image/upload/v1753051987/Frame_1000011702_5_2_iucm5i.svg" 
                        />
                    </div>
                </div>
            </div>

          {/* Navigation Steps */}
          <div className="flex-1 p-6">
            <div className="space-y-4">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  disabled={!completedSteps.includes(index) && index !== Math.max(...completedSteps, -1) + 1}
                  className={`w-full flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 text-left ${
                    currentStep === index
                      ? 'bg-gray-300 text-gray-900'
                      : completedSteps.includes(index)
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className={`w-15 h-15 rounded-xl flex items-center justify-center ${
                    completedSteps.includes(index)
                      ? 'bg-teal-100 text-teal-700'
                      : currentStep === index
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-gray-50 text-gray-400'
                  }`}>
                    <step.icon 
                        className="w-8 h-8" 
                        variant="Bulk"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{step.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-green-800">
              <div className="flex items-center space-x-2">
                <span className="font-['Inter']">© Skyis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="font-['Inter']">sayhi@skyis.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {showSuccess ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {emailSent ? 'Check your email!' : 'Setting up your store...'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {emailSent 
                    ? 'We\'ve sent a confirmation email to your business email address with next steps.'
                    : 'Please wait while we set up your store. This may take a few moments.'
                  }
                </p>
                {emailSent && (
                  <button
                    onClick={() => {
                      setShowSuccess(false);
                      setEmailSent(false);
                      setCurrentStep(0);
                      setCompletedSteps([]);
                      setFormData({
                        storeName: '',
                        category: '',
                        businessReg: '',
                        registrationDoc: null,
                        storeDescription: '',
                        storeLogo: null,
                        storeBanner: null,
                        businessEmail: '',
                        phoneNumber: '',
                        businessAddress: '',
                        refundPolicy: '',
                        termsAgreed: false
                      });
                    }}
                    className="bg-teal-700 text-white rounded-full px-8 py-4 font-medium hover:bg-teal-800 transition-colors"
                  >
                    Start Over
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Form Content */}
              <div className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-2xl m-auto">
                  <CurrentStepComponent />
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="p-8">
                <div className="max-w-2xl m-auto flex justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                      currentStep === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </button>
                  
                  <button
                    onClick={nextStep}
                    disabled={isLoading}
                    className="bg-teal-700 text-white rounded-full px-8 py-4 font-medium hover:bg-teal-800 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

export default UserOnboarding;