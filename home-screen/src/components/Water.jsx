import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function App() {
  const [waterCount, setWaterCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentPage, setCurrentPage] = useState("main")
  const navigate = useNavigate();

  const addWater = () => {
    if (waterCount < 8) {
      setIsAnimating(true)
      setTimeout(() => {
        setWaterCount((prev) => prev + 1)
        setIsAnimating(false)
      }, 100)
    }
  }

  const decreaseWater = () => {
    if (waterCount > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        setWaterCount((prev) => prev - 1)
        setIsAnimating(false)
      }, 100)
    }
  }

  // Fill percentage
  const fillPercentage = (waterCount / 8) * 100

  const now = new Date()
  const endOfDay = new Date()
  endOfDay.setHours(24, 0, 0, 0)
  const timeDiffMs = endOfDay - now
  const hoursLeft = Math.floor(timeDiffMs / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeDiffMs / (1000 * 60)) % 60)
  const timeLeftText = hoursLeft > 0 ? `${hoursLeft}h left` : `${minutesLeft}m left`

  // Settings page
  if (currentPage === "settings") {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">
        <div className="water-tracker-container">
          <div className="container">
            <header className="header">
              <button onClick={() => setCurrentPage("main")} className="back-button">
                ← Back to Dashboard
              </button>
              <h1 className="page-title">Settings</h1>
            </header>

            <div className="settings-card">
              <h2 className="settings-title">Water Tracker Settings</h2>

              <div className="settings-form">
                <div className="form-group">
                  <label className="form-label">Daily Water Goal</label>
                  <div className="form-control">
                    <select className="form-select">
                      <option>8 glasses (recommended)</option>
                      <option>6 glasses</option>
                      <option>10 glasses</option>
                      <option>12 glasses</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reminder Notifications</label>
                  <div className="form-control">
                    <label className="checkbox-label">
                      <input type="checkbox" className="form-checkbox" defaultChecked />
                      <span className="checkbox-text">Enable reminders</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reminder Frequency</label>
                  <div className="form-control">
                    <select className="form-select">
                      <option>Every 2 hours</option>
                      <option>Every hour</option>
                      <option>Every 3 hours</option>
                    </select>
                  </div>
                </div>

                <button className="save-button">Save Settings</button>
              </div>
            </div>
          </div>
          <style jsx>{`
            /* CSS styles */
            
            
            /* Container */
            .water-tracker-container {
              
              min-height: 100vh;
              width: 100vw;
              background: linear-gradient(to bottom,rgb(255, 255, 255),rgb(255, 255, 255));
              overflow-x: hidden;
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
            }
            
            .container {
            
              width: 100vw;
              max-width: none;
              margin: 0;
              padding: 2rem 1rem;
            }
            
            /* Header */
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
              width: 100%;
            }
            
            .logo {
              display: flex;
              align-items: center;
            }
            
            .water-icon {
              font-size: 2rem;
              margin-right: 0.5rem;
            }
            
            .page-title {
              font-size: 1.75rem;
              font-weight: bold;
              color: white;
            }
            
            .settings-button {
              background: transparent;
              border: none;
              color: white;
              cursor: pointer;
              padding: 0.5rem;
              border-radius: 50%;
              transition: background-color 0.2s;
            }
            
            .settings-button:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }
            
            .back-button {
              background: transparent;
              border: none;
              color: white;
              cursor: pointer;
              padding: 0.5rem 1rem;
              border-radius: 0.5rem;
              font-weight: bold;
              transition: background-color 0.2s;
            }
            
            .back-button:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }
            
            /* Settings Page */
            .settings-card {
              max-width: none;
              width: 100%;
              margin: 0 auto;
              background-color: white;
              border-radius: 1rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              padding: 1.5rem;
              overflow: hidden;
            }
            
            .settings-title {
              font-size: 1.5rem;
              font-weight: 600;
              color: #333;
              margin-bottom: 1.5rem;
            }
            
            .settings-form {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
            }
            
            .form-group {
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
            }
            
            .form-label {
              font-weight: 500;
              color: #4a5568;
            }
            
            .form-select {
              width: 100%;
              padding: 0.5rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.375rem;
              background-color: rgba(255, 255, 255, 0.205);
              font-size: 1rem;
              color: #1e1e1f
            }
            
            .checkbox-label {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            
            .form-checkbox {
              width: 1rem;
              height: 1rem;
            }
            
            .save-button {
              background-color: #39b4ff;
              color: white;
              border: none;
              border-radius: 0.5rem;
              padding: 0.75rem;
              font-weight: bold;
              cursor: pointer;
              transition: background-color 0.2s;
            }
            
            .save-button:hover {
              background-color: #2b9fe0;
            }
          `}</style>
        </div>
      </div>  
    )
  }

  // Main dashboard
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">
      
      {/* Back Home
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

      {/* Header
      <header className="text-center">
        <h1 className="text-5xl font-bold">Water Tracker</h1>
      </header> 
       */}
      
        <div className="water-tracker-container">
          <div className="container">
            <header className="header">
              <div className="logo">
                
              </div>
              <button onClick={() => setCurrentPage("settings")} className="settings-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </button>
              
            </header>

            <div className="dashboard-grid">
              {/* Main Water Tracker */}
              <div className="main-card">
                <div className="tracker-content">
                  {/* Water Droplet */}
                  <div className="droplet-container">
                    <div className="water-dropshape">
                      <div className="water-droplet">
                        <div className="water-fill" style={{ height: `${fillPercentage}%` }}></div>
                        <div className="droplet-number">{waterCount}</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats and Add Button */}
                  <div className="stats-container">
                    <div className="stats-grid">
                      <div className="stat-card">
                        <p className="stat-label">Daily Goal</p>
                        <p className="stat-value">{waterCount}/8</p>
                        <p className="stat-unit">glasses</p>
                      </div>
                      <div className="stat-card">
                        <p className="stat-label">Time Remaining</p>
                        <p className="stat-value">{timeLeftText}</p>
                        <p className="stat-unit">until midnight</p>
                      </div>
                    </div>

                    <button className={`add-water-button ${isAnimating ? "animate" : ""}`} onClick={addWater}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Add Water
                    </button>
                    <button className={`decrease-water-button ${isAnimating ? "animate" : ""}`} onClick={decreaseWater}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="17" x2="19" y2="17"></line>
                    </svg>
                    
                    </button>
                  </div>
                </div>
              </div>

              {/* History Card */}
              <div className="history-card">
                <h2 className="card-title">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  History
                </h2>

                <div className="history-list">
                  <div className="history-item">
                    <div className="history-icon">
                      <div className="droplet-icon"></div>
                    </div>
                    <div className="history-details">
                      <p className="history-date">Yesterday</p>
                      <p className="history-amount">8 glasses</p>
                      <p className="history-status completed">Goal completed</p>
                    </div>
                  </div>

                  <div className="history-item">
                    <div className="history-icon">
                      <div className="droplet-icon"></div>
                    </div>
                    <div className="history-details">
                      <p className="history-date">Saturday</p>
                      <p className="history-amount">6 glasses</p>
                      <p className="history-status">2 glasses left</p>
                    </div>
                  </div>

                  <div className="history-item">
                    <div className="history-icon">
                      <div className="droplet-icon"></div>
                    </div>
                    <div className="history-details">
                      <p className="history-date">1 Feb, 2019</p>
                      <p className="history-amount">8 glasses</p>
                      <p className="history-status completed">Goal completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="weekly-card">
              <h2 className="card-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Weekly Progress
              </h2>

              <div className="weekly-grid">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div key={day} className="day-column">
                    <div className="day-label">{day}</div>
                    <div className="day-bar-container">
                      <div
                        className="day-bar-fill"
                        style={{ height: `${index < 4 ? 100 : index === 4 ? 75 : index === 5 ? 75 : 0}%` }}
                      ></div>
                      <div className="day-bar-text">
                        {index < 4 ? "8/8" : index === 4 ? "6/8" : index === 5 ? "6/8" : "0/8"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style jsx>{`
            /* Reset CSS */

            
            /* Container */
            .water-tracker-container {
              min-height: 100vh;
              width: 100vw;
              
              overflow-x: hidden;
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
            }
            
            .container {
              width: 100vw;
              max-width: none;
              margin: 0;
              padding: 2rem 1rem;
            }
            
            /* Header */
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
              width: 100%;
            }
            
            .logo {
              display: flex;
              align-items: center;
            }
            
            .water-icon {
              font-size: 2rem;
              margin-right: 0.5rem;
            }
            
            .page-title {
              font-size: 1.75rem;
              font-weight: bold;
              color: white;
            }
            
            .settings-button {
              background: transparent;
              border: none;
              color: white;
              cursor: pointer;
              padding: 0.5rem;
              border-radius: 50%;
              transition: background-color 0.2s;
            }
            
            .settings-button:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }
            
            .back-button {
              background: transparent;
              border: none;
              color: white;
              cursor: pointer;
              padding: 0.5rem 1rem;
              border-radius: 0.5rem;
              font-weight: bold;
              transition: background-color 0.2s;
            }
            
            .back-button:hover {
              background-color: rgba(255, 255, 255, 0.2);
            }
            
            /* Dashboard Grid */
            .dashboard-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.5rem;
              width: 100%;
            }
            
            @media (min-width: 992px) {
              .dashboard-grid {
                grid-template-columns: 2fr 1fr;
              }
            }
            
            /* Cards */
            .main-card,
            .history-card,
            .weekly-card,
            .settings-card {
              width: 100%;
              background-color: white;
              border-radius: 1rem;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              padding: 1.5rem;
              overflow: hidden;
            }
            
            .card-title {
              display: flex;
              align-items: center;
              font-size: 1.25rem;
              font-weight: 600;
              color: #333;
              margin-bottom: 1rem;
            }
            
            .card-title svg {
              margin-right: 0.5rem;
              color: #39b4ff;
            }
            
            /* Tracker Content */
            .tracker-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2rem;
            }
            
            @media (min-width: 768px) {
              .tracker-content {
                flex-direction: row;
                align-items: center;
              }
            }
            
            /* Water Droplet */
            .droplet-container {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 40px 0;
              width: 240px;
              height: 240px;
            }
            
            .water-droplet {
              width: 240px;
              height: 280px;
              background: transparent;
              border-radius: 0%;
              rotate: 45deg;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              overflow: hidden;
            }
            
            .water-dropshape {
              top: 30px;
              width: 200px;
              height: 200px;
              background: transparent;
              border-radius: 90% 0% 90% 80%;
              rotate: -45deg;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
              border: 6px solid rgb(57, 180, 255);
              overflow: hidden;
            }
            
            .water-fill {
              position: absolute;
              bottom: 0;
              left: 0;
              
              width: 100%;
              background-color: rgb(57, 180, 255);
              opacity: 0.7;
              
              transition: height 0.5s ease-out;
            }
            
            .droplet-number {
              color: #39b4ff;
              font-size: 2.5rem;
              font-weight: bold;
              z-index: 1;
              
            }
            
            /* Stats */
            .stats-container {
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              width: 100%;
            }
            
            .stats-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1rem;
            }
            
            .stat-card {
              background-color: #f0f9ff;
              padding: 1rem;
              border-radius: 0.5rem;
              text-align: center;
            }
            
            .stat-label {
              color: #4a5568;
              font-size: 0.875rem;
              font-weight: 500;
            }
            
            .stat-value {
              color: #39b4ff;
              font-size: 1.5rem;
              font-weight: bold;
              margin: 0.25rem 0;
            }
            
            .stat-unit {
              color: #718096;
              font-size: 0.75rem;
            }
            
            /* Add Water Button */
            .add-water-button {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              width: 100%;
              padding: 0.75rem;
              background: linear-gradient(to right, #ffa07a, #ff8c00);
              color: white;
              border: none;
              border-radius: 0.5rem;
              font-weight: bold;
              cursor: pointer;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .add-water-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .add-water-button.animate {
              animation: pulse 0.2s ease-in-out;
            }
            
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
              }
            }
            
            /* Decrease Water Button */
            .decrease-water-button {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              width: 100%;
              padding: 0.75rem;
              background: linear-gradient(to right, #fabaa0, #ffd29b);
              color: white;
              border: none;
              border-radius: 0.5rem;
              font-weight: bold;
              cursor: pointer;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .decrease-water-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .decrease-water-button.animate {
              animation: pulse 0.2s ease-in-out;
            }
            
            /* History */
            .history-list {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            
            .history-item {
              display: flex;
              align-items: center;
              background-color: #f0f9ff;
              padding: 0.75rem;
              border-radius: 0.5rem;
            }
            
            .history-icon {
              width: 2.5rem;
              height: 2.5rem;
              background-color: #39b4ff;
              border-radius: 0.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 1rem;
            }
            
            .droplet-icon {
              width: 1.25rem;
              height: 1.25rem;
              background-color: white;
              border-radius: 90% 0% 90% 80%;
              transform: rotate(-45deg);
            }
            
            .history-details {
              flex: 1;
            }
            
            .history-date {
              color: #718096;
              font-size: 0.875rem;
            }
            
            .history-amount {
              color: #39b4ff;
              font-weight: bold;
              font-size: 1.125rem;
            }
            
            .history-status {
              color: #718096;
              font-size: 0.875rem;
            }
            
            .history-status.completed {
              color: #48bb78;
            }
            
            /* Weekly Progress */
            .weekly-card {
              margin-top: 1.5rem;
            }
            
            .weekly-grid {
              display: grid;
              grid-template-columns: repeat(7, 1fr);
              gap: 0.5rem;
            }
            
            .day-column {
              text-align: center;
            }
            
            .day-label {
              font-size: 0.875rem;
              color: #718096;
              margin-bottom: 0.5rem;
            }
            
            .day-bar-container {
              height: 8rem;
              background-color: #f0f9ff;
              border-radius: 0.5rem;
              position: relative;
              overflow: hidden;
            }
            
            .day-bar-fill {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              background-color: #39b4ff;
              transition: height 0.5s ease-in-out;
            }
            
            .day-bar-text {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: #2c5282;
              font-size: 0.875rem;
            }
          `}</style>
        </div>

    </div>
  )
}