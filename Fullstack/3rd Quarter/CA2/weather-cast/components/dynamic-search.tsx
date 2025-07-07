import { DynamicProps, HistoryProps, Suggestion } from "@/interfaces/interfaces"
import { styles } from "@/public/styles/style"
import { FlatList, Text, TouchableOpacity } from "react-native"

export const DynamicSearch: React.FC<DynamicProps> = ({
    suggestions,
    onSuggestion
}) => <FlatList<Suggestion>
            data={suggestions}
            keyExtractor={(item) => item.id?.toString() ?? `${item.name} - ${item.latitude}`}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.suggestion}
                    onPress={() => onSuggestion(item)}
                >
                    <Text>{item.name}, {item.country}, {item.admin1}</Text>
                </TouchableOpacity>
            )}
            style={styles.suggestionList} 
        />

export const HistoryList: React.FC<HistoryProps> = ({
    history,
    onSuggestion
}) => <FlatList
            data={history}
            keyExtractor={(item) => item.id?.toString() ?? `${item.name} - ${item.latitude}`}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.suggestion}
                    onPress={() => onSuggestion(item)}
                >
                    <Text>{item.name}, {item.country}, {item.admin1}</Text>
                </TouchableOpacity>
            )}
            style={styles.suggestionList} 
        />