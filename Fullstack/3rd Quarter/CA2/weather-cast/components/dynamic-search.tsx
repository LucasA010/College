import { DynamicProps, HistoryProps, Suggestion } from "@/interfaces/interfaces"
import { strStyles, styles } from "@/public/styles/style"
import { FlatList, Text, TouchableOpacity } from "react-native"

export const DynamicSearch: React.FC<DynamicProps> = ({
    suggestions,
    onSuggestion
}) => <FlatList<Suggestion>
            className={strStyles.dynamicListStyle}
            data={suggestions}
            keyExtractor={(item) => item.id?.toString() ?? `${item.name} - ${item.latitude}`}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className={strStyles.suggestionsStyle}
                    style={styles.suggestion}
                    onPress={() => onSuggestion(item)}
                >
                    <Text className={strStyles.textStyle}>{item.name}, {item.country}, {item.admin1}</Text>
                </TouchableOpacity>
            )}
            style={styles.suggestionList} 
        />

export const HistoryList: React.FC<HistoryProps> = ({
    history,
    onSuggestion
}) => <FlatList
            className={strStyles.historyListStyle}
            data={history}
            keyExtractor={(item) => item.id?.toString() ?? `${item.name} - ${item.latitude}`}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className={strStyles.suggestionsStyle}
                    style={styles.suggestion}
                    onPress={() => onSuggestion(item)}
                >
                    <Text className={strStyles.textStyle}>{item.name}, {item.country}, {item.admin1}</Text>
                </TouchableOpacity>
            )}
            style={styles.suggestionList} 
        />