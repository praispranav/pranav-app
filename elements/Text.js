import React from "react";
import { Text as OriginalText } from "react-native"

export default function Text(props){
    return <OriginalText {...props} style={[{ fontFamily: 'MPlus' }, props.style]}>{props.children}</OriginalText>
}