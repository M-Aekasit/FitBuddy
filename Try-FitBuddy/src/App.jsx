import { useState } from "react";
import "./App.css";

export default function IPhoneCalorieCalculator() {
  const [page, setPage] = useState("menu");
  const [rating, setRating] = useState(0);
  const [diaryNotes, setDiaryNotes] = useState("");
  const [history, setHistory] = useState([]); 
  const saveDiaryNote = () => {
    const newEntry = {
      date: new Date().toLocaleString(),
      rating,
      notes: diaryNotes,
    };
    setHistory([newEntry, ...history]); 
    setDiaryNotes("");
    setRating(0);
  };

  return (
    <div className="app-container">
      <div className="iphone-frame">
        <div className="edge"></div>
        <div className="app-content">
          <div className="header">
            {page === "main" && "🏠 Main"}
            {page === "friends" && "💁🏻‍♂️ Friends"}
            {page === "diary" && "📚 Diary"}
          </div>

          <div className="scroll-area">
            {page === "friends" && (
              <div>
                <h2>Friends List</h2>
                <button className="Add" onClick={() => alert("Invite sent!")}>
                  ➕ Invite New Friend
                </button>
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

            {page === "diary" && (
              <div>
                <h2>Diary Notes</h2>
                <h3>Rate How Was Your Day</h3>
                <div className="rating">
                  <span onClick={() => setRating(1)}>1 😞</span>
                  <span onClick={() => setRating(2)}>2 😐</span>
                  <span onClick={() => setRating(3)}>3 😌</span>
                  <span onClick={() => setRating(4)}>4 🙂</span>
                  <span onClick={() => setRating(5)}>5 😀</span>
                </div>
                <p>Your rating: {rating} {rating > 0 && "🌟"}</p>
                <textarea
                  rows="6"
                  cols="30"
                  placeholder="Write your notes here..."
                  style={{ width: "100%", padding: "8px", marginTop: "15px" }}
                  value={diaryNotes}
                  onChange={(e) => setDiaryNotes(e.target.value)}
                />

                <button
                  onClick={saveDiaryNote}
                  style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    backgroundColor: "#3586dd",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                  }}
                >
                  Save Note
                </button>

                <div style={{ marginTop: "30px" }}>
                  <h3>Diary History</h3>
                  {history.length > 0 ? (
                    history.map((entry, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "20px",
                          padding: "10px",
                          backgroundColor: "#f0f0f0",
                          borderRadius: "5px",
                        }}
                      >
                        <p><strong>Date:</strong> {entry.date}</p>
                        <p><strong>Rating:</strong> {entry.rating} {entry.rating > 0 && "🌟"}</p>
                        <p><strong>Notes:</strong></p>
                        <p>{entry.notes}</p>
                      </div>
                    ))
                  ) : (
                    <p>No previous entries found.</p>
                  )}
                </div>
              </div>
            )}

            <div className="nav-bar">
              <button onClick={() => setPage("main")}>🏠 Main</button>
              <button onClick={() => setPage("friends")}>💁🏻‍♂️ Friends</button>
              <button onClick={() => setPage("diary")}>📚 Diary</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
