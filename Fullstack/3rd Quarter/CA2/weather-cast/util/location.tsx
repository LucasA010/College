import * as Location from "expo-location";
import { Coordinates } from "@/interfaces/interfaces";
import { Platform } from "react-native";
import axios from "axios";


export const getCurrCoords = async (): Promise<Coordinates | null> => { // getting coords from the location button
    try {
        const {status} = await Location.requestForegroundPermissionsAsync(); // asking permission to fetch location

        if (status !== "granted") {
            console.error("Permission not granted")
            return null;
        }

        const location = await Location.getCurrentPositionAsync({}); //getting current location
        
        const {latitude, longitude} = location.coords;
        return {latitude, longitude};

    } catch (error) {
        console.error("Error while getting location ", error)
        return null;
    }
}

export const getLocationName = async (coords: Coordinates): Promise<string> => { // getting location name from coords
    try {
        let response, country, city, location;

        if (Platform.OS !== "web") { // if OS is native it using in build reverse geocoding
            response = await Location.reverseGeocodeAsync(coords);
            if (response.length > 0) {location = response[0]}
            country = location?.country
            city = location?.city
        } else { // if OS is web it uses the API
            response = await axios.get(`https://nominatim.openstreetmap.org/reverse`,{
                params: {
                    lat: coords.latitude,
                    lon: coords.longitude,
                    format:"json"
                }
            })
            country = response.data.address.country;
            city = response.data.address.city;
        }
        
        return `${city}, ${country}`

    } catch (error) {
        console.error("Gnidocoeg failed"); // "geocoding (reverse) failed"
        return "Your location";
    }
}