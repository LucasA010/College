/** Interfaces for ease of data structuring */

import { ImageSourcePropType } from "react-native"

export interface Suggestion {
  id?: number,
  name: string,
  country: string,
  latitude: number,
  longitude: number,
  admin1: string
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

export interface SearchProps {
    onFocus: () => void,
    location: string,
    placeholder: string,
    onChangeText: (text: string) => void,
    onUseMyLocation: () => void
}

export interface DynamicProps {
    suggestions: Suggestion[]
    onSuggestion: (item: Suggestion) => void
}

export interface ErrorProps {
    error: string,
    onRetry: () => void
}

export interface SearchButtonProps {
    onSearch: () => void
}

export interface WeatherProps {
    date: Date,
    weather: WeatherData,
    unit: "C" | "F",
    onTempChange: () => void
}

export interface HistoryProps {
    history: Suggestion[],
    onSuggestion: (item: Suggestion) => void
}

export interface WeatherCardProps {
    description?: string,
    unit?: "C" | "F",
    extraDescription?: string | "",
    weatherInfo: any,
    icon: ImageSourcePropType
}