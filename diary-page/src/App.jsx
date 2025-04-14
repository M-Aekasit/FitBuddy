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
      notes: diaryNotes
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
        <div className="header">📚 Diary</div>
        {/* <div className="header">
          {page === "friends" && "💁🏻‍♂️ Friends"}
          {page === "diary" && "📚 Diary"} 
        </div> */}

          <div className="scroll-area">
          <h2>Diary Notes</h2>
          <div>
            <h3>Rate How Was Your Day</h3>
            <div className="rating-container">
                  <span className={rating === 1 ? "selected" : ""} onClick={() => setRating(1)}>😞</span>
                  <span className={rating === 2 ? "selected" : ""} onClick={() => setRating(2)}>😐</span>
                  <span className={rating === 3 ? "selected" : ""} onClick={() => setRating(3)}>😌</span>
                  <span className={rating === 4 ? "selected" : ""} onClick={() => setRating(4)}>🙂</span>
                  <span className={rating === 5 ? "selected" : ""} onClick={() => setRating(5)}>😀</span>
                </div>
                <p>Your rating: {" "}
                  {rating === 1 && "Such a bad day😞"}
                  {rating === 2 && "Could be better😐"}
                  {rating === 3 && "Just okay😌"}
                  {rating === 4 && "Pretty good🙂"}
                  {rating === 5 && "Awesome!😀"}
                </p>
          </div>

          <textarea
            rows="6"
            cols="30"
            placeholder="Write your notes here..."
            style={{ width: "100%", padding: "8px", marginTop: "15px" }}
            value={diaryNotes}
            onChange={(e) => setDiaryNotes(e.target.value)}
          />

          <button onClick={saveDiaryNote} style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "#74b9ff", border: "none", color: "white", borderRadius: "5px" }}>
            Save Note
          </button>

          <div style={{ marginTop: "30px" }}>
            <h3>Diary History</h3>
            {history.length > 0 ? (
              history.map((entry, index) => (
                <div key={index} style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
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
          </div>
          </div>
          </div>
          );
          }
