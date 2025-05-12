import Friend from "../models/friend.js";

export const createFriend = async (req, res) => {
  try {
    const { name, sender, calories, water } = req.body;
    const newFriend = new Friend({
      name,
      sender,
      calories: {
        burned: calories?.burned || 0,
        target: calories?.target || 0,
      },
      water: {
        consumed: water?.consumed || 0,
        target: water?.target || 0,
      },
    }); // Create a new Friend document

    await newFriend.save(); // Save the document to the database
    res.status(201).json(newFriend); // Respond with the created friend
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating friend", error: err.message });
  }
};

export const getFriendSummary = async (req, res) => {
	try {
		const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const stats = await statsCollection
      .find({
        date: { $gte: todayStart, $lte: todayEnd },
      })
      .toArray();

    const cheers = await friendCollection
      .find({
        date: { $gte: todayStart, $lte: todayEnd },
      })
      .toArray();

    const cheerMap = {};
    cheers.forEach((cheer) => {
      const friendName = cheer.name;
      if (!cheerMap[friendName]) {
        cheerMap[friendName] = [cheer.sender];
      } else {
        cheerMap[friendName].push(cheer.sender);
      }
    });

    const summary = stats.map((stat) => ({
      name: stat.name,
      caloriesBurned: `${stat.calories.burned}/${stat.calories.target}`,
      waterIntake: `${stat.water.consumed}/${stat.water.target}`,
      cheerFrom: cheerMap[stat.name] ? cheerMap[stat.name].join(", ") : "-",
    }));

    res.status(200).json(summary);
  } catch (err) {
    console.error("❌ Error generating friend summary:", err);
    res.status(500).json({ message: "Server error" });
  }
};
