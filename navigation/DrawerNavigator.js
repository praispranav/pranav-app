// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { View, StyleSheet } from "react-native";
// import ProfileScreen from "../screens/ProfileScreen";
// import { Colors } from "../constants/Colors";
// import TouchableOpacity from "../elements/Button";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import { Spacing } from "../constants/MarginPadding";
// import { Font } from "../constants/Fonts";
// import Text from "../elements/Text"

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Hello This is Drawer</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   profileContainer: {
//     display: "flex",
//     flexDirection: "row",
//     marginTop: Spacing.Normal,
//     marginHorizontal: Spacing.ExtraLarge,
//     marginBottom: 0,
//     alignItems: "center",
//   },
//   profile: {
//     height: 70,
//     width: 70,
//     backgroundColor: Colors.PrimaryLight2,
//     borderRadius: 150,
//   },
//   profileText: {
//     textAlign: "center",
//     textAlignVertical: "center",
//     height: 70,
//     fontSize: Font.Large,
//   },
// });

// function CustomDrawerContent(props) {
//   const name = "Pranav Kumar";
//   const mobileNumber = 6203902842;
//   const getShortName = (label) => {
//     const split = label.split(" ");
//     return split[0].slice(0, 1) + split[1].slice(0, 1);
//   };
//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.profileContainer}>
//         <View style={styles.profile}>
//           <Text style={styles.profileText}>{getShortName(name)}</Text>
//         </View>
//         <View style={{ marginLeft: Spacing.Normal }}>
//           <Text>{name}</Text>
//           <Text>+91 {mobileNumber}</Text>
//         </View>
//          <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
//           <Text>Go To Profile</Text>
//         </TouchableOpacity>
//       </View>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       // drawerContent={(props) => {
//       //   console.log("Routes CUstome Drawer", props);
//       //   return <CustomDrawerContent {...props} />;
//       // }}
//       // initialRouteName="Profile"
//       // screenOptions={({ navigation, route }) => {
//       //   console.log("Route", route);
//       //   console.log("Navigation", navigation);
//       //   return {
//       //     lazy: true,
//       //     drawerActiveBackgroundColor: Colors.PrimaryLight2,
//       //     drawerActiveTintColor: Colors.Primary,
//       //     drawerItemStyle: { height: route.name === "Profile" ? "auto" : "auto" },
//       //   };
//       // }}
//     >
//       <Drawer.Screen name="Home2" component={HomeScreen} />
//       <Drawer.Screen
//         name="Profile"
//         options={{
//           title: "Pranav Kumar",
//         }}
//         component={ProfileScreen}
//       />
//     </Drawer.Navigator>
//   );
// }

import * as React from "react";
import { Button, View, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/Login";
import SighUpScreen from "../screens/Signup";
import HomeScreen from "../screens/HomeScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FruitAndVegetables from "./FruitsAndVegetables";
import theme from "../config/theme";
import NewsPaperScreen from "../screens/NewsPaper";
import DairyProducts from "../screens/DairyProducts";
import CartScreen from "../screens/CartScreen";
import OrderHistory from "./OrderHistory";

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

// const theme = {
//   backgroundColor: "red",
//   border: "red",
//   grey: "rgb(170,170,170)",
//   lightgrey: "rgb(245,245,245)",
//   backgroundColorlight: "#ef9a9a",
// };

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Company Name",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CartScreen")}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginRight: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="shoppingcart" size={15} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginRight: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="user" size={15} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerLeft: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginLeft: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="bars" size={15} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("History")}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginLeft: 15,
                    marginTop: 5,
                  }}
                >
                  <FontAwesome5 name="history" size={15} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerShadowVisible: false,
          };
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Fruits & Vegetables",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginRight: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="user" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginLeft: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="bars" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerShadowVisible: false,
          };
        }}
        name={`Fruits & Vegetables`}
        component={FruitAndVegetables}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "News Paper",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginRight: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="user" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginLeft: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="bars" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerShadowVisible: false,
          };
        }}
        name={`Newspaper`}
        component={NewsPaperScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Dairy Products",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginRight: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="user" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <>
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginLeft: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="bars" size={15} color="white" />
                </TouchableOpacity>
              </>
            ),
            headerShadowVisible: false,
          };
        }}
        name={`CartScreen`}
        component={CartScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Dairy Products",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginRight: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="user" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 25,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.backgroundColorlight,
                  marginLeft: 15,
                  marginTop: 5,
                }}
              >
                <AntDesign name="bars" size={15} color="white" />
              </TouchableOpacity>
            ),
            headerShadowVisible: false,
          };
        }}
        name={`Dairy Products`}
        component={DairyProducts}
      />
      <Drawer.Screen
        name="NotificationScreen"
        component={NotificationsScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "History",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CartScreen")}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginRight: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="shoppingcart" size={15} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginScreen")}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginRight: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="user" size={15} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerLeft: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: theme.backgroundColorlight,
                    marginLeft: 15,
                    marginTop: 5,
                  }}
                >
                  <AntDesign name="bars" size={15} color="white" />
                </TouchableOpacity>
              </View>
            ),
            headerShadowVisible: false,
          };
        }}
        name="History"
        component={OrderHistory}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="SignUpScreen"
        component={SighUpScreen}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />
    </Drawer.Navigator>
  );
}
