
import axios from 'axios';

const WEATHER_BASE_URL = 'http://api.weatherapi.com/v1/current.json';
const FORCAST_BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';

const API_KEY = process.env.WEATHER_API_KEY;



export async function getCurrentWeather(location) {
  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        key: API_KEY,
        q: location,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
}

export async function getWeatherForecast(location, days = 3) {
  try {
    const response = await axios.get(FORCAST_BASE_URL, {
      params: {
        key: API_KEY,
        q: location,
        days,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}