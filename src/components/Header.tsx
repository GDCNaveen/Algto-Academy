
import React, { useState } from 'react';
import { GraduationCap, Search } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'physics', label: 'Physics' },
    { id: 'science', label: 'Science' },
    { id: 'social', label: 'Social' },
    { id: 'computer-science', label: 'Computer Science' }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      {/* Main Header */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Academy Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">Algot Academy</h1>
          </div>

          {/* Right: Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos..."
              className="bg-white/20 text-white placeholder-white/70 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 w-64 md:w-80"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-white/20">
        <div className="px-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
