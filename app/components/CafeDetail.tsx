import React, { useState, useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Cafe {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  crowdLevel: number;
}

interface CafeDetailProps {
  cafe: Cafe;
  onUpdateCrowdLevel: (cafeId: string, newLevel: number) => void;
}

const CafeDetail: React.FC<CafeDetailProps> = ({ cafe, onUpdateCrowdLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState(cafe.crowdLevel);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setSelectedLevel(cafe.crowdLevel);
  }, [cafe.crowdLevel]);

  const handleUpdateCrowdLevel = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    onUpdateCrowdLevel(cafe.id, selectedLevel);
    toast.success('混雑状況を更新しました');
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const getCrowdLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-green-500 text-white';
      case 2:
        return 'bg-blue-500 text-white';
      case 3:
        return 'bg-yellow-500 text-white';
      case 4:
        return 'bg-orange-500 text-white';
      case 5:
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCrowdLevelText = (level: number) => {
    switch (level) {
      case 1:
        return '空いてる';
      case 2:
        return 'やや空いてる';
      case 3:
        return '普通';
      case 4:
        return '混雑';
      case 5:
        return '大混雑';
      default:
        return '不明';
    }
  };

  return (
    <main className="bg-gray-50 py-8">
      {showConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60">
          <div
            className="border-2 border-blue-400 rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 100000,
              color: 'white',
              minHeight: '180px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              background: '#1a2233',
            }}
          >
            <h4 className="text-xl font-bold mb-6 text-white">Are you sure you want to update?</h4>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold text-base"
              >
                OK
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <img
              src={cafe.imageUrl}
              alt={cafe.name}
              className="w-full h-48 md:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{cafe.name}</h2>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPinIcon className="w-5 h-5 mr-1" />
              <span>{cafe.address}</span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Current Crowd Level</h3>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${getCrowdLevelColor(cafe.crowdLevel)}`} />
                <span className="text-gray-700">{getCrowdLevelText(cafe.crowdLevel)}</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Update Crowd Level</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      if (selectedLevel !== level) setSelectedLevel(level);
                      setShowConfirm(true);
                    }}
                    className={`min-w-[7rem] max-w-[7rem] h-12 flex-shrink-0 flex items-center justify-center rounded-full font-semibold transition-colors shadow-sm text-base text-center ${
                      selectedLevel === level
                        ? getCrowdLevelColor(level)
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {getCrowdLevelText(level)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CafeDetail; 