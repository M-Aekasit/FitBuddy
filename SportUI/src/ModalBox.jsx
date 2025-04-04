import React, { useState } from "react";
import "./ModalBox.css";

import runImage from './run.png'
import cyclingImage from './cycling.png'
import badmintonImage from './badminton.png' 
import zumbaImage from './zumba.png' 
import hulahoopImage from './hulahoop.png'
import walkImage from './walk.png'
import aerobicImage from './aerobic.png'
import tennisImage from './tennis.png'
import karateImage from './karate.png'
import swimmingImage from './swimming.png'


const ModalBox = ({ isOpen, onClose, distance, setDistance, weight, setWeight, ans, OK, Save,sportType,time,setTime  }) => {
    if (!isOpen) return null;

return(
    <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h1>{sportType}</h1> 

        <div className="modal-input">
        {sportType === 'RUN' && (
            <>
            <img src={runImage}/>
            <label>distance(km):</label>
            <input type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)} />
            
            <label>weight(kg):</label>
            <input type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)} />
            </>
        )}

        {sportType === 'CYCLING' && (
            <>
                <img src={cyclingImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'BADMINTON' && (
            <>
                <img src={badmintonImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'ZUMBA' && (
            <>
                <img src={zumbaImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'HULA-HOOP' && (
            <>
                <img src={hulahoopImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'WALK' && (
            <>
                <img src={walkImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'AEROBIC' && (
            <>
                <img src={aerobicImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'TENNIS' && (
            <>
                <img src={tennisImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

        {sportType === 'KARATE' && (
            <>
                <img src={karateImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

    {sportType === 'SWIMMING' && (
            <>
                <img src={swimmingImage}/>
                <label>Time(hours):</label>
                <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)} />
            </>
        )}

            <h2>Calories Burned(cal): {ans}</h2>
        </div>

        <div className="buttons">
            <button onClick={OK}>OK</button>
            <button onClick={Save}>Save</button>
        </div>
        
    </div>
    
);
};
export default ModalBox;