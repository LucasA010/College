import { WeatherCardProps, WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { getIcon } from "@/util/weather-icons"
import { FlatList, Image, ScrollView, Switch, Text, View } from "react-native"

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
            <WeatherCard
                weatherInfo={weather.current.temperature}
                unit={unit}
                icon={getIcon(weather.current.weatherCode, weather.current.isDay)}
            />
            <WeatherCard
                description="Wind: "
                weatherInfo={weather.current.windSpeed}
                extraDescription=" km/h"
                icon={require(`@/assets/icons/wind-speed.png`)}
            />
            <WeatherCard
                description="Apparent Temperature: "
                weatherInfo={weather.current.apparentTemp}
                unit={unit}
                icon={require(`@/assets/icons/apparent-temperature.png`)}
            />
            <WeatherCard
                description="Precipitation: "
                weatherInfo={weather.current.precipitation}
                icon={require(`@/assets/icons/precipitation.png`)}
            />
            <WeatherCard
                description="Rain: "
                weatherInfo={weather.current.rain}
                icon={require(`@/assets/icons/precipitation.png`)}
            />
            <WeatherCard
                description="Shower: "
                weatherInfo={weather.current.rain}
                icon={require(`@/assets/icons/precipitation.png`)}
            />
        </View>

        <View style={{ height: 220, marginTop: 16 }}>
            <Text style={{ fontSize: 18, marginBottom: 8 }}>Daily Weather</Text>
            
            <FlatList
                horizontal
                data={data}
                style={{height: 300}}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                <View style={styles.slide}>
                    <Text style={styles.slideText}>{item.title}</Text>
                </View>
                )}
                contentContainerStyle={styles.scrollContainer}
            />
        </View>

        <View className="weekWeather">

        </View>
        
        
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>

export const WeatherCard: React.FC<WeatherCardProps> =({
    description,
    unit,
    extraDescription,
    weatherInfo,
    icon
}) =>   <View className="currentWeatherCard" style={styles.currentWeatherCard}>
            <Text style={styles.resultText}>{description} {unit ? assignTemperature(weatherInfo, unit) : weatherInfo} {extraDescription}</Text>
            <Image
                style={styles.iconImg}
                source={icon}
            />
        </View>