export interface Suggestion {
  id?: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface WeatherData {
    current: {
        temperature: number,
        windSpeed: number,
        weatherCode:number,
        apparentTemp:number,
        precipitation?: number,
        rain?: number,
        showers?: number,
        isDay: boolean
    }

    hourly: {
        time: Date[],
        temperature: number[],
        weatherCode: number[],
        precipitationProb: number[],
        apparentTemp: number[],
        rain?: number[],
        showers?: number[],
        precipitation?: number[],
        windSpeed: number[],
        soilTemp?: number[],
        visibility?: number[]
    }
    
    daily: {
        time: Date[],
        weatherCode: number[],
        maxTemperature: number[],
        minTemperature: number[],
        sunrise: Date[],
        sunset: Date[],
        windSpeed: number[],
        rainSum?: number[],
        showerSum?: number[],
        precipitationProb: number[],
        precipitationSum?: number[]
    }
    
}

export interface Props {
    location: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    onUseMyLocation: () => void
}

