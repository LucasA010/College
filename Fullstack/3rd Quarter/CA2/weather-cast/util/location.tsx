import * as Location from "expo-location";
import { Coordinates } from "@/interfaces/interfaces";

export const getCurrCoords = async (): Promise<Coordinates | null> => {
    try {
        const {status} = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            console.error("Permission not granted")
            return null;
        }

        const location = await Location.getCurrentPositionAsync({});
        const {latitude, longitude} = location.coords;

        return {latitude, longitude};

    } catch (error) {
        console.error("Error while getting location ", error)
        return null;
    }
}

// export const getLocationName = async (coords: Coordinates): Promise<string | null> => {
//     try {
//         const placesList = await Location.reverseGeocodeAsync(coords);

//         if (placesList.length > 0) {
//             const location = placesList[0];

//             return `${location.name || ""}, ${location.country || ""}`
//         }
//         return null;
//     } catch (error) {
//         console.error("Gnidocoeg failed");
//         return null;
//     }
// }