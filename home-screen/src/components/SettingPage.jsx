import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [waterGoal, setWaterGoal] = useState(8);
  const [username, setUsername] = useState("Username");
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsPage, setShowNotificationsPage] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notificationSettings, setNotificationSettings] = useState({
    foodReminder: true,
    waterReminder: true,
    exerciseReminder: true,
  });

  // Function to handle toggling individual notification settings
  const toggleNotificationSetting = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  // Function to go back to main settings page
  const goBackToSettings = () => {
    setShowNotificationsPage(false);
  };

  // If any notification is enabled, the main notifications toggle should be on
  const updateMainNotificationToggle = () => {
    const anyEnabled = Object.values(notificationSettings).some(
      (value) => value === true
    );
    setNotifications(anyEnabled);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <div className="w-50 h-50 rounded-full overflow-hidden mb-2">
            <img
              src="https://i.pinimg.com/736x/33/86/26/3386260445cf60272605e4ecc4c492f1.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">{username}</h2>
        </div>

        <div className="space-y-4 mb-auto"></div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4">Support</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                    🏳️
                  </div>
                  <span className="text-sm font-medium">Help Center</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  Get help with using the app
                </p>
              </div>
              <span className="text-xs text-blue-500 cursor-pointer">
                Visit
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                    📲
                  </div>
                  <span className="text-sm font-medium">Log Out</span>
                </div>
                <p className="text-xs text-gray-500 ml-6">
                  Sign out of your account
                </p>
              </div>
              <span
                className="text-xs text-red-500 cursor-pointer"
                onClick={() => {
                  if (window.confirm("Are you sure you want to logout?")) {
                    // ล้าง token
                    localStorage.removeItem("token");

                    // เปลี่ยนเส้นทางกลับไปหน้า Login
                    navigate("/login");
                  }
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {!showNotificationsPage ? (
          // Main Settings Page
          <>
            <div className="mb-4">
              <h1 className="text-xl font-semibold mb-2">Setting</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Account</h2>

              <div className="border-b border-gray-100 py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                      👤
                    </div>
                    <span className="text-sm font-medium">
                      Profile Information
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    Update your personal details
                  </p>
                </div>
                <button
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => {
                    setNewUsername(username);
                    setShowUsernameModal(true);
                  }}
                >
                  Edit
                </button>
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                      🔒
                    </div>
                    <span className="text-sm font-medium">Password</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    Change your password
                  </p>
                </div>
                <button
                  className="text-sm text-gray-500 cursor-pointer"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Preferences</h2>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                    🌗
                  </div>
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    darkMode ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div
                className="border-b border-gray-100 py-4 flex items-center justify-between cursor-pointer"
                onClick={() => setShowNotificationsPage(true)}
              >
                <div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                      🔔
                    </div>
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    Manage notification settings
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      notifications ? "bg-green-500" : "bg-gray-200"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onClick
                      setNotifications(!notifications);
                      // If turning off all notifications, set all individual settings to false
                      if (notifications) {
                        setNotificationSettings({
                          foodReminder: false,
                          waterReminder: false,
                          exerciseReminder: false,
                        });
                      }
                    }}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        notifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="ml-3 text-2xl text-gray-400">›</span>
                </div>
              </div>

              <div className="border-b border-gray-100 py-4">
                <label className="block text-sm font-medium mb-1">
                  Daily Calorie Goal
                </label>
                <input
                  type="number"
                  value={calorieGoal}
                  onChange={(e) => setCalorieGoal(Number(e.target.value))}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>

              <div className="py-4">
                <label className="block text-sm font-medium mb-1">
                  Daily Water Goal (glasses)
                </label>
                <input
                  type="number"
                  value={waterGoal}
                  onChange={(e) => setWaterGoal(Number(e.target.value))}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
            </div>
          </>
        ) : (
          // Notifications Detail Page
          <>
            <div className="mb-4 flex items-center">
              <button
                className="mr-3 text-2xl text-gray-500 cursor-pointer"
                onClick={goBackToSettings}
              >
                ‹
              </button>
              <h1 className="text-xl font-semibold">Notifications</h1>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="py-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                    🍽️
                  </div>
                  <span className="text-sm font-medium">Food reminder</span>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.foodReminder
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    toggleNotificationSetting("foodReminder");
                    setTimeout(updateMainNotificationToggle, 0);
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notificationSettings.foodReminder
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="py-4 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                    💧
                  </div>
                  <span className="text-sm font-medium">Water reminder</span>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.waterReminder
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    toggleNotificationSetting("waterReminder");
                    setTimeout(updateMainNotificationToggle, 0);
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notificationSettings.waterReminder
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 mr-4">
                    🏃
                  </div>
                  <span className="text-sm font-medium">Exercise reminder</span>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notificationSettings.exerciseReminder
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                  onClick={() => {
                    toggleNotificationSetting("exerciseReminder");
                    setTimeout(updateMainNotificationToggle, 0);
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      notificationSettings.exerciseReminder
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </>
        )}

        {/* Username Modal */}
        {showUsernameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Change Username</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  New Username
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setShowUsernameModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => {
                    if (newUsername.trim()) {
                      setUsername(newUsername);
                      setShowUsernameModal(false);
                      alert("Username updated successfully");
                    } else {
                      alert("Username cannot be empty");
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => {
                    if (!currentPassword || !newPassword || !confirmPassword) {
                      alert("All fields are required");
                    } else if (newPassword !== confirmPassword) {
                      alert("New passwords do not match");
                    } else {
                      setShowPasswordModal(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                      alert("Password changed successfully");
                    }
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
