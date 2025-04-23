import { useState } from "react";

export default function FriendsPage() {
  const [rating, setRating] = useState(0); 
  const [diaryNotes, setDiaryNotes] = useState(""); 

  const friends = [
    {
      name: "Bee",
      calories: { burned: 450, target: 700 },
      water: { consumed: 7, target: 8 }
    },
    {
      name: "Copter",
      calories: { burned: 250, target: 600 },
      water: { consumed: 5, target: 8 }
    },
    {
      name: "Kay",
      calories: { burned: 120, target: 300 },
      water: { consumed: 6, target: 8 }
    },
    {
      name: "Mild",
      calories: { burned: 50, target: 250 },
      water: { consumed: 8, target: 8 }
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      {/* iPhone Frame */}
      <div className="w-[450px] h-[900px] bg-black rounded-[70px] shadow-xl border-[10px] border-gray-700 overflow-hidden flex flex-col relative">
        {/* Top Edge */}
        <div className="w-full h-5 bg-black absolute top-0"></div>
        
        {/* App Content */}
        <div className="flex-1 bg-white flex flex-col rounded-[40px] overflow-hidden">
          {/* Header */}
          <div className="w-full bg-black text-white py-4 text-center">
            <h1 className="text-4xl font-bold">💁🏻‍♂️ Friends</h1>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 w-full px-5 pb-20">
            <div className="flex flex-col items-center py-6">
              {/* Invite Friend Button */}
              <button 
                className="w-full max-w-md bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg mb-8 text-xl font-medium transition-colors"
                onClick={() => alert("Invite sent!")}
              >
                ➕ Invite New Friend
              </button>

              {/* Friends List */}
              <div className="w-full max-w-md space-y-6">
                {friends.map((friend, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-2xl font-semibold mb-4">👤 {friend.name}</h3>
                    
                    {/* Calories Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-lg mb-1">
                        <span>🔥 Calories Burned:</span>
                        <span>{friend.calories.burned} / {friend.calories.target}</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-400" 
                          style={{ width: `${(friend.calories.burned / friend.calories.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Water Progress */}
                    <div>
                      <div className="flex justify-between text-lg mb-1">
                        <span>💧 Water Intake:</span>
                        <span>{friend.water.consumed} / {friend.water.target} glasses</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400" 
                          style={{ width: `${(friend.water.consumed / friend.water.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}