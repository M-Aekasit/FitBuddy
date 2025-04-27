import { useState } from "react";

export default function DiaryPage() {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("diaryHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getToday();

  const saveDiary = () => {
    if (rating === 0 && note.trim() === "") return;
    const newEntry = { date: todayStr, rating, note };
    const updatedHistory = [newEntry, ...history.filter((entry) => entry.date !== todayStr)];

    setHistory(updatedHistory);
    localStorage.setItem("diaryHistory", JSON.stringify(updatedHistory));

    setRating(0);
    setNote("");
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const getColorByRating = (rate) => {
    switch (rate) {
      case 1: return "bg-red-300";
      case 2: return "bg-orange-300";
      case 3: return "bg-yellow-300";
      case 4: return "bg-blue-300";
      case 5: return "bg-green-300";
      default: return "bg-white";
    }
  };

  const renderCalendar = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const days = daysInMonth(month, year);

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Sunday = 0

    const ratingByDate = {};
    history.forEach((entry) => {
      ratingByDate[entry.date] = entry.rating;
    });

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(null);
    }

    for (let day = 1; day <= days; day++) {
      cells.push(day);
    }

    return (
      <div className="flex flex-col gap-2">
        {/* Weekdays Header */}
        <div className="grid grid-cols-7 text-center text-gray-400 text-sm mb-2">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, index) => {
            if (day === null) {
              return <div key={index} className="w-12 h-12"></div>;
            }

            const date = new Date(year, month, day);
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const dateStr = `${yyyy}-${mm}-${dd}`;
            const isToday = dateStr === todayStr;
            const bgColor = getColorByRating(ratingByDate[dateStr]);

            return (
              <div key={index} className="flex justify-center items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold
                    ${isToday ? "bg-blue-500 text-white" : bgColor}
                    ${!isToday && bgColor === "bg-white" ? "text-gray-500" : ""}
                    hover:scale-110 transition-transform`}
                >
                  {day}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Diary</h1>
        <p className="text-xl text-gray-500">{new Date().toDateString()}</p>
      </header>

      {/* Main */}
      <main className="flex flex-col lg:flex-row gap-8 flex-grow">
        {/* Left: Input */}
        <section className="flex-1 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Rate Your Day</h2>

          {/* Rating Stars */}
          <div className="flex justify-center gap-4 mb-6 text-5xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`transition-transform ${rating >= star ? "text-yellow-400 scale-110" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Diary Note */}
          <h2 className="text-3xl font-semibold mb-2">Diary Note</h2>
          <textarea
            className="w-full h-32 p-4 border rounded-xl resize-none text-lg mb-6"
            placeholder="Write about your day..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Save Button */}
          <button
            onClick={saveDiary}
            className="w-full py-4 bg-green-500 text-white rounded-xl text-2xl hover:bg-green-600 transition"
          >
            Save Diary
          </button>
        </section>

        {/* Right: History and Calendar */}
        <section className="flex-1 flex flex-col gap-8">
          {/* Diary History */}
          <div className="bg-white p-8 rounded-2xl shadow-md flex-1 overflow-auto">
            <h2 className="text-3xl font-semibold mb-6">Diary History</h2>
            {history.length > 0 ? (
              <div className="space-y-6">
                {history.map((entry, idx) => (
                  <div key={idx} className="p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold text-lg">{entry.date}</p>
                    <div className="flex gap-1 text-2xl mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={entry.rating >= star ? "text-yellow-400" : "text-gray-300"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-gray-700">{entry.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No diary entries yet.</p>
            )}
          </div>

          {/* Mood Calendar */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold mb-6">Mood Calendar</h2>
            {renderCalendar()}
          </div>
        </section>
      </main>
    </div>
  );
}
