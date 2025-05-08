import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { calculateCaloriesFromSport } from "../utils/SportCalculator";
import axios from "axios";
import { Link } from "react-router-dom";

export default function SportPage() {
  const navigate = useNavigate();

  const getTodayKey = () => {
    const today = new Date().toISOString().split("T")[0];
    return `trackedCalories_${today}`;
  };

  const todayKey = getTodayKey();

  const [page, setPage] = useState("sport");
  const [selectedSport, setSelectedSport] = useState(null);

  const [trackedCalories, setTrackedCalories] = useState(() => {
    const stored = localStorage.getItem(todayKey);
    const parsed = parseInt(stored);
    return !isNaN(parsed) ? parsed : 0;
  });

  const [inputData, setInputData] = useState({
    distance: "",
    weight: "",
    time: "",
  });

  const calorieGoal = 850;
  const progressPercentage = Math.min(
    (trackedCalories / calorieGoal) * 100,
    100
  );

  const sports = [
    { id: 1, name: "Running", type: "RUNNING", image: "/images/sport/run.png" },
    {
      id: 2,
      name: "Cycling",
      type: "CYCLING",
      image: "/images/sport/cycling.png",
    },
    {
      id: 3,
      name: "Badminton",
      type: "BADMINTON",
      image: "/images/sport/badminton.png",
    },
    { id: 4, name: "Zumba", type: "ZUMBA", image: "/images/sport/zumba.png" },
    {
      id: 5,
      name: "Hula Hoop",
      type: "HULA-HOOP",
      image: "/images/sport/hulahoop.png",
    },
    {
      id: 6,
      name: "Walking",
      type: "WALKING",
      image: "/images/sport/walk.png",
    },
    {
      id: 7,
      name: "Aerobic",
      type: "AEROBIC",
      image: "/images/sport/aerobic.png",
    },
    {
      id: 8,
      name: "Tennis",
      type: "TENNIS",
      image: "/images/sport/tennis.png",
    },
    {
      id: 9,
      name: "Karate",
      type: "KARATE",
      image: "/images/sport/karate.png",
    },
    {
      id: 10,
      name: "Swimming",
      type: "SWIMMING",
      image: "/images/sport/swimming.png",
    },
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
    const newCalories = trackedCalories + calories;
    setTrackedCalories(newCalories);
    localStorage.setItem(todayKey, newCalories.toString());

    let relevantInputData = { time: parseFloat(inputData.time) };

    if (selectedSport.type === "RUNNING") {
      const validDistance = parseFloat(inputData.distance) || 0;
      const validWeight = parseFloat(inputData.weight) || 0;

      relevantInputData = {
        ...relevantInputData,
        distance: validDistance,
        weight: validWeight,
      };
    }

    const dataToSend = {
      sportType: selectedSport.type,
      inputData: relevantInputData,
      calories: Math.round(calories),
      timestamp: new Date().toISOString(),
    };

    try {
      console.log("Sending data:", dataToSend);
      await axios.post("http://localhost:5000/api/sport", dataToSend);
      console.log("Saved to backend");
    } catch (error) {
      console.error("Error saving sport data:", error);
    }

    setPage("sport");
  };

  const resetOutdatedData = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("trackedCalories_") && key !== todayKey) {
        localStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    resetOutdatedData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">
      {page === "sport" && (
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/HealthDashboard")}
            className="px-4 py-2 text-2xl font-bold rounded hover:bg-gray-200"
          >
            ← Back
          </button>
        </div>
      )}

      <header className="text-center">
        <h1 className="text-5xl font-bold mb-2">Exercise Tracker</h1>
      </header>

      <Link to="/HealthDashboard" className="block mb-4">
        <div className="mb-4">
          <div className="flex justify-between text-gray-600 font-medium mb-1">
            <span>🏃 Calories Burned</span>
            <span>
              {Math.round(trackedCalories)} / {calorieGoal} kcal
            </span>
          </div>
          <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-400 transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </Link>

      <main className="flex-1 p-8">
        {page === "sport" && (
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
              onClick={() => setPage("sport")}
            >
              ← Back to Sport
            </button>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <img
                src={selectedSport.image}
                alt={selectedSport.name}
                className="w-full h-140 object-cover rounded-lg mb-6"
              />
              <h2 className="text-4xl font-extrabold text-center text-yellow-800 mb-6">
                {selectedSport.name}
              </h2>

              <div className="text-center text-lg space-y-6">
                {selectedSport.type === "RUNNING" && (
                  <>
                    <div>
                      <label className="block mb-2 font-bold">
                        Distance (km):
                      </label>
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
                      <label className="block mb-2 font-bold">
                        Weight (kg):
                      </label>
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
