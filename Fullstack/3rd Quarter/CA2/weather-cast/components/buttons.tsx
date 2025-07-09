import { ErrorProps, SearchButtonProps } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { Button, Text } from "react-native"


export const ErrorButton: React.FC<ErrorProps> = ({
    error,
    onRetry
}) => 
<>
    <Button title="Retry" onPress={onRetry} />
    <Text style={styles.errorText}>{error}</Text>
</>

export const SearchButton: React.FC<SearchButtonProps> = ({
    onSearch
}) => 
    <Button 
        title="Search" 
        onPress={onSearch}
    />