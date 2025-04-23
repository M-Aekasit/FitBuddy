import { useState } from "react";

export default function IPhoneCalorieCalculator() {
  const [page, setPage] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedCalories, setTrackedCalories] = useState(0);
  const [dietaryFilter, setDietaryFilter] = useState("All");

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

  const addToTracker = (calories) => {
    setTrackedCalories(trackedCalories + calories);
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (dietaryFilter === "All" || item.type === dietaryFilter)
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-4">
      {/* iPhone Frame */}
      <div className="w-[450px] h-[900px] bg-black rounded-[70px] shadow-xl border-[10px] border-gray-700 overflow-hidden flex flex-col relative">
        {/* Top Edge */}
        <div className="w-full h-5 bg-black absolute top-0"></div>
        
        {/* App Content */}
        <div className="flex-1 bg-white flex flex-col items-center pt-5 rounded-[40px] overflow-hidden">
          {/* Header */}
          <div className="w-full bg-black text-white py-4 text-center">
            <h1 className="text-4xl font-bold">🍝 Food Page</h1>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 w-full px-5 pb-20">
            {page === "menu" && (
              <div className="p-4">
                {/* Search and Filter */}
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full text-xl p-3 mt-8 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <select 
                  className="w-full text-xl p-3 mt-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setDietaryFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Meals">Meals</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Desserts">Desserts</option>
                </select>
                
                {/* Menu Items */}
                <ul className="mt-6 space-y-3">
                  {filteredItems.map((item) => (
                    <li 
                      key={item.id} 
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => selectItem(item)}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                      )}
                      <span className="text-lg">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {page === "details" && selectedItem && (
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">{selectedItem.name}</h2>
                
                {selectedItem.image && (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                )}
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-lg font-semibold">🔥 Calories: {selectedItem.calories} kcal</p>
                  <p className="mt-2">
                    🥩 Protein: {selectedItem.protein}g | 
                    🍞 Carbs: {selectedItem.carbs}g | 
                    🥑 Fats: {selectedItem.fats}g
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="font-semibold">📝 Ingredients:</p>
                  <p className="whitespace-pre-line mt-2">{selectedItem.ingredients}</p>
                </div>

                <div className="flex space-x-4">
                  <button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
                    onClick={() => setPage("menu")}
                  >
                    ⬅ Back
                  </button>
                  <button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors"
                    onClick={() => addToTracker(selectedItem.calories)}
                  >
                    ➕ Add to Tracker
                  </button>
                </div>
              </div>
            )}

            {/* Calorie Tracker */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-xl font-semibold">
                Total Calories Tracked: <span className="text-blue-600">{trackedCalories}</span> kcal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
