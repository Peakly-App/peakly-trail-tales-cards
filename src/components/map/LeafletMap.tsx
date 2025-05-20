
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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

    // Create marker icons
    const createMarkerIcon = (type: MapMarker['type'], count?: number) => {
      let bgColor = '#000';
      let iconUrl = '';

      switch (type) {
        case 'forest':
          bgColor = '#2D6A4F';
          iconUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cmVlIj48cGF0aCBkPSJtMTIgMi41MjdjMS4xOCAwIDIuNDMuOTc0IDIuNDMgMi40MjcgMCAxLjY4NS0uOTUzIDMuMzI4LTEuNDMgNC45NzgtLjQ3NyAxLjY0OC45MDYgMi42MyAxLjQzIDIuNjMgMS4wMTMgMCAxLjU3LS41NDIgMi00LS42ODQgMi4yOTItMS44OTcgNC40MTYtMS44OTcgNC40MTZoLTUuMDY2cy0xLjIxMy0yLjEyNC0xLjg5Ny00LjQxNmMuNDMgMy40NTggMS45IDQgMS45IDQgLjUyMyAwIDEuOTA2LS45ODIgMS40My0yLjYzLS40NzctMS42NS0xLjQzLTMuMjkzLTEuNDMtNC45NzggMC0xLjQ1MyAxLjI1LTIuNDI3IDIuNDMtMi40MjdaIi8+PHBhdGggZD0iTTEyIDIydi00Ii8+PC9zdmc+';
          break;
        case 'mountain':
          bgColor = '#8E9196';
          iconUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1tb3VudGFpbiI+PHBhdGggZD0ibTguOTQgMTItMi44My0yLjgzYTEuNSAxLjUgMCAwIDEgMC0yLjEybC4wMS0uMDFhMS41IDEuNSAwIDAgMSAyLjEyLjAxbDIuNyAyLjcgMi41OS0yLjU4YTEuNSAxLjUgMCAwIDEgMi4xMiAwbDMuMTIgMy4xMiAxLjggMS44YTEgMSAwIDAgMSAwIDEuNDFsLTQuNCA0LjRhMS41IDEuNSAwIDAgMS0yLjEyIDBMMTIuMDUgMTVsLTMuMTEgMy4xMWExLjUgMS41IDAgMCAxLTIuMTMtMi4xMkw4Ljk0IDEyWiIvPjxjaXJjbGUgY3g9IjE4IiBjeT0iNiIgcj0iMiIvPjwvc3ZnPg==';
          break;
        case 'viewpoint':
          bgColor = '#FF7F50';
          iconUrl = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1leWUiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiLz48cGF0aCBkPSJNMiAxMnMzLTcgMTAtNyAxMCA3IDEwIDctMyA3LTEwIDctMTAtNy0xMC03WiIvPjwvc3ZnPg==';
          break;
        case 'friend':
        case 'famous':
        default:
          bgColor = count ? '#000' : '#4285F4';
          break;
      }

      return L.divIcon({
        className: `custom-marker ${type}`,
        html: count 
          ? `<div style="background-color: ${bgColor}; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${count}</div>`
          : `<div style="background-color: ${bgColor}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
             <img src="${iconUrl}" alt="${type}" style="width: 18px; height: 18px; filter: brightness(0) invert(1);">
             </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
    };

    // Clear existing markers
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer);
      }
    });

    // Add new markers
    markers.forEach(marker => {
      const icon = createMarkerIcon(marker.type, marker.type === 'friend' || marker.type === 'famous' ? Number(marker.id) % 100 : undefined);
      
      const mapMarker = L.marker(marker.position, { icon })
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${marker.title}</h3>
            <p>${marker.description}</p>
            ${marker.difficulty ? `<p class="mt-1 text-sm"><strong>Difficulté:</strong> ${marker.difficulty}</p>` : ''}
          </div>
        `);
    });

    // Clean up on unmount
    return () => {
      // We don't remove the map on unmount, as it will be reused
    };
  }, [center, markers, zoom]);

  return (
    <div className="h-full w-full">
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} className="z-0" />
    </div>
  );
};

export default LeafletMap;
