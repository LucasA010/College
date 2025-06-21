import React from "react";
import {
  ActivityIndicator,
  Pressable,
  Text, View
} from "react-native";

import { ErrorButton, SearchButton } from "@/components/buttons";
import { DynamicSearch } from "@/components/dynamic-search";
import { SearchBar } from "@/components/search-bar";
import { WeatherContainer } from "@/components/weather-container";
import { weatherHandlers } from "@/hooks/handlers";
import { styles } from "@/public/styles/style";

export default function App() {
  const {
    location,
    placeholder,
    suggestions,
    weather,
    loading,
    error,
    unit,
    handleInputChange,
    handleSearch,
    handleSuggestionSelect,
    handleUserLocation,
    handleDismiss,
    handleUnitChange
  } = weatherHandlers();

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
            <DynamicSearch
              suggestions={suggestions}
              onSuggestion={handleSuggestionSelect}
            />
          )}

          {error ? (
            <ErrorButton
              error={error}
              onRetry={() => handleSearch()}
              />
          ) : 
          <SearchButton
            onSearch={() => handleSearch(undefined, undefined)}
          />}     

          {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

          {weather && (
            <WeatherContainer
              weather={weather}
              unit={unit}
              onTempChange={handleUnitChange}
            />
          )}
        </View>
      </Pressable>
    )
}