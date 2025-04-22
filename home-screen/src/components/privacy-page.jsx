"use client"
import { useState } from "react"

const PrivacyPage = ({ onBack, userName, dateOfBirth, updateUserName, updateDateOfBirth, darkMode }) => {
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingDOB, setIsEditingDOB] = useState(false)
  const [tempName, setTempName] = useState(userName)
  const [tempDOB, setTempDOB] = useState(dateOfBirth)

  const handleNameEdit = () => {
    if (isEditingName) {
      updateUserName(tempName)
      setIsEditingName(false)
    } else {
      setIsEditingName(true)
    }
  }

  const handleDOBEdit = () => {
    if (isEditingDOB) {
      updateDateOfBirth(tempDOB)
      setIsEditingDOB(false)
    } else {
      setIsEditingDOB(true)
    }
  }

  return (
    <div className="sub-page">
      <div className="sub-page-header">
        <div className="back-button" onClick={onBack}>
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
        <h1>Privacy</h1>
      </div>

      <div className="sub-page-content">
        <div className="setting-group">
          <h3>Personal Information</h3>

          <div className="setting-item">
            <div className="setting-text">Name</div>
            <div className="setting-control">
              {isEditingName ? (
                <div className="edit-field">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className={`edit-input ${darkMode ? "dark-mode" : ""}`}
                  />
                  <button onClick={handleNameEdit} className="save-button">
                    Save
                  </button>
                </div>
              ) : (
                <div className="clickable-field" onClick={handleNameEdit}>
                  <span>{userName}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="edit-icon"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke={darkMode ? "#ffffff" : "#000000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-text">Date of birth</div>
            <div className="setting-control">
              {isEditingDOB ? (
                <div className="edit-field">
                  <input
                    type="text"
                    value={tempDOB}
                    onChange={(e) => setTempDOB(e.target.value)}
                    className={`edit-input ${darkMode ? "dark-mode" : ""}`}
                    placeholder="MM/DD/YYYY"
                  />
                  <button onClick={handleDOBEdit} className="save-button">
                    Save
                  </button>
                </div>
              ) : (
                <div className="clickable-field" onClick={handleDOBEdit}>
                  <span>{dateOfBirth}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="edit-icon"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke={darkMode ? "#ffffff" : "#000000"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="setting-group">
          <h3>Account Privacy</h3>

          <div className="setting-item">
            <div className="setting-text">Profile Visibility</div>
            <div className="setting-control">
              <span>Public</span>
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

          <div className="setting-item">
            <div className="setting-text">Activity Status</div>
            <div className="setting-control">
              <label className="toggle">
                <input type="checkbox" defaultChecked={true} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-text">Data Download</div>
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
      </div>
    </div>
  )
}

export default PrivacyPage
