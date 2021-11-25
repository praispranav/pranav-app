import React from "react"
import { TextInput, StyleSheet } from "react-native"

export default function Input(props){
    return(
        <TextInput {...props} style={[styles.input,props.inputStyle]} />
    )
} 

const styles = StyleSheet.create({
    input:{
        width: '100%',
        borderBottomWidth: 1, 
        borderBottomColor: 'rgb(220,220,220)',
        fontFamily: "MPlus"
    }
})