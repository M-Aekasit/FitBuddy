import { useState } from "react";
import "./App.css";

export default function IPhoneCalorieCalculator() {
  const [page, setPage] = useState("menu");
  const [rating, setRating] = useState(0); 
  const [diaryNotes, setDiaryNotes] = useState(""); 

  return (
    <div className="app-container">
      <div className="iphone-frame">
        <div className="edge"></div>
        <div className="app-content">
        <div className="header">💁🏻‍♂️ Friends</div>
          <div className="scroll-area">
              <div className="friends-container">
                <div>
                  <button className="Add" onClick={() => alert("Invite sent!")}>
                    ➕ Invite New Friend
                  </button>
                  <div className="friend-card">
                    <h3>👤 Bee</h3>
                    <p>🔥 Calories Burned: 450 / 700</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(450 / 700) * 100}%`, backgroundColor: "#ff7675" }}></div>
                    </div>
                    <p>💧 Water Intake: 7 / 8 glasses</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(7 / 8) * 100}%`, backgroundColor: "#74b9ff" }}></div>
                    </div>
                  </div>
                  <div className="friend-card">
                    <h3>👤 Copter</h3>
                    <p>🔥 Calories Burned: 250 / 600</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(250 / 600) * 100}%`, backgroundColor: "#ff7675" }}></div>
                    </div>
                    <p>💧 Water Intake: 5 / 8 glasses</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(5 / 8) * 100}%`, backgroundColor: "#74b9ff" }}></div>
                    </div>
                  </div>
                  <div className="friend-card">
                    <h3>👤 Kay</h3>
                    <p>🔥 Calories Burned: 120 / 300</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(120 / 300) * 100}%`, backgroundColor: "#ff7675" }}></div>
                    </div>
                    <p>💧 Water Intake: 6 / 8 glasses</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(6 / 8) * 100}%`, backgroundColor: "#74b9ff" }}></div>
                    </div>
                  </div>
                  <div className="friend-card">
                    <h3>👤 Mild</h3>
                    <p>🔥 Calories Burned: 50 / 250</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(50 / 250) * 100}%`, backgroundColor: "#ff7675" }}></div>
                    </div>
                    <p>💧 Water Intake: 8 / 8 glasses</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${(8 / 8) * 100}%`, backgroundColor: "#74b9ff" }}></div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
