import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "FitBuddy-DataBase"; 

// MongoDB client
const client = new MongoClient(mongoUrl);

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FitBuddy API is running.");
});

// POST - Save tracking data
// GET - Fetch tracking data


// ********** FOOD TRACKING ENDPOINTS **********

app.post("/api/food", async (req, res) => {
  const { foodName, foodType, calories } = req.body;

  if (!foodName || !foodType || calories === undefined) {
    return res.status(400).json({ message: "Missing food data" });
  }

  try {
    const db = client.db(dbName);
    const foodCollection = db.collection("food");

    const result = await foodCollection.insertOne({
      foodName,
      foodType,
      calories,
      createdAt: new Date()
    });

    res.status(201).json({ message: "food saved successfully", id: result.insertedId });

  } catch (err) {
    console.error("Database error (food):", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/food", async (req, res) => {
  try {
    const db = client.db(dbName);
    const foodCollection = db.collection("food");
    const foodItems = await foodCollection.find().toArray();
    const formattedFoodItems = foodItems.map(item => ({
      _id: item._id,
      foodName: item.foodName,
      foodType: item.foodType,
      calories: item.calories,
      createdAt: new Date(item.createdAt).toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok"
      })
    }));

    res.json(formattedFoodItems);
  } catch (err) {
    console.error("Error fetching food data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ********** SPORTS TRACKING ENDPOINTS **********

app.post("/api/sport", async (req, res) => {
  const { sportType, inputData, calories } = req.body;

  if (!sportType || !inputData || calories === undefined) {
    return res.status(400).json({ message: "Missing sport data" });
  }

  try {
    const db = client.db(dbName);
    const sportCollection = db.collection("sport");

    const result = await sportCollection.insertOne({
      sportType,
      inputData,
      calories,
      createdAt: new Date()
    });

    res.status(201).json({ message: "sport saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("Database error (sport):", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/sport", async (req, res) => {
  try {
    const db = client.db(dbName);
    const sportCollection = db.collection("sport");
    const sportItems = await sportCollection.find().toArray();
    const formattedSportItems = sportItems.map(item => ({
      _id: item._id,
      sportType: item.sportType,
      inputData: item.inputData,
      calories: item.calories,
      createdAt: new Date(item.createdAt).toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok"
      })
    }));

    res.json(formattedSportItems);
  } catch (err) {
    console.error("Error fetching sport data:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ********** DIARY TRACKING ENDPOINTS **********

app.post("/api/diary", async (req, res) => {
  const { diaryDate, diaryRate, diaryNote } = req.body;

  if (!diaryDate || diaryRate === undefined || diaryNote === undefined){
    return res.status(400).json({ message: "Missing diary data" });
  }

  try {
    const db = client.db(dbName);
    const diaryCollection = db.collection("diary");

    const result = await diaryCollection.insertOne({
      diaryDate,
      diaryRate,
      diaryNote,
    });

    res.status(201).json({ message: "diary saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("Database error (diary):", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/diary", async (req, res) => {
  try {
    const db = client.db(dbName);
    const diaryCollection = db.collection("diary");
    const diaryItems = await diaryCollection.find().toArray();

    const formattedDiaryItems = diaryItems.map(item => ({
      _id: item._id,
      diaryDate: item.diaryDate,
      diaryRate: item.diaryRate,
      diaryNote: item.diaryNote,
    }));
    

    res.json(formattedDiaryItems);
  } catch (err) {
    console.error("Error fetching diary data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ********** FRIEND TRACKING ENDPOINTS **********

app.post("/api/friend", async (req, res) => {
  const { name, calories, water, sender } = req.body;

  if (!name || !calories || !water || !sender) {
    return res.status(400).json({ message: "Missing friend data" });
  }

  try {
    const db = client.db(dbName);
    const friendCollection = db.collection("friend");

    const result = await friendCollection.insertOne({
      name,
      sender,
      date: new Date(),
      calories: { burned: calories.burned, target: calories.target },
      water: { consumed: water.consumed, target: water.target },
    });

    res.status(201).json({ message: "Friend cheer saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Database error (friend):", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/friend", async (req, res) => {
  try {
    const db = client.db(dbName);
    const statsCollection = db.collection("friendStats");
    const friendCollection = db.collection("friend");

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const stats = await statsCollection.find({
      date: { $gte: todayStart, $lte: todayEnd }
    }).toArray();

    const cheers = await friendCollection.find({
      date: { $gte: todayStart, $lte: todayEnd }
    }).toArray();
    

    const cheerMap = {};
    cheers.forEach(cheer => {
      const friendName = cheer.name;
      if (!cheerMap[friendName]) {
        cheerMap[friendName] = [cheer.sender];
      } else {
        cheerMap[friendName].push(cheer.sender);
      }
    });

    const summary = stats.map(stat => ({
      name: stat.name,
      caloriesBurned: `${stat.calories.burned}/${stat.calories.target}`,
      waterIntake: `${stat.water.consumed}/${stat.water.target}`,
      cheerFrom: cheerMap[stat.name] ? cheerMap[stat.name].join(", ") : "-"
    }));

    res.status(200).json(summary);
  } catch (err) {
    console.error("❌ Error generating friend summary:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ********** NOTIFICATION TRACKING ENDPOINTS **********


// app.post("/api/dailyGoal", async (req, res) => {
//   const { goalCaloriesFood, goalCaloriesSport, water } = req.body;
//   if (goalCaloriesFood === undefined || goalCaloriesSport === undefined) {
//     return res.status(400).json({ message: "Missing daily goal data" });
//   }

//   try {
//     const db = client.db(dbName);
//     const goalCollection = db.collection("dailyGoals");

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     await goalCollection.deleteMany({ date: { $gte: todayStart } });

//     const todayDate = new Date();
//     todayDate.setHours(0, 0, 0, 0);

//     const result = await goalCollection.insertOne({
//       date: todayDate,
//       goalCaloriesFood,
//       goalCaloriesSport,
//     });

//     res.status(201).json({ message: "Daily goal saved", id: result.insertedId });
//   } catch (err) {
//     console.error("Error saving daily goal:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.post("/api/noti", async (req, res) => {
//   try {
//     const db = client.db(dbName);
//     const foodCollection = db.collection("food");
//     const sportCollection = db.collection("sport");
//     const goalCollection = db.collection("dailyGoals");
//     const notificationCollection = db.collection("notifications");

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);
//     const todayEnd = new Date();
//     todayEnd.setHours(23, 59, 59, 999);

//     const foodToday = await foodCollection.find({
//       createdAt: { $gte: todayStart, $lte: todayEnd }
//     }).toArray();

//     const sportToday = await sportCollection.find({
//       createdAt: { $gte: todayStart, $lte: todayEnd }
//     }).toArray();

//     const totalFoodCalories = foodToday.reduce((sum, item) => sum + (item.totalCals || 0), 0);
//     const totalSportCalories = sportToday.reduce((sum, item) => sum + (item.calories || 0), 0);

//     const goalToday = await goalCollection.findOne({
//       date: { $gte: todayStart, $lte: todayEnd }
//     });

//     let notifications = [];

//     if (goalToday) {
//       const foodProgress = (totalFoodCalories / goalToday.goalCaloriesFood) * 100;
//       const sportProgress = (totalSportCalories / goalToday.goalCaloriesSport) * 100;
//       const waterProgress = (goalToday.water?.consumed / goalToday.water?.target) * 100;

//       if (foodProgress > 100) notifications.push("⚠️ Food calorie intake exceeded");
//       if (sportProgress >= 100) notifications.push("✅ Exercise calories goal achieved");
//       if (waterProgress >= 100) notifications.push("✅ Water intake goal achieved");
//     } else {
//       notifications.push("ℹ️ No goal set for today");
//     }

//     if (notifications.length > 0) {
//       await notificationCollection.insertOne({
//         date: new Date(),
//         messages: notifications,
//         foodCalories: totalFoodCalories,
//         sportCalories: totalSportCalories
//       });
//     }

//     res.status(200).json({
//       foodCalories: totalFoodCalories,
//       sportCalories: totalSportCalories,
//       messages: notifications
//     });
//   } catch (err) {
//     console.error("❌ Error in /api/noti:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
