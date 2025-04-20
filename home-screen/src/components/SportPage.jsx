import { useState } from 'react';
import ModalBox from './ModalBox';

// Using public folder path
const runImage = '/images/run.png';
const cyclingImage = '/images/cycling.png';
const badmintonImage = '/images/badminton.png';
const zumbaImage = '/images/zumba.png';
const hulahoopImage = '/images/hulahoop.png';
const walkImage = '/images/walk.png';
const aerobicImage = '/images/aerobic.png';
const tennisImage = '/images/tennis.png';
const karateImage = '/images/karate.png';
const swimmingImage = '/images/swimming.png';

const SportPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState("0");
  const [weight, setWeight] = useState("0");
  const [ans, setAns] = useState(0);
  const [time, setTime] = useState("0");
  const [sportType, setSportType] = useState('RUNNING');

  const handleSave = () => {
    console.log(`Saved: ${sportType}`, { distance, weight, time, calories: ans });
  };

  const calculateCalories = () => {
    const calculations = {
      'RUNNING': weight * distance * 1.036,
      'CYCLING': time * 450,
      'BADMINTON': time * 350,
      'ZUMBA': time * 500,
      'HULA-HOOP': time * 430,
      'WALKING': time * 282,
      'AEROBIC': time * 363,
      'TENNIS': time * 728,
      'KARATE': time * 750,
      'SWIMMING': time * 550
    };
    setAns(calculations[sportType] || 0);
  };

  const sports = [
    { name: 'RUNNING', image: runImage },
    { name: 'CYCLING', image: cyclingImage },
    { name: 'BADMINTON', image: badmintonImage },
    { name: 'ZUMBA', image: zumbaImage },
    { name: 'HULA-HOOP', image: hulahoopImage },
    { name: 'WALKING', image: walkImage },
    { name: 'AEROBIC', image: aerobicImage },
    { name: 'TENNIS', image: tennisImage },
    { name: 'KARATE', image: karateImage },
    { name: 'SWIMMING', image: swimmingImage }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Sports Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sports.map((sport) => (
          <button
            key={sport.name}
            onClick={() => {
              setSportType(sport.name);
              setIsOpen(true);
            }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <img src={sport.image} alt={sport.name} className="w-16 h-16 mr-4"/>
              <span className="text-lg font-medium">{sport.name}</span>
            </div>
          </button>
        ))}
      </div>

      <ModalBox
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setAns(0);
          setTime(0);
          setDistance(0);
          setWeight(0);
        }}
        distance={distance}
        setDistance={setDistance}
        weight={weight}
        setWeight={setWeight}
        Save={handleSave}
        ans={ans}
        OK={calculateCalories}
        time={time}
        setTime={setTime}
        sportType={sportType}
      />
    </div>
  );
};

export default SportPage;
