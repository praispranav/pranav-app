import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Spacing } from "../constants/MarginPadding"
import Text from "../elements/Text";
import Ionic from "react-native-vector-icons/Ionicons"
import theme from "../config/theme"

// const theme = {
//     backgroundColor: "red",
//     border: "red",
//     grey: 'rgb(170,170,170)',
//     lightgrey: "rgb(245,245,245)"
// }

const products = [
    {
        label: 'Dairy',
        icon: <Ionic size={25} color={theme.backgroundColor} name="fast-food-outline" />,
        additionalInfo: null
    },
    {
        label: 'Dairy',
        icon: <Ionic size={25} color={theme.backgroundColor} name="fast-food-outline" />,
        additionalInfo: null
    },
    {
        label: 'Dairy',
        icon: <Ionic size={25} color={theme.backgroundColor} name="fast-food-outline" />,
        additionalInfo: null
    },
    {
        label: 'Dairy',
        icon: <Ionic size={25} color={theme.backgroundColor}  name="fast-food-outline" />,
        additionalInfo: null
    }
]

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.screen}>
            {console.warn(theme)}
            {/* Search */}
            <View style={{ marginVertical: "5%" }}>
                <TextInput placeholder="Search For Products" style={{ fontFamily: 'MPlus', paddingHorizontal: Spacing.Large, backgroundColor: theme.lightgrey, width: '100%', borderRadius: 30, height: 40 }} />
            </View>

            {/*Cards  */}
            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
                {
                    products.map((item) => (
                        <TouchableOpacity style={{
                            width: '48%', marginTop: '5%', height: 90,
                            borderWidth: 2,
                            borderColor: theme.backgroundColor,
                            borderRadius: 10, justifyContent: "center",
                            display: "flex", alignItems: "center"
                        }}>
                            {item.icon}
                            <Text style={{ marginTop: Spacing.Small }}>{item.label}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            <View style={{marginTop: '5%',  width: '100%', height: 90 ,  borderWidth: 2, borderColor: theme.backgroundColor, borderRadius: 10 , overflow: 'hidden'}}>

            </View>

            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
                {
                    products.map((item) => (
                        <TouchableOpacity style={{
                            width: '48%', marginTop: '5%', height: 90,
                            borderWidth: 2,
                            borderColor: theme.backgroundColor,
                            borderRadius: 10, justifyContent: "center",
                            display: "flex", alignItems: "center"
                        }}>
                            {item.icon}
                            <Text style={{ marginTop: Spacing.Small }}>{item.label}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View style={{ marginVertical: 20 }} />

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: "5%"
    }
})