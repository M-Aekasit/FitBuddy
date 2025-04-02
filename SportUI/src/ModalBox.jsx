import React, { useState } from "react";
import "./ModalBox.css";

const ModalBox = ({ isOpen, onClose, speed, setSpeed, time, setTime, onSave, onOK }) => {
    if (!isOpen) return null;

const [distance, setDistance] = useState(0);
const [weight, setWeight] = useState(0);

return(
    <div className="modal">
        <label>distance(km):</label>
        <input type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)} />
        <label>weight(kg):</label>
        <input type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)} />
    </div>
);
};
export default ModalBox;