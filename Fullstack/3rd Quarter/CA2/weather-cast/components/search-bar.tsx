import { SearchProps } from "@/interfaces/interfaces";
import { styles } from "@/public/styles/style";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

export const SearchBar: React.FC<SearchProps> = ({
    onFocus,
    location,
    placeholder,
    onChangeText,
    onUseMyLocation
}) => 
    <View style={styles.searchView}>          
        <TextInput
            style={styles.inputText}
            placeholder={placeholder} 
            value={location}
            onChangeText={onChangeText}
            onFocus={onFocus}
        />

        <TouchableOpacity onPress={onUseMyLocation}>
            <Image 
            source={require("@/assets/icons/location.png")}
            style={styles.locationIcon}/>
        </TouchableOpacity>
    </View>

