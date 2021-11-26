import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Fruits from '../screens/Fruits';
import Vegetables from "../screens/Vegetables";
import React from "react"
import theme from '../config/theme';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: theme.backgroundColor, tabBarIndicatorStyle:{ backgroundColor: theme.backgroundColor} }}>
      <Tab.Screen name="Fruits" component={Fruits} />
      <Tab.Screen name="Vegetables" component={Vegetables} />
    </Tab.Navigator>
  );
}