import { useCallback, useState } from "react";
import { Keyboard, Platform } from "react-native";

import debounce from "lodash.debounce";

import { Coordinates, Suggestion, WeatherData } from "@/interfaces/interfaces";
import { getCoordinates, getCurrWeather, getSuggestions } from "@/public/api/weather-api";
import { getCurrCoords, getLocationName } from "@/util/location";


export const useWeatherHandlers = () => {
        const [location, setLocation] = useState<string>(""); 
        const [placeholder, setPlaceholder] = useState<string>("Enter your location")
        const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
        const [weather, setWeather] = useState<WeatherData | null>(null);
        const [loading, setLoading] =useState<boolean>(false);
        const [error, setError] = useState<string>("")
        const [unit, setUnit] = useState<"C" | "F">("C");
        const [currDate, setCurrDate] = useState<Date>(new Date())

        const fetchSuggestions = useCallback(
        debounce(async (text: string)=> {
            if (text.length < 2) {
            setSuggestions([]);
            return;
            }
            const results = await getSuggestions(text);
            setSuggestions(results);
        }, 300), []
        )

        const handleInputChange = (text: string) => {
        setLocation(text);
        fetchSuggestions(text);
        }

        const handleSuggestionSelect = (suggestion: Suggestion) => {
        setLocation(`${suggestion.name}, ${suggestion.country}`);
        setSuggestions([])
        handleSearch(suggestion.latitude, suggestion.longitude)
        }
        
        const handleSearch = async (lat?: number, long?: number) => {
        setLoading(true);
        setWeather(null);
        setError("");

        try {
            let coordinates: Coordinates;

            if (!lat || !long) {
            const fetched = await getCoordinates(location);
            if (!fetched) {
                setError("Location not found")
                setLoading(false);
                return;
            }
            coordinates = fetched;
            } else {
            coordinates = {latitude: lat, longitude:long}
            }

            const weatherData = await getCurrWeather(coordinates.latitude, coordinates.longitude);
            if (weatherData) setWeather(weatherData);
            else setError("Could not load weather data")
        } catch (error) {
            setError("Error while fetching data")
        } finally {
            setLoading(false);
        }
        }

        const handleUserLocation = async () => {
        setLoading(true);
        setSuggestions([]);
        setError("");

        try {
            const coords = await getCurrCoords();

            if (!coords) {
            setError("Error while getting user location");
            return;
            }

            await handleSearch(coords.latitude, coords.longitude);
            const locationName = await getLocationName(coords)
            
            setPlaceholder(locationName);
            setLocation(locationName);
            
        } catch (error) {
            setError("Error while getting your location"+error)
        } finally {
            setLoading(false)
        }
        }

        const handleDismiss = () => {
        if (Platform.OS !== "web") {
            Keyboard.dismiss();
            setSuggestions([]);
        }
        }
        
        const handleUnitChange = () => {
            if (unit === "F") setUnit("C")
            else setUnit("F")
        }

    return {
        location, setLocation,
        placeholder, setPlaceholder,
        suggestions, setSuggestions,
        weather, setWeather,
        loading, setLoading,
        error, setError,
        unit, setUnit,
        currDate, setCurrDate,
        handleInputChange,
        handleSearch,
        handleUserLocation,
        handleSuggestionSelect,
        handleDismiss,
        handleUnitChange
    }
}