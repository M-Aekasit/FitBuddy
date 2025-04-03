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
  const[Save] = useState("0");

  const handleSave = () => {
    console.log(`save: distance = ${distance}, weight = ${weight}`);
  };
const OK = () => 
{
  setAns(weight*distance*1.036) 
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
    Save = {handleSave}
    ans={ans}
    OK={OK}

    />
    
    </>
  )
}

export default App
