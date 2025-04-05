import { useState } from "react";
import "./App.css";

export default function IPhoneCalorieCalculator() {
  const [page, setPage] = useState("menu");
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedCalories, setTrackedCalories] = useState(0);
  const [dietaryFilter, setDietaryFilter] = useState("All");

  const menuItems = [
    { id: 1, name: "Fried Chicken Rice", calories: 695, 
      protein: "25-35", carbs: "50-70", fats: "20-30", 
      ingredients: "Chicken, Rice, Garlic, Ginger, Soy Sauce, Flour, Oil", 
      type: "Meals", image: "/Fried Chicken Rice.png"},

    { id: 2, name: "Fried Pork Rice", calories: 720, 
      protein: "20-30", carbs: "50-70", fats: "15-25", 
      ingredients: "Pork, Rice, Garlic, Soy Sauce, Oyster Sauce, Flour, Oil", 
      type: "Meals", image: "/Fried Pork Rice.jpg"},

    { id: 3, name: "Chicken Noodle Soup", calories: 375, 
      protein: "30-40", carbs: "60-80", fats: "10-20", 
      ingredients: "Chicken Drumstick, Egg Noodles, Garlic, Soy Sauce, Oyster Sauce, Star Anise, Cinnamon, Broth", 
      type: "Meals", image: "/Chicken Noodle Soup.jpg"},

    { id: 4, name: "Seafood sukiyaki", calories: 280, 
      protein: "20-25", carbs: "25-35", fats: "5-10", 
      ingredients: "Shrimp, Squid, Fish, Glass Noodles, Chinese Cabbage, Egg, Tofu, Garlic, Suki Sauce", 
      type: "Meals", image: "/Seafood sukiyaki.webp"},

    { id: 5, name: "Baked Chicken Breast", calories: 169, 
      protein: "30-35", carbs: "0-2", fats: "3-5", 
      ingredients: "Chicken Breast, Olive Oil, Garlic, Black Pepper, Paprika, Salt, Herbs", 
      type: "Meals", image: "/Baked Chicken Breast.jpg"},

    { id: 6, name: "Kale Fried Rice with Crispy Pork", calories: 670, 
      protein: "20-25", carbs: "60-70", fats: "30-35", 
      ingredients: "Crispy Pork, Cooked Rice, Kale, Garlic, Soy Sauce, Oyster Sauce, Sugar, Oil", 
      type: "Meals", image: "/Kale Fried Rice with Crispy Pork.webp"},

    { id: 7, name: "Banana", calories: 120, 
      protein: "1.3", carbs: "27", fats: "0.3", 
      ingredients: "Banana", 
      type: "Desserts", image: "/Banana.jpg"},

    { id: 8, name: "Ripe mango", calories: 135, 
      protein: "1", carbs: "35", fats: "0.6", 
      ingredients: "Ripe Mango", 
      type: "Desserts", image: "/Ripe Mango.jpg" },
  
    { id: 9, name: "Thai Coconut Pancakes", calories: 230, 
      protein: "2-4", carbs: "30-40", fats: "10-15", 
      ingredients: "Coconut Milk, Rice Flour, Sugar, Salt, Pandan, Spring Onion", 
      type: "Desserts", image: "/Khanom Krok.webp" },
    
    { id: 10, name: "Coca-Cola", calories: 140, 
      protein: "0", carbs: "39", fats: "0", 
      ingredients: "Carbonated Water, Sugar, Caramel Color, Phosphoric Acid, Caffeine", 
      type: "Drinks", image: "/Coca-Cola.jpg"},

    { id: 11, name: "Hot Chocolate", calories: 190, 
      protein: "5", carbs: "30", fats: "6", 
      ingredients: "Milk, Cocoa Powder, Sugar, Vanilla Extract", 
      type: "Drinks", image: "/Hot Chocolate.jpg"},
        
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

          <div className="scroll-area">
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
                    // <li key={item.id} className="item" onClick={() => selectItem(item)}>
                    //   <span>{item.name}</span>
                    // </li>
                    <li key={item.id} className="item" onClick={() => selectItem(item)}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "10px"
                          }}
                        />
                      )}
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {page === "details" && selectedItem && (
              <div className="menupage">
                <h2 className="menuselected">{selectedItem.name}</h2>
                
                {selectedItem.image && (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full rounded-lg mb-4"
                    style={{ maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }}
                    
                  />
                )}
                
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
    </div>
  );
}
