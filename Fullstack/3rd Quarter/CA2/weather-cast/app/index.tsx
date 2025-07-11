import "@/public/styles/global.css";

import React from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";

import { ErrorButton, SearchButton } from "@/components/buttons";
import { DynamicSearch, HistoryList } from "@/components/dynamic-search";
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
    history,
    inputFocused,
    clearHistory,
    handleInputFocus,
    handleInputChange,
    handleSearch,
    handleSuggestionSelect,
    handleUserLocation,
    handleDismiss,
    handleUnitChange
  } = useWeatherHandlers();

    return(
      <KeyboardAvoidingView
      style={styles.keyboardOuterContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable  onPress={handleDismiss} style={styles.pressableContainer}>
          
          <View  style={styles.outerViewContainer}>
            <Text style={styles.titleText}>Weather Cast</Text>
            <SearchBar
              onFocus={() => handleInputFocus(true)}
              location={location}
              placeholder={placeholder}
              onChangeText={handleInputChange}
              onUseMyLocation={handleUserLocation}
            />

            {(history.length > 0 && inputFocused && !location) ? 
              <>
                <HistoryList
                  history={history}
                  onSuggestion={(item) => {
                  handleInputChange(item.name);
                  handleSearch();
                }}
              />
              <Pressable
                
                onPress={clearHistory}
                style={styles.pressableHistory}
              >
                <Text  style={{ color: "red" }}>Clear Search History</Text>
              </Pressable>
            </>
            : suggestions.length > 0 && (
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
            <ScrollView
            style={styles.weatherMainScrollView}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {weather && (
              <WeatherContainer
                date={currDate}
                weather={weather}
                unit={unit}
                onTempChange={handleUnitChange}
              />
            )}
            </ScrollView>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    )
}