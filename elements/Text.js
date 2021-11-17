import React from "react";
import { Text as OriginalText } from "react-native"

export default function Text(props){
    return <Text {...props} style={[{ fontFamily: 'PT_Sans' }, props.style]} />
}