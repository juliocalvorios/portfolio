import { useState, useEffect } from 'react'
import { CloudSun, Cloud, Sun, CloudRain, CloudSnow, Moon } from 'lucide-react'
import { useWeather } from '../../hooks/useWeather'

/**
 * Minimal Weather Footer
 * Small, unobtrusive weather line that completes the newspaper aesthetic
 */
function WeatherWidget({ className = '' }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const weather = useWeather()

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

  // Weather icon based on real conditions and time
  const getWeatherIcon = () => {
    const isDaytime = hour >= 6 && hour < 20

    if (weather.loading) {
      return <CloudSun className="w-3.5 h-3.5 animate-pulse" />
    }

    const condition = weather.condition?.toLowerCase()

    if (!isDaytime) {
      return <Moon className="w-3.5 h-3.5" />
    }

    if (condition?.includes('clear')) {
      return <Sun className="w-3.5 h-3.5" />
    } else if (condition?.includes('rain') || condition?.includes('drizzle')) {
      return <CloudRain className="w-3.5 h-3.5" />
    } else if (condition?.includes('snow')) {
      return <CloudSnow className="w-3.5 h-3.5" />
    } else if (condition?.includes('cloud')) {
      return <CloudSun className="w-3.5 h-3.5" />
    }

    return <CloudSun className="w-3.5 h-3.5" />
  }

  // Capitalize first letter of each word in description
  const formatDescription = (desc) => {
    if (!desc) return ''
    return desc.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className={`px-3 py-2.5 border-t border-neutral-200 bg-neutral-50/50 ${className}`}>
      <div className="flex items-center justify-between text-[9px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          {getWeatherIcon()}
          <span className="font-medium">
            {weather.loading ? '...' : `${weather.temp}°C`}
          </span>
          <span className="text-neutral-400">
            {weather.loading ? 'Loading...' : formatDescription(weather.description)}
          </span>
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
