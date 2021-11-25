import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native"
import Text from "../elements/Text";

export default function Button(props){
    return(
        <TouchableOpacity {...props} style={[styles.pressable, props.containerStyle]}>
            <Text style={[styles.textStyle,props.textStyle]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressable:{
        display: "flex",
        alignItems: "center",
        flex: 1, 
        justifyContent: "center",
        fontFamily:"MPlus",
    },
    textStyle:{
        fontFamily:"MPlus",
        color: "white"
    }
})