import "@/public/styles/global.css"

import { CurrentWeatherCardProps, DailyCardProps, DateFormattingProps, DayCardProps, WeatherProps } from "@/interfaces/interfaces"
import { strStyles, styles } from "@/public/styles/style"
import { assignTemperature } from "@/util/temp-converter"
import { getIcon } from "@/util/weather-icons"
import { format } from "date-fns"
import { FlatList, Image, Switch, Text, View } from "react-native"


export const WeatherContainer: React.FC<WeatherProps> = ({
    date,
    weather,
    unit,
    onTempChange
}) => {
    const hourlyIndexes: number[] = []

    weather.hourly.time.forEach((time, index) => {
        if (format(date, "P") === format(time, "P")) hourlyIndexes.push(index+1)
    })
    
    const dayFilter = (arr?: any) => {
        return hourlyIndexes.map(i => arr[i])
    }

    const hourlyFiltered = {
        time: dayFilter(weather.hourly.time),
        temperature: dayFilter(weather.hourly.temperature),
        precipitationProb: dayFilter(weather.hourly.precipitationProb),
        weatherCode: dayFilter(weather.hourly.weatherCode),
    }

    return(
    <View className={strStyles.mainWeatherContainer}  style={styles.mainWeatherContainer}>
        <View className={strStyles.weatherMetadataContainer} style={{flexDirection: "row", alignItems:"center", justifyContent:"space-evenly", width:800}}>
            <DateInfo date={date} formatType="MMMM do, h:mm a"/>
            <View className={strStyles.temperatureSwitchContainer} style={{flexDirection:"row"}}>
                <Text className={strStyles.textStyle}> °C </Text>
                <Switch 
                className={strStyles.temperatureSwitch}
                value={unit === "F"}
                onValueChange={onTempChange}
                />
                <Text className={strStyles.textStyle}> °F</Text>
            </View>
        </View>
        <View className={strStyles.currentWeatherContainer} style={styles.currentWeatherContainer}>
            <Text className={strStyles.textStyle}>Current Temperature</Text>
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

        <View className={strStyles.dailyWeatherContainer} style={{ height: 220, marginTop: 16 }}>
            <Text className={strStyles.textStyle} style={{ fontSize: 18, marginBottom: 8 }}>Daily Weather</Text>
            
            <FlatList
                className={strStyles.dayList}
                style={{width: 500}}
                horizontal
                scrollEnabled
                data={hourlyFiltered.time.map((date, index) => ({
                    date,
                    temp: weather.hourly.temperature[index],
                    weatherCode: weather.hourly.weatherCode[index],
                    precProb: weather.hourly.precipitationProb[index]
                }))}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{paddingHorizontal: 10}}
                renderItem={({item}) => (
                    <DayCard
                        time={item.date}
                        temperature={item.temp}
                        precProb={item.precProb}
                        weatherCode={item.weatherCode}
                        unit={unit}
                    />
                )}
            />
        </View>

        <View className={strStyles.weekWeatherContainer}>
            <FlatList
                className={strStyles.weekList}
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
        
        
        <Text className={strStyles.attributeMsg} style={styles.attributeMsg}>All icons by iconixar from flaticon.com</Text>
    </View>
)}
    

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> =({
    description,
    unit,
    extraDescription,
    weatherInfo,
    icon
}) =>   <View className={strStyles.currentWeatherCard} style={styles.currentWeatherCard}>
            <Text className={strStyles.textStyle} style={styles.resultText}>{description} {unit ? assignTemperature(weatherInfo, unit) : weatherInfo} {extraDescription}</Text>
            <Image
                className={strStyles.iconStyle}
                style={styles.iconImg}
                source={icon}
            />
        </View>

export const DayCard: React.FC<DayCardProps> = ({
    time,
    unit,
    temperature,
    weatherCode,
    precProb
}) => {
    return (
        <View className={strStyles.dayWeatherCard}>
            <DateInfo date={time} formatType="kk:mm"/>
            <Text className={strStyles.textStyle}>{assignTemperature(temperature, unit)}</Text>
            <Image 
                className={strStyles.iconStyle}
                style={styles.iconImg} 
                source={getIcon(weatherCode, (7 < time.getHours() && time.getHours() < 19)? true : false)}
            />
            <Text className={strStyles.textStyle}>{precProb}</Text>
            <Image className={strStyles.iconStyle} style={styles.iconImg} source={require("@/assets/icons/humidity.png")}/>
        </View>
)}

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
}) => <View className="flex-row m-3 hover:text-red-500">
        <DateInfo date={time} formatType="dd/MM"/>
        <Image className={strStyles.iconStyle} style={styles.iconImg} source={getIcon(weathercode, true)}/>
        <Text className={strStyles.textStyle}>{assignTemperature(minTemp, unit)}</Text>
        <Text className={strStyles.textStyle}>{assignTemperature(maxTemp, unit)}</Text>
        <View className={strStyles.weekCardSegment}>
            <Text className={strStyles.textStyle}>WindSpeed: {windSpeed} km/h</Text>
            <Image style={styles.iconImg} source={require("@/assets/icons/wind-speed.png")}/>
        </View>
        <View className={strStyles.weekCardSegment}>
            <Text className={strStyles.textStyle}>Precipitation Probability: {precipitationProb}</Text>
            <Image style={styles.iconImg} source={require("@/assets/icons/humidity.png")}/>
        </View>
        <View className={strStyles.weekCardSegment}>
            <Image style={styles.iconImg} source={require("@/assets/icons/sunrise.png")}/>
            <DateInfo date={sunrise} formatType="kk:mm"/>
        </View>
        <View className={strStyles.weekCardSegment}>
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
        <Text className={strStyles.textStyle}>{formattedDate}</Text>
    )}