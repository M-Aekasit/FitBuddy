import React, { useState } from "react";
import "./ModalBox.css";

const ModalBox = ({ isOpen, onClose, distance, setDistance, weight, setWeight, ans, OK, Save  }) => {
    if (!isOpen) return null;

// const [distance, setDistance] = useState(0);
// const [weight, setWeight] = useState(0);
// const[Save] = useState("0");

return(
    <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h1>RUN</h1>
        <div className="modal-input">
            <label>distance(km):</label>
            <input type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)} />
            
            <label>weight(kg):</label>
            <input type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)} />

            <label>Calories Burned(cal):{ans}</label>
        </div>

        <div className="buttons">
            <button onClick={OK}>OK</button>
            <button onClick={Save}>Save</button>
        </div>
        
    </div>
);
};
export default ModalBox;