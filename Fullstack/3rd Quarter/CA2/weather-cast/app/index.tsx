import React from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";

import { ErrorButton, SearchButton } from "@/components/buttons";
import { DynamicSearch } from "@/components/dynamic-search";
import { SearchBar } from "@/components/search-bar";
import { WeatherContainer } from "@/components/weather-container";
import { useWeatherHandlers } from "@/hooks/handlers";
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
    currDate,
    handleInputChange,
    handleSearch,
    handleSuggestionSelect,
    handleUserLocation,
    handleDismiss,
    handleUnitChange
  } = useWeatherHandlers();

    return(
      <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <ScrollView 
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
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
                  date={currDate}
                  weather={weather}
                  unit={unit}
                  onTempChange={handleUnitChange}
                />
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
}