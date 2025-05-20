
import React, { useState } from 'react';
import FilterBar from './FilterBar';
import LeafletMap from './LeafletMap';

const MapView: React.FC = () => {
  const [activeView, setActiveView] = useState<'social' | 'personal'>('social');
  const [filters, setFilters] = useState({
    forest: false,
    mountain: true,
    viewpoint: false,
  });
  
  // Enhanced sample data for map markers
  const socialMapMarkers = [
    {
      id: 1,
      position: [46.2276, 2.2137] as [number, number], // Sample position in France
      type: 'friend' as const,
      title: 'Sarah\'s Hike',
      description: 'Beautiful trail with amazing views!',
    },
    {
      id: 2,
      position: [46.4276, 2.5137] as [number, number],
      type: 'famous' as const,
      title: 'Famous Peak',
      description: 'A popular destination among expert hikers',
    },
    {
      id: 3,
      position: [46.1276, 1.9137] as [number, number],
      type: 'friend' as const,
      title: 'John\'s Adventure',
      description: 'Weekend camping trip',
    },
    {
      id: 6,
      position: [46.2976, 2.3937] as [number, number],
      type: 'forest' as const,
      title: 'National Forest',
      description: 'Beautiful forest with many trails',
      difficulty: 'Easy'
    },
    {
      id: 7,
      position: [46.1576, 2.1337] as [number, number],
      type: 'mountain' as const,
      title: 'Mountain Range',
      description: 'Challenging but rewarding summit',
      difficulty: 'Hard'
    },
    {
      id: 8,
      position: [46.3176, 2.4137] as [number, number],
      type: 'viewpoint' as const,
      title: 'Scenic Viewpoint',
      description: 'Amazing panoramic views',
      difficulty: 'Easy'
    }
  ];

  // Personal map markers
  const personalMapMarkers = [
    {
      id: 4,
      position: [46.2876, 2.1137] as [number, number],
      type: 'friend' as const,
      title: 'My Favorite Trail',
      description: 'Completed on April 15, 2025',
      difficulty: 'Moderate'
    },
    {
      id: 5,
      position: [46.3276, 2.3137] as [number, number],
      type: 'famous' as const,
      title: 'Planned Trip',
      description: 'Scheduled for June 10, 2025',
      difficulty: 'Easy'
    }
  ];

  // Filter markers based on selected filters
  const getFilteredMarkers = () => {
    const allMarkers = activeView === 'social' ? socialMapMarkers : personalMapMarkers;
    
    if (!filters.forest && !filters.mountain && !filters.viewpoint) {
      return allMarkers;
    }
    
    return allMarkers.filter(marker => 
      (filters.forest && marker.type === 'forest') ||
      (filters.mountain && marker.type === 'mountain') ||
      (filters.viewpoint && marker.type === 'viewpoint') ||
      marker.type === 'friend' || marker.type === 'famous'
    );
  };

  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Map container takes full height */}
      <div className="relative flex-grow w-full">
        <LeafletMap 
          center={activeView === 'social' ? [46.2276, 2.2137] : [46.2876, 2.1137]} 
          zoom={7}
          markers={getFilteredMarkers()}
        />
        
        {/* Overlay elements positioned absolutely over the map */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <FilterBar 
            onFilterChange={setFilters} 
            onToggleView={setActiveView}
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
