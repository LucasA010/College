import { WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { getIcon } from "@/util/weather-icons"
import { Switch, Text, View, Image } from "react-native"


export const WeatherContainer: React.FC<WeatherProps> = ({
    weather,
    unit,
    onTempChange
}) => 
    <View className="weatherContainer"  style={styles.mainWeatherContainer}>
        <View style={{flexDirection: "row", alignItems:"center"}}>
            <Text>Farenheit: </Text>
            <Switch
            value={unit === "F"}
            onValueChange={onTempChange}
            />
        </View>
        <View className="currentWeather" style={styles.currentWeatherContainer}>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>{assignTemperature(weather.current.temperature, unit)}</Text>
                <Image
                    style={styles.iconImg}
                    source={getIcon(weather.current.weatherCode, weather.current.isDay)}
                />
            </View>
            <View className="currentWeatherCard" style={styles.currentWeatherCard}>
                <Text style={styles.resultText}>{weather.current.windSpeed} km/h</Text>
                <Image
                    style={styles.iconImg}
                    source={require(`@/assets/icons/wind-speed.png`)}
                />
            </View>
        </View>

        <View className="dayWeather">

        </View>

        <View className="weekWeather">

        </View>
        
        
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>