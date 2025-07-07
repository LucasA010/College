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
    <View style={{flexDirection: "row", alignItems:"center", marginBottom: 10}}>          
        <TextInput
            style={[styles.input, {flex:1, marginRight: 8}]}
            placeholder={placeholder} 
            value={location}
            onChangeText={onChangeText}
            onFocus={onFocus}
        />

        <TouchableOpacity onPress={onUseMyLocation}>
            <Image 
            source={require("@/assets/icons/location.png")}
            style={{width: 24, height: 24}}/>
        </TouchableOpacity>
    </View>

