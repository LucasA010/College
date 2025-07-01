import { CurrentWeatherCardProps, DailyCardProps, DateFormattingProps, WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { getIcon } from "@/util/weather-icons"
import { format } from "date-fns"
import { FlatList, Image, Switch, Text, View } from "react-native"

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
        <View style={{flexDirection: "row", alignItems:"center", justifyContent:"space-evenly", width:800}}>
            <DateInfo date={date} formatType="MMMM do, h:mm a"/>
            <View style={{flexDirection:"row"}}>
                <Text> °C </Text>
                <Switch
                value={unit === "F"}
                onValueChange={onTempChange}
                />
                <Text> °F</Text>
            </View>
        </View>
        <View className="currentWeather" style={styles.currentWeatherContainer}>
            <Text>Current Temperature</Text>
            <CurrentWeatherCard
                weatherInfo={weather.current.temperature}
                unit={unit}
                icon={getIcon(weather.current.weatherCode, weather.current.isDay)}
            />
            <CurrentWeatherCard
                description="Wind: "
                weatherInfo={weather.current.windSpeed}
                extraDescription=" km/h"
                icon={require(`@/assets/icons/wind-speed.png`)}
            />
            <CurrentWeatherCard
                description="Apparent Temperature: "
                weatherInfo={weather.current.apparentTemp}
                unit={unit}
                icon={require(`@/assets/icons/apparent-temperature.png`)}
            />
            <CurrentWeatherCard
                description="Precipitation: "
                weatherInfo={weather.current.precipitation}
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
            <FlatList
                data={weather.daily.time.map((date, index) => ({
                    date,
                    min: weather.daily.minTemperature[index],
                    max: weather.daily.maxTemperature[index],
                    weatherCode: weather.daily.weatherCode[index],
                    sunrise: weather.daily.sunrise[index],
                    sunset: weather.daily.sunset[index],
                    windSpeed: weather.daily.windSpeed[index],
                    precProb: weather.daily.precipitationProb[index]
                }))}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={({item}) => (
                    <DailyWeatherCard
                        time={item.date}
                        minTemp={item.min}
                        maxTemp={item.max}
                        weathercode={item.weatherCode}
                        sunrise={item.sunrise}
                        sunset={item.sunset}
                        unit={unit}
                        precipitationProb={item.precProb}
                        windSpeed={item.windSpeed}
                    />
                )}
            />
        </View>
        
        
        <Text style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> =({
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

export const DailyWeatherCard: React.FC<DailyCardProps> = ({
    time,
    weathercode,
    minTemp,
    maxTemp,
    sunrise,
    sunset,
    unit,
    windSpeed,
    precipitationProb
}) => <View>
        <DateInfo date={time} formatType="dd/MM"/>
        <Image style={styles.iconImg} source={getIcon(weathercode, true)}/>
        <Text>{assignTemperature(minTemp, unit)}</Text>
        <Text>{assignTemperature(maxTemp, unit)}</Text>
        <View>
            <Text>WindSpeed: {windSpeed} km/h</Text>
            <Image style={styles.iconImg} source={require("@/assets/icons/wind-speed.png")}/>
        </View>
        <View>
            <Text>Precipitation Probability: {precipitationProb}</Text>
            <Image style={styles.iconImg} source={require("@/assets/icons/humidity.png")}/>
        </View>
        <View>
            <Image style={styles.iconImg} source={require("@/assets/icons/sunrise.png")}/>
            <DateInfo date={sunrise} formatType="kk:mm"/>
        </View>
        <View>
            <Image style={styles.iconImg} source={require("@/assets/icons/sunset.png")}/>
            <DateInfo date={sunset} formatType="kk:mm"/>
        </View>
      </View>

export const DateInfo: React.FC<DateFormattingProps> = ({
    date,
    formatType
}) => {
    const formattedDate = format(date, formatType)
    return (
        <Text>{formattedDate}</Text>
    )}