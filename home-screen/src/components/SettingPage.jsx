"use client"
import { useState } from "react"
import PrivacyPage from "./privacy-page"
import SecurityPage from "./security-page"

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [currentPage, setCurrentPage] = useState("settings")
  const [userName, setUserName] = useState("Chiba Obaba")
  const [dateOfBirth, setDateOfBirth] = useState("8/7/2003")

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleNotifications = () => setNotifications(!notifications)
  const navigateTo = (page) => setCurrentPage(page)
  const updateUserName = (name) => setUserName(name)
  const updateDateOfBirth = (dob) => setDateOfBirth(dob)

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
            <div className={`w-full flex flex-col items-center relative pb-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="absolute left-0 top-0 p-2 cursor-pointer">
                <svg width="24" height="24" fill="none" stroke={darkMode ? "#fff" : "#000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18L9 12L15 6" />
                </svg>
              </div>
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-2">
                <img src="https://i.pinimg.com/736x/33/86/26/3386260445cf60272605e4ecc4c492f1.jpg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-2xl font-bold mb-2">{userName}</div>
              <div className="w-full max-w-[250px] mb-4 text-sm">
                <div className={darkMode ? 'text-gray-300 mb-1' : 'text-gray-600 mb-1'}>Previous BMI : 16.7</div>
                <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Current BMI : 17.6</div>
              </div>
            </div>

            <div className="w-full mt-5">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>

              {/* Dark Mode Toggle */}
              <div className={`flex items-center py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 mr-4">
                  🌗
                </div>
                <div className="flex-1 text-lg">Dark Mode</div>
                <label className="relative inline-block w-[50px] h-[24px]">
                  <input type="checkbox" className="opacity-0 w-0 h-0 peer" checked={darkMode} onChange={toggleDarkMode} />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-[34px] transition peer-checked:bg-blue-500
                    before:content-[''] before:absolute before:h-[20px] before:w-[20px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-[26px]" />
                </label>
              </div>

              {/* Notifications Toggle */}
              <div className={`flex items-center py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                  🔔
                </div>
                <div className="flex-1 text-lg">Notifications</div>
                <label className="relative inline-block w-[50px] h-[24px]">
                  <input type="checkbox" className="opacity-0 w-0 h-0 peer" checked={notifications} onChange={toggleNotifications} />
                  <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-[34px] transition peer-checked:bg-blue-500
                    before:content-[''] before:absolute before:h-[20px] before:w-[20px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:transition peer-checked:before:translate-x-[26px]" />
                </label>
              </div>

              {/* Privacy Page */}
              <div className={`flex items-center py-4 border-b cursor-pointer ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} onClick={() => navigateTo("privacy")}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">🔒</div>
                <div className="flex-1 text-lg">Privacy</div>
                <div>➡️</div>
              </div>

              {/* Security Page */}
              <div className={`flex items-center py-4 border-b cursor-pointer ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} onClick={() => navigateTo("security")}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">🛡️</div>
                <div className="flex-1 text-lg">Security</div>
                <div>➡️</div>
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-900">
      <div className={`w-[450px] h-[900px] rounded-[80px] border-[10px] shadow-lg flex flex-col overflow-hidden relative ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="bg-black text-white w-full py-4 text-4xl font-bold flex justify-center items-center gap-2">
          <span>⚙️</span>Setting
        </div>
        <div className={`flex-1 flex flex-col px-6 py-4 overflow-y-auto transition-colors duration-300 ${darkMode ? 'bg-gradient-to-b from-zinc-900 to-zinc-800' : 'bg-gradient-to-b from-white to-white'}`}>
          {renderPage()}
        </div>
      </div>
    </div>
  )
}
