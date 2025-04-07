import { useState } from "react";
import "./App.css";

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

    { id: 7, name: "Vegetable Omelette", calories: 210, 
      protein: "10-12", carbs: "4-6", fats: "15-18", 
      ingredients: "Eggs, Carrot, Onion, Tomato, Cabbage, Spring Onion, Salt, Pepper, Oil", 
      type: "Meals", image: "/Vegetable Omelette.jpg"},

    { id: 8, name: "Riceberry Rice with Steamed Fish", calories: 350, 
      protein: "25-30", carbs: "35-40", fats: "8-10", 
      ingredients: "Riceberry Rice, Steamed Fish (Sea Bass or Tilapia), Garlic, Lime, Chili, Fish Sauce", 
      type: "Meals", image: "/Riceberry Rice with Steamed Fish.jpeg"},

    { id: 9, name: "Clear Soup with Tofu and Minced Pork", calories: 180,
      protein: "15-18", carbs: "5-8", fats: "8-10",
      ingredients: "Soft Tofu, Minced Pork, Cabbage, Carrot, Spring Onion, Garlic, Pepper, Fish Sauce, Water",
      type: "Meals", image: "/Clear Soup with Tofu and Minced Pork.jpg"
    },
         
    { id: 10, name: "Brown Rice Fried with Shrimp", calories: 420,
      protein: "20-24", carbs: "50-55", fats: "10-14",
      ingredients: "Brown Rice, Shrimp, Egg, Garlic, Carrot, Onion, Soy Sauce, Oil, Spring Onion",
      type: "Meals", image: "/Brown Rice Fried with Shrimp.jpg"
    },

    // Desserts --------------------------------------------------------
    { id: 11, name: "Banana", calories: 120, 
      protein: "1.3", carbs: "27", fats: "0.3", 
      ingredients: "Banana", 
      type: "Desserts", image: "/Banana.jpg"},

    { id: 12, name: "Ripe mango", calories: 135, 
      protein: "1", carbs: "35", fats: "0.6", 
      ingredients: "Ripe Mango", 
      type: "Desserts", image: "/Ripe Mango.jpg" },
  
    { id: 13, name: "Thai Coconut Pancakes", calories: 230, 
      protein: "2-4", carbs: "30-40", fats: "10-15", 
      ingredients: "Coconut Milk, Rice Flour, Sugar, Salt, Pandan, Spring Onion", 
      type: "Desserts", image: "/Khanom Krok.webp" },

    { id: 14, name: "Yogurt Fruit", calories: 150, 
      protein: "6-8", carbs: "18-22", fats: "2-4", 
      ingredients: "Plain Yogurt, Strawberry, Blueberry, Banana, Honey", 
      type: "Desserts", image: "/Yogurt Fruit.jpg" },  

    { id: 15, name: "Chocolate Almond Truffles", calories: 180, 
      protein: "3-4", carbs: "15-18", fats: "12-14", 
      ingredients: "Dark Chocolate, Almonds, Cocoa Powder, Coconut Milk, Honey, Vanilla Extract", 
      type: "Desserts", image: "/Chocolate Almond Truffles.jpg" },  

    { id: 16, name: "Pumpkin Chocolate Chip Oatmeal Bars", calories: 200,
      protein: "4-5", carbs: "25-30", fats: "8-10",
      ingredients: "Pumpkin Puree, Rolled Oats, Chocolate Chips, Egg, Maple Syrup, Cinnamon, Baking Powder, Vanilla Extract",
      type: "Desserts", image: "/Pumpkin Chocolate Chip Oatmeal Bars.webp"
    },
      
    
    // Drinks --------------------------------------------------------
    { id: 17, name: "Green Tea", calories: 0,
      protein: "0", carbs: "0", fats: "0",
      ingredients: "Green Tea Leaves, Hot Water",
      type: "Drinks", image: "/Green Tea.jpg"
    },
    
    { id: 18, name: "Cranberry Juice", calories: 116,
      protein: "0", carbs: "30-32", fats: "0",
      ingredients: "Cranberry Juice (100%), Water",
      type: "Drinks",
      image: "/Cranberry Juice.jpg"
    },
    
    { id: 19, name: "Coca-Cola", calories: 140, 
      protein: "0", carbs: "39", fats: "0", 
      ingredients: "Carbonated Water, Sugar, Caramel Color, Phosphoric Acid, Caffeine", 
      type: "Drinks", image: "/Coca-Cola.jpg"},

    { id: 20, name: "Hot Chocolate", calories: 190, 
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
