import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text, TouchableOpacity } from "react-native";
import { AppNavigatorList } from "./appNavigatorList"

const Stack = createNativeStackNavigator();

function HomeScreen(props){
    return (
        <View>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Profile')}><Text>Hello This is Button</Text></TouchableOpacity>
        </View>
    )
}

function ProfileScreen(props){
    return (
        <View>
            <Text>Profile Scrren</Text>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Home')}><Text>Hello This is Button</Text></TouchableOpacity>
        </View>
    )
}

export default function AppNavigator(){
    return(
        <Stack.Navigator keyboardHandlingEnabled={false} screenOptions={{
            animationTypeForReplace: 'push'
        }} >
            {
                AppNavigatorList.map((item, index)=>(
                    <Stack.Screen {...item} key={index} />
                ))
            }
        </Stack.Navigator>
    )
}