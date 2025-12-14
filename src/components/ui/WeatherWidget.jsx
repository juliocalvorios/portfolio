import { useState, useEffect } from 'react'
import { CloudSun, Cloud, Sun, CloudRain, CloudSnow, Moon } from 'lucide-react'

/**
 * Minimal Weather Footer
 * Small, unobtrusive weather line that completes the newspaper aesthetic
 */
function WeatherWidget({ className = '' }) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const hour = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  // Simple weather icon based on time (placeholder - could be real API)
  const getWeatherIcon = () => {
    if (hour >= 6 && hour < 20) {
      return <CloudSun className="w-3.5 h-3.5" />
    }
    return <Moon className="w-3.5 h-3.5" />
  }

  return (
    <div className={`px-3 py-2.5 border-t border-neutral-200 bg-neutral-50/50 ${className}`}>
      <div className="flex items-center justify-between text-[9px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          {getWeatherIcon()}
          <span className="font-medium">-4°C</span>
          <span className="text-neutral-400">Partly Cloudy</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400">
          <span>{formattedTime} EST</span>
          <span>·</span>
          <span>Toronto, ON</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
