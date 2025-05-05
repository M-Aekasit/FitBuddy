// Function to toggle individual notification settings
export const toggleNotificationSetting = (setting, notificationSettings, setNotificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }
  
  // Function to update main notification toggle based on individual settings
  export const updateMainNotificationToggle = (notificationSettings, setNotifications) => {
    const anyEnabled = Object.values(notificationSettings).some((value) => value === true)
    setNotifications(anyEnabled)
  }
  
  // Function to handle turning off all notifications
  export const turnOffAllNotifications = (setNotificationSettings) => {
    setNotificationSettings({
      foodReminder: false,
      waterReminder: false,
      exerciseReminder: false,
    })
  }
  
  // Function to validate and update username
  export const updateUsername = (newUsername, setUsername, setShowUsernameModal) => {
    if (newUsername.trim()) {
      setUsername(newUsername)
      setShowUsernameModal(false)
      alert("Username updated successfully")
      return true
    } else {
      alert("Username cannot be empty")
      return false
    }
  }
  
  // Function to validate and update password
  export const updatePassword = (
    currentPassword,
    newPassword,
    confirmPassword,
    setShowPasswordModal,
    resetPasswordFields,
  ) => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All fields are required")
      return false
    } else if (newPassword !== confirmPassword) {
      alert("New passwords do not match")
      return false
    } else {
      setShowPasswordModal(false)
      resetPasswordFields()
      alert("Password changed successfully")
      return true
    }
  }
  
  // Function to handle logout confirmation
  export const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      alert("You have been logged out successfully")
      return true
    }
    return false
  }
  
  // Function to reset password fields
  export const resetPasswordFields = (setCurrentPassword, setNewPassword, setConfirmPassword) => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }
  