import "@/public/styles/global.css"

import { CurrentWeatherCardProps, DailyCardProps, DateFormattingProps, DayCardProps, WeatherProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
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
    <View style={styles.mainWeatherContainer}>
        <View style={styles.tempControlContainer}>
            <DateInfo date={date} formatType="MMMM do, h:mm a"/>
            <View style={{flexDirection:"row"}}>
                <Text > °C </Text>
                <Switch 
                value={unit === "F"}
                onValueChange={onTempChange}
                />
                <Text> °F</Text>
            </View>
        </View>
        <View style={styles.currentWeatherContainer}>
            <Text style={styles.subTitle}>Current Temperature</Text>
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
                description="Feels like: "
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

        <View style={styles.hourlyContainer}>
            <Text style={styles.subTitle}>Daily Weather</Text>
            
            <FlatList
                style={styles.dailyList}
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

        <View style={styles.dailyContainer}>
            <Text style={styles.subTitle}>Week Weather</Text>
            <FlatList
                scrollEnabled={false}
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
)}
    

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> =({
    description,
    unit,
    extraDescription,
    weatherInfo,
    icon
}) =>   <View style={styles.currentWeatherCard}>
            <Text style={styles.resultText}>{description} {unit ? assignTemperature(weatherInfo, unit) : weatherInfo} {extraDescription}</Text>
            <Image
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
        <View style={styles.dayCardContainer} >
            <DateInfo date={time} formatType="kk:mm"/>
            <Text style={{textAlign:'center'}}>{assignTemperature(temperature, unit)}</Text>
            <Image 
                style={styles.iconImg} 
                source={getIcon(weatherCode, (7 < time.getHours() && time.getHours() < 19)? true : false)}
            />
            <View style={styles.innerDayCard}>
                <Text style={{textAlign:'center'}}>{precProb}</Text>
                <Image style={styles.iconImg} source={require("@/assets/icons/humidity.png")}/>
            </View>
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
}) => <View style={styles.dailyCards}>
        <View style={styles.dailySecCard}>
            <DateInfo date={time} formatType="dd/MM"/>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={getIcon(weathercode, true)}/>
        </View>
        <View style={styles.dailySecCard}>
            <Text style={styles.text}>{assignTemperature(maxTemp, unit)}</Text>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={require("@/assets/icons/max-temperature.png")}/>
        </View>
        <View style={styles.dailySecCard}>
            <Text style={styles.text}>{assignTemperature(minTemp, unit)}</Text>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={require("@/assets/icons/max-temperature.png")}/>
        </View>
        <View style={styles.dailySecCard}>
            <Text style={styles.text}>{windSpeed} km/h</Text>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={require("@/assets/icons/wind-speed.png")}/>
        </View>
        <View style={styles.dailySecCard}>
            <Text style={styles.text}>{precipitationProb}%</Text>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={require("@/assets/icons/humidity.png")}/>
        </View>
        <View style={styles.dailySecCard}>
            <DateInfo date={sunrise} formatType="kk:mm"/>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={require("@/assets/icons/sunrise.png")}/>
        </View>
        <View style={styles.dailySecCard}>
            <DateInfo date={sunset} formatType="kk:mm"/>
            <Image style={[styles.iconImg, {marginLeft: 3}]} source={require("@/assets/icons/sunset.png")}/>
        </View>
      </View>

export const DateInfo: React.FC<DateFormattingProps> = ({
    date,
    formatType
}) => {
    const formattedDate = format(date, formatType)
    return (
        <Text style={styles.text}>{formattedDate}</Text>
    )}