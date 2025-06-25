import { WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { getIcon } from "@/util/weather-icons"
import { FlatList, Image, Platform, Switch, Text, View } from "react-native"

const dayData: any = [
    {id: `1`, title: `blabla1`},
    {id: `2`, title: `blabla2`},
    {id: `3`, title: `blabla3`}
]

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
            <FlatList
                data={dayData}
                horizontal
                scrollEnabled
                pagingEnabled
                showsHorizontalScrollIndicator
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                    <Text style={styles.slideText}>{item.title}</Text>
                    </View>
                )}
                contentContainerStyle={[
                    styles.scrollContainer,
                    Platform.OS === "web" && { overflowX: "scroll" },
                ]}
            />

        </View>

        <View className="weekWeather">

        </View>
        
        
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>