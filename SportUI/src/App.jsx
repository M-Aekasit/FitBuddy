import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ModalBox from './ModalBox';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [distance, setDistance] = useState("0");
  const [weight, setWeight] = useState("0");

  const handleSave = () => {
    console.log(`save: distance = ${distance}, weight = ${weight}`);
  };

  return (
    <>
    <h1>sport</h1>
    <div className="run">
      <button className="run-button" onClick={() => setIsOpen(true)}>RUN</button>
    </div>

    <ModalBox
    isOpen = {isOpen} 
    onClose = {() => setIsOpen(false)}
    distance = {distance} 
    setDistance = {setDistance} 
    weight = {weight}
    setWeight = {setWeight}
    />
    
    </>
  )
}

export default App
