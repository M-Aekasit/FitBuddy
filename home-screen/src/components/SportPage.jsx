import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateCaloriesFromSport } from "../utils/SportCalculator";

export default function SportPage() {
  const [page, setPage] = useState("menu");
  const [selectedSport, setSelectedSport] = useState(null);
  const [trackedCalories, setTrackedCalories] = useState(0);
  const [inputData, setInputData] = useState({ distance: "", weight: "", time: "" });

  const navigate = useNavigate();

  const sports = [
    { id: 1, name: "Running", type: "RUNNING", image: "/images/sport/run.png" },
    { id: 2, name: "Cycling", type: "CYCLING", image: "/images/sport/cycling.png" },
    { id: 3, name: "Badminton", type: "BADMINTON", image: "/images/sport/badminton.png" },
    { id: 4, name: "Zumba", type: "ZUMBA", image: "/images/sport/zumba.png" },
    { id: 5, name: "Hula Hoop", type: "HULA-HOOP", image: "/images/sport/hulahoop.png" },
    { id: 6, name: "Walking", type: "WALKING", image: "/images/sport/walk.png" },
    { id: 7, name: "Aerobic", type: "AEROBIC", image: "/images/sport/aerobic.png" },
    { id: 8, name: "Tennis", type: "TENNIS", image: "/images/sport/tennis.png" },
    { id: 9, name: "Karate", type: "KARATE", image: "/images/sport/karate.png" },
    { id: 10, name: "Swimming", type: "SWIMMING", image: "/images/sport/swimming.png" },
  ];

  const selectSport = (sport) => {
    setSelectedSport(sport);
    setInputData({ distance: "", weight: "", time: "" });
    setPage("details");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateCalories = async () => {
    const calories = calculateCaloriesFromSport(selectedSport.type, inputData);
  
    const dataToSend = {
      sportType: selectedSport.name,       
      inputData,                    
      calories: Math.round(calories), 
      timestamp: new Date().toISOString(), 
    };
  
    try {
      const res = await fetch("http://localhost:3000/api/sports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      if (res.ok) {
        console.log("✅ Data saved");
        setTrackedCalories(trackedCalories + calories);
        setPage("menu");
      } else {
        console.error("❌ Failed to save data");
      }
    } catch (err) {
      console.error("❌ Error posting data:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">

      {/* Back Home */}
      {page === "menu" && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/HealthDashboard')}
            className="px-4 py-2 text-2xl font-bold rounded hover:bg-gray-200"
          >
            ← Back
          </button>
        </div>
      )}

      {/* Header */}
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-8">Sport Tracker</h1>
      </header>

      {/* Calorie Tracker */}
      <div className="text-center text-3xl font-medium text-gray-500">
        Total Calories Burned : {Math.round(trackedCalories)} kcal
      </div>

      {/* Content */}
      <main className="flex-1 p-8">
        {page === "menu" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {sports.map((sport) => (
              <div
                key={sport.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => selectSport(sport)}
              >
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-100 object-cover rounded-lg mb-4"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{sport.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {page === "details" && selectedSport && (
          <div className="max-w-3xl mx-auto">
            <button
              className="text-blue-600 text-xl hover:underline mb-4"
              onClick={() => setPage("menu")}
            >
              ← Back to Menu
            </button>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <img
                src={selectedSport.image}
                alt={selectedSport.name}
                className="w-full h-140 object-cover rounded-lg mb-6"
              />

              <h2 className="text-4xl font-extrabold text-center text-yellow-800 mb-6">{selectedSport.name}</h2>

              {/* Input fields */}
              <div className="text-center text-lg space-y-6">
                {selectedSport.type === "RUNNING" && (
                  <>
                    <div>
                      <label className="block mb-2 font-bold">Distance (km):</label>
                      <input
                        type="number"
                        name="distance"
                        value={inputData.distance}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter distance in km"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-bold">Weight (kg):</label>
                      <input
                        type="number"
                        name="weight"
                        value={inputData.weight}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Enter weight in kg"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block mb-2 font-bold">Time (hours):</label>
                  <input
                    type="number"
                    name="time"
                    value={inputData.time}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter time in hours"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-bold shadow-md"
                  onClick={calculateCalories}
                >
                  ➕ Add to Tracker
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}