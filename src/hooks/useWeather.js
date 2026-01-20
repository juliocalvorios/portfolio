import { useState, useEffect } from 'react'

const CACHE_KEY = 'weather_data'
const CACHE_DURATION = 10 * 60 * 1000

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
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setWeather({ ...data, loading: false, error: null })
            return
          }
        }

        const response = await fetch('/api/weather')

        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()

        const weatherData = {
          temp: data.temp,
          description: data.description,
          condition: data.condition,
          loading: false,
          error: null
        }

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
