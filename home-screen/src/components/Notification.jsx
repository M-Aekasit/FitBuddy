import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    "🍽️ Your meal log is waiting! 🍽️",
    "💧 Time for a water break! 💧",
    "💪 Time to get moving! 💪"
  ]);

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-[450px] h-[900px] bg-black rounded-[70px] shadow-xl border-[10px] border-gray-700 overflow-hidden flex flex-col items-center">
        <h1 className="text-white text-3xl font-bold my-6">notification</h1>
        <div className="w-[450px] h-[700px] bg-white text-black overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="w-[450px] h-[60px] text-lg bg-gray-300 flex justify-center items-center my-1"
            >
              {msg}
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={clearMessages}
              className="mt-8 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            >
              Clear All Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
