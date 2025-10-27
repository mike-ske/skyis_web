import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Users, Star, Eye } from 'lucide-react';

const Following = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [followingStatus, setFollowingStatus] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const followingData = [
    {
      id: 1,
      name: "Fashion Forward",
      type: "Designer",
      description: "Premium fashion boutique offering contemporary and traditional Nigerian fashion.",
      rating: 4.9,
      location: "Abuja, Nigeria",
      followers: "2.5k followers",
      avatar: "F",
      bgColor: "bg-orange-400",
      profileDetails: {
        bio: "Award-winning fashion designer with over 10 years of experience in luxury African-inspired fashion. Specializing in bespoke bridal wear and contemporary Nigerian designs.",
        founded: "2014",
        totalProducts: "150+",
        categories: ["Bridal Wear", "Traditional Attire", "Contemporary Fashion"],
        achievements: ["Best Designer Award 2023", "Featured in Vogue Africa", "Celebrity Designer"]
      }
    },
    {
      id: 2,
      name: "Adunni Styles",
      type: "Creator",
      description: "Award-winning fashion designer specializing in luxury African-inspired formal wear.",
      rating: 4.5,
      location: "Lagos, Nigeria",
      followers: "3.2k followers",
      avatar: "A",
      bgColor: "bg-purple-400",
      profileDetails: {
        bio: "Creative fashion designer known for innovative African prints and modern silhouettes. Passionate about preserving African heritage through contemporary fashion.",
        founded: "2018",
        totalProducts: "200+",
        categories: ["African Prints", "Formal Wear", "Accessories"],
        achievements: ["Rising Star Award 2022", "Fashion Week Lagos Featured Designer"]
      }
    },
    {
      id: 3,
      name: "Lagos Boutique",
      type: "Shop owner",
      description: "Premium fashion boutique offering contemporary and traditional Nigerian fashion.",
      rating: 4.6,
      location: "Victoria Island, Lagos",
      followers: "1.8k followers",
      avatar: "L",
      bgColor: "bg-blue-400",
      profileDetails: {
        bio: "Luxury boutique curating the finest selection of African and international fashion brands. Your one-stop shop for premium fashion pieces.",
        founded: "2015",
        totalProducts: "500+",
        categories: ["International Brands", "African Designers", "Accessories", "Shoes"],
        achievements: ["Top Boutique Award 2023", "Premium Retailer Recognition"]
      }
    },
    {
      id: 4,
      name: "Ankara Queen",
      type: "Designer",
      description: "Specialist in authentic Ankara prints and traditional Nigerian wedding attire.",
      rating: 4.7,
      location: "Kano, Nigeria",
      followers: "2.1k followers",
      avatar: "Q",
      bgColor: "bg-pink-400",
      profileDetails: {
        bio: "Master craftsperson specializing in authentic Ankara designs and traditional Nigerian wedding attire. Preserving cultural heritage through fashion.",
        founded: "2012",
        totalProducts: "180+",
        categories: ["Ankara Prints", "Wedding Attire", "Traditional Wear"],
        achievements: ["Cultural Heritage Award", "Master Craftsperson Recognition"]
      }
    },
    {
      id: 5,
      name: "Modern Threads",
      type: "Shop owner",
      description: "Contemporary fashion store featuring emerging Nigerian designers and international brands.",
      rating: 4.3,
      location: "Port Harcourt, Nigeria",
      followers: "1.5k followers",
      avatar: "M",
      bgColor: "bg-green-400",
      profileDetails: {
        bio: "Contemporary fashion retailer showcasing the best of emerging Nigerian talent alongside carefully selected international pieces.",
        founded: "2019",
        totalProducts: "300+",
        categories: ["Emerging Designers", "Streetwear", "Contemporary Fashion"],
        achievements: ["Emerging Brand Partner Award", "Youth Fashion Advocate"]
      }
    },
    {
      id: 6,
      name: "Royal Fabrics",
      type: "Creator",
      description: "Luxury fabric merchant and custom tailor specializing in premium African textiles.",
      rating: 4.8,
      location: "Ibadan, Nigeria",
      followers: "2.9k followers",
      avatar: "R",
      bgColor: "bg-indigo-400",
      profileDetails: {
        bio: "Premium textile specialist and master tailor with expertise in luxury African fabrics and custom garment creation.",
        founded: "2010",
        totalProducts: "120+",
        categories: ["Luxury Fabrics", "Custom Tailoring", "Premium Textiles"],
        achievements: ["Master Tailor Certification", "Luxury Textile Award 2022"]
      }
    },
    {
      id: 7,
      name: "Chic Collective",
      type: "Designer",
      description: "Fashion collective featuring multiple designers creating modern African-inspired pieces.",
      rating: 4.4,
      location: "Abuja, Nigeria",
      followers: "1.9k followers",
      avatar: "C",
      bgColor: "bg-teal-400",
      profileDetails: {
        bio: "Collaborative fashion collective bringing together talented designers to create innovative African-inspired contemporary fashion.",
        founded: "2020",
        totalProducts: "250+",
        categories: ["Collaborative Designs", "Modern African", "Ready-to-Wear"],
        achievements: ["Collaboration Excellence Award", "Innovation in Fashion Award"]
      }
    },
    {
      id: 8,
      name: "Aso Oke Masters",
      type: "Creator",
      description: "Traditional Aso Oke weavers and designers preserving ancient Nigerian textile arts.",
      rating: 4.9,
      location: "Iseyin, Nigeria",
      followers: "3.5k followers",
      avatar: "O",
      bgColor: "bg-yellow-400",
      profileDetails: {
        bio: "Master weavers preserving the ancient art of Aso Oke textile creation while adapting traditional techniques for modern fashion.",
        founded: "2008",
        totalProducts: "90+",
        categories: ["Aso Oke Textiles", "Traditional Weaving", "Cultural Fashion"],
        achievements: ["Cultural Preservation Award", "UNESCO Recognition", "Master Weaver Status"]
      }
    },
    {
      id: 9,
      name: "Urban Style Hub",
      type: "Shop owner",
      description: "Trendy fashion retailer focusing on urban streetwear and contemporary African fashion.",
      rating: 4.2,
      location: "Lagos, Nigeria",
      followers: "1.6k followers",
      avatar: "U",
      bgColor: "bg-red-400",
      profileDetails: {
        bio: "Urban fashion destination combining street style with African contemporary fashion for the modern Nigerian youth.",
        founded: "2021",
        totalProducts: "400+",
        categories: ["Streetwear", "Urban Fashion", "Youth Fashion", "Sneakers"],
        achievements: ["Youth Fashion Retailer Award", "Urban Style Innovation Award"]
      }
    },
    {
      id: 10,
      name: "Elegant Ensembles",
      type: "Designer",
      description: "Haute couture designer specializing in elegant evening wear and formal attire.",
      rating: 4.6,
      location: "Calabar, Nigeria",
      followers: "2.3k followers",
      avatar: "E",
      bgColor: "bg-rose-400",
      profileDetails: {
        bio: "Haute couture designer creating exquisite evening wear and formal attire for discerning clients who appreciate luxury and elegance.",
        founded: "2016",
        totalProducts: "75+",
        categories: ["Haute Couture", "Evening Wear", "Formal Attire", "Red Carpet Fashion"],
        achievements: ["Haute Couture Excellence Award", "Red Carpet Designer 2023", "Luxury Fashion Recognition"]
      }
    }
  ];

  const toggleFollow = (id) => {
    setFollowingStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const openProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedUser(null), 300);
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`w-3 h-3 ${star <= rating ? 'text-orange-400 fill-current' : 'text-gray-300'}`} />
      ))}
      </div>
      <span className="text-sm text-gray-600 ml-1">({rating})</span>
    </div>
  );

  const filteredData = followingData.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = person.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
                         person.type.toLowerCase().includes(filterTerm.toLowerCase()) ||
                         person.location.toLowerCase().includes(filterTerm.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const FollowingCard = ({ person }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${person.bgColor} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
          {person.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-base">{person.name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              person.type === 'Creator' ? 'bg-purple-100 text-purple-700' :
              person.type === 'Shop owner' ? 'bg-blue-100 text-blue-700' :
              'bg-green-100 text-green-700'
            }`}>
              {person.type}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{person.description}</p>
      <hr className="my-3" />
      <div className="mb-3">
        <StarRating rating={person.rating} />
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{person.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{person.followers}</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => toggleFollow(person.id)}
          className={`flex-1 py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 ${
            followingStatus[person.id]
              ? 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              : 'border border-red-400 text-red-500 hover:bg-red-50'
          }`}
        > <Users className="w-4 h-4" />
          {followingStatus[person.id] ? 'Follow' : 'Unfollow'}
        </button>
        <button 
          onClick={() => openProfile(person)}
          className="flex  rounded-full items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4  text-sm font-medium hover:bg-gray-50 transition-colors"
        > <Eye className="w-4 h-4" />
          View profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="flex flex-1 justify-between mx-auto px-4 py-4">
          <div className="relative flex-1 max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">People You're Following</h1>
            <p className="text-gray-600 mb-4">Stay connected with your favorite creators and shops</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md flex justify-center items-center">
              <Search className="absolute left-3 top-[70%] text-gray-800 transform -translate-y-1/2  w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white"
              />
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              
              {showFilter && (
                <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-20">
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by name, type, or location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter filter term..."
                      value={filterTerm}
                      onChange={(e) => setFilterTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFilterTerm('')}
                      className="flex-1 text-xs text-gray-600 border border-gray-300 px-3 py-2 rounded hover:bg-gray-50"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowFilter(false)}
                      className="flex-1 text-xs bg-orange-400 text-white px-3 py-2 rounded hover:bg-orange-500"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            All available listings ({filteredData.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((person) => (
            <FollowingCard key={person.id} person={person} />
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search or filter terms</p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${showModal ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${showModal ? 'bg-opacity-50' : 'bg-opacity-0'}`}
          onClick={closeModal}
        />
        
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${showModal ? 'translate-x-0' : 'translate-x-full'}`}>
          {selectedUser && (
            <div className="h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${selectedUser.bgColor} rounded-full flex items-center justify-center text-white font-semibold text-xl`}>
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <span className={`text-sm px-2 py-1 rounded ${
                      selectedUser.type === 'Creator' ? 'bg-purple-100 text-purple-700' :
                      selectedUser.type === 'Shop owner' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {selectedUser.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <StarRating rating={selectedUser.rating} />
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedUser.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{selectedUser.followers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedUser.profileDetails.bio}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedUser.profileDetails.founded}</div>
                      <div className="text-sm text-gray-600">Year Founded</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{selectedUser.profileDetails.totalProducts}</div>
                      <div className="text-sm text-gray-600">Total Products</div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.profileDetails.categories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                    <div className="space-y-2">
                      {selectedUser.profileDetails.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <button 
                    onClick={() => toggleFollow(selectedUser.id)}
                    className={`flex-1 py-3 px-4 flex justify-center gap-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      followingStatus[selectedUser.id]
                        ? 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                        : 'border border-red-400 text-red-500 hover:bg-red-50'
                    }`}
                  > <Users className="w-4 h-4" />
                    {followingStatus[selectedUser.id] ? 'Follow' : 'Unfollow'}
                  </button>
                  <button className="flex-1 flex bg-orange-400 justify-center gap-4 items-center text-white py-3 px-2  rounded-full text-sm font-medium hover:bg-orange-500 transition-colors">
                    <Eye className="w-4 h-4" /> View Products
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside overlay */}
      {showFilter && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};

export default Following;