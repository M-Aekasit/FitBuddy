
export function calculateCaloriesFromSport(sportType, inputData) {
    const { distance, weight, time } = inputData;
    let calories = 0;
  
    if (sportType === "RUNNING") {
      calories = weight * distance * 1.036;
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
      calories = time * (caloriesPerHour[sportType] || 0);
    }
  
    return calories;
  }