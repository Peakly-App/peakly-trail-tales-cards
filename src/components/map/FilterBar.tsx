
import React, { useState } from 'react';
import { Search, Navigation, Map } from 'lucide-react';
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
  const [distanceValue, setDistanceValue] = useState(10);

  const handleFilterClick = (filter: 'forest' | 'mountain' | 'viewpoint') => {
    const newFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Search bar with filter icon - inspired by uploaded images */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Rechercher des lieux"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Map size={18} />
        </button>
      </div>
      
      {/* View toggle - Social Map / My Map */}
      <div className="flex justify-between">
        <ToggleGroup type="single" value={activeView} onValueChange={(value) => value && onToggleView(value as 'social' | 'personal')}>
          <ToggleGroupItem value="social" className="px-4 py-2 rounded-md">
            Social Map
          </ToggleGroupItem>
          <ToggleGroupItem value="personal" className="px-4 py-2 rounded-md">
            My Map
          </ToggleGroupItem>
        </ToggleGroup>
        
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1">
          <Navigation size={16} />
          <span>Near Me</span>
        </button>
      </div>
      
      {/* One-click filter options - inspired by uploaded images */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => handleFilterClick('forest')}
          className={`filter-option ${filters.forest ? 'bg-green-100 border-green-500' : 'bg-white border-gray-200'} flex items-center gap-2 px-4 py-2 rounded-full border`}
        >
          <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🌲</span>
          </span>
          <span>Forest</span>
        </button>
        
        <button
          onClick={() => handleFilterClick('mountain')}
          className={`filter-option ${filters.mountain ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200'} flex items-center gap-2 px-4 py-2 rounded-full border`}
        >
          <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">⛰️</span>
          </span>
          <span>Mountain</span>
        </button>
        
        <button
          onClick={() => handleFilterClick('viewpoint')}
          className={`filter-option ${filters.viewpoint ? 'bg-orange-100 border-orange-500' : 'bg-white border-gray-200'} flex items-center gap-2 px-4 py-2 rounded-full border`}
        >
          <span className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🔭</span>
          </span>
          <span>Viewpoint</span>
        </button>
      </div>
      
      {/* Distance slider - inspired by uploaded images */}
      <div className="bg-white p-2 rounded-lg shadow-sm">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
          <span>0 km</span>
          <span>{distanceValue} km</span>
          <span>20 km</span>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          value={distanceValue}
          onChange={(e) => setDistanceValue(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FilterBar;
