"use client"

import { useState } from "react"

function App() {
  const [waterCount, setWaterCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentPage, setCurrentPage] = useState("main")

  const addWater = () => {
    if (waterCount < 8) {
      setIsAnimating(true)
      setTimeout(() => {
        setWaterCount((prev) => prev + 1)
        setIsAnimating(false)
      }, 100)
    }
  }

  // Fill percentage
  const fillPercentage = (waterCount / 8) * 100

  const now = new Date()
  const endOfDay = new Date()
  endOfDay.setHours(24, 0, 0, 0)
  const timeDiffMs = endOfDay - now
  const hoursLeft = Math.floor(timeDiffMs / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeDiffMs / (1000 * 60)) % 60)
  const timeLeftText = hoursLeft > 0 ? `${hoursLeft}h left` : `${minutesLeft}m left`

  // ถ้าอยู่ในหน้าว่าง (blank page)
  if (currentPage === "blank") {
    return (
      <div className="w-[450px] h-[900px] bg-black rounded-[80px] shadow-[0px_10px_30px_rgba(0,0,0,0.4)] border-[10px] border-[#333] overflow-hidden flex flex-col relative">
        <div className="bg-black text-white w-full py-4 text-center text-[40px] font-bold flex justify-center items-center gap-[10px]">
          <span className="text-[36px]">💧</span>Water Page
        </div>
        <div className="bg-gradient-to-b from-[#39b4ff] to-[#39b4ff] flex-1 flex flex-col items-center pt-5 overflow-hidden relative">
          <button 
            className="absolute top-4 left-4 bg-transparent border-none text-[18px] font-bold cursor-pointer text-[#333]"
            onClick={() => setCurrentPage("main")}
          >
            ← Back
          </button>
          <div className="flex flex-col items-center justify-center h-full text-[18px] text-black">
            <p>content</p>
          </div>
        </div>
      </div>
    )
  }

  // หน้าหลัก
  return (
    <div className="font-['Arial'] bg-[#1e1e1e] text-black m-0 p-0 flex justify-center items-center h-screen text-[20px]">
      <div className="w-[450px] h-[900px] bg-black rounded-[80px] shadow-[0px_10px_30px_rgba(0,0,0,0.4)] border-[10px] border-[#333] overflow-hidden flex flex-col relative">
        <div className="w-full h-5 bg-black absolute top-0"></div>
        
        <div className="bg-black text-white w-full py-4 text-center text-[40px] font-bold flex justify-center items-center gap-[10px]">
          <span className="text-[36px]">💧</span>Water Page
        </div>
        
        <div className="bg-gradient-to-b from-[#39b4ff] to-[#39b4ff] flex-1 flex flex-col items-center pt-5 overflow-hidden relative">
          {/* Water Droplet */}
          <div className="relative flex justify-center items-center my-10 w-60 h-60 bg-[#39b4ff]">
            <div className="w-60 h-[280px] bg-transparent rotate-45 flex justify-center items-center relative overflow-hidden">
              <div className="w-50 h-50 bg-transparent rounded-[90%_0%_90%_80%] -rotate-45 flex justify-center items-center relative border-[6px] border-white overflow-hidden">
                <div 
                  className="absolute bottom-0 left-0 w-full bg-[rgba(255,255,255,0.3)] transition-[height] duration-500 ease-in-out" 
                  style={{ height: `${fillPercentage}%` }}
                ></div>
                <div className="text-white text-[48px] font-bold z-10 shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
                  {waterCount}
                </div>
              </div>
            </div>
          </div>

          {/* Water Stats */}
          <div className="flex w-full max-w-[400px] justify-around py-[15px] border-b-[1px] border-[rgba(255,255,255,0.3)] mb-5">
            <div className="text-white font-bold text-[24px]">{waterCount}/8 glasses</div>
            <div className="w-[1px] bg-[rgba(255,255,255,0.5)]"></div>
            <div className="text-white font-bold text-[24px]">{timeLeftText}</div>
          </div>

          {/* History Section */}
          <div className="w-full max-w-[400px] px-5">
            <div className="flex bg-[#e6f7ff] rounded-[10px] p-4 mb-4">
              <div className="w-[50px] h-[50px] bg-[#39b4ff] rounded-[10px] flex justify-center items-center mr-4">
                <div className="w-6 h-6 bg-white rounded-[90%_0%_90%_80%] -rotate-45"></div>
              </div>
              <div className="flex-1">
                <div className="text-[#999] text-[16px]">yesterday</div>
                <div className="text-[#39b4ff] font-bold text-[22px]">8 glasses</div>
                <div className="text-[#4caf50] text-[16px]">Goal completed</div>
              </div>
            </div>

            <div className="flex bg-[#e6f7ff] rounded-[10px] p-4 mb-4">
              <div className="w-[50px] h-[50px] bg-[#39b4ff] rounded-[10px] flex justify-center items-center mr-4">
                <div className="w-6 h-6 bg-white rounded-[90%_0%_90%_80%] -rotate-45"></div>
              </div>
              <div className="flex-1">
                <div className="text-[#999] text-[16px]">saturday</div>
                <div className="text-[#39b4ff] font-bold text-[22px]">6 glasses</div>
                <div className="text-[#999] text-[16px]">2 glasses left</div>
              </div>
            </div>

            <div className="flex bg-[#e6f7ff] rounded-[10px] p-4 mb-4">
              <div className="w-[50px] h-[50px] bg-[#39b4ff] rounded-[10px] flex justify-center items-center mr-4">
                <div className="w-6 h-6 bg-white rounded-[90%_0%_90%_80%] -rotate-45"></div>
              </div>
              <div className="flex-1">
                <div className="text-[#999] text-[16px]">1 Feb, 2019</div>
                <div className="text-[#39b4ff] font-bold text-[22px]">8 glasses</div>
                <div className="text-[#4caf50] text-[16px]">Goal completed</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            className={`absolute bottom-[110px] right-[30px] w-[70px] h-[70px] bg-gradient-to-r from-[#ffa07a] to-[#ff8c00] border-none rounded-full text-white text-[28px] flex justify-center items-center cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 shadow-[0_6px_12px_rgba(0,0,0,0.3)] ${
              isAnimating ? "animate-[pulse_0.2s_ease-in-out]" : ""
            }`}
            onClick={() => setCurrentPage("blank")}
          >
            =
          </button>
          <button 
            className={`absolute bottom-[30px] right-[30px] w-[70px] h-[70px] bg-gradient-to-r from-[#ffa07a] to-[#ff8c00] border-none rounded-full text-white text-[28px] flex justify-center items-center cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-transform duration-200 shadow-[0_6px_12px_rgba(0,0,0,0.3)] ${
              isAnimating ? "animate-[pulse_0.2s_ease-in-out]" : ""
            }`}
            onClick={addWater}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default App