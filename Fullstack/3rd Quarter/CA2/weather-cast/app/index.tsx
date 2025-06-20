import React, {useCallback, useState} from "react";
import {Text, TextInput, Button, View, ActivityIndicator, 
        FlatList, TouchableOpacity, Pressable, 
        Keyboard, Platform, Image} from "react-native";

import debounce from 'lodash.debounce';

import { getCoordinates, getCurrWeather, getSuggestions } from "@/public/api/weather-api";
import { WeatherData, Suggestion, Coordinates } from "@/interfaces/interfaces";
import { styles } from "@/public/styles/style";
import { getCurrCoords} from "@/util/location";
import { SearchBar } from "@/components/search-bar";

export default function App() {
  const [location, setLocation] = useState<string>(""); 
  const [placeholder, setPlaceholder] = useState<string>("Enter your location")
  const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] =useState<boolean>(false);
  const [error, setError] = useState<string>("")

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
    setLocation(suggestion.name);
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
      console.log(coords)

      if (!coords) {
        setError("Error while getting user location");
        return;
      }

      await handleSearch(coords.latitude, coords.longitude);
      setPlaceholder("Your location")
      
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

    return(
      <Pressable style={{flex: 1}} onPress={handleDismiss}>

        <View style={styles.container}>
          <Text style={styles.title}>Weather Cast</Text>
          <SearchBar
            location={location}
            placeholder={placeholder}
            onChangeText={handleInputChange}
            onUseMyLocation={handleUserLocation}
          />

          {suggestions.length > 0 && (
            <FlatList<Suggestion>
              data={suggestions}
              keyExtractor={(item) => item.id?.toString() ?? `${item.name} - ${item.latitude}`}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.suggestion}
                  onPress={() => handleSuggestionSelect(item)}
                >
                <Text>{item.name}, {item.country}</Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}

          {error ? (
            <>
              <Button title="Retry" onPress={() => handleSearch()} />
              <Text style={styles.error}>{error}</Text>
            </>
          ) : 
          <Button 
            title="Search" 
            onPress={() => handleSearch(undefined , undefined)}
          />}     

          {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

          {weather && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Temperature: {weather.current.temperature}°C</Text>
              <Text style={styles.resultText}>Wind Speed: {weather.current.windSpeed} km/h</Text>
              <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
            </View>
          )}
        </View>
      </Pressable>
    )
}