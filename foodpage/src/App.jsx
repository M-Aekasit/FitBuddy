import { useState } from "react";
import "./App.css";

export default function IPhoneCalorieCalculator() {
  const [page, setPage] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedCalories, setTrackedCalories] = useState(0);
  const [dietaryFilter, setDietaryFilter] = useState("All");

  const menuItems = [
    { id: 1, name: "🍛 Fried Chicken Rice", calories: 695, 
      protein: "25-35", carbs: "50-70", fats: "20-30", 
      ingredients: "Chicken, Rice, Garlic, Ginger, Soy Sauce, Flour, Oil", 
      type: "Meals" },

    { id: 2, name: "🍚 Fried Pork Rice", calories: 720, 
      protein: "20-30", carbs: "50-70", fats: "15-25", 
      ingredients: "Pork, Rice, Garlic, Soy Sauce, Oyster Sauce, Flour, Oil", 
      type: "Meals" },

    { id: 3, name: "🍜 Chicken Drumstick Noodle Soup", calories: 375, 
      protein: "30-40", carbs: "60-80", fats: "10-20", 
      ingredients: "Chicken Drumstick, Egg Noodles, Garlic, Soy Sauce, Oyster Sauce, Star Anise, Cinnamon, Broth", 
      type: "Meals" },

    { id: 4, name: "🥤 Coca-Cola", calories: 140, 
      protein: "0", carbs: "39", fats: "0", 
      ingredients: "Carbonated Water, Sugar, Caramel Color, Phosphoric Acid, Caffeine", 
      type: "Drinks" },

    { id: 5, name: "🥥 Thai Coconut Pancakes (Khanom Krok)", calories: 230, 
      protein: "2-4", carbs: "30-40", fats: "10-15", 
      ingredients: "Coconut Milk, Rice Flour, Sugar, Salt, Pandan, Spring Onion", 
      type: "Desserts" },
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
    <div className="app-container">
      <div className="iphone-frame">
        <div className="edge"></div>
        <div className="app-content">
          <div className="header">🍝 Food Page</div>

          {page === "menu" && (
            <div className="p-4">
              <input 
                type="text" 
                placeholder="Search..." 
                className="searchtab" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <select className="Filtersearch" onChange={(e) => setDietaryFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Meals">Meals</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
              </select>
              
              <ul className="showmenu">
                {filteredItems.map((item) => (
                  <li key={item.id} className="item" onClick={() => selectItem(item)}>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {page === "details" && selectedItem && (
            <div className="menupage">
              <h2 className="menuselected">{selectedItem.name}</h2>
              <p className="Calories">🔥 Calories: {selectedItem.calories} kcal
                <p>🥩 Protein: {selectedItem.protein}g | 
                  🍞 Carbs: {selectedItem.carbs}g | 
                  🥑 Fats: {selectedItem.fats}g
                  </p>
              </p>
              <p className="Ingredients" style={{ whiteSpace: "pre-line" }}>
                📝 Ingredients: {selectedItem.ingredients.replace(/,\n/g, ",\n")}
              </p>

              <button className="Back" onClick={() => setPage("menu")}>⬅ Back</button>
              <button className="Add" onClick={() => addToTracker(selectedItem.calories)}>➕ Add to Tracker</button>
            </div>
          )}

          <div className="calorie-total menupage">Total Calories Tracked: {trackedCalories} kcal</div>
        </div>
      </div>
    </div>
  );
}
