export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const API_KEY = process.env.OPENWEATHER_API_KEY
  const CITY = 'Toronto'

  if (!API_KEY) {
    return res.status(500).json({
      error: 'Weather API not configured',
      fallback: {
        temp: -4,
        description: 'Partly Cloudy',
        condition: 'Clouds'
      }
    })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`OpenWeather API returned ${response.status}`)
    }

    const data = await response.json()

    return res.status(200).json({
      temp: Math.round(data.main.temp),
      description: data.weather[0].description,
      condition: data.weather[0].main,
      city: data.name,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('Weather API error:', error.message)

    return res.status(200).json({
      temp: -4,
      description: 'Partly Cloudy',
      condition: 'Clouds',
      city: 'Toronto',
      timestamp: Date.now(),
      fallback: true
    })
  }
}
