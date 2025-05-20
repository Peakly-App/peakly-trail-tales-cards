
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
  
  // Sample data for map markers
  const socialMapMarkers = [
    {
      id: 1,
      position: [46.2276, 2.2137] as [number, number], // Sample position in France
      type: 'friend' as const,
      title: 'Sarah\'s Hike',
      description: 'Beautiful trail with amazing views!'
    },
    {
      id: 2,
      position: [46.4276, 2.5137] as [number, number],
      type: 'famous' as const,
      title: 'Famous Peak',
      description: 'A popular destination among expert hikers'
    },
    {
      id: 3,
      position: [46.1276, 1.9137] as [number, number],
      type: 'friend' as const,
      title: 'John\'s Adventure',
      description: 'Weekend camping trip'
    }
  ];

  // Filter markers based on selected filters
  const filteredMarkers = socialMapMarkers.filter(marker => {
    // This is just a placeholder. In a real app, markers would have properties
    // matching the filter criteria (forest, mountain, viewpoint)
    return true;
  });

  console.log('Map view active:', activeView);
  console.log('Filters:', filters);

  const renderPersonalDashboard = () => {
    return (
      <div className="space-y-4 mt-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Upcoming Trips</h2>
          <div className="trip-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Mount Rainier</h3>
                <p className="text-xs text-gray-500">May 28 - May 30, 2025</p>
              </div>
              <div className="terrain-badge terrain-t3">T3</div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Saved Routes</h2>
          <div className="trip-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Cascade Pass</h3>
                <p className="text-xs text-gray-500">7.4 miles • 1,800 ft elevation</p>
              </div>
              <div className="terrain-badge terrain-t2">T2</div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-2">Summit Cards Progress</h2>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Common</span>
              <span className="text-sm">12/20</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-rarity-common h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2 mt-4">
              <span className="font-medium">Rare</span>
              <span className="text-sm">3/15</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-rarity-rare h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            
            <div className="flex justify-between items-center mb-2 mt-4">
              <span className="font-medium">Epic</span>
              <span className="text-sm">1/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-rarity-epic h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>
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
      
      {activeView === 'social' ? (
        <div className="relative rounded-xl overflow-hidden bg-gray-100 map-container">
          <LeafletMap 
            center={[46.2276, 2.2137]} // Default center (France)
            zoom={6}
            markers={filteredMarkers}
          />
        </div>
      ) : (
        renderPersonalDashboard()
      )}
    </div>
  );
};

export default MapView;
