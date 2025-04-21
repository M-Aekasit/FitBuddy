import React from 'react';

const sportImages = {
  'RUNNING': '/images/sport/run.png',
  'CYCLING': '/images/sport/cycling.png',
  'BADMINTON': '/images/sport/badminton.png',
  'ZUMBA': '/images/sport/zumba.png',
  'HULA-HOOP': '/images/sport/hulahoop.png',
  'WALKING': '/images/sport/walk.png',
  'AEROBIC': '/images/sport/aerobic.png',
  'TENNIS': '/images/sport/tennis.png',
  'KARATE': '/images/sport/karate.png',
  'SWIMMING': '/images/sport/swimming.png'
};

const ModalBox = ({ 
  isOpen, 
  onClose, 
  distance, 
  setDistance, 
  weight, 
  setWeight, 
  ans, 
  OK, 
  Save,
  sportType,
  time,
  setTime
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{sportType}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <img 
            src={sportImages[sportType]} 
            alt={sportType}
            className="w-32 h-32 object-contain"
          />
        </div>

        <div className="space-y-4">
          {sportType === 'RUNNING' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  step="0.1"
                />
              </div>
            </>
          )}

          {sportType !== 'RUNNING' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time (hours)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded-md"
                min="0"
                step="0.1"
              />
            </div>
          )}

          {ans > 0 && (
            <div className="p-4 bg-blue-50 rounded-md">
              <p className="text-lg font-semibold text-center">
                Calories Burned: <span className="text-blue-600">{ans.toFixed(2)} cal</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={OK}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Calculate
          </button>
          <button
            onClick={Save}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
