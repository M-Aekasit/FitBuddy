export function calculateCaloriesFromSport(sportType, inputData) {
    const distance = parseFloat(inputData.distance) || 0;
    const weight = parseFloat(inputData.weight) || 0;
    const time = parseFloat(inputData.time) || 0;
  
    let calories = 0;
  
    if (sportType === "RUNNING") {
      if (weight > 0 && distance > 0) {
        calories = weight * distance * 1.036; // Running formula
      }
    } else {
      const caloriesPerHour = {
        CYCLING: 450,
        BADMINTON: 350,
        ZUMBA: 500,
        "HULA-HOOP": 430,
        WALKING: 282,
        AEROBIC: 363,
        TENNIS: 728,
        KARATE: 750,
        SWIMMING: 550,
      };
  
      if (time > 0) {
        calories = time * (caloriesPerHour[sportType] || 0); // For other sports
      }
    }
  
    return calories;
  }
  