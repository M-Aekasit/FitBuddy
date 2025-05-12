import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function DiaryPage() {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const scrollRef = useRef(null);

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/diary");
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        } else {
          console.error("Failed to fetch diary entries");
        }
      } catch (err) {
        console.error("Error fetching diary:", err);
      }
    };
    fetchDiary();
  }, []);

  const saveDiary = async () => {
    if (rating === 0 && note.trim() === "") return;

    const newEntry = {
      diaryDate: todayStr,
      diaryRate: rating,
      diaryNote: note,
    };

    try {
      await axios.post("http://localhost:5000/api/diary", newEntry, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await axios.get("http://localhost:5000/api/diary");
      if (res.status === 200) {
        setHistory(res.data);
      }

      setRating(0);
      setNote("");
    } catch (err) {
      console.error("Error saving diary:", err);
    }
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const getColorByRating = (rate) =>
    ({
      1: "bg-red-300",
      2: "bg-orange-300",
      3: "bg-yellow-300",
      4: "bg-blue-300",
      5: "bg-green-300",
    }[rate] || "bg-white");

  const getEntriesForMonth = () => {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return history.filter((entry) => {
      const [entryYear, entryMonth] = entry.diaryDate.split("-").map(Number);
      return entryYear === year && entryMonth === month;
    });
  };

  const getRecentAndOlderEntries = () => {
    const sorted = getEntriesForMonth().sort(
      (a, b) => new Date(b.diaryDate) - new Date(a.diaryDate)
    );
    return {
      recent: sorted.slice(0, 3),
      older: sorted.slice(3),
    };
  };

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const days = daysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cells = [];

    const ratingByDate = {};
    getEntriesForMonth().forEach((entry) => {
      ratingByDate[entry.diaryDate] = entry.diaryRate;
    });

    for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
    for (let day = 1; day <= days; day++) cells.push(day);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-4">
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
          >
            ←
          </button>
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
          >
            →
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-gray-400 text-sm mb-2">
          {weekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {cells.map((day, index) => {
            if (day === null)
              return <div key={index} className="w-12 h-12"></div>;

            const date = new Date(year, month, day);
            const dateStr = date.toLocaleDateString("en-CA");
            const isToday = dateStr === todayStr;
            const bgColor = getColorByRating(ratingByDate[dateStr]);

            return (
              <div key={index} className="flex justify-center items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold
                  ${
                    isToday
                      ? `border-2 border-black-500 text-black-500 ${bgColor}`
                      : bgColor
                  }
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
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Diary</h1>
        <p className="text-xl text-gray-500">{new Date().toDateString()}</p>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 flex-grow">
        <section className="flex-1 bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Rate Your Day</h2>

          <div className="flex justify-center gap-8 mb-6 text-6xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`transition-transform ${
                  rating >= star ? "text-yellow-400 scale-110" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-semibold mb-6">Diary Note</h2>
          <textarea
            className="w-full h-80 p-4 border rounded-xl resize-none text-lg mb-6"
            placeholder="Write about your day..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            onClick={saveDiary}
            className="w-full py-4 bg-green-500 text-white rounded-xl text-2xl hover:bg-green-600 transition"
          >
            Save Diary
          </button>
        </section>

        <section className="flex-1 flex flex-col gap-8">
          <div
            ref={scrollRef}
            className="bg-white p-8 rounded-2xl shadow-md h-[500px] overflow-y-auto scroll-smooth"
          >
            <h2 className="text-3xl font-semibold mb-6">Diary History</h2>
            {getEntriesForMonth().length > 0 ? (
              <div className="space-y-6">
                {(() => {
                  const { recent, older } = getRecentAndOlderEntries();
                  return [...recent, ...older].map((entry, idx) => (
                    <div key={idx} className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-semibold text-lg">{entry.diaryDate}</p>
                      <div className="flex gap-1 text-2xl mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={
                              entry.diaryRate >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-gray-700">{entry.diaryNote}</p>
                    </div>
                  ));
                })()}
              </div>
            ) : (
              <p className="text-gray-400">No entries for this month.</p>
            )}
          </div>{" "}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-semibold mb-6">Mood Calendar</h2>
            {renderCalendar()}
          </div>
        </section>
      </main>
    </div>
  );
}
