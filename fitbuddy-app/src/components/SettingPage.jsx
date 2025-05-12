import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  toggleNotificationSetting,
  updateMainNotificationToggle,
  turnOffAllNotifications,
  updateUsername,
  updatePassword,
  handleLogout,
  resetPasswordFields,
  saveSettingsToServer,
  fetchSettingsFromServer,
} from "../utils/SettingCalculations";

export default function SettingsPage() {
  // สร้าง navigate function จาก React Router
  const navigate = useNavigate();

  // สร้าง state สำหรับเก็บข้อมูลการตั้งค่าทั้งหมด
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userId, setUserId] = useState("user123"); // ในระบบจริงควรใช้ ID จากระบบ authentication
  const [passwordLastChanged, setPasswordLastChanged] = useState(null);
  const [serverPassword, setServerPassword] = useState("");

  // เปลี่ยน URL รูปโปรไฟล์เป็น URL ใหม่
  const [profileImage, setProfileImage] = useState(
    "https://i.pinimg.com/736x/d9/7b/bb/d97bbb08017ac2309307f0822e63d082.jpg"
  );

  // สร้าง state สำหรับเก็บการตั้งค่าทั้งหมด
  const [allSettings, setAllSettings] = useState({});

  // โหลดการตั้งค่าจาก server เมื่อ component โหลด
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSettingsFromServer(userId);

        if (data && data.settings) {
          const { settings } = data;
          // เก็บการตั้งค่าทั้งหมดไว้ใน state
          setAllSettings(settings);

          // อัปเดต state ด้วยข้อมูลจาก server
          setDarkMode(settings.darkMode || false);
          setNotifications(settings.notifications || true);
          setCalorieGoal(settings.calorieGoal || 2000);
          setWaterGoal(settings.waterGoal || 8);
          setUsername(settings.username || "Username");
          setNotificationSettings(
            settings.notificationSettings || {
              foodReminder: true,
              waterReminder: true,
              exerciseReminder: true,
            }
          );

          // เก็บข้อมูลเกี่ยวกับการเปลี่ยนรหัสผ่านล่าสุด
          if (settings.passwordLastChanged) {
            setPasswordLastChanged(new Date(settings.passwordLastChanged));
          }

          // เก็บรหัสผ่านปัจจุบัน (ถ้ามี)
          if (settings.currentPassword) {
            // ในระบบจริงไม่ควรดึงรหัสผ่านมาเก็บไว้ใน state
            // นี่เป็นเพียงตัวอย่างสำหรับการทดสอบเท่านั้น
            console.log(
              "Current password loaded from server:",
              settings.currentPassword
            );
            setServerPassword(settings.currentPassword);
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [userId]);

  // บันทึกการตั้งค่าไปยัง server
  const saveSettings = async () => {
    try {
      setIsSaving(true);

      // รวบรวมการตั้งค่าทั้งหมด
      const settings = {
        ...allSettings, // เก็บการตั้งค่าเดิมทั้งหมด
        darkMode,
        notifications,
        calorieGoal,
        waterGoal,
        username,
        notificationSettings,
        profileImage, // ยังคงเก็บรูปโปรไฟล์ไว้ในการตั้งค่า
        updatedAt: new Date().toISOString(),
      };

      // อัปเดต state allSettings
      setAllSettings(settings);

      // บันทึกไปยัง server
      await saveSettingsToServer(userId, settings);

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Function to go back to main settings page
  const goBackToSettings = () => {
    setShowNotificationsPage(false);
  };

  // Function to reset password fields
  const handleResetPasswordFields = () => {
    resetPasswordFields(setCurrentPassword, setNewPassword, setConfirmPassword);
  };

  // แสดง loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-xl font-semibold">Loading settings...</div>
      </div>
    );
  }

  // ฟอร์แมตวันที่เปลี่ยนรหัสผ่านล่าสุด
  const formatPasswordLastChanged = () => {
    if (!passwordLastChanged) return "Never";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(passwordLastChanged);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 p-6 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          {/* รูปโปรไฟล์ (ไม่สามารถคลิกเพื่อเปลี่ยนได้แล้ว) */}
          <div className="w-50 h-50 rounded-full overflow-hidden mb-2">
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">{username}</h2>
        </div>

        <div className="space-y-4 mb-auto"></div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-4"></h3>
          <div className="space-y-4">

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
                    {passwordLastChanged && (
                      <span className="block mt-1">
                        Last changed: {formatPasswordLastChanged()}
                      </span>
                    )}
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
                        turnOffAllNotifications(setNotificationSettings);
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

              <button
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                onClick={saveSettings}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
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
                    toggleNotificationSetting(
                      "foodReminder",
                      notificationSettings,
                      setNotificationSettings
                    );
                    setTimeout(
                      () =>
                        updateMainNotificationToggle(
                          notificationSettings,
                          setNotifications
                        ),
                      0
                    );
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
                    toggleNotificationSetting(
                      "waterReminder",
                      notificationSettings,
                      setNotificationSettings
                    );
                    setTimeout(
                      () =>
                        updateMainNotificationToggle(
                          notificationSettings,
                          setNotifications
                        ),
                      0
                    );
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
                    toggleNotificationSetting(
                      "exerciseReminder",
                      notificationSettings,
                      setNotificationSettings
                    );
                    setTimeout(
                      () =>
                        updateMainNotificationToggle(
                          notificationSettings,
                          setNotifications
                        ),
                      0
                    );
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

              <button
                className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                onClick={saveSettings}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Notification Settings"}
              </button>
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
                  onClick={async () => {
                    // ส่งข้อมูลไปยัง server ทันที
                    const success = await updateUsername(
                      newUsername,
                      setUsername,
                      setShowUsernameModal,
                      userId,
                      allSettings
                    );
                    if (success) {
                      // อัปเดต allSettings
                      setAllSettings((prev) => ({
                        ...prev,
                        username: newUsername,
                      }));
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
                <p className="text-xs text-gray-500 mt-1">
                  For testing, use "A123456" or your current password
                </p>
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
                    handleResetPasswordFields();
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={async () => {
                    const success = await updatePassword(
                      currentPassword,
                      newPassword,
                      confirmPassword,
                      setShowPasswordModal,
                      () => handleResetPasswordFields(),
                      userId,
                      serverPassword // ส่งรหัสผ่านจาก server ไปด้วย
                    );
                    if (success) {
                      // ถ้าเปลี่ยนรหัสผ่านสำเร็จ อัปเดตวันที่เปลี่ยนรหัสผ่านล่าสุด
                      setPasswordLastChanged(new Date());
                      // อัปเดตรหัสผ่านใหม่ใน state
                      setServerPassword(newPassword);
                      // อัปเดต allSettings
                      setAllSettings((prev) => ({
                        ...prev,
                        currentPassword: newPassword,
                        passwordLastChanged: new Date().toISOString(),
                      }));
                      console.log("Password changed successfully");
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
