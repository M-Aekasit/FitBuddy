import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { text: "🍽️ Your meal log is waiting! 🍽️", isNew: true },
    { text: "💧 Time for a water break! 💧", isNew: true },
    { text: "💪 Time to get moving! 💪", isNew: true }
  ]);

  const clearMessages = () => {
    setMessages([]);
  };

  const markAsRead = (index) => {
    setMessages(prevMessages =>
      prevMessages.map((msg, i) =>
        i === index ? { ...msg, isNew: false } : msg
      )
    );
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
        {messages.map((msg, index) => (
          <div
            key={index}
            onClick={() => markAsRead(index)}
            className="w-full h-[60px] text-lg bg-white text-black flex items-center px-4 rounded border border-gray-400 cursor-pointer hover:bg-gray-100 transition"
          >
            {msg.isNew && (
              <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
            )}
            {msg.text}
          </div>
        ))}
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
