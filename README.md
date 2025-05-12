# 🏃‍♀️ FitBuddy – Health Tracking Web App

FitBuddy is a health tracking web application designed to help users monitor and improve their daily wellness habits.

## 📌 Features

- 🍽️ **Food Tracker** – Record meals and calorie intake  
- 💧 **Water Intake Tracker** – Log daily hydration  
- 🏋️ **Exercise Tracker** – Track physical activity  
- 📊 **BMI Calculator** – Calculate and monitor body mass index
- 👥 **Friend Page** – Connect with friends and view shared progress  
- 📝 **Personal Diary** – Write daily notes or reflections  
- 🔔 **Notifications** – Get reminders for health tasks  
- ⚙️ **Settings** – Set personal health goals and preferences

## 🎯 Objectives

- Help users monitor daily health activities in one platform
- Encourage healthy habits with consistent tracking and feedback
- Provide tools for understanding and managing body weight (BMI)
- Enable personalized goal setting and progress tracking
- Support users in maintaining hydration and balanced nutrition
- Offer a space for self-reflection through diary entries
- Facilitate social motivation via friend interaction and shared goals

## 🧠 Tech Stack  

- **Frontend** : React, JavaScript, TailwindCSS
- **Backend** : Node.js, Express.js, JWT
- **Database** : MongoDB 

## 🛠️ How to Use

1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/fitbuddy.git
    ```

2. Navigate to the project folder

   ```bash
   cd fitbuddy
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server

   ```bash
   npm start
   ```

5. Open your browser and go to

   ```
   http://localhost:3000
   ```

## 📂 Methodology

```
fitbuddy/
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── server/                # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
└── README.md
```

## 🧪 Pages Overview

* **Home** – Dashboard summary of health data

img

* **Food** – Record meals and calories

img

* **Water** – Log daily water intake

img

* **Exercise** – Log workouts or activities

img

* **BMI** – Calculate Body Mass Index

img

* **Friend** – Connect with friends and view shared progress

img

* **Diary** – Daily notes and personal thoughts

img

* **Settings** – Adjust health goals and app preferences

img


## 📚 What We Learned

* Managing frontend state using React and Context API
* Connecting frontend with backend APIs
* Storing and fetching user data with MongoDB
* Building responsive and user-friendly interfaces
* Integrating multiple components into one functional system  

## 🧩 Known Issues

- **Notification Page**  
  - "Clear All" button removes data from the database but lacks confirmation or warning  
  - Notifications are not linked or synchronized with other pages  
  - Timeline display is unclear and may confuse users  

- **Settings Page**  
  - Reset password functionality is not connected to actual backend logic  
  - Dark mode toggle does not function  
  - Notification settings cannot be adjusted  
  - Water and food goal settings are non-functional  

- **Database Dependency**  
  - MongoDB must be running locally or hosted (e.g., MongoDB Atlas) for the app to work properly  

## 💡 Future Improvements

- Store user-specific health history and progress tracking  
- Implement push notifications/reminders for hydration, meals, etc.  
- Deploy a production-ready version using Vercel or similar hosting platforms  
- Improve UX/UI clarity, especially on the timeline and notification flow  
- Fully implement and connect settings features (password, dark mode, goal management)  

## 🔗 Source Code

* **Frontend** : ...
* **Backend** : ...


## 👥 Team Members

All members contributed to **Frontend**, **Backend**, and **Database** development. Responsibilities were divided by feature/pages as follows

| Student ID   | Name                   | Responsibilities                                                                      |
|--------------|------------------------|---------------------------------------------------------------------------------------|
| 64340500012  | Chawisa Ananthean      | Sport, Notification                                                                   |
| 64340500014  | Thitiporn Suwannawong  | Home, Food, Sport, Diary, Friend, Integrate code, ReadME.md, Powerpoint Presentation  |
| 64340500073  | Wisarut Pansang        | Water, Settings                                                                       |
| 64340500075  | Aekasit Makham         | Login, Logout, Home, BMI Module, Integrate code, ReadME.md                            |


## 📄 References

* https://www.borntodev.com
* https://www.mongodb.com
* https://www.lovefitt.com
* https://www.borntodev.com

