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
const OK = () => 
{
  if (sportType === 'RUN') {
    setAns(weight * distance * 1.036);
  } else if (sportType === 'CYCLING') {
    setAns(time * 450); 
  } else if (sportType === 'BADMINTON'){
    setAns(time *350);
  } else if (sportType === 'ZUMBA') {
    setAns(time *500);
  }
    
};

  return (
    <>
    <h1>sport</h1>
    <div className="run">
      <button className="run-button" onClick={() => {setSportType('RUN'); setIsOpen(true)}}>RUN</button>
    </div>

    <div className='cycling'>
      <button className='cycling-button' onClick={() => { setSportType('CYCLING'); setIsOpen(true); }}>CYCLING</button>
    </div>

    <div className='badminton'>
      <button className='badminton-button' onClick={() => { setSportType('BADMINTON'); setIsOpen(true); }}>BADMINTON</button>
    </div>

    <div className='zumba'>
      <button className='zumba-button' onClick={() => { setSportType('ZUMBA'); setIsOpen(true); }}>ZUMBA</button>
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
