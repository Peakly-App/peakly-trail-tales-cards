
import React, { useState } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FilterBarProps {
  onFilterChange: (filters: { common: boolean; rare: boolean; mythic: boolean; legendary: boolean }) => void;
  onToggleView: (view: 'social' | 'personal') => void;
  activeView: 'social' | 'personal';
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onToggleView, activeView }) => {
  const [filters, setFilters] = useState({
    common: true,
    rare: false,
    mythic: false,
    legendary: false,
  });
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterClick = (filter: 'common' | 'rare' | 'mythic' | 'legendary') => {
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
      
      {/* Map Toggle - Social / My Map */}
      <div className="flex justify-center mb-2">
        <ToggleGroup type="single" value={activeView} onValueChange={(value) => value && onToggleView(value as 'social' | 'personal')} className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-sm">
          <ToggleGroupItem value="social" className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-white">
            Social Map
          </ToggleGroupItem>
          <ToggleGroupItem value="personal" className="rounded-full px-4 data-[state=on]:bg-primary data-[state=on]:text-white">
            My Map
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* One-click filter options - difficulty ratings */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => handleFilterClick('common')}
          className={`filter-option ${filters.common ? 'bg-rarity-common text-gray-800' : 'bg-white/80 text-gray-800'} backdrop-blur-sm flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 shadow-sm`}
        >
          <span className="font-medium">Common</span>
        </button>
        
        <button
          onClick={() => handleFilterClick('rare')}
          className={`filter-option ${filters.rare ? 'bg-rarity-rare text-white' : 'bg-white/80 text-gray-800'} backdrop-blur-sm flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 shadow-sm`}
        >
          <span className="font-medium">Rare</span>
        </button>
        
        <button
          onClick={() => handleFilterClick('mythic')}
          className={`filter-option ${filters.mythic ? 'bg-rarity-epic text-white' : 'bg-white/80 text-gray-800'} backdrop-blur-sm flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 shadow-sm`}
        >
          <span className="font-medium">Mythic</span>
        </button>
        
        <button
          onClick={() => handleFilterClick('legendary')}
          className={`filter-option ${filters.legendary ? 'bg-rarity-legendary text-white' : 'bg-white/80 text-gray-800'} backdrop-blur-sm flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 shadow-sm`}
        >
          <span className="font-medium">Legendary</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
