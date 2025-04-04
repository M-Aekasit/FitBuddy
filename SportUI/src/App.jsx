import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ModalBox from './ModalBox';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState("0");
  const [weight, setWeight] = useState("0");
  const [ans, setAns] = useState(0);
  const [time, setTime] = useState("0");
  const [sportType, setSportType] = useState('RUN');
  const[Save] = useState("0");

const handleSave = () => {
  console.log(`save: distance = ${distance}, weight = ${weight}`);
};

const OK = () => {
  if (sportType === 'RUN') {
    setAns(weight * distance * 1.036);
  } else if (sportType === 'CYCLING') {
    setAns(time * 450);
  } else if (sportType === 'BADMINTON') {
    setAns(time * 350);
  } else if (sportType === 'ZUMBA') {
    setAns(time * 500);
  } else if (sportType === 'HULA-HOOP') {
    setAns(time * 430);
  } else if (sportType === 'WALK'){
    setAns(time *282);
  } else if (sportType === 'AEROBIC'){
    setAns(time *363);
  } else if (sportType === 'TENNIS'){
    setAns(time *728);
  } else if (sportType === 'KARATE'){
    setAns(time *750);
  }else if (sportType === 'SWIMMING'){
    setAns(time *550);
  }
};

const openModal = (sport) => {
  setSportType(sport);
  setIsOpen(true);
};

  return (
    <>
    <div className="iphone-frame">
    <h1>sport</h1>
    {["RUN", "CYCLING", "BADMINTON", "ZUMBA", "HULA-HOOP" ,"WALK" ,"AEROBIC" ,"TENNIS" ,"KARATE" ,"SWIMMING"].map((sport) => (
        <button key={sport} className={`${sport.toLowerCase()}-button`} onClick={() => openModal(sport)}>
          {sport}
        </button>
      ))}

    </div>
    
    <ModalBox
      isOpen = {isOpen} 
      onClose = {() => { setIsOpen(false); setAns(0); setTime(0); setDistance(0); setWeight(0);}}
      distance = {distance} 
      setDistance = {setDistance} 
      weight = {weight}
      setWeight = {setWeight}
      Save = {handleSave}
      ans={ans}
      OK={OK}
      time={time}
      setTime={setTime}
      sportType={sportType}/>
    </>
  )
}

export default App
