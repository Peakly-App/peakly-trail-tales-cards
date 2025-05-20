
import React, { useState } from 'react';
import { Search, Navigation, MapPin } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FilterBarProps {
  onFilterChange: (filters: { forest: boolean; mountain: boolean; viewpoint: boolean }) => void;
  onToggleView: (view: 'social' | 'personal') => void;
  activeView: 'social' | 'personal';
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onToggleView, activeView }) => {
  const [filters, setFilters] = useState({
    forest: false,
    mountain: true,
    viewpoint: false,
  });
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterClick = (filter: 'forest' | 'mountain' | 'viewpoint') => {
    const newFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Semi-transparent search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" size={20} />
        <input
          type="text"
          placeholder="Rechercher parcs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-12 py-3 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-md text-gray-800"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* One-click filter options - match the uploaded image style */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          className="filter-option bg-white/80 backdrop-blur-sm flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 shadow-sm"
        >
          <span className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
            <MapPin size={16} className="text-white" />
          </span>
          <span className="font-medium">À proximité</span>
        </button>
        
        <button
          onClick={() => handleFilterClick('forest')}
          className={`filter-option ${filters.forest ? 'bg-green-700/90 text-white' : 'bg-white/80 text-gray-800'} backdrop-blur-sm flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 shadow-sm`}
        >
          <span className="font-medium">En forêt</span>
        </button>
        
        <button
          className="filter-option bg-white/80 backdrop-blur-sm flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 shadow-sm"
        >
          <span className="font-medium">Chiens bienvenus</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
