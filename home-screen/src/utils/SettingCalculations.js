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
export const updateUsername = async (newUsername, setUsername, setShowUsernameModal, userId, settings) => {
  if (!newUsername.trim()) {
    alert("Username cannot be empty")
    return false
  }

  try {
    // อัปเดต settings ด้วยชื่อผู้ใช้ใหม่
    const updatedSettings = {
      ...settings,
      username: newUsername,
      updatedAt: new Date().toISOString(),
    }

    // ส่งข้อมูลไปยัง server ทันที
    await saveSettingsToServer(userId, updatedSettings)

    // อัปเดต state
    setUsername(newUsername)
    setShowUsernameModal(false)
    alert("Username updated successfully")
    return true
  } catch (error) {
    console.error("Failed to update username:", error)
    alert("Failed to update username. Please try again.")
    return false
  }
}

// Function to validate and update password
export const updatePassword = async (
  currentPassword,
  newPassword,
  confirmPassword,
  setShowPasswordModal,
  resetPasswordFields,
  userId,
  serverPassword,
) => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("All fields are required")
    return false
  } else if (newPassword !== confirmPassword) {
    alert("New passwords do not match")
    return false
  } else if (currentPassword !== "A123456" && currentPassword !== serverPassword) {
    // ตรวจสอบกับทั้งรหัสผ่านทดสอบ A123456 และรหัสผ่านจริงจาก server
    alert("Current password is incorrect")
    return false
  } else {
    try {
      // ส่งข้อมูลการเปลี่ยนรหัสผ่านไปยัง server
      const response = await fetch("http://localhost:5001/api/settings/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          oldPassword: currentPassword,
          newPassword: newPassword, // ไม่ต้องเข้ารหัส
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const result = await response.json()
      console.log("✅ Password changed successfully:", result)

      setShowPasswordModal(false)
      resetPasswordFields()
      alert("Password changed successfully")
      return true
    } catch (error) {
      console.error("❌ Error changing password:", error)
      alert("Failed to change password. Please try again.")
      return false
    }
  }
}

// Function to handle logout confirmation
export const handleLogout = (navigate) => {
  if (window.confirm("Are you sure you want to logout?")) {
    alert("You have been logged out successfully")

    // นำทางไปยังหน้า HealthDashboard หลังจาก logout
    if (navigate) {
      navigate("/HealthDashboard")
    }

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

// ฟังก์ชันสำหรับการบันทึกการตั้งค่าไปยัง server
export const saveSettingsToServer = async (userId, settings) => {
  try {
    console.log("📤 Sending settings to server:", { userId, settings })
    const response = await fetch("http://localhost:5001/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        settings,
      }),
    })

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const result = await response.json()
    console.log("✅ Server response:", result)
    return result
  } catch (error) {
    console.error("❌ Error saving settings to server:", error)
    throw error
  }
}

// ฟังก์ชันสำหรับการดึงการตั้งค่าจาก server
export const fetchSettingsFromServer = async (userId) => {
  try {
    console.log("🔄 Fetching settings from server for user:", userId)
    const response = await fetch(`http://localhost:5001/api/settings/${userId}`)

    if (response.status === 404) {
      console.log("⚠️ No settings found for user:", userId)
      return null
    }

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("✅ Received settings:", data)
    return data
  } catch (error) {
    console.error("❌ Error fetching settings:", error)
    throw error
  }
}

// ฟังก์ชันสำหรับการอัปโหลดรูปโปรไฟล์ (ไม่ใช้แล้ว แต่ยังคงเก็บไว้เผื่อต้องการใช้ในอนาคต)
// export const uploadProfileImage = async (userId, imageFile, settings) => {
//   try {
//     // แปลงไฟล์รูปภาพเป็น base64
//     const base64Image = await convertFileToBase64(imageFile)
//
//     // อัปเดต settings ด้วยรูปภาพใหม่
//     const updatedSettings = {
//       ...settings,
//       profileImage: base64Image,
//       updatedAt: new Date().toISOString(),
//     }
//
//     // ส่งข้อมูลไปยัง server
//     await saveSettingsToServer(userId, updatedSettings)
//
//     return base64Image
//   } catch (error) {
//     console.error("Failed to upload profile image:", error)
//     throw error
//   }
// }

// ฟังก์ชันสำหรับแปลงไฟล์เป็น base64 (ไม่ใช้แล้ว แต่ยังคงเก็บไว้เผื่อต้องการใช้ในอนาคต)
// const convertFileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = (error) => reject(error)
//   })
// }
