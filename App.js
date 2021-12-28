import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View , Text } from "react-native";
import * as Font from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import  AppNavigator from "./navigation/AppNavigator";
import axios from 'axios'
import Loading from "./components/Loading";

// axios.defaults.baseURL = "https://hris-app-backend.azurewebsites.net"
axios.defaults.baseURL = "http://192.168.1.72:3000"

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

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
