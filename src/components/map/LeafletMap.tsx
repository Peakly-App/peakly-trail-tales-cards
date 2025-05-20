
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issues
// This needs to be outside the component to only run once
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Apply the default icon to all markers
L.Marker.prototype.options.icon = DefaultIcon;

interface MapMarker {
  id: number;
  position: [number, number];
  type: 'friend' | 'famous';
  title: string;
  description: string;
}

// Custom component to automatically set the map view
const SetMapView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, markers = [] }) => {
  // Define custom icons for different marker types
  const friendIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'friend-marker'
  });

  const famousIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'famous-marker'
  });

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ width: '100%', height: '100%' }}
      className="rounded-lg"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetMapView center={center} zoom={zoom} />
      
      {markers.map(marker => (
        <Marker 
          key={marker.id} 
          position={marker.position} 
          icon={marker.type === 'friend' ? friendIcon : famousIcon}
        >
          <Popup>
            <div>
              <h3 className="text-base font-medium">{marker.title}</h3>
              <p className="text-sm text-gray-600">{marker.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
