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

// Get water count for a specific day
export const getWaterCountForDay = (waterHistory, daysAgo) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const dateKey = date.toISOString().split("T")[0]

  return waterHistory[dateKey] || 0
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

// Add these new functions for localStorage

// Save water history to localStorage
export const saveWaterHistory = (waterHistory) => {
  try {
    localStorage.setItem("waterHistory", JSON.stringify(waterHistory))
  } catch (error) {
    console.error("Error saving water history to localStorage:", error)
  }
}

// Load water history from localStorage
export const loadWaterHistory = () => {
  try {
    const savedHistory = localStorage.getItem("waterHistory")
    return savedHistory ? JSON.parse(savedHistory) : null
  } catch (error) {
    console.error("Error loading water history from localStorage:", error)
    return null
  }
}

// Modify the generateInitialWaterHistory function to check localStorage first
export const generateInitialWaterHistory = () => {
  // Try to load from localStorage first
  const savedHistory = loadWaterHistory()
  if (savedHistory) {
    return savedHistory
  }

  // If no saved history, generate sample data
  const today = new Date()
  const initialHistory = {}

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dateKey = date.toISOString().split("T")[0]

    // Random water count between 5-8 for past days
    initialHistory[dateKey] = i === 1 ? 8 : Math.floor(Math.random() * 4) + 5
  }

  return initialHistory
}

// Update today's water count in history and save to localStorage
export const updateTodayWaterCount = (waterHistory, waterCount) => {
  const today = new Date().toISOString().split("T")[0]

  const updatedHistory = {
    ...waterHistory,
    [today]: waterCount,
  }

  // Save to localStorage
  saveWaterHistory(updatedHistory)

  return updatedHistory
}


export const saveWaterDataToServer = async (waterData) => {
  try {
    const response = await fetch("http://localhost:5000/api/water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waterData),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving water data to server:", error);
    throw error;
  }
};
