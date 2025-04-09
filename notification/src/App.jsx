import React, { useState } from 'react';
import './App.css';

function App() {
  // สร้าง state สำหรับข้อความ
  const [messages, setMessages] = useState([
    "🍽️ Your meal log is waiting! 🍽️",
    "💧 Time for a water break! 💧",
    "💪 Time to get moving! 💪"
  ]);

  // ฟังก์ชันสำหรับลบข้อความทั้งหมด
  const clearMessages = () => {
    setMessages([]);  // ลบข้อความทั้งหมด
  };

  return (
    <>
      <div className='iphone-frame'>
        <h1>notification</h1>
        <div className='message'>
          {messages.map((msg, index) => (
            <div key={index} className='m1'>{msg}</div>
          ))}
        <button onClick={clearMessages}>Clear All Messages</button>

        </div>

      </div>
    </>
  );
}

export default App;