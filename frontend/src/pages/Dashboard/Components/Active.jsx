import React, { useState } from 'react';

// Icon components to replace Font Awesome
const MessageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Gig card data
const initialGigs = [
  {
    id: 1,
    title: "Bridal capsule collection",
    category: "Designer/Creator",
    collaborator: "Anita Kole",
    status: "In progress",
    timeline: "6 weeks",
    budget: "₦40,000.00",
    image: "https://storage.googleapis.com/a1aa/image/5084618f-3d2f-4ba0-043a-3ba3abd5085a.jpg",
    isCompleted: false
  },
  {
    id: 2,
    title: "Jacket production run",
    category: "Dressmaker",
    collaborator: "James Okoro",
    status: "Completed",
    timeline: "3 weeks",
    budget: "₦100,000.00",
    image: "https://storage.googleapis.com/a1aa/image/5084618f-3d2f-4ba0-043a-3ba3abd5085a.jpg",
    isCompleted: true
  },
  {
    id: 3,
    title: "In-store stylist",
    category: "Stylist",
    collaborator: "Lila Mensah",
    status: "In progress",
    timeline: "1 week",
    budget: "₦70,000.00",
    image: "https://storage.googleapis.com/a1aa/image/5084618f-3d2f-4ba0-043a-3ba3abd5085a.jpg",
    isCompleted: false
  }
];

const GigCard = ({ gig, onMessage, onMarkDone }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case "Completed":
        return "bg-green-200 text-green-600";
      case "In progress":
        return "bg-orange-200 text-orange-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md max-w-xs w-full flex flex-col min-w-[280px] font-['Product_Sans']">
      <img 
        alt={gig.title} 
        className="rounded-t-xl object-cover w-full h-44" 
        src={gig.image} 
      />
      <div className="p-4 flex flex-col gap-1 text-sm text-gray-900">
        <div className="flex justify-between">
          <span>Gig title:</span>
          <span className="font-semibold">{gig.title}</span>
        </div>
        <div className="flex justify-between">
          <span>Category:</span>
          <span className="font-semibold">{gig.category}</span>
        </div>
        <div className="flex justify-between">
          <span>Collaborator name:</span>
          <span className="font-semibold">{gig.collaborator}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Status:</span>
          <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${getStatusClass(gig.status)}`}>
            {gig.status}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Timeline:</span>
          <span>{gig.timeline}</span>
        </div>
        <div className="flex justify-between">
          <span>Budget:</span>
          <span>{gig.budget}</span>
        </div>
      </div>
      <div className="flex gap-3 p-4">
        <button 
          onClick={() => onMessage(gig.id)}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-gray-700 text-sm w-full justify-center hover:bg-gray-50 transition-colors"
          type="button"
        >
          <MessageIcon />
          Message
        </button>
        <button 
          onClick={() => onMarkDone(gig.id)}
          className="flex items-center gap-2 bg-green-900 text-white rounded-full px-6 py-2 text-sm w-full justify-center hover:bg-green-800 transition-colors"
          type="button"
          disabled={gig.isCompleted}
        >
          <CheckIcon />
          {gig.isCompleted ? "Completed" : "Mark done"}
        </button>
      </div>
    </div>
  );
};

const ActiveCards = () => {
  const [gigs, setGigs] = useState(initialGigs);
  
  const handleMessage = (id) => {
    // In a real app, this would open a message dialog
    alert(`Messaging collaborator for gig ID: ${id}`);
  };
  
  const handleMarkDone = (id) => {
    setGigs(prevGigs => 
      prevGigs.map(gig => 
        gig.id === id 
          ? { 
              ...gig, 
              isCompleted: true,
              status: "Completed"
            } 
          : gig
      )
    );
    alert(`Gig ${id} marked as completed!`);
  };

  return (
    <div className="bg-white p-6 font-['Product_Sans']">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 justify-center">
        {gigs.map(gig => (
          <GigCard 
            key={gig.id} 
            gig={gig} 
            onMessage={handleMessage}
            onMarkDone={handleMarkDone}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveCards;