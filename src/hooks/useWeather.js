import { useState, useEffect } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const CITY = 'Toronto'
const CACHE_KEY = 'weather_data'
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

/**
 * Custom hook to fetch real-time weather data from OpenWeather API
 * Includes caching to avoid excessive API calls
 */
export function useWeather() {
  const [weather, setWeather] = useState({
    temp: null,
    description: null,
    condition: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setWeather({ ...data, loading: false, error: null })
            return
          }
        }

        // Fetch fresh data
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()

        const weatherData = {
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          condition: data.weather[0].main,
          loading: false,
          error: null
        }

        // Cache the data
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: weatherData,
          timestamp: Date.now()
        }))

        setWeather(weatherData)
      } catch (error) {
        console.error('Weather fetch error:', error)
        setWeather({
          temp: -4,
          description: 'Partly Cloudy',
          condition: 'Clouds',
          loading: false,
          error: error.message
        })
      }
    }

    fetchWeather()
  }, [])

  return weather
}
