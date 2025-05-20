
import React, { useEffect, useState, useRef } from 'react';
import FilterBar from './FilterBar';

const MapView: React.FC = () => {
  const [activeView, setActiveView] = useState<'social' | 'personal'>('social');
  const [filters, setFilters] = useState({
    forest: false,
    mountain: true,
    viewpoint: false,
  });
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  
  // For demo purposes, we'll just show a placeholder map image
  // In a real app, this would be replaced with Leaflet integration
  
  useEffect(() => {
    console.log('Map view active:', activeView);
    console.log('Filters:', filters);
    // Here you would initialize the Leaflet map and update based on filters
  }, [activeView, filters]);

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
        <div className="relative rounded-xl overflow-hidden bg-gray-100 map-container" ref={mapContainerRef}>
          {/* This would be the Leaflet map in a real app */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1000')" }}></div>
          
          {/* Sample pins for illustration */}
          <div className="absolute top-1/4 left-1/3 leaflet-pin friend">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          
          <div className="absolute top-1/2 right-1/4 leaflet-pin famous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
        </div>
      ) : (
        renderPersonalDashboard()
      )}
    </div>
  );
};

export default MapView;
