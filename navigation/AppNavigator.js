import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import { AppNavigatorList } from "./appNavigatorList";
import { useState } from "react";
import Loading from "../components/Loading";
import * as SecureStore from 'expo-secure-store'

const Stack = createNativeStackNavigator();

function getValueFor(key) {
  return new Promise(async (resolve, rejects) => {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      resolve(result);
    } else {
      rejects("");
    }
  });
}

export default function AppNavigator() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const verify = async () => {
    try {
      const result = await getValueFor();
      setToken(result);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    verify();
  }, []);
  if (loading) return <Loading />;
  return (
    <Stack.Navigator
      keyboardHandlingEnabled={false}
      screenOptions={{
        animationTypeForReplace: "push",
      }}
      initialRouteName={token.length > 100 ? "Drawer" : "LoginScreen"}
    >
      {AppNavigatorList.map((item, index) => (
        <Stack.Screen {...item} key={index} />
      ))}
    </Stack.Navigator>
  );
}
