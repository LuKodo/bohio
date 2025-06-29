// components/MapComponent.tsx
"use client";

import React from 'react';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';


interface MapProps {
    position: LatLngExpression;
    zoom?: number;
}

const MapComponent: React.FC<MapProps> = ({ position, zoom = 15 }) => {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const leafletMap = React.useRef<L.Map | null>(null);

    React.useEffect(() => {
        if (typeof window === 'undefined') return;

        if (!mapRef.current) return;

        if (!leafletMap.current) {
            leafletMap.current = L.map(mapRef.current).setView(position, zoom).setMaxZoom(zoom).setMinZoom(zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
            }).addTo(leafletMap.current);

            var markerIcon = L.icon({
                iconUrl: '/marker.png',
                shadowUrl: '/shadow.png',
                iconSize: [50, 50],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [0, 0],
            });
            L.marker(position, { icon: markerIcon }).addTo(leafletMap.current);
        }

        return () => {
            if (leafletMap.current) {
                leafletMap.current.remove();
                leafletMap.current = null;
            }
        };
    }, []);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} className='rounded-lg overflow-hidden shadow-lg' />;
};

export default MapComponent;