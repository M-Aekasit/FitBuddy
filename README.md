# 🏃‍♀️ FitBuddy – Health Tracking Web App

Nowadays, people are becoming increasingly health conscious, whether it's through proper nutrition, exercise, or effective weight management. However, it can often be difficult to fully understand how our daily choices impact our overall well-being.

To address this, our team developed **FitBuddy**, a web-based health tracking application designed to help users monitor and improve their daily wellness habits. With FitBuddy, users can easily track food intake, hydration levels, exercise routines, and body metrics. 

The platform also supports **BMI (Body Mass Index)** and **BMR (Basal Metabolic Rate)** calculations, personal reflections through a daily diary, social motivation via friend connections, and customizable goal-setting. They are all in one centralized platform. FitBuddy is designed to be simple, supportive, and smart. It's empowering users to take control of their health anytime, anywhere.

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
   cd fitbuddy-app
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the development server 

   ```bash
   npm run server
   ```
5. New Terminal, Start the development server

   ```bash
   cd fitbuddy-app
   npm run dev
   ```

6. Open your browser and go to

   ```
   http://localhost:5000
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

### **Login/Signin** – Create user account

https://github.com/user-attachments/assets/fb4f42e3-2b20-4cdd-a544-79474f2fb110

### **Home** – Dashboard summary of health data

<img width="1280" alt="HomePage" src="https://github.com/user-attachments/assets/36ae4ccb-d0f0-45fe-89d4-81c9345ec001" />

### **Food** – Record meals and calories

https://github.com/user-attachments/assets/7c00013b-8de6-4d8a-b792-87d83c7f8328

### **Water** – Log daily water intake

https://github.com/user-attachments/assets/545934f4-9b61-4065-87d1-1c2a1359eab0

### **Exercise** – Log workouts or activities

https://github.com/user-attachments/assets/8921ff91-e805-4785-9e91-125dcdbf565e

### **BMI** – Calculate Body Mass Index

https://github.com/user-attachments/assets/c98d73d5-5400-4830-9d7b-32f092b224d8

### **Friend** – Connect with friends and view shared progress

https://github.com/user-attachments/assets/97af963c-684f-476e-b0fb-7f1a2ef6a10e

### **Diary** – Daily notes and personal thoughts

https://github.com/user-attachments/assets/92a0b5c6-19fb-43e8-9433-34055e708bfe

### **Notifications** –Get reminders for health tasks

<img width="1280" alt="NotificationPage" src="https://github.com/user-attachments/assets/7f0726d8-8b82-47bc-9cf2-a6ad554f8022" />

### **Settings** – Adjust health goals and app preferences

https://github.com/user-attachments/assets/73bfb420-e599-4bbb-aa2f-967558a3c9e2

### **MongoDB** – Keep data in Backend floder

https://github.com/user-attachments/assets/a340f2c0-abfc-4e0c-962c-498f6a2120c2

  
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
* [https://www.borntodev.com](https://www.youtube.com/watch?si=rScTbisSd5zr5qSI&v=2O2o44Kzy4o&feature=youtu.be)
* https://www.youtube.com/watch?v=MisqMTzODZg

