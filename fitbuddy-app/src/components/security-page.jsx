"use client"

const SecurityPage = ({ onBack, darkMode }) => {
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
        <h1>Security</h1>
      </div>

      <div className="sub-page-content">
        <div className="setting-group">
          <h3>Account Security</h3>

          <div className="setting-item">
            <div className="setting-text">Change Password</div>
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

          <div className="setting-item">
            <div className="setting-text">Two-Factor Authentication</div>
            <div className="setting-control">
              <label className="toggle">
                <input type="checkbox" defaultChecked={false} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="setting-group">
          <h3>Login Security</h3>

          <div className="setting-item">
            <div className="setting-text">Face ID</div>
            <div className="setting-control">
              <label className="toggle">
                <input type="checkbox" defaultChecked={true} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-text">Remember Login</div>
            <div className="setting-control">
              <label className="toggle">
                <input type="checkbox" defaultChecked={true} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-text">Trusted Devices</div>
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

export default SecurityPage
