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

  // Personal map markers
  const personalMapMarkers = [
    {
      id: 4,
      position: [46.2876, 2.1137] as [number, number],
      type: 'friend' as const,
      title: 'My Favorite Trail',
      description: 'Completed on April 15, 2025'
    },
    {
      id: 5,
      position: [46.3276, 2.3137] as [number, number],
      type: 'famous' as const,
      title: 'Planned Trip',
      description: 'Scheduled for June 10, 2025'
    }
  ];

  // Filter markers based on selected filters
  const filteredMarkers = activeView === 'social' 
    ? socialMapMarkers
    : personalMapMarkers;

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
          zoom={6}
          markers={filteredMarkers}
        />
        
        {activeView === 'personal' && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-h-60 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-2">My Adventures</h2>
            
            <div className="space-y-2">
              <div className="bg-white rounded p-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mount Rainier</h3>
                    <p className="text-xs text-gray-500">May 28 - May 30, 2025</p>
                  </div>
                  <div className="terrain-badge terrain-t3">T3</div>
                </div>
              </div>
              
              <div className="bg-white rounded p-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cascade Pass</h3>
                    <p className="text-xs text-gray-500">7.4 miles • 1,800 ft elevation</p>
                  </div>
                  <div className="terrain-badge terrain-t2">T2</div>
                </div>
              </div>
            </div>
            
            <h2 className="text-lg font-semibold mt-4 mb-2">Summit Cards Progress</h2>
            <div className="bg-white rounded p-2 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Common</span>
                <span className="text-xs">12/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-1 mt-2">
                <span className="text-sm font-medium">Rare</span>
                <span className="text-xs">3/15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
