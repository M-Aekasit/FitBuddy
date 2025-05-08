import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (text) => {
    setMessages(prev => {
      if (prev.some(msg => msg.text === text && msg.timestamp === getCurrentTimeString())) {
        return prev;
      }
      return [{ text, isNew: true, timestamp: getCurrentTimeString() }, ...prev];
    });
  };

  const getCurrentTimeString = () => {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' +
           now.getMinutes().toString().padStart(2, '0');
  };

  useEffect(() => {
    // console.log("Interval started");
    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      

      if (h >= 6 && h < 21 && m === 30) {
        console.log("💧Checking time:", h, m);
        addMessage("💧 Time for a water break! 💧");
      }


      if ((h === 8 || h === 12 || h === 18 ) && m === 0) {
        console.log("🍽️Checking time:", h, m);
        addMessage("🍽️ Your meal log is waiting! 🍽️");
      }


      if (h === 16 && m === 45) {
        console.log("💪Checking time:", h, m);
        addMessage("💪 Time to get moving! 💪");
      }
    }, 10 * 1000); // check 10 sec

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (index) => {
    setMessages(prev =>
      prev.map((msg, i) => i === index ? { ...msg, isNew: false } : msg)
    );
  };

  const clearMessages = () => setMessages([]);

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




// import React, { useState, useEffect } from 'react';

// function App() {
//   const [messages, setMessages] = useState([]);

//   const getCurrentTimeString = () => {
//     const now = new Date();
//     return now.getHours().toString().padStart(2, '0') + ':' +
//            now.getMinutes().toString().padStart(2, '0');
//   };

//   const addMessage = (text) => {
//     const currentTime = getCurrentTimeString();
//     setMessages(prev => {
//       if (prev.some(msg => msg.text === text && msg.timestamp === currentTime)) {
//         return prev;
//       }
//       return [{ text, isNew: true, timestamp: currentTime }, ...prev];
//     });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const h = now.getHours();
//       const m = now.getMinutes();
//       const currentTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;

//       // Meal log notifications
//       const mealTimes = ['08:00', '13:00', '18:00'];
//       if (mealTimes.includes(currentTime)) {
//         addMessage("🍽️ Your meal log is waiting! 🍽️");
//       }

//       // Water intake reminders every 1.5 hours from 07:30
//       const waterStart = new Date();
//       waterStart.setHours(7, 30, 0, 0);
//       const waterTimes = [];
//       for (let i = 0; i < 10; i++) {
//         const t = new Date(waterStart.getTime() + i * 90 * 60000);
//         const timeStr = `${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')}`;
//         waterTimes.push(timeStr);
//       }
//       if (waterTimes.includes(currentTime)) {
//         addMessage("💧 Time for a water break! 💧");
//       }

//       // Exercise reminder at 16:30
//       if (currentTime === '16:30') {
//         addMessage("💪 Time to get moving! 💪");
//       }
//     }, 10 * 1000); // Check every 10 seconds

//     return () => clearInterval(interval);
//   }, []);

//   const markAsRead = (index) => {
//     setMessages(prev =>
//       prev.map((msg, i) => i === index ? { ...msg, isNew: false } : msg)
//     );
//   };

//   const clearMessages = () => setMessages([]);

//   const unreadCount = messages.filter(msg => msg.isNew).length;

//   return (
//     <div className="flex flex-col items-start min-h-screen bg-white text-gray-900 py-10 pl-5">
//       <div className="w-full text-left mb-6">
//         <h1 className="text-3xl font-bold mb-2">Notification</h1>
//         <p className="text-lg text-gray-600">
//           You have {unreadCount} unread notification{unreadCount !== 1 && "s"}
//         </p>
//       </div>

//       <div className="flex flex-col items-start gap-2 w-full">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             onClick={() => markAsRead(index)}
//             className="w-full h-[60px] text-lg bg-white text-black flex items-center px-4 rounded border border-gray-400 cursor-pointer hover:bg-gray-100 transition"
//           >
//             {msg.isNew && (
//               <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
//             )}
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center">
//         <button
//           onClick={clearMessages}
//           className="mt-8 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
//         >
//           Clear All Messages
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
