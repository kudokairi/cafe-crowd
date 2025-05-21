import React from 'react';

interface Cafe {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  crowdLevel: number;
}

interface CafeListProps {
  cafes: Cafe[];
  onCafeSelect: (cafe: Cafe) => void;
}

const CafeList: React.FC<CafeListProps> = ({ cafes, onCafeSelect }) => {
  const getCrowdLevelText = (level: number) => {
    switch (level) {
      case 1:
        return 'Not busy';
      case 2:
        return 'A little busy';
      case 3:
        return 'Normal';
      case 4:
        return 'Busy';
      case 5:
        return 'Very busy';
      default:
        return 'Unknown';
    }
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

  return (
    <div className="space-y-2">
      {cafes.map((cafe) => (
        <div
          key={cafe.id}
          className="bg-white rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-all duration-200"
          onClick={() => onCafeSelect(cafe)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              <img
                src={cafe.imageUrl}
                alt={cafe.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-gray-900 truncate">{cafe.name}</h3>
              <div className="flex items-center text-gray-500 text-xs mt-0.5">
                <span className="truncate">{cafe.address}</span>
              </div>
              <div className="mt-1.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getCrowdLevelColor(
                    cafe.crowdLevel
                  )}`}
                >
                  {getCrowdLevelText(cafe.crowdLevel)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CafeList; 