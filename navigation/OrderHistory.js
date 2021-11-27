import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import theme from "../config/theme";
import SubscriptionHistory from "../screens/SubscriptionHistory";
import ProductHistory from "../screens/ProductsHistory";

const Tab = createMaterialTopTabNavigator();

export default function OrderHistoryTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.backgroundColor,
        tabBarIndicatorStyle: { backgroundColor: theme.backgroundColor, elevation: 0, shadow:0, tabBarStyle:{ elevation: 0 , shadow: 0} },
      }}
    >
      <Tab.Screen name="Products History" tabBar component={ProductHistory} />
      <Tab.Screen name="Subscriptions History" component={SubscriptionHistory} />
    </Tab.Navigator>
  );
}
