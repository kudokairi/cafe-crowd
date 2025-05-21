'use client';

import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LocationSelector from './components/LocationSelector';
import CafeSearch from './components/CafeSearch';
import CafeList from './components/CafeList';
import CafeDetail from './components/CafeDetail';
import { PlusIcon } from '@heroicons/react/24/outline';
import MapSearch from './components/MapSearch';

interface Cafe {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  crowdLevel: number;
}

interface Location {
  id: string;
  name: string;
}

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCafe, setIsAddingCafe] = useState(false);
  const [newCafe, setNewCafe] = useState<Partial<Cafe>>({
    name: '',
    address: '',
    imageUrl: '',
    crowdLevel: 3,
  });

  // サンプルデータ（実際のAPIに置き換える）
  const locations: Location[] = [
    { id: '1', name: '渋谷区' },
    { id: '2', name: '新宿区' },
    { id: '3', name: '港区' },
    { id: '4', name: '千代田区' },
    { id: '5', name: '中央区' },
  ];

  const sampleCafes: Cafe[] = [
    {
      id: '1',
      name: 'サンプルカフェ1',
      address: '東京都渋谷区道玄坂1-1-1',
      imageUrl: 'https://example.com/cafe1.jpg',
      crowdLevel: 1,
    },
    {
      id: '2',
      name: 'サンプルカフェ2',
      address: '東京都新宿区西新宿1-1-1',
      imageUrl: 'https://example.com/cafe2.jpg',
      crowdLevel: 2,
    },
  ];

  useEffect(() => {
    // 実際のAPIからデータを取得する処理をここに実装
    setCafes(sampleCafes);
  }, [selectedLocation]);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSelectedCafe(null);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // 検索処理
    const filteredCafes = sampleCafes.filter((cafe) =>
      cafe.name.toLowerCase().includes(query.toLowerCase())
    );
    setCafes(filteredCafes);
  };

  const handleCafeSelect = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setIsAddingCafe(false);
  };

  const handleCrowdLevelUpdate = (cafeId: string, newLevel: number) => {
    setCafes((prevCafes) =>
      prevCafes.map((cafe) =>
        cafe.id === cafeId ? { ...cafe, crowdLevel: newLevel } : cafe
      )
    );
    setSelectedCafe((prev) =>
      prev && prev.id === cafeId
        ? { ...prev, crowdLevel: newLevel }
        : prev
    );
  };

  const handleAddCafe = () => {
    setIsAddingCafe(true);
    setSelectedCafe(null);
  };

  const handleNewCafeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCafe((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceSelect = (place: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  }) => {
    console.log('Place selected:', place);
    try {
      const newCafe: Cafe = {
        id: Date.now().toString(),
        name: place.name,
        address: place.address,
        imageUrl: place.lat && place.lng 
          ? `https://maps.googleapis.com/maps/api/streetview?size=400x300&location=${place.lat},${place.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
          : 'https://via.placeholder.com/400x300?text=No+Image',
        crowdLevel: 3,
      };

      setCafes((prev) => [...prev, newCafe]);
      setNewCafe({
        name: '',
        address: '',
        imageUrl: '',
        crowdLevel: 3,
      });
      setIsAddingCafe(false);
    } catch (error) {
      console.error('Error creating cafe:', error);
      // エラーが発生した場合はデフォルト画像を使用
      const newCafe: Cafe = {
        id: Date.now().toString(),
        name: place.name,
        address: place.address,
        imageUrl: 'https://via.placeholder.com/400x300?text=No+Image',
        crowdLevel: 3,
      };
      setCafes((prev) => [...prev, newCafe]);
      setNewCafe({
        name: '',
        address: '',
        imageUrl: '',
        crowdLevel: 3,
      });
      setIsAddingCafe(false);
    }
  };

  return (
    <main className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Cafe Crowd Checker
        </h1>
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Select Location</h2>
            <LocationSelector
              locations={locations}
              onLocationSelect={handleLocationSelect}
            />
          </div>

          {selectedLocation && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">Search Cafes</h2>
                  <button
                    onClick={handleAddCafe}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1 min-w-0"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Cafe</span>
                  </button>
                </div>
                <CafeSearch onSearch={handleSearch} />
              </div>

              {isAddingCafe ? (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-900">Add Cafe</h2>
                  <MapSearch onPlaceSelect={handlePlaceSelect} />
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Cafe List</h2>
                    <CafeList cafes={cafes} onCafeSelect={handleCafeSelect} />
                  </div>

                  {selectedCafe && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-xl font-semibold mb-4 text-gray-900">Cafe Detail</h2>
                      <CafeDetail
                        cafe={selectedCafe}
                        onUpdateCrowdLevel={handleCrowdLevelUpdate}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
