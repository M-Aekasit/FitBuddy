"use client"

import { useState } from "react"
import "./App.css"

function App() {
  const [waterCount, setWaterCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentPage, setCurrentPage] = useState("main")

  const addWater = () => {
    if (waterCount < 8) {
      setIsAnimating(true)
      setTimeout(() => {
        setWaterCount((prev) => prev + 1)
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

  // ถ้าอยู่ในหน้าว่าง (blank page)
  if (currentPage === "blank") {
    return (
      <div className="iphone-frame">
        <div className="header">
          <span className="water-icon">💧</span>Water Page
        </div>
        <div className="app-content blank-page">
          <button className="back-button" onClick={() => setCurrentPage("main")}>
            ← Back
          </button>
          <p>content</p>
          
        </div>
      </div>
    )
  }

  // หน้าหลัก
  return (
    <>
      <div className="app-container"></div>

      <div className="iphone-frame">
        <div className="header">
          <span className="water-icon">💧</span>Water Page
        </div>
        <div className="app-content">
          {/* Water Droplet */}
          <div className="water-droplet-container">
            <div className="water-dropshape">
              <div className="water-droplet">
                <div className="water-fill" style={{ height: `${fillPercentage}%` }}></div>
                <div className="droplet-number">{waterCount}</div>
              </div>
            </div>
          </div>

          {/* Water Stats */}
          <div className="water-stats">
            <div className="stat">{waterCount}/8 glasses</div>
            <div className="divider"></div>
            <div className="stat">{timeLeftText}</div>
          </div>

          {/* History Section */}
          <div className="history-section">
            <div className="history-item">
              <div className="history-icon">
                <div className="droplet-icon"></div>
              </div>
              <div className="history-details">
                <div className="history-date">yesterday</div>
                <div className="history-amount">8 glasses</div>
                <div className="history-status completed">Goal completed</div>
              </div>
            </div>

            <div className="history-item">
              <div className="history-icon">
                <div className="droplet-icon"></div>
              </div>
              <div className="history-details">
                <div className="history-date">saturday</div>
                <div className="history-amount">6 glasses</div>
                <div className="history-status">2 glasses left</div>
              </div>
            </div>

            <div className="history-item">
              <div className="history-icon">
                <div className="droplet-icon"></div>
              </div>
              <div className="history-details">
                <div className="history-date">1 Feb, 2019</div>
                <div className="history-amount">8 glasses</div>
                <div className="history-status completed">Goal completed</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button className={`wpage-button ${isAnimating ? "pulse" : ""}`} onClick={() => setCurrentPage("blank")}>
            =
          </button>
          <button className={`add-button ${isAnimating ? "pulse" : ""}`} onClick={addWater}>
            +
          </button>
        </div>
      </div>
    </>
  )
}

export default App
