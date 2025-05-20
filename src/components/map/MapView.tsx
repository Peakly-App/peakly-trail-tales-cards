
import React, { useState } from 'react';
import FilterBar from './FilterBar';
import LeafletMap from './LeafletMap';

const MapView: React.FC = () => {
  const [activeView, setActiveView] = useState<'social' | 'personal'>('social');
  const [filters, setFilters] = useState({
    common: true,
    rare: false,
    mythic: false,
    legendary: false,
  });
  
  // Enhanced sample data for social map markers
  const socialMapMarkers = [
    {
      id: 1,
      position: [46.2276, 2.2137] as [number, number], // Sample position in France
      type: 'friend' as const,
      title: 'Sarah\'s Hike',
      description: 'Beautiful trail with amazing views!',
      difficulty: 'common'
    },
    {
      id: 2,
      position: [46.4276, 2.5137] as [number, number],
      type: 'famous' as const,
      title: 'Famous Peak',
      description: 'A popular destination among expert hikers',
      difficulty: 'legendary'
    },
    {
      id: 3,
      position: [46.1276, 1.9137] as [number, number],
      type: 'friend' as const,
      title: 'John\'s Adventure',
      description: 'Weekend camping trip',
      difficulty: 'rare'
    },
    {
      id: 6,
      position: [46.2976, 2.3937] as [number, number],
      type: 'friend' as const,
      title: 'Forest Trail',
      description: 'Beautiful forest with many trails',
      difficulty: 'common'
    },
    {
      id: 7,
      position: [46.1576, 2.1337] as [number, number],
      type: 'famous' as const,
      title: 'Mountain Range',
      description: 'Challenging but rewarding summit',
      difficulty: 'mythic'
    },
    {
      id: 8,
      position: [46.3176, 2.4137] as [number, number],
      type: 'friend' as const,
      title: 'Scenic Viewpoint',
      description: 'Amazing panoramic views',
      difficulty: 'legendary'
    }
  ];

  // Personal map markers
  const personalMapMarkers = [
    {
      id: 4,
      position: [46.2876, 2.1137] as [number, number],
      type: 'completed' as const,
      title: 'My Favorite Trail',
      description: 'Completed on April 15, 2025',
      difficulty: 'common'
    },
    {
      id: 5,
      position: [46.3276, 2.3137] as [number, number],
      type: 'planned' as const,
      title: 'Planned Trip',
      description: 'Scheduled for June 10, 2025',
      difficulty: 'rare'
    },
    {
      id: 9,
      position: [46.2376, 2.0137] as [number, number],
      type: 'saved' as const,
      title: 'Dream Summit',
      description: 'To do someday',
      difficulty: 'mythic'
    },
    {
      id: 10,
      position: [46.1876, 1.7137] as [number, number],
      type: 'completed' as const,
      title: 'Epic Challenge',
      description: 'Conquered last summer',
      difficulty: 'legendary'
    }
  ];

  // Filter markers based on selected filters and active view
  const getFilteredMarkers = () => {
    const allMarkers = activeView === 'social' ? socialMapMarkers : personalMapMarkers;
    
    if (!filters.common && !filters.rare && !filters.mythic && !filters.legendary) {
      return allMarkers;
    }
    
    return allMarkers.filter(marker => 
      (filters.common && marker.difficulty === 'common') ||
      (filters.rare && marker.difficulty === 'rare') ||
      (filters.mythic && marker.difficulty === 'mythic') ||
      (filters.legendary && marker.difficulty === 'legendary')
    );
  };

  const handleToggleView = (view: 'social' | 'personal') => {
    setActiveView(view);
  };

  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Map container takes full height */}
      <div className="relative flex-grow w-full">
        <LeafletMap 
          center={activeView === 'social' ? [46.2276, 2.2137] : [46.2876, 2.1137]} 
          zoom={7}
          markers={getFilteredMarkers()}
          mapMode={activeView}
        />
        
        {/* Overlay elements positioned absolutely over the map */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <FilterBar 
            onFilterChange={setFilters} 
            onToggleView={handleToggleView}
            activeView={activeView}
          />
        </div>
        
        {/* Total count display - at bottom */}
        <div className="absolute bottom-16 left-0 right-0 bg-white/50 backdrop-blur-sm py-3 text-center font-semibold text-gray-700">
          {getFilteredMarkers().length} itinéraires
        </div>
      </div>
    </div>
  );
};

export default MapView;
