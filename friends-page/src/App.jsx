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
        {/* <div className="header">💁🏻‍♂️ Friends</div> */}
        <div className="header">
          {page === "friends" && "💁🏻‍♂️ Friends"}
          {page === "diary" && "📚 Diary"} 
        </div>

          <div className="scroll-area">
          {page === "friends" && (
              <div>
                <h2>Friends List</h2>

                {/* Invite Button */}
                <button className="Add" onClick={() => alert("Invite sent!")}>
                  ➕ Invite New Friend
                </button>

                {/* Friends List */}
                <div className="friend-card">
                  <h3>👤 Alex</h3>
                  <p>🔥 Calories Burned: 450 / 600</p>
                  <div className="progress-bar">
                    <div className="fill" style={{ width: "75%", backgroundColor: "#ff7675" }}></div>
                  </div>
                  <p>💧 Water Intake: 6 / 8 glasses</p>
                  <div className="progress-bar">
                    <div className="fill" style={{ width: "75%", backgroundColor: "#74b9ff" }}></div>
                  </div>
                </div>

                <div className="friend-card">
                  <h3>👤 Jordan</h3>
                  <p>🔥 Calories Burned: 300 / 600</p>
                  <div className="progress-bar">
                    <div className="fill" style={{ width: "50%", backgroundColor: "#ff7675" }}></div>
                  </div>
                  <p>💧 Water Intake: 5 / 8 glasses</p>
                  <div className="progress-bar">
                    <div className="fill" style={{ width: "62.5%", backgroundColor: "#74b9ff" }}></div>
                  </div>
                </div>
              </div>
            )}

        </div>

          {/* <div className="nav-bar">
            <button onClick={() => setPage("menu")}>🏠 Menu</button>
            <button onClick={() => setPage("friends")}>💁🏻‍♂️ Friends</button>
            <button onClick={() => setPage("diary")}>📚 Diary</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
