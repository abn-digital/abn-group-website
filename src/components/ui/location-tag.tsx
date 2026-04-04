"use client"

import { useState, useEffect } from "react"

interface LocationTagProps {
  city?: string
  country?: string
  timezone?: string
  timezoneName?: string
}

export function LocationTag({ 
  city = "Buenos Aires", 
  country = "Argentina", 
  timezone = "ART",
  timezoneName = "America/Argentina/Buenos_Aires"
}: LocationTagProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: timezoneName,
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timezoneName])

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 transition-all duration-500 ease-out hover:border-white/20 hover:bg-white/10 backdrop-blur-sm cursor-default"
    >
      {/* Live pulse indicator */}
      <div className="relative flex items-center justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Location text */}
      <div className="relative flex items-center overflow-hidden" style={{ height: '1.25rem', minWidth: '10rem' }}>
        <span
          className="absolute text-xs font-semibold tracking-[0.08em] uppercase text-white/60 transition-all duration-500 whitespace-nowrap"
          style={{
            transform: isHovered ? "translateY(-120%)" : "translateY(0)",
            opacity: isHovered ? 0 : 1,
          }}
        >
          {city}, {country}
        </span>

        <span
          className="absolute text-xs font-semibold tracking-[0.08em] uppercase text-white/60 transition-all duration-500 whitespace-nowrap"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(120%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          {currentTime} {timezone}
        </span>
      </div>

      {/* Arrow indicator */}
      <svg
        className="h-3 w-3 text-white/30 transition-all duration-300 flex-shrink-0"
        style={{
          transform: isHovered ? "translateX(2px) rotate(-45deg)" : "translateX(0) rotate(0)",
          opacity: isHovered ? 0.8 : 0.4,
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </button>
  )
}
