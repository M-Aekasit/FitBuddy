// Format date to display (Today, Yesterday, or day name)
export const getFormattedDate = (daysAgo) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)

  if (daysAgo === 1) return "Yesterday"
  if (daysAgo === 0) return "Today"

  // For days within the current week, show day name
  if (daysAgo < 7) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return dayNames[date.getDay()]
  }

  // For older dates, show date format
  return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}, ${date.getFullYear()}`
}

// Calculate fill percentage based on water count
export const calculateFillPercentage = (waterCount, maxCount = 8) => {
  return (waterCount / maxCount) * 100
}

// Calculate time remaining until end of day
export const calculateTimeRemaining = () => {
  const now = new Date()
  const endOfDay = new Date()
  endOfDay.setHours(24, 0, 0, 0)
  const timeDiffMs = endOfDay - now
  const hoursLeft = Math.floor(timeDiffMs / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeDiffMs / (1000 * 60)) % 60)
  return hoursLeft > 0 ? `${hoursLeft}h left` : `${minutesLeft}m left`
}

// Get date key in YYYY-MM-DD format for a specific day
export const getDateKey = (daysAgo = 0) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split("T")[0]
}

// Get current week days for weekly progress
export const getCurrentWeekDays = () => {
  const days = []
  const today = new Date()
  const currentDay = today.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Calculate the Monday of this week
  const monday = new Date(today)
  monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1))

  // Generate array of weekdays
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    days.push({
      name: day.toLocaleString("default", { weekday: "short" }),
      date: day.toISOString().split("T")[0],
      isToday: day.toDateString() === today.toDateString(),
    })
  }

  return days
}

// Save water data to server
export const saveWaterDataToServer = async (waterData) => {
  try {
    console.log("📤 Sending water data to server:", waterData)
    const response = await fetch("http://localhost:5000/api/water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waterData),
    })

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const result = await response.json()
    console.log("✅ Server response:", result)
    return result
  } catch (error) {
    console.error("❌ Error saving water data to server:", error)
    throw error
  }
}

// Fetch water history from server
export const fetchWaterHistoryFromServer = async () => {
  try {
    console.log("🔄 Fetching water history from server...")
    const response = await fetch("http://localhost:5000/api/water/history")

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("✅ Received water history:", data)
    return data
  } catch (error) {
    console.error("❌ Error fetching water history:", error)
    throw error
  }
}

// Process water history data from server into the format needed for the UI
export const processWaterHistoryData = (serverData) => {
  // Initialize empty history object
  const processedHistory = {}

  // Group data by date and find the latest water count for each date
  serverData.forEach((item) => {
    const date = new Date(item.timestamp)
    const dateKey = date.toISOString().split("T")[0]

    // If this is the first entry for this date or it's newer than what we have
    if (!processedHistory[dateKey] || new Date(item.timestamp) > new Date(processedHistory[dateKey].timestamp)) {
      processedHistory[dateKey] = {
        waterCount: item.waterCount,
        timestamp: item.timestamp,
      }
    }
  })

  // Convert to the format expected by the UI (just water counts by date)
  const waterHistory = {}
  Object.keys(processedHistory).forEach((dateKey) => {
    waterHistory[dateKey] = processedHistory[dateKey].waterCount
  })

  return waterHistory
}

// Get today's water count from history
export const getTodayWaterCount = (waterHistory) => {
  const today = getDateKey()
  return waterHistory[today] || 0
}

// Get water count for a specific day
export const getWaterCountForDay = (waterHistory, daysAgo) => {
  const dateKey = getDateKey(daysAgo)
  return waterHistory[dateKey] || 0
}
