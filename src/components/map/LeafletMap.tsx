
import React from 'react';

interface MapMarker {
  id: number;
  position: [number, number];
  type: 'friend' | 'famous';
  title: string;
  description: string;
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
      const markerType = marker.type === 'friend' ? 'blue' : 'orange';
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
        
        {/* Overlay with marker information */}
        <div className="absolute bottom-4 left-4 right-4 max-h-48 overflow-y-auto bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <h3 className="text-sm font-medium mb-2">Map Locations</h3>
          <div className="space-y-2">
            {markers.map(marker => (
              <div key={marker.id} className="bg-white rounded p-2 shadow-sm">
                <h4 className="text-sm font-medium">{marker.title}</h4>
                <p className="text-xs text-gray-600">{marker.description}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {marker.position[0].toFixed(2)}, {marker.position[1].toFixed(2)}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    marker.type === 'friend' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {marker.type === 'friend' ? 'Friend' : 'Famous'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;
