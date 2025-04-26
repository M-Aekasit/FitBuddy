import { useState } from 'react';
import ModalBox from './ModalBox';
import { useNavigate } from "react-router-dom";

// Using public folder path
const runImage = '/images/sport/run.png';
const cyclingImage = '/images/sport/cycling.png';
const badmintonImage = '/images/sport/badminton.png';
const zumbaImage = '/images/sport/zumba.png';
const hulahoopImage = '/images/sport/hulahoop.png';
const walkImage = '/images/sport/walk.png';
const aerobicImage = '/images/sport/aerobic.png';
const tennisImage = '/images/sport/tennis.png';
const karateImage = '/images/sport/karate.png';
const swimmingImage = '/images/sport/swimming.png';

const SportPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState("0");
  const [weight, setWeight] = useState("0");
  const [ans, setAns] = useState(0);
  const [time, setTime] = useState("0");
  const [sportType, setSportType] = useState('RUNNING');
  const [totalTime, setTotalTime] = useState(0);
  const [lastUpdateDate, setLastUpdateDate] = useState(new Date().toDateString());
  
  const navigate = useNavigate();
  
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

  const handleSave = () => {
    const today = new Date().toDateString();
    const newTime = Number(time);
    if (lastUpdateDate !== today) {
      setTotalTime(newTime);
      setLastUpdateDate(today);
    } else {
      setTotalTime(prev => prev + newTime);
    }
  
    console.log(`Saved: ${sportType}`, { distance, weight, time, calories: ans });
      
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
      <div className="flex items-center space-x-4 mb-8">
        <button
        onClick={() => navigate('/HealthDashboard')}
        className=" px-4 py-2 text-2xl  rounded hover:bg-gray-200">
        ←</button>
        <h2 className="text-2xl font-bold ">Sports Tracker</h2>
      </div>
      
      <div className="bg-orange-200 py-6 px-2 rounded-lg mb-8 ">
        <h1 className="text-lg text-center text-orange-700">Today's Activity</h1>
        <p className="text-5xl font-bold text-center mt-4 text-orange-700">⏱️ Total Time: {totalTime} hours</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sports.map((sport) => (
          <button
            key={sport.name}
            onClick={() => {
              setSportType(sport.name);
              setIsOpen(true);
            }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
          >
            <div className="flex items-center  gap-2">
              <img src={sport.image} alt={sport.name} className="w-20 h-20 "/>
              <span className="text-lg font-medium text-center">{sport.name}</span>
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
