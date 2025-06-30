import { Coordinates, Suggestion, WeatherData } from "@/interfaces/interfaces";
import axios from "axios";


export const getSuggestions = async (query: string) => { // function to fetch suggestions when users types location
    try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`) // return up to 5 locations

        return response.data.results || [];
    } catch (error) {
        console.error("Error while fetching suggestions "+error)
        return [];
    }
}

export const getCoordinates = async (locationName: string): Promise<Coordinates | null> => { // function to get coordinates when user selects a locations
    try {
        const geoResult = await axios.get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}`)

        const location = geoResult.data.results?.[0] // only gets the first result
        if (!location) return null;

        return {
            latitude: location.latitude,
            longitude: location.longitude
        }

        
    } catch (error) {
        console.error("Error while fetching coordinates with API -> "+error)
        return null;
    }
}

export const getCurrWeather = async (latitude: number, longitude: number):Promise<WeatherData | null> => { //getting weather data from user input
    try {
        const weatherLocation = await axios.get("https://api.open-meteo.com/v1/forecast", {
                params: {
                    latitude,
                    longitude,
                    current: "temperature_2m,precipitation,rain,showers,is_day,apparent_temperature,wind_speed_10m,weather_code",
                    hourly: "temperature_2m,weather_code,precipitation_probability,apparent_temperature,rain,showers,precipitation,wind_speed_10m,soil_temperature_0cm,visibility",
                    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,wind_speed_10m_max,rain_sum,showers_sum,precipitation_probability_max,precipitation_sum",
                    timezone: "auto"
                }
                });


        const weatherData = weatherLocation.data;
        return { // gets all necessary data at once to avoid excessive requests
            current: {
                temperature: weatherData.current.temperature_2m,
                windSpeed: weatherData.current.wind_speed_10m,
                weatherCode:weatherData.current.weather_code,
                apparentTemp:weatherData.current.apparent_temperature,
                precipitation: weatherData.current.precipitation,
                rain: weatherData.current.rain,
                showers: weatherData.current.showers,
                isDay: weatherData.current.is_day
            },

            hourly: {
                time: weatherData.hourly.time.map((t:string) => new Date(t)),
                temperature: weatherData.hourly.temperature_2m,
                weatherCode: weatherData.hourly.weather_code,
                precipitationProb: weatherData.hourly.precipitation_probability,
                apparentTemp: weatherData.hourly.apparent_temperature,
                rain: weatherData.hourly.rain,
                showers: weatherData.hourly.showers,
                precipitation: weatherData.hourly.precipitation,
                windSpeed: weatherData.hourly.wind_speed_10m,
                soilTemp: weatherData.hourly.soil_temperature_0cm,
                visibility: weatherData.hourly.visibility
            },
            
            daily: {
                time: weatherData.daily.time.map((t:string) => new Date(t)),
                weatherCode: weatherData.daily.weather_code,
                maxTemperature: weatherData.daily.temperature_2m_max,
                minTemperature: weatherData.daily.temperature_2m_min,
                sunrise: weatherData.daily.sunrise,
                sunset: weatherData.daily.sunset,
                windSpeed: weatherData.daily.wind_speed_10m_max,
                rainSum: weatherData.daily.rain_sum,
                showerSum: weatherData.daily.showers_sum,
                precipitationProb: weatherData.daily.precipitation_probability_max,
                precipitationSum: weatherData.daily.precipitation_sum
            }
        }
    } catch (error) {
        console.error("Error while fetching weather with API -> "+error)
        return null;
    }
}
