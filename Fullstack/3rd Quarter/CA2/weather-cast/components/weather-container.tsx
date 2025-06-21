import { WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { View, Text } from "react-native"


export const WeatherContainer: React.FC<WeatherProps> = ({
    weather
}) => 
    <View style={styles.resultBox}>
        <Text style={styles.resultText}>Temperature: {weather.current.temperature}°C</Text>
        <Text style={styles.resultText}>Wind Speed: {weather.current.windSpeed} km/h</Text>
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>