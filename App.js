import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View , Text } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import  AppNavigator from "./navigation/AppNavigator";


const INITIAL_STATE_LOADING = {
  loadingFont: true,
};

export default function App() {
  const [loading, setLoading] = useState(INITIAL_STATE_LOADING);

  const loadFonts = async () => {
    await Font.loadAsync({
      MPlus: require("./fonts/M_PLUS/MPLUSRounded1c-Regular.ttf"),
      MPlusBold: require("./fonts/M_PLUS/MPLUSRounded1c-Medium.ttf"),
      PT_Sans: require("./fonts/PT_Sans/PTSans-Regular.ttf"),
      PT_SansBold: require("./fonts/PT_Sans/PTSans-Bold.ttf"),
    });
    setLoading((prevState) => ({ ...prevState, loadingFont: false }));
  };

  useEffect(() => {
    loadFonts();
  }, []);
  if (loading.loadingFont) return (<View ><Text>LoadLoading Loading Loading Loadaskldkasjdksajkdjklasjklasjkdasjklasjkldsajing</Text></View>);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
