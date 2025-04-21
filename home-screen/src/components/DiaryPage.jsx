import { useState } from "react";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white font-sans text-lg">
      <div className="w-[450px] h-[900px] bg-black rounded-[70px] shadow-lg border-[10px] border-gray-700 overflow-hidden flex flex-col relative">
        <div className="w-full h-5 bg-black absolute top-0"></div>
        <div className="bg-white flex-1 flex flex-col items-center pt-5 rounded-[40px] overflow-hidden">
          <div className="bg-black text-white w-full py-4 text-center text-4xl font-bold">
            📚 Diary
          </div>
          <div className="overflow-y-auto flex-1 w-[90%] px-5 pb-20">
            <h2 className="text-2xl font-semibold mt-4">Diary Notes</h2>
            <div className="mt-4">
              <h3 className="text-xl font-medium">Rate How Was Your Day</h3>
              <div className="flex justify-center gap-4 mt-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span
                    key={num}
                    className={`text-3xl cursor-pointer transition-transform duration-200 ease-in-out p-2 rounded-full ${
                      rating === num
                        ? "bg-yellow-300 shadow-md"
                        : "hover:bg-gray-200 hover:scale-110"
                    }`}
                    onClick={() => setRating(num)}
                  >
                    {["😞", "😐", "😌", "🙂", "😀"][num - 1]}
                  </span>
                ))}
              </div>
              <p className="mt-2">
                Your rating:{" "}
                {rating === 1 && "Such a bad day😞"}
                {rating === 2 && "Could be better😐"}
                {rating === 3 && "Just okay😌"}
                {rating === 4 && "Pretty good🙂"}
                {rating === 5 && "Awesome!😀"}
              </p>
            </div>

            <textarea
              rows="6"
              placeholder="Write your notes here..."
              className="w-full p-2 mt-4 border border-gray-300 rounded"
              value={diaryNotes}
              onChange={(e) => setDiaryNotes(e.target.value)}
            />

            <button
              onClick={saveDiaryNote}
              className="mt-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
            >
              Save Note
            </button>

            <div className="mt-6">
              <h3 className="text-xl font-semibold">Diary History</h3>
              {history.length > 0 ? (
                history.map((entry, index) => (
                  <div
                    key={index}
                    className="mt-4 p-4 bg-gray-100 text-black rounded"
                  >
                    <p>
                      <strong>Date:</strong> {entry.date}
                    </p>
                    <p>
                      <strong>Rating:</strong> {entry.rating}{" "}
                      {entry.rating > 0 && "🌟"}
                    </p>
                    <p>
                      <strong>Notes:</strong>
                    </p>
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
