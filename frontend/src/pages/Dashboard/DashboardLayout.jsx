// components/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';
import DashboardSide from './DashboardSide'; // Your sidebar component
import DashHeader from './DashHeader'; // Your header component

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
       <DashboardSide 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        useRouter={true} // Enable React Router navigation
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <DashHeader />
        
        {/* Page Content - This is where your dashboard pages will render */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet /> {/* This renders the current dashboard page */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;