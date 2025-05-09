import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FoodPage() {
  const [page, setPage] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedCalories, setTrackedCalories] = useState(0);
  const [dietaryFilter, setDietaryFilter] = useState("All");
  const navigate = useNavigate();

  const menuItems = [
    // meals --------------------------------------------------------
    { id: 1, name: "Fried Chicken Rice", calories: 695, 
      protein: "25-35", carbs: "50-70", fats: "20-30", 
      ingredients: "Chicken, Rice, Garlic, Ginger, Soy Sauce, Flour, Oil", 
      type: "Meals", image: "../images/food/Fried Chicken Rice.png"},

    { id: 2, name: "Fried Pork Rice", calories: 720, 
      protein: "20-30", carbs: "50-70", fats: "15-25", 
      ingredients: "Pork, Rice, Garlic, Soy Sauce, Oyster Sauce, Flour, Oil", 
      type: "Meals", image: "../images/food/Fried Pork Rice.jpg"},

    { id: 3, name: "Chicken Noodle Soup", calories: 375, 
      protein: "30-40", carbs: "60-80", fats: "10-20", 
      ingredients: "Chicken Drumstick, Egg Noodles, Garlic, Soy Sauce, Oyster Sauce, Star Anise, Cinnamon, Broth", 
      type: "Meals", image: "../images/food/Chicken Noodle Soup.jpg"},

    { id: 4, name: "Seafood sukiyaki", calories: 280, 
      protein: "20-25", carbs: "25-35", fats: "5-10", 
      ingredients: "Shrimp, Squid, Fish, Glass Noodles, Chinese Cabbage, Egg, Tofu, Garlic, Suki Sauce", 
      type: "Meals", image: "../images/food/Seafood sukiyaki.webp"},

    { id: 5, name: "Baked Chicken Breast", calories: 169, 
      protein: "30-35", carbs: "0-2", fats: "3-5", 
      ingredients: "Chicken Breast, Olive Oil, Garlic, Black Pepper, Paprika, Salt, Herbs", 
      type: "Meals", image: "../images/food/Baked Chicken Breast.jpg"},

    { id: 6, name: "Kale Fried Rice with Crispy Pork", calories: 670, 
      protein: "20-25", carbs: "60-70", fats: "30-35", 
      ingredients: "Crispy Pork, Cooked Rice, Kale, Garlic, Soy Sauce, Oyster Sauce, Sugar, Oil", 
      type: "Meals", image: "../images/food/Kale Fried Rice with Crispy Pork.webp"},

    { id: 7, name: "Vegetable Omelette", calories: 210, 
      protein: "10-12", carbs: "4-6", fats: "15-18", 
      ingredients: "Eggs, Carrot, Onion, Tomato, Cabbage, Spring Onion, Salt, Pepper, Oil", 
      type: "Meals", image: "../images/food/Vegetable Omelette.jpg"},

    { id: 8, name: "Riceberry Rice with Steamed Fish", calories: 350, 
      protein: "25-30", carbs: "35-40", fats: "8-10", 
      ingredients: "Riceberry Rice, Steamed Fish (Sea Bass or Tilapia), Garlic, Lime, Chili, Fish Sauce", 
      type: "Meals", image: "../images/food/Riceberry Rice with Steamed Fish.jpeg"},

    { id: 9, name: "Clear Soup with Tofu and Minced Pork", calories: 180,
      protein: "15-18", carbs: "5-8", fats: "8-10",
      ingredients: "Soft Tofu, Minced Pork, Cabbage, Carrot, Spring Onion, Garlic, Pepper, Fish Sauce, Water",
      type: "Meals", image: "../images/food/Clear Soup with Tofu and Minced Pork.jpg"},
         
    { id: 10, name: "Brown Rice Fried with Shrimp", calories: 420,
      protein: "20-24", carbs: "50-55", fats: "10-14",
      ingredients: "Brown Rice, Shrimp, Egg, Garlic, Carrot, Onion, Soy Sauce, Oil, Spring Onion",
      type: "Meals", image: "../images/food/Brown Rice Fried with Shrimp.jpg"},

    // Desserts --------------------------------------------------------
    { id: 11, name: "Banana", calories: 120, 
      protein: "1.3", carbs: "27", fats: "0.3", 
      ingredients: "Banana", 
      type: "Desserts", image: "../images/food/Banana.jpg"},

    { id: 12, name: "Ripe mango", calories: 135, 
      protein: "1", carbs: "35", fats: "0.6", 
      ingredients: "Ripe Mango", 
      type: "Desserts", image: "../images/food/Ripe Mango.jpg"},
  
    { id: 13, name: "Thai Coconut Pancakes", calories: 230, 
      protein: "2-4", carbs: "30-40", fats: "10-15", 
      ingredients: "Coconut Milk, Rice Flour, Sugar, Salt, Pandan, Spring Onion", 
      type: "Desserts", image: "../images/food/Khanom Krok.webp"},

    { id: 14, name: "Yogurt Fruit", calories: 150, 
      protein: "6-8", carbs: "18-22", fats: "2-4", 
      ingredients: "Plain Yogurt, Strawberry, Blueberry, Banana, Honey", 
      type: "Desserts", image: "../images/food/Yogurt Fruit.jpg"},  

    { id: 15, name: "Chocolate Almond Truffles", calories: 180, 
      protein: "3-4", carbs: "15-18", fats: "12-14", 
      ingredients: "Dark Chocolate, Almonds, Cocoa Powder, Coconut Milk, Honey, Vanilla Extract", 
      type: "Desserts", image: "../images/food/Chocolate Almond Truffles.jpg"},  

    { id: 16, name: "Pumpkin Chocolate Chip Oatmeal Bars", calories: 200,
      protein: "4-5", carbs: "25-30", fats: "8-10",
      ingredients: "Pumpkin Puree, Rolled Oats, Chocolate Chips, Egg, Maple Syrup, Cinnamon, Baking Powder, Vanilla Extract",
      type: "Desserts", image: "../images/food/Pumpkin Chocolate Chip Oatmeal Bars.webp"},
      
    // Drinks --------------------------------------------------------
    { id: 17, name: "Green Tea", calories: 0,
      protein: "0", carbs: "0", fats: "0",
      ingredients: "Green Tea Leaves, Hot Water",
      type: "Drinks", image: "../images/food/Green Tea.jpg"},
    
    { id: 18, name: "Cranberry Juice", calories: 116,
      protein: "0", carbs: "30-32", fats: "0",
      ingredients: "Cranberry Juice (100%), Water",
      type: "Drinks", image: "../images/food/Cranberry Juice.jpg"},
    
    { id: 19, name: "Coca-Cola", calories: 140, 
      protein: "0", carbs: "39", fats: "0", 
      ingredients: "Carbonated Water, Sugar, Caramel Color, Phosphoric Acid, Caffeine", 
      type: "Drinks", image: "../images/food/Coca-Cola.jpg"},

    { id: 20, name: "Hot Chocolate", calories: 190, 
      protein: "5", carbs: "30", fats: "6", 
      ingredients: "Milk, Cocoa Powder, Sugar, Vanilla Extract", 
      type: "Drinks", image: "../images/food/Hot Chocolate.jpg"},
  ];

  const selectItem = (item) => {
    setSelectedItem(item);
    setPage("details");
  };

  // const addToTracker = (calories) => {
  //   setTrackedCalories(trackedCalories + calories);
  //   setPage("menu");
  // };

  const addToTracker = async (calories) => {
    setTrackedCalories(trackedCalories + calories);
  
    try {
      console.log("Sending data:", {
        foodName: selectedItem.name,
        foodType: selectedItem.type,
        calories: selectedItem.calories
      });
      
      await axios.post("http://localhost:3000/api/food", {
        foodName: selectedItem.name,
        foodType: selectedItem.type,
        calories: selectedItem.calories
      });
      console.log("Saved to backend");
    } catch (error) {
      console.error("Error saving food data:", error);
    }
  
    setPage("menu");
  };
  
 
  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (dietaryFilter === "All" || item.type === dietaryFilter)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">

      {/* Back home */}
      {page === "menu" && (
        <div className="flex items-center space-x-4">
          <button
          onClick={() => navigate('/HealthDashboard')}
          className=" px-4 py-2 text-2xl font-bold rounded hover:bg-gray-200">
          ← Back</button>
        </div>
      )}
      
      {/* Header */}
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-8">Food Tracker</h1>
      </header>

      {/* Calorie Tracker */}
      <div className="text-center text-3xl font-medium text-gray-500">
      Total Calories : {trackedCalories} kcal
      </div>

      

      {/* Content */}
      <main className="flex-1 p-8">
        {page === "menu" && (
          <div>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row md:space-x-4 mb-8">
              <input
                type="text"
                placeholder="Search food..."
                className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select
                className="flex-1 p-3 rounded-lg border border-gray-300 mt-4 md:mt-0 shadow-sm focus:ring-2 focus:ring-yellow-400"
                onChange={(e) => setDietaryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Meals">Meals</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>

            {/* Food Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => selectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover rounded-lg mb-4"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.calories} Calories</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "details" && selectedItem && (
          <div className="max-w-3xl mx-auto">
            <button
              className="text-blue-600 text-xl hover:underline mb-4"
              onClick={() => setPage("menu")}
            >
              ← Back to Menu
            </button>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-72 object-cover rounded-lg mb-6"
              />

              <h2 className="text-4xl font-extrabold text-center text-yellow-800 mb-6">{selectedItem.name}</h2>

              <div className="text-center text-lg space-y-4">
                <p>🔥 <span className="font-bold">Calories:</span> {selectedItem.calories} kcal</p>
                <p>🥩 <span className="font-bold">Protein:</span> {selectedItem.protein}g | 🍞 <span className="font-bold">Carbs:</span> {selectedItem.carbs}g | 🥑 <span className="font-bold">Fats:</span> {selectedItem.fats}g</p>
                <div>
                  <p className="font-bold">📝 Ingredients:</p>
                  <p>{selectedItem.ingredients}</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-bold shadow-md"
                  onClick={() => addToTracker(selectedItem.calories)}
                >
                  ➕ Add to Tracker
                </button>
              </div>
            </div>
          </div>
        )}
      </main>


    </div>
  );
}