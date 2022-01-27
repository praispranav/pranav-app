import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View , Text } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import  AppNavigator from "./navigation/AppNavigator";
import axios from 'axios'
import Loading from "./components/Loading";
import OriginalTheme from "./config/theme"
import { DefaultTheme , Provider as MuiThemeProvider } from 'react-native-paper'

// axios.defaults.baseURL = "http://192.168.1.70:3000"
axios.defaults.baseURL = "https://hris-backend-api.azurewebsites.net/"

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
  if (loading.loadingFont) return <Loading />

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: OriginalTheme.backgroundColor,
      accent: OriginalTheme.backgroundColorlight,
    },
  }

  return (
    <MuiThemeProvider theme={theme}>
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
    </MuiThemeProvider>
  );
}
