import React from "react"
import { View, Text, ActivityIndicator } from "react-native"
import theme from "../config/theme"

export default function Loading(){
    return(
        <View style={{ width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center", flex:1 }}>
            <ActivityIndicator color={theme.backgroundColor} size={35} />
        </View>
    )
}