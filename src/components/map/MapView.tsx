
import React, { useState } from 'react';
import FilterBar from './FilterBar';
import LeafletMap from './LeafletMap';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

interface MapMarker {
  id: number;
  position: [number, number];
  type: 'friend' | 'famous' | 'completed' | 'planned' | 'saved';
  title: string;
  description: string;
  difficulty: 'common' | 'rare' | 'mythic' | 'legendary';
}

const MapView: React.FC = () => {
  const [activeView, setActiveView] = useState<'social' | 'personal'>('social');
  const [filters, setFilters] = useState({
    common: true,
    rare: false,
    mythic: false,
    legendary: false,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // Enhanced sample data for social map markers
  const socialMapMarkers: MapMarker[] = [
    {
      id: 1,
      position: [46.2276, 2.2137] as [number, number], // Sample position in France
      type: 'friend',
      title: 'Sarah\'s Hike',
      description: 'Beautiful trail with amazing views!',
      difficulty: 'common'
    },
    {
      id: 2,
      position: [46.4276, 2.5137] as [number, number],
      type: 'famous',
      title: 'Famous Peak',
      description: 'A popular destination among expert hikers',
      difficulty: 'legendary'
    },
    {
      id: 3,
      position: [46.1276, 1.9137] as [number, number],
      type: 'friend',
      title: 'John\'s Adventure',
      description: 'Weekend camping trip',
      difficulty: 'rare'
    },
    {
      id: 6,
      position: [46.2976, 2.3937] as [number, number],
      type: 'friend',
      title: 'Forest Trail',
      description: 'Beautiful forest with many trails',
      difficulty: 'common'
    },
    {
      id: 7,
      position: [46.1576, 2.1337] as [number, number],
      type: 'famous',
      title: 'Mountain Range',
      description: 'Challenging but rewarding summit',
      difficulty: 'mythic'
    },
    {
      id: 8,
      position: [46.3176, 2.4137] as [number, number],
      type: 'friend',
      title: 'Scenic Viewpoint',
      description: 'Amazing panoramic views',
      difficulty: 'legendary'
    }
  ];

  // Personal map markers
  const personalMapMarkers: MapMarker[] = [
    {
      id: 4,
      position: [46.2876, 2.1137] as [number, number],
      type: 'completed',
      title: 'My Favorite Trail',
      description: 'Completed on April 15, 2025',
      difficulty: 'common'
    },
    {
      id: 5,
      position: [46.3276, 2.3137] as [number, number],
      type: 'planned',
      title: 'Planned Trip',
      description: 'Scheduled for June 10, 2025',
      difficulty: 'rare'
    },
    {
      id: 9,
      position: [46.2376, 2.0137] as [number, number],
      type: 'saved',
      title: 'Dream Summit',
      description: 'To do someday',
      difficulty: 'mythic'
    },
    {
      id: 10,
      position: [46.1876, 1.7137] as [number, number],
      type: 'completed',
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

  const getMarkerColorClass = (difficulty: 'common' | 'rare' | 'mythic' | 'legendary') => {
    switch (difficulty) {
      case 'common': return 'bg-rarity-common text-gray-800';
      case 'rare': return 'bg-rarity-rare text-white';
      case 'mythic': return 'bg-rarity-epic text-white';
      case 'legendary': return 'bg-rarity-legendary text-white';
    }
  };

  const filteredMarkers = getFilteredMarkers();

  return (
    <div className="relative h-screen w-full flex flex-col">
      {/* Map container takes full height */}
      <div className="relative flex-grow w-full">
        <LeafletMap 
          center={activeView === 'social' ? [46.2276, 2.2137] : [46.2876, 2.1137]} 
          zoom={7}
          markers={filteredMarkers}
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
        <div 
          className="absolute bottom-20 left-0 right-0 mx-4 z-10"
        >
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-white shadow-lg w-full py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2"
          >
            <span className="inline-flex items-center justify-center bg-primary text-white rounded-full w-6 h-6 text-sm">
              {filteredMarkers.length}
            </span>
            <span>trails • Tap to view details</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer for destinations list - increased z-index to appear above nav */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-[85vh] z-50">
          <DrawerHeader>
            <DrawerTitle>Destinations ({filteredMarkers.length})</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[70vh] px-4 pb-16">
            <div className="grid gap-4 pb-20">
              {filteredMarkers.map(marker => (
                <Card key={marker.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{marker.title}</CardTitle>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getMarkerColorClass(marker.difficulty)}`}>
                        {marker.difficulty.charAt(0).toUpperCase() + marker.difficulty.slice(1)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{marker.description}</p>
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <span className="mr-2">
                        {marker.type.charAt(0).toUpperCase() + marker.type.slice(1)}
                      </span>
                      {activeView === 'personal' && marker.type === 'planned' && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Upcoming</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MapView;
