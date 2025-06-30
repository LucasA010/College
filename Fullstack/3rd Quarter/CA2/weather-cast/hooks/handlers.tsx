// React imports
import { useCallback, useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
// Debounce to possibilitate dynamich search withou too many API's requests
import debounce from "lodash.debounce";
// In app imports
import { Coordinates, Suggestion, WeatherData } from "@/interfaces/interfaces";
import { getCoordinates, getCurrWeather, getSuggestions } from "@/public/api/weather-api";
import { getCurrCoords, getLocationName } from "@/util/location";


export const useWeatherHandlers = () => {
        // Variables for app functionability
        const [location, setLocation] = useState<string>(""); 
        const [placeholder, setPlaceholder] = useState<string>("Enter your location")
        const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
        const [weather, setWeather] = useState<WeatherData | null>(null);
        const [loading, setLoading] =useState<boolean>(false);
        const [error, setError] = useState<string>("");
        const [unit, setUnit] = useState<"C" | "F">("C");
        const [currDate, setCurrDate] = useState<Date>(new Date());
        const [history, setHistory] = useState<Suggestion[]>([]);
        const [inputFocused, setInputFocused] = useState<boolean>(false);
        // Key value for storaged data
        const historyKey = "weather_search_history"

        // On load fetches storage if exists
        useEffect(() => {
            (async () => {
                const stored = await AsyncStorage.getItem(historyKey);
                if (stored) {
                setHistory(JSON.parse(stored));
                }
            })();
            }, []);

        // function to save search to history
        const saveHistory = async (query: Suggestion) => { 
            try {
                const historyUpdated = [query, ...history.filter(element => element.id !== query.id)].slice(0, 10);
                setHistory(historyUpdated)

                await AsyncStorage.setItem(historyKey, JSON.stringify(historyUpdated))
            } catch (error) {
                console.error("Error while saving history list -> "+error)
            }
        }

        // function to clear history
        const clearHistory = async () => {
            try {
                await AsyncStorage.removeItem(historyKey)
                setHistory([])
            } catch (error) {
                console.error("Error while clearing history -> "+error)
            }
        }

        // function to fetch suggestions as user is typeing, it uses a different API than open meteo
        const fetchSuggestions = useCallback(
            debounce(async (text: string)=> {
                if (text.length < 2) {
                setSuggestions([]);
                return;
                }
                const results = await getSuggestions(text); // API function for results
                setSuggestions(results);
            }, 300), []
        )

        // When input is updated it sets the location and fetch the suggestions (function above)
        const handleInputChange = (text: string) => {
            setLocation(text);
            fetchSuggestions(text);
        }

        // When the user selects a suggestions it resets the list and se choosen suggestion on location
        // Also it saves to history and initiate the search for the data
        const handleSuggestionSelect = async (suggestion: Suggestion) => {
            setLocation(`${suggestion.name}, ${suggestion.country}`);
            setSuggestions([])
            await saveHistory(suggestion)
            handleSearch(suggestion.latitude, suggestion.longitude)
        }
        
        //Function to search data
        const handleSearch = async (lat?: number, long?: number) => {
            // resseting parameters
            setLoading(true);
            setWeather(null);
            setError("");

        try { 
            let coordinates: Coordinates;

            if (!lat || !long) { // If coords aren't provided (user typing location), it fetches then
                const fetched = await getCoordinates(location); // Function to search location using user curr location
                if (!fetched) {
                    setError("Location not found")
                    setLoading(false);
                    return;
            }
                coordinates = fetched;
            } else {
                coordinates = {latitude: lat, longitude:long}
            }

            const weatherData = await getCurrWeather(coordinates.latitude, coordinates.longitude); // getting weather data
            if (weatherData) setWeather(weatherData);
            else setError("Could not load weather data")
        } catch (error) {
            setError("Error while fetching data")
        } finally {
            setLoading(false);
        }
        }

        // function to user loaction button
        const handleUserLocation = async () => {
            // resetting parameters
            setLoading(true);
            setSuggestions([]);
            setError("");

        try {
            const coords = await getCurrCoords(); // function to get coords from user

            if (!coords) {
            setError("Error while getting user location");
            return;
            }

            await handleSearch(coords.latitude, coords.longitude);
            const locationName = await getLocationName(coords) // getting location name using coords
            
            setPlaceholder(locationName);
            setLocation(locationName);
            
        } catch (error) {
            setError("Error while getting your location"+error)
        } finally {
            setLoading(false)
        }
        }

        // aux function for dismissing keyboard
        const handleDismiss = () => {
        if (Platform.OS !== "web") {
            Keyboard.dismiss();
            setSuggestions([]);
        }
        }
        
        // aux function for differente temp unit
        const handleUnitChange = () => {
            if (unit === "F") setUnit("C")
            else setUnit("F")
        }

        //aux function for input focus on text input
        const handleInputFocus = (state:boolean) => {
            setInputFocused(state)
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
        history, setHistory,
        inputFocused, setInputFocused,
        handleInputFocus,
        clearHistory,
        saveHistory,
        handleInputChange,
        handleSearch,
        handleUserLocation,
        handleSuggestionSelect,
        handleDismiss,
        handleUnitChange
    }
}