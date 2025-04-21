"use client"

import { useState } from "react"
import "./App.css"
import PrivacyPage from "./privacy-page"
import SecurityPage from "./security-page"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [currentPage, setCurrentPage] = useState("settings") // "settings", "privacy", or "security"
  const [userName, setUserName] = useState("Chiba Obaba")
  const [dateOfBirth, setDateOfBirth] = useState("8/7/2003")

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const updateUserName = (name) => {
    setUserName(name)
  }

  const updateDateOfBirth = (dob) => {
    setDateOfBirth(dob)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "privacy":
        return (
          <PrivacyPage
            onBack={() => navigateTo("settings")}
            userName={userName}
            dateOfBirth={dateOfBirth}
            updateUserName={updateUserName}
            updateDateOfBirth={updateDateOfBirth}
            darkMode={darkMode}
          />
        )
      case "security":
        return <SecurityPage onBack={() => navigateTo("settings")} darkMode={darkMode} />
      default:
        return (
          <>
            <div className="profile-section">
              <div className="back-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke={darkMode ? "#ffffff" : "#000000"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="profile-image">
                <img src="https://i.pinimg.com/736x/33/86/26/3386260445cf60272605e4ecc4c492f1.jpg" alt="Profile" />
              </div>
              <div className="profile-name">{userName}</div>
              <div className="bmi-info">
                <div className="bmi-row">Previous BMI : 16.7</div>
                <div className="bmi-row">Current BMI : 17.6</div>
              </div>
              {/* <button className="upgrade-button">Upgrade Now - Go Pro</button> */}
            </div>

            <div className="settings-section">
              <h2>Settings</h2>

              <div className="setting-item">
                <div className="setting-icon dark-mode-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                    />
                    <path
                      d="M12 2V4"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 20V22"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 12H2"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M22 12H20"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.7778 4.22266L17.5558 6.25424"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4.22217 4.22266L6.44418 6.25424"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6.44434 17.5557L4.22211 19.7779"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19.7778 19.7773L17.5558 17.5551"
                      stroke={darkMode ? "#ffffff" : "#1C274C"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="setting-text">Dark Mode</div>
                <div className="setting-control">
                  <label className="toggle">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-icon notification-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                      stroke="#FF4D6D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                      stroke="#FF4D6D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="setting-text">Notifications</div>
                <div className="setting-control">
                  <label className="toggle">
                    <input type="checkbox" checked={notifications} onChange={toggleNotifications} />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <div className="setting-item" onClick={() => navigateTo("privacy")}>
                <div className="setting-icon privacy-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 10V14M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                      stroke="#FF4D6D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V8.01"
                      stroke="#FF4D6D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="setting-text">Privacy</div>
                <div className="setting-control">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke={darkMode ? "#ffffff" : "#000000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="setting-item" onClick={() => navigateTo("security")}>
                <div className="setting-icon security-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                      stroke="#FF4D6D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                      stroke="#FF4D6D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="setting-text">Security</div>
                <div className="setting-control">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke={darkMode ? "#ffffff" : "#000000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <>
      <div className="app-container"></div>

      <div className={`iphone-frame ${darkMode ? "dark-mode" : ""}`}>
        <div className="header">
          <span className="water-icon">⚙️</span>Setting
        </div>
        <div className={`app-content ${darkMode ? "dark-mode" : ""}`}>{renderPage()}</div>
      </div>
    </>
  )
}

export default App
