import { WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { Switch, Text, View } from "react-native"


export const WeatherContainer: React.FC<WeatherProps> = ({
    weather,
    unit,
    onTempChange
}) => 
    <View style={styles.resultBox}>
        <View style={{flexDirection: "row", alignItems:"center"}}>
            <Text>Farenheit: </Text>
            <Switch
            value={unit === "F"}
            onValueChange={onTempChange}
            />
        </View>
        
        
        <Text style={styles.resultText}>Temperature: {assignTemperature(weather.current.temperature, unit)}</Text>
        <Text style={styles.resultText}>Wind Speed: {weather.current.windSpeed} km/h</Text>
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>