import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  //add data and send data
  // const addMessage = (text) => {
  //   setMessages(prev => {
  //     if (prev.some(msg => msg.text === text && msg.timestamp === getCurrentTimeString())) {
  //       console.log("1");
  //       return prev;
        
  //     }
  //     sendNotificationToServer(text);
  //     return [{ text, isNew: true, timestamp: getCurrentTimeString() }, ...prev];
  //   });
  // };
  const addMessage = (text) => {
  const now = new Date();
  const timestamp = getCurrentTimeString();
  const date = now.toISOString().split("T")[0];
  const hour = now.getHours();
  const minute = now.getMinutes();

  setMessages(prev => {
    if (prev.some(msg => msg.text === text && msg.timestamp === timestamp)) {
      return prev;
    }

    sendNotificationToServer(text);
    return [{ text, isNew: true, timestamp, date, hour, minute }, ...prev]; // ✅ เพิ่มค่าที่จำเป็น
  });
};


  //create time current
  const getCurrentTimeString = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' +
           now.getMinutes().toString().padStart(2, '0');
  };

  //send data
  const sendNotificationToServer = async(text) =>{
    const now = new Date(Date.now() + 7 * 60 * 60 * 1000); 
    now.setSeconds(0, 0); 
    const h = now.getHours(); 
    const m = now.getMinutes();
    const date = now.toISOString().split("T")[0];
  
    const dataToSend = {
      text,
      createdAt: now.toISOString(),
      date, 
      hour:h,
      minute:m,
      isNew: true,
      _id: "681d94dbacc5b5f52d60fa38"
    };
try {
    // ตรวจสอบข้อความในฐานข้อมูลก่อน
    const response = await fetch("http://localhost:3000/api/notification");
    const data = await response.json();

    // ถ้ามีข้อความที่เหมือนกันอยู่แล้ว ให้ไม่ส่งคำขอ
    const isDuplicate = data.some(
      (msg) => msg.text === text && msg.createdAt === now.toISOString()
    );

    if (isDuplicate) {
      console.log("Duplicate message found. Not sending to server.");
      return;
    }

    // ถ้าไม่มีข้อความซ้ำ ส่งข้อมูลไปยังเซิร์ฟเวอร์
    const postResponse = await fetch("http://localhost:3000/api/notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (!postResponse.ok) {
      throw new Error("Failed to send notification");
    }
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
};

  //load data from DB
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/notification");
        const data = await response.json();
        console.log("Fetched notifications:", data);
        setMessages(data); 
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();



      if (m === 0 && h >= 6 && h < 22) {
        console.log("💧Checking time:", h, m);
        addMessage("💧 Time for a water break! 💧");
      }

      if ((h === 9 || h === 13 || h === 19 ) && m === 10) {
        console.log("🍽️Checking time:", h, m);
        addMessage("🍽️ Your meal log is waiting! 🍽️");
      }

      if (h === 15 && m==21) {
        console.log("💪Checking time:", h, m);
        addMessage("💪 Time to get moving! 💪");
      }
    }, 5 * 1000); // check 10 sec

    return () => clearInterval(interval);
  }, []);

const markAsRead = (msg) => {
  const { text, date, hour, minute } = msg;
  console.log("msg+++", msg);

  // ตรวจสอบว่า date, hour, minute ถูกต้อง
  if (!text || hour === undefined || minute === undefined || !date) {
    console.error('Hour, minute, or date is missing');
    return;
  }

  const data = {
    text,
    date,    // ต้องมีการส่ง date ที่ถูกต้อง
    hour,    // hour และ minute ก็ต้องถูกต้อง
    minute,
    isNew: false, // ตั้งเป็น false เมื่อข้อความถูกอ่านแล้ว
  };

  console.log("Sending to backend:", data);  // ตรวจสอบข้อมูลก่อนส่ง

  fetch('http://localhost:3000/api/notification', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  // ส่งข้อมูลที่ตรวจสอบแล้ว
  })
    .then((response) => {
      if (response.ok) {
        console.log('Notification updated successfully');
      } else {
        console.log('Failed to update notification');
      }
    })
    .catch((error) => {
      console.error('Error updating notification:', error);
    });
};

  

  const clearMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notification", {
        method: "DELETE", 
      });
  
      if (response.ok) {
        setMessages([]);
        console.log("All messages cleared from DB.");
      } else {
        console.error("Failed to clear messages from DB:", response.statusText);
      }
    } catch (err) {
      console.error("Failed to clear messages from DB:", err);
    }
  };

  const unreadCount = messages.filter(msg => msg.isNew).length;

  return (
    <div className="flex flex-col items-start min-h-screen bg-white text-gray-900 py-10 pl-5">
      <div className="w-full text-left mb-6">
        <h1 className="text-3xl font-bold mb-2">Notification</h1>
        <p className="text-lg text-gray-600">
          You have {unreadCount} unread notification{unreadCount !== 1 && "s"}
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 w-full">
        {messages.map((msg) => {
          console.log("msg", msg); // 👉 ดูค่าที่แท้จริงใน console

  return (
    <div
      key={msg.text + msg.date + msg.hour + msg.minute}
      onClick={() => markAsRead(msg)}
      className="w-full h-[60px] text-lg bg-white text-black flex items-center px-4 rounded border border-gray-400 cursor-pointer hover:bg-gray-100 transition"
    >
      {msg.isNew && (
        <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
      )}
      {msg.text}
    </div>
  );
})}
      </div>

      <div className="flex justify-center">
        <button
          onClick={clearMessages}
          className="mt-8 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
        >
          Clear All Messages
        </button>
      </div>
    </div>
  );
}

export default App;