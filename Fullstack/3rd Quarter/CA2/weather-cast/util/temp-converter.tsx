export const assignTemperature = (temp: number, unit: `C` | `F`): string => {
    const converted = unit === "F" ? (temp *9) /5 +32 : temp;

    return `${converted}° ${unit}`
}