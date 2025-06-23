import { ImageSourcePropType } from "react-native";

export type WeatherCodes =
    | 0 | 1 | 2 | 3 | 45 | 48 | 51 | 53 | 55 | 56 | 57 | 61 | 63 | 65 | 66 | 67 | 71 | 73 | 75 | 77 | 80 | 81 | 82 | 85 | 86 | 95 | 96 | 99;


export const getIcon = (weatherCode: number, isDay: boolean): ImageSourcePropType => {

  const icons: Record<WeatherCodes, string> = {
    0: isDay ? `sunny` : `moony`,                                           // Clear sky
    1: isDay ? `mainly-clear-sun`: `mainly-clear-moon`,                     // Mainly clear
    2: isDay ? `cloudy-with-sun` : `cloudy-with-moon`,                      // Partly cloudy
    3: `cloudy`,                                                            // Overcast
    45: `cloudy`,                                                           // Fog
    48: `cloudy`,                                                           // Depositing rime fog
    51: isDay ? `cloudy-with-rain-and-sun` : `cloudy-with-rain-and-moon`,   // Drizzle: Light intensity
    53: isDay ? `cloudy-with-rain-and-sun` : `cloudy-with-rain-and-moon`,   // Drizzle: Moderate intensity
    55: isDay ? `cloudy-with-rain-and-sun` : `cloudy-with-rain-and-moon`,   // Drizzle: Dense intensity
    56: `rainy`,                                                            // Freezing drizzle: Light intensity
    57: `rainy`,                                                            // Freezing drizzle: Dense intensity
    61: `rainy`,                                                            // Rain: Slight intensity
    63: `moderate-rain`,                                                    // Rain: Moderate intensity
    65: `heavy-rain`,                                                       // Rain: Heavy intensity
    66: `rainy`,                                                            // Freezing rain: Light intensity
    67: `heavy-rain`,                                                       // Freezing rain: Heavy intensity
    71: `snowy`,                                                            // Snow fall: Slight intensity
    73: `snowy`,                                                            // Snow fall: Moderate intensity
    75: `heavy-snow`,                                                       // Snow fall: Heavy intensity
    77: `snowy`,                                                            // Snow grains
    80: `rainy`,                                                            // Rain showers: Slight
    81: `moderate-rain`,                                                    // Rain showers: Moderate
    82: `heavy-rain`,                                                       // Rain showers: Violent
    85: `snowy`,                                                            // Snow showers: Slight
    86: `snowy`,                                                            // Snow showers: Heavy
    95: isDay ? `storm-with-sun` : `storm-with-moon`,                       // Thunderstorm: Slight or moderate
    96: `storm-with-hail`,                                                  // Thunderstorm with slight hail
    99: `storm-with-hail`                                                   // Thunderstorm with heavy hail
  };

  const defaultIcon = `hurricane`;

  return require(`@/assets/icons/${icons[weatherCode as WeatherCodes] ?? defaultIcon}.png`)
};