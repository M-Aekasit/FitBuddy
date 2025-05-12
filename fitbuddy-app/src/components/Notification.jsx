import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (text) => {
    const now = new Date();
    const timestamp = getCurrentTimeString();
    const date = now.toISOString().split("T")[0];
    const hour = now.getHours();
    const minute = now.getMinutes();

    setMessages((prev) => {
      if (
        prev.some((msg) => msg.text === text && msg.timestamp === timestamp)
      ) {
        return prev;
      }

      sendNotificationToServer(text);
      return [
        { text, isNewNotification: true, timestamp, date, hour, minute },
        ...prev,
      ]; // ✅ เพิ่มค่าที่จำเป็น
    });
  };

  //create time current
  const getCurrentTimeString = () => {
    const now = new Date();
    return (
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0")
    );
  };

  //send data
  const sendNotificationToServer = async (text) => {
    const now = new Date(Date.now());
    now.setSeconds(0, 0);
    const h = now.getHours();
    const m = now.getMinutes();
    const date = now.toISOString().split("T")[0];

    const dataToSend = {
      text,
      createdAt: now.toISOString(),
      date,
      hour: h,
      minute: m,
      isNewNotification: true,
      _id: "681d94dbacc5b5f52d60fa38",
    };

    try {
      // เช็คว่ามีข้อความซ้ำไหม
      const response = await fetch("http://localhost:5000/api/get");
      const data = await response.json();

      const isDuplicate = data.some(
        (msg) => msg.text === text && msg.createdAt === dataToSend.createdAt
      );

      if (isDuplicate) {
        console.log("Duplicate message found. Not sending to server.");
        return;
      }

      // ส่ง POST เมื่อไม่ซ้ำ
      const postResponse = await fetch("http://localhost:5000/api/create", {
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
        const response = await fetch("http://localhost:5000/api/get");
        const data = await response.json();
        console.log("Fetched notifications:", data);

        const sorted = data.sort((a, b) => {
          const dateA = new Date(
            Date.UTC(
              parseInt(a.date.substring(0, 4)),
              parseInt(a.date.substring(5, 7)) - 1,
              parseInt(a.date.substring(8, 10)),
              a.hour,
              a.minute
            )
          );
          const dateB = new Date(
            Date.UTC(
              parseInt(b.date.substring(0, 4)),
              parseInt(b.date.substring(5, 7)) - 1,
              parseInt(b.date.substring(8, 10)),
              b.hour,
              b.minute
            )
          );
          return dateB - dateA;
        });

        setMessages(sorted);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();

    const interval = setInterval(() => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();

      if (m === 0 && h >= 7 && h < 21) {
        console.log("💧Checking time:", h, m);
        addMessage("💧 Time for a water break! 💧");
      }

      if ((h === 8 || h === 12 || h === 18) && m === 10) {
        console.log("🍽️Checking time:", h, m);
        addMessage("🍽️ Your meal log is waiting! 🍽️");
      }

      if (h === 16 && m == 45) {
        console.log("💪Checking time:", h, m);
        addMessage("💪 Time to get moving! 💪");
      }
    }, 10 * 1000); // check 10 sec

    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (msg) => {
    const { text, date, hour, minute } = msg;

    if (!text || hour === undefined || minute === undefined || !date) {
      console.error("Hour, minute, or date is missing");
      return;
    }

    const data = {
      text,
      date,
      hour,
      minute,
      isNewNotification: false,
    };

    try {
      const updateRes = await fetch("http://localhost:5000/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update notification");
      }

      // หลัง update สำเร็จ ดึงข้อมูลใหม่
      const getRes = await fetch("http://localhost:5000/api/get");
      const result = await getRes.json();

      const sorted = result.sort((a, b) => {
        const dateA = new Date(
          `${a.date}T${String(a.hour).padStart(2, "0")}:${String(
            a.minute
          ).padStart(2, "0")}`
        );
        const dateB = new Date(
          `${b.date}T${String(b.hour).padStart(2, "0")}:${String(
            b.minute
          ).padStart(2, "0")}`
        );
        return dateB - dateA;
      });

      setMessages(sorted);
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const clearMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/delete", {
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

  const unreadCount = messages.filter((msg) => msg.isNewNotification).length;

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
          console.log("msg", msg);

          return (
            <div
              key={msg.text + msg.date + msg.hour + msg.minute}
              onClick={() => markAsRead(msg)}
              className="w-full h-[60px] text-lg bg-white text-black flex items-center px-4 rounded border border-gray-400 cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="flex items-center">
                {msg.isNewNotification && (
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-4"></div>
                )}
                {msg.text}
              </div>
              <span className="text-sm text-gray-500 ml-4">
                {String(msg.hour).padStart(2, "0")}:
                {String(msg.minute).padStart(2, "0")}
              </span>
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
