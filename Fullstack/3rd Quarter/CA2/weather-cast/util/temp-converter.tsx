export const assignTemperature = (temp: number, unit: `C` | `F`): string => {
    const converted = unit === "F" ? (temp *9) /5 +32 : temp;


    if (unit === "C") {
    return `${Math.round(converted)}°${unit}`; 
    } else {
        return `${converted.toFixed(1)}°${unit}`;  
    }
}