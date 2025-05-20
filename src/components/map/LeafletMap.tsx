
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star } from 'lucide-react';

interface MapMarker {
  id: number;
  position: [number, number];
  type: 'friend' | 'famous' | 'completed' | 'planned' | 'saved';
  title: string;
  description: string;
  difficulty: 'common' | 'rare' | 'mythic' | 'legendary';
}

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  markers?: MapMarker[];
  mapMode: 'social' | 'personal';
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, markers = [], mapMode }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false, // We'll add it in a better position
      });
      
      // Add zoom control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapRef.current);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);
    } else {
      // Update center and zoom if map already exists
      mapRef.current.setView(center, zoom);
    }

    // Create marker icons based on map mode
    const createMarkerIcon = (marker: MapMarker) => {
      let bgColor = '#000';
      let html = '';

      // Different marker styles for social vs personal map
      if (mapMode === 'social') {
        if (marker.type === 'famous') {
          // Yellow star for famous hikers
          return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #FFC107; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                   </div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });
        } else {
          // Circle with avatar for friends
          return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: #4285F4; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #FFFFFF; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4285F4" stroke-width="2">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                   </div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });
        }
      } else {
        // Personal map - different colors based on difficulty
        switch (marker.difficulty) {
          case 'common':
            bgColor = '#B0BEC5'; // Gray
            break;
          case 'rare':
            bgColor = '#64B5F6'; // Blue
            break;
          case 'mythic':
            bgColor = '#BA68C8'; // Purple
            break;
          case 'legendary':
            bgColor = '#FFB74D'; // Orange
            break;
        }

        // Create icon with difficulty color
        return L.divIcon({
          className: `custom-marker ${marker.difficulty}`,
          html: `<div style="background-color: ${bgColor}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white;">
                  <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #FFFFFF; display: flex; align-items: center; justify-content: center; overflow: hidden;"></div>
                 </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });
      }
    };

    // Clear existing markers
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add new markers
    markers.forEach(marker => {
      const icon = createMarkerIcon(marker);
      
      const mapMarker = L.marker(marker.position, { icon })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${marker.title}</h3>
            <p>${marker.description}</p>
            <p class="mt-1 text-sm"><strong>Difficulté:</strong> ${marker.difficulty.charAt(0).toUpperCase() + marker.difficulty.slice(1)}</p>
          </div>
        `);
    });

    // Clean up on unmount
    return () => {
      // We don't remove the map on unmount, as it will be reused
    };
  }, [center, markers, zoom, mapMode]);

  return (
    <div className="h-full w-full">
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} className="z-0" />
    </div>
  );
};

export default LeafletMap;
