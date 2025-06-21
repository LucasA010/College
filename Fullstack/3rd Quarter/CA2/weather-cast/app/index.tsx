import React from "react";
import {Text, Button, View, ActivityIndicator, 
        FlatList, TouchableOpacity, Pressable,} from "react-native";

import {Suggestion} from "@/interfaces/interfaces";
import { styles } from "@/public/styles/style";
import { SearchBar } from "@/components/search-bar";
import { weatherHandlers } from "@/hooks/handlers";
import { DynamicSearch } from "@/components/dynamic-search";
import { ErrorButton, SearchButton } from "@/components/buttons";
import { WeatherContainer } from "@/components/weather-container";

export default function App() {
  const {
    location,
    placeholder,
    suggestions,
    weather,
    loading,
    error,
    handleInputChange,
    handleSearch,
    handleSuggestionSelect,
    handleUserLocation,
    handleDismiss
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
            />
          )}
        </View>
      </Pressable>
    )
}