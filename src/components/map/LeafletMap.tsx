
import React from 'react';

interface MapMarker {
  id: number;
  position: [number, number];
  type: 'friend' | 'famous' | 'forest' | 'mountain' | 'viewpoint';
  title: string;
  description: string;
  price?: number; // Optional price for lodging or trail access
  difficulty?: string; // Optional difficulty rating
}

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, markers = [] }) => {
  // Generate static map URL with markers
  const generateMapUrl = () => {
    // Base URL for OpenStreetMap static map (via staticmap.org - a free service)
    let baseUrl = `https://staticmap.org/static?center=${center[0]},${center[1]}&zoom=${zoom}&size=600x400&type=osm`;
    
    // Add markers
    markers.forEach((marker, index) => {
      let markerType = 'blue';
      if (marker.type === 'famous') markerType = 'orange';
      if (marker.type === 'forest') markerType = 'green';
      if (marker.type === 'mountain') markerType = 'purple';
      if (marker.type === 'viewpoint') markerType = 'red';
      
      baseUrl += `&markers=${marker.position[0]},${marker.position[1]},${markerType},${index + 1}`;
    });
    
    return baseUrl;
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="relative flex-grow overflow-hidden rounded-lg">
        <img 
          src={generateMapUrl()} 
          alt="Map" 
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Price bubbles overlay - inspired by Airbnb-style map from uploaded images */}
        <div className="absolute inset-0 pointer-events-none">
          {markers.filter(marker => marker.price).map(marker => (
            <div 
              key={marker.id} 
              className="absolute bg-white rounded-full px-2 py-1 shadow-lg font-medium text-sm"
              style={{ 
                left: `${20 + Math.random() * 60}%`, 
                top: `${20 + Math.random() * 60}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {marker.price}€
            </div>
          ))}
        </div>
        
        {/* Trail info card - inspired by Komoot-style UI */}
        {markers.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-3">
              <h3 className="font-semibold text-sm">{markers[0].title}</h3>
              <p className="text-xs text-gray-600">{markers[0].description}</p>
              
              {markers[0].difficulty && (
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800`}>
                    {markers[0].difficulty}
                  </span>
                  <span className="text-xs text-gray-500">
                    {markers[0].position[0].toFixed(2)}, {markers[0].position[1].toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Map metadata - inspired by the counter at bottom of Komoot UI */}
      <div className="text-center text-sm font-medium mt-2">
        {markers.length} {markers.length === 1 ? 'location' : 'locations'}
      </div>
    </div>
  );
};

export default LeafletMap;
