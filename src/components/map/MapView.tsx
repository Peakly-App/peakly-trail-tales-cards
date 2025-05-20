
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
      price: 71
    },
    {
      id: 2,
      position: [46.4276, 2.5137] as [number, number],
      type: 'famous' as const,
      title: 'Famous Peak',
      description: 'A popular destination among expert hikers',
      price: 100
    },
    {
      id: 3,
      position: [46.1276, 1.9137] as [number, number],
      type: 'friend' as const,
      title: 'John\'s Adventure',
      description: 'Weekend camping trip',
      price: 59
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Discover Peaks</h1>
      
      <FilterBar 
        onFilterChange={setFilters} 
        onToggleView={setActiveView}
        activeView={activeView}
      />
      
      <div className="relative rounded-xl overflow-hidden bg-gray-100" style={{ height: '500px' }}>
        <LeafletMap 
          center={activeView === 'social' ? [46.2276, 2.2137] : [46.2876, 2.1137]} 
          zoom={7}
          markers={getFilteredMarkers()}
        />
        
        {/* Total count display - inspired by uploaded images */}
        <div className="absolute bottom-0 left-0 right-0 bg-white py-3 text-center font-semibold text-gray-700 border-t">
          {getFilteredMarkers().length} {activeView === 'social' ? 'itineraries' : 'adventures'}
        </div>
      </div>
    </div>
  );
};

export default MapView;
