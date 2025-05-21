import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface MapSearchProps {
  onPlaceSelect: (place: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  }) => void;
}

const MapSearch: React.FC<MapSearchProps> = ({ onPlaceSelect }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds(
      { lat: 35.6812, lng: 139.7671 } // 東京駅の座標
    );
    map.fitBounds(bounds);
    setMap(map);

    // 検索ボックスの作成
    const input = document.getElementById('pac-input') as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    searchBoxRef.current = searchBox;

    // 検索結果のマーカーを表示
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places || places.length === 0) return;

      // 古いマーカーをクリア
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name
        });

        markersRef.current.push(marker);
        bounds.extend(place.geometry.location);

        // マーカーをクリックした時の処理
        marker.addListener('click', () => {
          setSelectedPlace(place);
          if (place.geometry?.location) {
            onPlaceSelect({
              name: place.name || '',
              address: place.formatted_address || '',
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            });
          }
        });
      });

      map.fitBounds(bounds);
    });
  }, [onPlaceSelect]);

  const onUnmount = useCallback(() => {
    setMap(null);
    searchBoxRef.current = null;
    markersRef.current = [];
  }, []);

  return isLoaded ? (
    <div className="space-y-4">
      <input
        id="pac-input"
        type="text"
        placeholder="カフェを検索..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 35.6812, lng: 139.7671 }}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {selectedPlace && selectedPlace.geometry?.location && (
          <InfoWindow
            position={{
              lat: selectedPlace.geometry.location.lat(),
              lng: selectedPlace.geometry.location.lng()
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h3 className="font-bold">{selectedPlace.name}</h3>
              <p>{selectedPlace.formatted_address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MapSearch; 