import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import { Card } from 'antd'
import { cityData } from '../utils/utils';


const MapComponent = ({ onClickCity }) => {
  const mapRef = useRef(null);
  //const [selectedCity, setSelectedCity] = useState('');
  const mapContainerRef = useRef(null); // Reference to the map container DOM element

  const cities = {
    'New York': [40.7128, -74.0060],
    'Los Angeles': [34.0522, -118.2437],
    'Chicago': [41.8781, -87.6298],
    'Houston': [29.7604, -95.3698],
    'Phoenix': [33.4484, -112.074],
    'Miami': [25.7617, -80.1918],
    'Seattle': [47.6062, -122.3321],
    'Denver': [39.7392, -104.9903],
    'Atlanta': [33.749, -84.388],
    'Boston': [42.3601, -71.0589],
    'San Francisco': [37.7749, -122.4194],
    'Minneapolis': [44.9778, -93.265],
    'Dallas': [32.7767, -96.797],
    'Philadelphia': [39.9526, -75.1652],
    'Las Vegas': [36.1699, -115.1398],
    'Baltimore': [39.2904, -76.6122],
    'San Diego': [32.7157, -117.1611],
    'San Antonio': [29.4241, -98.4936],
    'Orlando': [28.5383, -81.3792],
    'Sacramento': [38.5816, -121.4944],
    'Salt Lake City': [40.7608, -111.891],
    'Tampa': [27.9506, -82.4572],
    'Portland': [45.5122, -122.6587],
    'Charlotte': [35.2271, -80.8431],
    'St. Louis': [38.627, -90.1994],
    'Nashville': [36.1627, -86.7816],
    'Detroit': [42.3314, -83.0458],
    'Columbus': [39.9612, -82.9988],
    'Indianapolis': [39.7684, -86.1581],
    'Milwaukee': [43.0389, -87.9065],
    'Albuquerque': [35.0844, -106.6504],
    'Austin': [30.2672, -97.7431],
    'Buffalo': [42.8864, -78.8784],
    'Charleston': [32.7765, -79.9311],
    'Cleveland': [41.4993, -81.6944],
    'Colorado Springs': [38.8339, -104.8214],
    'Yuma': [32.6927, -114.6277]
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return; // Do not initialize the map if it already exists or if the container is not yet available

    mapRef.current = L.map(mapContainerRef.current).setView([37.8, -96], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    Object.entries(cities).forEach(([city, [lat, lon]]) => {
      const marker = L.marker([lat, lon]).addTo(mapRef.current);
      marker.on('click', () => onClickCity({'city': city, T: cityData[city].T, G: cityData[city].G}));
    });

    // Cleanup function to remove map when component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '500px' }}></div>
    </div>
  );
};





export default React.memo(MapComponent);;