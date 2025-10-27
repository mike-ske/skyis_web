import React, { useState } from 'react';
import { Search, SquareCheck, Mail, SquarePen, Plus, X, ChevronDown, Upload, Filter } from 'lucide-react';

// Simple GigCard component for the gigs tab
const GigCard = ({ gig, onToggleStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full flex flex-col">
      <img 
        alt={gig.title} 
        className="rounded-t-xl object-cover w-full h-44 sm:h-48" 
        src={gig.image} 
      />
      <div className="p-4 sm:p-5 flex flex-col gap-2 text-sm sm:text-base text-gray-900 flex-1">
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Gig title:</span>
          <span className="font-semibold text-right flex-1 ml-2">{gig.title}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Category:</span>
          <span className="font-semibold text-right flex-1 ml-2">{gig.category}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Collaborator name:</span>
          <span className="font-semibold text-right flex-1 ml-2">{gig.collaborator}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Status:</span>
          <span className={`text-sm font-semibold rounded-full px-3 py-1 ${
            gig.status === "Completed" 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {gig.status}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Timeline:</span>
          <span className="font-semibold text-right flex-1 ml-2">{gig.timeline}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Budget:</span>
          <span className="font-semibold text-gray-500 line-through text-right flex-1 ml-2">{gig.budget}</span>
        </div>
      </div>
      <div className="flex gap-3 p-4 sm:p-5">
        <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-gray-700 text-sm sm:text-base font-medium w-full justify-center hover:bg-gray-50 transition-colors">
          <Mail size={16} className="sm:w-5 sm:h-5" />
          Message
        </button>
        <button 
          onClick={() => onToggleStatus(gig.id)}
          className="flex items-center gap-2 bg-teal-700 text-white rounded-full px-2 sm:px-2 py-2 sm:py-3 text-sm sm:text-base font-medium w-full justify-center hover:bg-teal-800 transition-colors"
        >
          <SquareCheck size={16} className="sm:w-5 sm:h-5" />
          {gig.status === "Completed" ? "Mark pending" : "Mark done"}
        </button>
      </div>
    </div>
  );
};

// Simple ActiveCard component for the active tab
const ActiveCard = ({ project, onToggleStatus }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full flex flex-col">
      <img 
        alt={project.name} 
        className="rounded-t-xl object-cover w-full h-44 sm:h-48" 
        src={project.image} 
      />
      <div className="p-4 sm:p-5 flex flex-col gap-2 text-sm sm:text-base text-gray-900 flex-1">
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Project:</span>
          <span className="font-semibold text-right flex-1 ml-2">{project.name}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Role:</span>
          <span className="font-semibold text-right flex-1 ml-2">{project.role}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Timeline:</span>
          <span className="font-semibold text-right flex-1 ml-2">{project.timeline}</span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-600 font-medium">Budget:</span>
          <span className="font-semibold text-right flex-1 ml-2">{project.budget}</span>
        </div>
        <div className="mt-3">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{project.description}</p>
        </div>
      </div>
      <div className="flex gap-3 p-4 sm:p-5">
        <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-gray-700 text-sm sm:text-base font-medium w-full justify-center hover:bg-gray-50 transition-colors">
          <SquarePen size={16} className="sm:w-5 sm:h-5" />
          Edit
        </button>
        <button className="flex items-center gap-2 border border-red-300 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-red-400 text-sm sm:text-base font-medium w-full justify-center hover:bg-red-50 transition-colors">
          <X size={16} className="sm:w-5 sm:h-5" />
          Close
        </button>
      </div>
    </div>
  );
};

// Incoming Request Card component
const IncomingCard = ({ item, onAccept, onDecline }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full flex flex-col">
      <img
        alt="Project preview"
        className="w-full h-44 sm:h-48 object-cover rounded-t-xl"
        src={item.image}
      />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex flex-col gap-2 text-sm sm:text-base text-gray-900 mb-4">
          <div className="flex justify-between items-start">
            <span className="text-gray-600 font-medium">Name:</span>
            <span className="font-semibold text-right flex-1 ml-2">{item.name}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600 font-medium">Role:</span>
            <span className="font-semibold text-right flex-1 ml-2">{item.role}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600 font-medium">Timeline:</span>
            <span className="font-semibold text-right flex-1 ml-2">{item.timeline}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600 font-medium">Budget:</span>
            <span className="font-semibold text-right flex-1 ml-2">{item.budget}</span>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-700 mb-4 flex-1 leading-relaxed">{item.description}</p>
        <div className="flex gap-3">
          <button
            onClick={() => onAccept(item.id)}
            className="flex-1 border border-gray-300 rounded-full py-2 sm:py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onDecline(item.id)}
            className="flex-1 border border-red-300 rounded-full py-2 sm:py-3 text-sm sm:text-base font-medium text-red-400 hover:bg-red-50 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

const Collaborate = () => {
  const [activeTab, setActiveTab] = useState('incoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    timeline: 'all',
    budget: 'all',
    role: 'all'
  });
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    timeline: '60 mins'
  });

  // Sample data for different tabs - each with 3 items
  const [tabData, setTabData] = useState({
    incoming: [
      {
        id: 1,
        name: 'Anita Kole',
        role: 'Fashion designer',
        timeline: '4 weeks',
        budget: '₦250,000.00',
        budgetValue: 250000,
        status: 'Pending',
        category: 'Designer/Creator',
        description: "I'd love to collaborate on a bridal capsule collection. I specialize in custom sketches and detailed design packs.",
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      },
      {
        id: 2,
        name: 'James Okoro',
        role: 'Creator',
        timeline: '2 weeks',
        budget: '₦25,000.00 per unit',
        budgetValue: 25000,
        status: 'Pending',
        category: 'Dressmaker',
        description: 'I can produce your luxury jacket designs in bulk. Offering fabric sourcing and full stitching services.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      },
      {
        id: 3,
        name: 'Lila Mensah',
        role: 'Stylist',
        timeline: '1 week',
        budget: '₦3,000,000.00',
        budgetValue: 3000000,
        status: 'Pending',
        category: 'Stylist',
        description: 'Looking to assist with in-store styling and photoshoot prep for your stores new collection.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      }
    ],
    gigs: [
      {
        id: 4,
        title: 'My Fashion Design Gig',
        category: 'Designer/Creator',
        collaborator: 'Anita Kole',
        status: 'In progress',
        timeline: '3 weeks',
        budget: '₦150,000.00',
        budgetValue: 150000,
        role: 'Designer',
        description: 'Custom bridal wear design services with 3D mockups and fabric recommendations.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      },
      {
        id: 5,
        title: 'Tailoring Services',
        category: 'Dressmaker',
        collaborator: 'James Okoro',
        status: 'Completed',
        timeline: '1 week',
        budget: '₦50,000.00',
        budgetValue: 50000,
        role: 'Tailor',
        description: 'Professional alterations and custom fitting services for formal wear.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      },
      {
        id: 6,
        title: 'Luxury Handbag Collection',
        category: 'Designer/Creator',
        collaborator: 'Sarah Ahmed',
        status: 'In progress',
        timeline: '5 weeks',
        budget: '₦300,000.00',
        budgetValue: 300000,
        role: 'Designer',
        description: 'Creating a premium handbag line with sustainable materials and modern aesthetics.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      }
    ],
    active: [
      {
        id: 7,
        name: 'Wedding Collection Project',
        role: 'Lead Designer',
        timeline: '6 weeks',
        budget: '₦500,000.00',
        budgetValue: 500000,
        status: 'In progress',
        category: 'Designer/Creator',
        description: 'Currently working on a complete wedding collection with 3 other collaborators.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      },
      {
        id: 8,
        name: 'Sustainable Fashion Line',
        role: 'Creative Director',
        timeline: '8 weeks',
        budget: '₦750,000.00',
        budgetValue: 750000,
        status: 'In progress',
        category: 'Designer/Creator',
        description: 'Developing an eco-friendly fashion line using organic materials and ethical production methods.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      },
      {
        id: 9,
        name: 'Corporate Wear Collection',
        role: 'Fashion Consultant',
        timeline: '4 weeks',
        budget: '₦400,000.00',
        budgetValue: 400000,
        status: 'In progress',
        category: 'Stylist',
        description: 'Designing professional attire for a major corporation with focus on comfort and style.',
        image: 'https://storage.googleapis.com/a1aa/image/fff68fc0-3b1f-4ac5-1eb9-c911ba4d17d6.jpg'
      }
    ]
  });

  const tabs = [
    { id: 'incoming', label: 'Incoming requests', count: tabData.incoming.length },
    { id: 'gigs', label: 'My gigs', count: tabData.gigs.length },
    { id: 'active', label: 'Active projects', count: tabData.active.length }
  ];

  // Filter function
  const applyFilters = (items) => {
    return items.filter(item => {
      // Search filter
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.collaborator?.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus = filters.status === 'all' || 
        item.status === filters.status;

      // Category filter
      const matchesCategory = filters.category === 'all' || 
        item.category === filters.category;

      // Timeline filter
      const matchesTimeline = filters.timeline === 'all' || 
        item.timeline === filters.timeline;

      // Role filter
      const matchesRole = filters.role === 'all' || 
        item.role === filters.role;

      // Budget filter
      let matchesBudget = true;
      if (filters.budget !== 'all' && item.budgetValue) {
        const budget = item.budgetValue;
        switch (filters.budget) {
          case 'under50k':
            matchesBudget = budget < 50000;
            break;
          case '50k-100k':
            matchesBudget = budget >= 50000 && budget <= 100000;
            break;
          case '100k-500k':
            matchesBudget = budget > 100000 && budget <= 500000;
            break;
          case 'over500k':
            matchesBudget = budget > 500000;
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesCategory && matchesTimeline && matchesRole && matchesBudget;
    });
  };

  const filteredData = applyFilters(tabData[activeTab]);

  const handleToggleGigStatus = (id) => {
    setTabData(prevData => ({
      ...prevData,
      gigs: prevData.gigs.map(gig => 
        gig.id === id 
          ? { ...gig, status: gig.status === 'Completed' ? 'In progress' : 'Completed' }
          : gig
      )
    }));
  };

  const handleAccept = (id) => {
    console.log(`Accepted request/gig with ID: ${id}`);
  };

  const handleDecline = (id) => {
    console.log(`Declined request/gig with ID: ${id}`);
  };

  const handlePostNewGig = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: '',
      category: '',
      description: '',
      budget: '',
      timeline: '60 mins'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleCloseModal();
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      timeline: 'all',
      budget: 'all',
      role: 'all'
    });
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== 'all').length;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <main className="flex flex-col">
        <section className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
                Hire & Collaborate
              </h1>
              <p className="text-gray-500 text-base sm:text-lg mt-1">
                Manage collaborations and gigs
              </p>
            </div>
            
            {/* Post new gig button - aligned with title */}
            <button
              onClick={handlePostNewGig}
              className="bg-teal-800 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold flex items-center gap-2 hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-800 transition-colors shadow-lg self-start sm:self-center"
            >
              <Plus size={20} className="sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Post new gig</span>
              <span className="sm:hidden">Post gig</span>
            </button>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black select-none">
                All auctions
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="relative w-full sm:w-64 lg:w-80">
                  <input
                    className="w-full text-gray-600 rounded-full bg-gray-50 text-base sm:text-lg placeholder:text-gray-400 placeholder:font-normal py-3 sm:py-4 pl-12 sm:pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-800"
                    placeholder="Search projects..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-4 sm:left-5 top-[2.5rem] -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button 
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-full px-6 sm:px-6 py-3 sm:py-3 text-base sm:text-lg text-black font-normal hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-300 relative min-w-fit" 
                  type="button"
                  onClick={() => setShowFilterModal(!showFilterModal)}
                >
                  <Filter size={20} />
                  <span>Filter</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Filter Modal */}
            {showFilterModal && (
              <div className="border border-gray-300 rounded-xl p-4 sm:p-6 bg-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 text-lg sm:text-xl">Filter Options</h3>
                  <button
                    onClick={resetFilters}
                    className="text-base sm:text-lg text-teal-600 hover:text-teal-800 font-medium"
                  >
                    Reset all
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="all">All statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="In progress">In progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="all">All categories</option>
                      <option value="Designer/Creator">Designer/Creator</option>
                      <option value="Dressmaker">Dressmaker</option>
                      <option value="Stylist">Stylist</option>
                    </select>
                  </div>

                  {/* Role Filter */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={filters.role}
                      onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                      className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="all">All roles</option>
                      <option value="Fashion designer">Fashion designer</option>
                      <option value="Creator">Creator</option>
                      <option value="Stylist">Stylist</option>
                      <option value="Designer">Designer</option>
                      <option value="Tailor">Tailor</option>
                      <option value="Lead Designer">Lead Designer</option>
                      <option value="Creative Director">Creative Director</option>
                      <option value="Fashion Consultant">Fashion Consultant</option>
                    </select>
                  </div>

                  {/* Timeline Filter */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Timeline</label>
                    <select
                      value={filters.timeline}
                      onChange={(e) => setFilters({ ...filters, timeline: e.target.value })}
                      className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="all">All timelines</option>
                      <option value="1 week">1 week</option>
                      <option value="2 weeks">2 weeks</option>
                      <option value="3 weeks">3 weeks</option>
                      <option value="4 weeks">4 weeks</option>
                      <option value="5 weeks">5 weeks</option>
                      <option value="6 weeks">6 weeks</option>
                      <option value="8 weeks">8 weeks</option>
                    </select>
                  </div>

                  {/* Budget Filter */}
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">Budget</label>
                    <select
                      value={filters.budget}
                      onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                      className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg text-base focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="all">All budgets</option>
                      <option value="under50k">Under ₦50,000</option>
                      <option value="50k-100k">₦50,000 - ₦100,000</option>
                      <option value="100k-500k">₦100,000 - ₦500,000</option>
                      <option value="over500k">Over ₦500,000</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 sm:py-5 text-base sm:text-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-black border-r border-gray-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  } ${tab.id !== 'active' ? 'border-r border-gray-200' : ''}`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  
                </button>
              ))}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
              {filteredData.length === 0 ? (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-xl sm:text-2xl mb-2">No {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} found</p>
                  {searchTerm && <p className="text-base sm:text-lg">Try adjusting your search or filters</p>}
                </div>
              ) : (
                filteredData.map((item) => {
                  if (activeTab === 'incoming') {
                    return (
                      <IncomingCard 
                        key={item.id} 
                        item={item} 
                        onAccept={handleAccept}
                        onDecline={handleDecline}
                      />
                    );
                  } else if (activeTab === 'gigs') {
                    return (
                      <GigCard key={item.id} gig={item} onToggleStatus={handleToggleGigStatus} />
                    );
                  } else if (activeTab === 'active') {
                    return (
                      <ActiveCard key={item.id} project={item} />
                    );
                  }
                  return null;
                })
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity">
          <div onClick={handleCloseModal} className="absolute inset-0"></div>
        </div>
      )}

      {/* Sliding Modal */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        showModal ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 sm:p-8 h-full overflow-y-auto">
          <header className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-gray-900 font-semibold text-xl sm:text-2xl leading-tight">Post new gig</h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-2 max-w-[320px]">
                Create a new collaboration request to find the perfect freelancer for your project.
              </p>
            </div>
            <button 
              onClick={handleCloseModal}
              className="text-gray-600 hover:text-gray-900 p-1"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="gig-title" className="block text-gray-900 text-base font-medium mb-2">
                Gig title
              </label>
              <input
                id="gig-title"
                name="title"
                type="text"
                placeholder="e.g Vintage Chanel Bag"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg text-gray-900 text-base placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="category" className="block text-gray-900 text-base font-medium mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg text-gray-900 text-base px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                aria-label="Select category"
              >
                <option value="" disabled>Select category</option>
                <option value="fashion-design">Fashion Design</option>
                <option value="tailoring">Tailoring</option>
                <option value="styling">Styling</option>
                <option value="photography">Photography</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-12 text-gray-400" size={20} />
            </div>

            <div>
              <p className="text-gray-900 font-semibold text-base mb-1">Photo of items</p>
              <p className="text-gray-600 text-sm mb-3">Upload up to 4 photos</p>
              <label
                htmlFor="upload"
                className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer py-12 text-center text-gray-500 relative hover:bg-gray-50 transition-colors"
              >
                <div className="mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <span className="text-gray-700 font-semibold text-base">Click to upload</span>
                <span className="text-gray-500 text-sm mt-1">or drag and drop</span>
                <span className="text-gray-400 text-sm mt-1">SVG, PNG, JPG or GIF (max. 800×400px)</span>
                <input id="upload" type="file" multiple accept="image/*" className="hidden" />
              </label>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-900 text-base font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Describe your item"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg text-gray-900 text-base placeholder-gray-400 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="budget" className="block text-gray-900 text-base font-medium mb-2">
                Budget in (NGN)
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg text-gray-900 text-base placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="timeline" className="block text-gray-900 text-base font-medium mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg text-gray-900 text-base px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                aria-label="Select timeline"
              >
                <option value="30 mins">30 mins</option>
                <option value="60 mins">60 mins</option>
                <option value="90 mins">90 mins</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-12 text-gray-400" size={20} />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 border border-gray-300 rounded-full py-3 px-6 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-teal-800 text-white rounded-full py-3 px-6 text-base font-semibold hover:bg-teal-900 transition-colors"
              >
                Post Gig
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;