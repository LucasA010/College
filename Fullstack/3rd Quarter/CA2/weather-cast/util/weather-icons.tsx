import { ImageSourcePropType } from "react-native";

export type WeatherCodes =
    | 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99;


export const getIcon = (weatherCode: number, isDay: boolean): ImageSourcePropType => {

  const icons: Record<WeatherCodes, ImageSourcePropType> = {
    0: isDay ? require(`@/assets/icons/sunny.png`) : require(`@/assets/icons/moony.png`),                                   // Clear sky
    1: isDay ? require(`@/assets/icons/mainly-clear-sun.png`) : require(`@/assets/icons/mainly-clear-moon.png`),            // Mainly clear
    2: isDay ? require(`@/assets/icons/cloudy-with-sun.png`) : require(`@/assets/icons/cloudy-with-moon.png`),              // Partly cloudy
    3: require(`@/assets/icons/cloudy.png`),                                                                                // Overcast
    45: require(`@/assets/icons/cloudy.png`),                                                                               // Fog
    48: require(`@/assets/icons/cloudy.png`),                                                                               // Depositing rime fog
    51: isDay ? require(`@/assets/icons/cloudy-with-rain-and-sun.png`) : require(`@/assets/icons/cloudy-with-rain-and-moon.png`),// Drizzle: Light intensity
    53: isDay ? require(`@/assets/icons/cloudy-with-rain-and-sun.png`) : require(`@/assets/icons/cloudy-with-rain-and-moon.png`),// Drizzle: Moderate intensity
    55: isDay ? require(`@/assets/icons/cloudy-with-rain-and-sun.png`) : require(`@/assets/icons/cloudy-with-rain-and-moon.png`),// Drizzle: Dense intensity
    56: require(`@/assets/icons/rainy.png`),                                                                                // Freezing drizzle: Light intensity
    57: require(`@/assets/icons/rainy.png`),                                                                                // Freezing drizzle: Dense intensity
    61: require(`@/assets/icons/rainy.png`),                                                                                // Rain: Slight intensity
    63: require(`@/assets/icons/moderate-rain.png`),                                                                        // Rain: Moderate intensity
    65: require(`@/assets/icons/heavy-rain.png`),                                                                           // Rain: Heavy intensity
    66: require(`@/assets/icons/rainy.png`),                                                                                // Freezing rain: Light intensity
    67: require(`@/assets/icons/heavy-rain.png`),                                                                           // Freezing rain: Heavy intensity
    71: require(`@/assets/icons/snowy.png`),                                                                                // Snow fall: Slight intensity
    73: require(`@/assets/icons/snowy.png`),                                                                                // Snow fall: Moderate intensity
    75: require(`@/assets/icons/heavy-snow.png`),                                                                           // Snow fall: Heavy intensity
    77: require(`@/assets/icons/snowy.png`),                                                                                // Snow grains
    80: require(`@/assets/icons/rainy.png`),                                                                                // Rain showers: Slight
    81: require(`@/assets/icons/moderate-rain.png`),                                                                        // Rain showers: Moderate
    82: require(`@/assets/icons/heavy-rain.png`),                                                                           // Rain showers: Violent
    85: require(`@/assets/icons/snowy.png`),                                                                                // Snow showers: Slight
    86: require(`@/assets/icons/snowy.png`),                                                                                // Snow showers: Heavy
    95: isDay ? require(`@/assets/icons/storm-with-sun.png`) : require(`@/assets/icons/storm-with-moon.png`),               // Thunderstorm: Slight or moderate
    96: require(`@/assets/icons/storm-with-hail.png`),                                                                      // Thunderstorm with slight hail
    99: require(`@/assets/icons/storm-with-hail.png`)                                                                       // Thunderstorm with heavy hail
  };

  const defaultIcon = require(`@/assets/icons/hurricane.png`);
  return icons[weatherCode as WeatherCodes] ?? defaultIcon;
};