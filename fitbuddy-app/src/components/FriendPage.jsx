import { useState, useEffect } from "react";
import axios from "axios";

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [cheeredFriends, setCheeredFriends] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const localData = localStorage.getItem("friendsData");
    const parsedData = localData ? JSON.parse(localData) : null;

    if (parsedData && parsedData.date === today) {
      setFriends(parsedData.friends);
    } else {
      const baseFriends = [
        { name: "Bee", calories: { target: 650 }, water: { target: 8 } },
        { name: "Copter", calories: { target: 300 }, water: { target: 8 } },
        { name: "Kay", calories: { target: 450 }, water: { target: 8 } },
        { name: "Mild", calories: { target: 250 }, water: { target: 8 } },
      ];

      const randomized = baseFriends.map((friend) => {
        const burned = Math.floor(Math.random() * (friend.calories.target + 1));
        const consumed = Math.floor(Math.random() * (friend.water.target + 1));
        return {
          ...friend,
          calories: { ...friend.calories, burned },
          water: { ...friend.water, consumed },
        };
      });

      setFriends(randomized);
      localStorage.setItem(
        "friendsData",
        JSON.stringify({ date: today, friends: randomized })
      );
    }
  }, []);

  const sendCheer = (name) => {
    if (cheeredFriends.includes(name)) return;

    const friend = friends.find((f) => f.name === name);
    if (!friend) return;

    fetch("http://localhost:5000/api/friend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        sender: "You",
        calories: {
          burned: friend.calories.burned,
          target: friend.calories.target,
        },
        water: {
          consumed: friend.water.consumed,
          target: friend.water.target,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to cheer");
        }
        return res.json();
      })
      .then((data) => {
        setCheeredFriends((prev) => [...prev, name]);
        alert(`🎉 You sent a cheer to ${name}!`);
      })
      .catch((err) => {
        console.error(err);
        alert("❌ Failed to send cheer");
      });
  };

  const getStatus = (friend) => {
    const calorieProgress = friend.calories.burned / friend.calories.target;
    const waterProgress = friend.water.consumed / friend.water.target;
    if (calorieProgress > 0.6 && waterProgress > 0.6) {
      return "On Track 🚀";
    } else {
      return "Needs Motivation 💬";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-2">Friends</h1>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 flex flex-col items-center">
        {/* Invite Button */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg font-semibold mb-8 shadow-md transition transform hover:scale-105"
          onClick={() => alert("Invite sent!")}
        >
          ➕ Invite New Friend
        </button>

        {/* Friend List */}
        <div className="space-y-6 w-full max-w-3xl">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105"
            >
              {/* Top Row: Avatar and Name */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-700">
                    {friend.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{friend.name}</div>
                    <div className="text-sm text-gray-500">
                      {getStatus(friend)}
                    </div>
                  </div>
                </div>

                {/* Cheer Button */}
                <button
                  className={`py-1 px-4 rounded-full text-sm font-semibold transition ${
                    cheeredFriends.includes(friend.name)
                      ? "bg-yellow-400 text-white cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                  onClick={() => sendCheer(friend.name)}
                  disabled={cheeredFriends.includes(friend.name)}
                >
                  {cheeredFriends.includes(friend.name)
                    ? "🎉 Cheered!"
                    : "Send Cheer"}
                </button>
              </div>

              {/* Calories Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-gray-600 font-medium mb-1">
                  <span>🔥 Calories Burned</span>
                  <span>
                    {friend.calories.burned} / {friend.calories.target}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 transition-all"
                    style={{
                      width: `${
                        (friend.calories.burned / friend.calories.target) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Water Progress */}
              <div>
                <div className="flex justify-between text-gray-600 font-medium mb-1">
                  <span>💧 Water Intake</span>
                  <span>
                    {friend.water.consumed} / {friend.water.target} glasses
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 transition-all"
                    style={{
                      width: `${
                        (friend.water.consumed / friend.water.target) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 p-4 text-center text-sm font-semibold mt-8">
        © 2025 Friends Tracker App
      </footer>
    </div>
  );
}
