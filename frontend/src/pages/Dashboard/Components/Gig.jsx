import React, { useState, useEffect } from 'react';

// Gig card data
const initialGigs = [
  {
    id: 1,
    title: "Bridal capsule collection",
    category: "Designer/Creator",
    status: "Live",
    timeline: "6 weeks",
    originalPrice: "₦40,000.00",
    currentPrice: "₦40,000.00",
    image: "https://storage.googleapis.com/a1aa/image/9cc201df-eeac-42e1-946e-83f447c5173c.jpg",
    isClosed: false
  },
  {
    id: 2,
    title: "Jacket production run",
    category: "Dressmaker",
    status: "Live",
    timeline: "3 weeks",
    originalPrice: "₦100,000.00",
    currentPrice: "₦100,000.00",
    image: "https://storage.googleapis.com/a1aa/image/32ae08b9-ae12-40fb-dfc3-12c15db9c956.jpg",
    isClosed: false
  },
  {
    id: 3,
    title: "In-store stylist",
    category: "Stylist",
    status: "Closed",
    timeline: "1 week",
    originalPrice: "₦70,000.00",
    currentPrice: "₦70,000.00",
    image: "https://storage.googleapis.com/a1aa/image/09662f4c-cb91-4398-2ada-00d8b052f443.jpg",
    isClosed: true
  }
];

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </svg>
);

const GigCard = ({ gig, onEdit, onToggleStatus }) => {
  return (
    <section className="bg-white rounded-xl shadow-md p-4 max-w-xs w-full flex flex-col min-w-[280px]">
      <img 
        alt={gig.title} 
        className="rounded-lg mb-4 object-cover w-full h-48" 
        src={gig.image} 
      />
      <dl className="text-sm text-gray-800 space-y-1 mb-4">
        <div className="flex justify-between">
          <dt className="font-normal">Gig title:</dt>
          <dd className="font-semibold">{gig.title}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-normal">Category:</dt>
          <dd className="font-semibold">{gig.category}</dd>
        </div>
        <div className="flex justify-between items-center">
          <dt className="font-normal">Status:</dt>
          <dd>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
              gig.isClosed 
                ? 'bg-red-200 text-red-700' 
                : 'bg-green-200 text-green-700'
            }`}>
              {gig.isClosed ? 'Closed' : 'Live'}
            </span>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-normal">Timeline:</dt>
          <dd className="font-normal">{gig.timeline}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-normal">Budget:</dt>
          <dd className={`font-normal ${gig.isClosed ? '' : 'line-through'}`}>
            {gig.originalPrice}
          </dd>
        </div>
      </dl>
      <div className="flex gap-3">
        <button 
          onClick={() => onEdit(gig.id)}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 transition" 
          type="button"
        >
          <EditIcon />
          Edit gig
        </button>
        <button 
          onClick={() => onToggleStatus(gig.id)}
          className="flex items-center gap-2 border border-red-400 rounded-full px-4 py-2 text-red-500 text-sm hover:bg-red-50 transition" 
          type="button"
        >
          <CloseIcon />
          {gig.isClosed ? 'Reopen gig' : 'Close gig'}
        </button>
      </div>
    </section>
  );
};

const GigCards = () => {
  const [gigs, setGigs] = useState([]);
  
  // Initialize gigs only once
  useEffect(() => {
    setGigs(initialGigs);
  }, []);
  
  const handleEdit = (id) => {
    // In a real app, this would open an edit form/modal
    alert(`Editing gig with ID: ${id}`);
  };
  
  const handleToggleStatus = (id) => {
    setGigs(prevGigs => 
      prevGigs.map(gig => 
        gig.id === id 
          ? { 
              ...gig, 
              isClosed: !gig.isClosed,
              status: gig.isClosed ? "Live" : "Closed"
            } 
          : gig
      )
    );
  };

  return (
    <div className="bg-white p-6">
      <main className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 justify-center">
        {gigs.slice(0, 3).map(gig => (
          <GigCard 
            key={gig.id} 
            gig={gig} 
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </main>
    </div>
  );
};

export default GigCards;