import { useState, useEffect } from 'react'
import {
  Sun,
  CloudSun,
  Moon,
  Sunrise,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Coffee,
  Clock,
  MapPin,
  Thermometer,
  Activity
} from 'lucide-react'

/**
 * Developer Weather Forecast Widget
 * Advanced vintage newspaper style "weather report" showing developer status
 * Dynamic data based on time, with animated elements
 */
function WeatherWidget({ className = '' }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isHovered, setIsHovered] = useState(false)

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const hour = currentTime.getHours()
  const minutes = currentTime.getMinutes()

  // Format time as HH:MM
  const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

  // Determine productivity "weather" based on time of day
  const getProductivityForecast = () => {
    if (hour >= 6 && hour < 9) {
      return {
        condition: 'Warming Up',
        icon: Sunrise,
        productivity: 65,
        description: 'Morning routine'
      }
    } else if (hour >= 9 && hour < 12) {
      return {
        condition: 'Peak Hours',
        icon: Sun,
        productivity: 95,
        description: 'Deep work mode'
      }
    } else if (hour >= 12 && hour < 14) {
      return {
        condition: 'Refueling',
        icon: Coffee,
        productivity: 60,
        description: 'Lunch & recharge'
      }
    } else if (hour >= 14 && hour < 18) {
      return {
        condition: 'Steady Output',
        icon: CloudSun,
        productivity: 85,
        description: 'Productive afternoon'
      }
    } else if (hour >= 18 && hour < 22) {
      return {
        condition: 'Side Projects',
        icon: Zap,
        productivity: 70,
        description: 'Creative time'
      }
    } else {
      return {
        condition: 'Standby',
        icon: Moon,
        productivity: 20,
        description: 'Offline hours'
      }
    }
  }

  // Get next forecast
  const getNextForecast = () => {
    if (hour < 9) return 'Peak Hours at 9:00'
    if (hour < 12) return 'Break at 12:00'
    if (hour < 14) return 'Steady at 14:00'
    if (hour < 18) return 'Projects at 18:00'
    if (hour < 22) return 'Standby at 22:00'
    return 'Peak Hours at 9:00'
  }

  // Skills with dynamic trends
  const skills = [
    { name: 'React', level: 90, trend: 'up' },
    { name: 'TypeScript', level: 75, trend: 'up' },
    { name: 'UI/UX', level: 85, trend: 'stable' },
    { name: 'Node.js', level: 65, trend: 'up' },
  ]

  const forecast = getProductivityForecast()
  const ForecastIcon = forecast.icon

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="w-2.5 h-2.5 text-emerald-600" />
    if (trend === 'down') return <TrendingDown className="w-2.5 h-2.5 text-red-600" />
    return <Minus className="w-2.5 h-2.5 text-neutral-400" />
  }

  return (
    <div
      className={`border-2 border-neutral-800 bg-paper overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-md' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="border-b border-neutral-300 px-3 py-2 text-center">
        <h4 className="text-[10px] tracking-[0.2em] font-bold">
          DEVELOPER FORECAST
        </h4>
        <p className="text-[8px] tracking-wider text-neutral-400 mt-0.5">
          TORONTO BUREAU
        </p>
      </div>

      {/* Time and Location Bar */}
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-neutral-200 bg-neutral-50 text-[8px] tracking-wider text-neutral-500">
        <div className="flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          <span>{formattedTime} EST</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5" />
          <span>ON, CANADA</span>
        </div>
      </div>

      {/* Main Forecast Display */}
      <div className="p-3 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          {/* Large Icon */}
          <div className={`
            w-12 h-12 border border-neutral-300 rounded-sm flex items-center justify-center
            transition-all duration-300
            ${isHovered ? 'bg-neutral-100 scale-105' : 'bg-neutral-50'}
          `}>
            <ForecastIcon className={`w-6 h-6 transition-colors duration-300 ${
              isHovered ? 'text-neutral-800' : 'text-neutral-500'
            }`} />
          </div>

          {/* Condition Text */}
          <div className="flex-1">
            <p className="text-sm font-bold font-serif leading-tight">
              {forecast.condition}
            </p>
            <p className="text-[9px] text-neutral-500 mt-0.5">
              {forecast.description}
            </p>

            {/* Productivity Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-[8px] mb-0.5">
                <span className="tracking-wider text-neutral-400">OUTPUT</span>
                <span className="font-bold">{forecast.productivity}%</span>
              </div>
              <div className="h-1 bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-neutral-600 transition-all duration-500"
                  style={{ width: `${forecast.productivity}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid - 2x2 */}
      <div className="grid grid-cols-2 border-b border-neutral-200">
        {skills.map((skill, i) => (
          <div
            key={skill.name}
            className={`p-2 text-center ${
              i % 2 === 0 ? 'border-r border-neutral-200' : ''
            } ${i < 2 ? 'border-b border-neutral-200' : ''}`}
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-[8px] tracking-wider text-neutral-400 uppercase">
                {skill.name}
              </span>
              {getTrendIcon(skill.trend)}
            </div>
            {/* Mini progress bar */}
            <div className="h-1 bg-neutral-200 mx-auto max-w-[50px]">
              <div
                className="h-full bg-neutral-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Next Forecast */}
      <div className="px-3 py-2 bg-neutral-50">
        <div className="flex items-center justify-between">
          <span className="text-[8px] tracking-wider text-neutral-400">NEXT</span>
          <span className="text-[9px] font-serif">{getNextForecast()}</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
