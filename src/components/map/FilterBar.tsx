
import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleFilterClick = (filter: 'forest' | 'mountain' | 'viewpoint') => {
    const newFilters = { ...filters, [filter]: !filters[filter] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Search summits or regions..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="map-toggle">
          <button
            onClick={() => onToggleView('social')}
            className={`map-toggle-option ${activeView === 'social' ? 'active' : ''}`}
          >
            Social Map
          </button>
          <button
            onClick={() => onToggleView('personal')}
            className={`map-toggle-option ${activeView === 'personal' ? 'active' : ''}`}
          >
            My Map
          </button>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Filter size={16} />
            <span>Filters</span>
          </Button>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleFilterClick('forest')}
          className={`filter-pill ${filters.forest ? 'active' : ''}`}
        >
          Forest
        </button>
        <button
          onClick={() => handleFilterClick('mountain')}
          className={`filter-pill ${filters.mountain ? 'active' : ''}`}
        >
          Mountain
        </button>
        <button
          onClick={() => handleFilterClick('viewpoint')}
          className={`filter-pill ${filters.viewpoint ? 'active' : ''}`}
        >
          Viewpoint
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
