import { WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { getIcon } from "@/util/weather-icons"
import { Image, Platform, ScrollView, Switch, Text, View } from "react-native"

const data = [
  { id: "1", title: "Sunny" },
  { id: "2", title: "Cloudy" },
  { id: "3", title: "Rainy" },
  { id: "4", title: "Rainy" },
  { id: "5", title: "Rainy" },
  { id: "6", title: "Rainy" },
  { id: "7", title: "Rainy" },
  { id: "8", title: "Rainy" },
  { id: "9", title: "Rainy" },
  { id: "10", title: "Rainy" },
  { id: "11", title: "Rainy" },
  { id: "12", title: "Rainy" },
  { id: "13", title: "Rainy" },
  { id: "14", title: "Rainy" },
  { id: "15", title: "Rainy" },
  { id: "16", title: "Rainy" },
  { id: "17", title: "Rainy" },
  { id: "18", title: "Rainy" },
  { id: "19", title: "Rainy" },
  { id: "20", title: "Rainy" }

];

export const WeatherContainer: React.FC<WeatherProps> = ({
    date,
    weather,
    unit,
    onTempChange
}) => 
    <View className="weatherContainer"  style={styles.mainWeatherContainer}>
        <View style={{flexDirection: "row", alignItems:"center"}}>
            <Text>°C </Text>
            <Switch
            value={unit === "F"}
            onValueChange={onTempChange}
            />
            <Text> °F</Text>
        </View>
        <View className="currentWeather" style={styles.currentWeatherContainer}>
            <Text>Current Temperature</Text>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>{assignTemperature(weather.current.temperature, unit)}</Text>
                <Image
                    style={styles.iconImg}
                    source={getIcon(weather.current.weatherCode, weather.current.isDay)}
                />
            </View>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>Wind: {weather.current.windSpeed} km/h</Text>
                <Image
                    style={styles.iconImg}
                    source={require(`@/assets/icons/wind-speed.png`)}
                />
            </View>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>Apparent Temperature: {assignTemperature(weather.current.apparentTemp, unit)}</Text>
                <Image
                    style={styles.iconImg}
                    source={require(`@/assets/icons/apparent-temperature.png`)}
                />
            </View>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>Precipitation: {weather.current.precipitation}</Text>
                <Image
                    style={styles.iconImg}
                    source={require(`@/assets/icons/precipitation.png`)}
                />
            </View>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>Rain: {weather.current.rain}</Text>
                <Image
                    style={styles.iconImg}
                    source={require(`@/assets/icons/precipitation.png`)}
                />
            </View>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>Shower: {weather.current.showers}</Text>
                <Image
                    style={styles.iconImg}
                    source={require(`@/assets/icons/precipitation.png`)}
                />
            </View>
        </View>

        <View className="dayWeather">
            <Text>Daily Weather</Text>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={true}
                scrollEnabled={true}
                style={[
                    Platform.OS === 'web' && {
                        overflowX: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                    },
                ]}
                contentContainerStyle={[
                    styles.scrollContainer,
                ]}
                >
                {data.map((item: any) => (
                    <View key={item.id} style={styles.slide}>
                        <Text style={styles.slideText}>{item.title}</Text>
                    </View>
                ))}
            </ScrollView>

        </View>

        <View className="weekWeather">

        </View>
        
        
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>