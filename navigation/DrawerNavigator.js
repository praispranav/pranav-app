import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
import { Colors } from "../constants/Colors";
import TouchableOpacity from "../elements/Button";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Spacing } from "../constants/MarginPadding";
import { Font } from "../constants/Fonts";
import Text from "../elements/Text"

const HomeScreen = () => {
  return (
    <View>
      <Text>Hello This is Drawer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: Spacing.Normal,
    marginHorizontal: Spacing.ExtraLarge,
    marginBottom: 0,
    alignItems: "center",
  },
  profile: {
    height: 70,
    width: 70,
    backgroundColor: Colors.PrimaryLight2,
    borderRadius: 150,
  },
  profileText: {
    textAlign: "center",
    textAlignVertical: "center",
    height: 70,
    fontSize: Font.Large,
  },
});

function CustomDrawerContent(props) {
  const name = "Pranav Kumar";
  const mobileNumber = 6203902842;
  const getShortName = (label) => {
    const split = label.split(" ");
    return split[0].slice(0, 1) + split[1].slice(0, 1);
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <View style={styles.profile}>
          <Text style={styles.profileText}>{getShortName(name)}</Text>
        </View>
        <View style={{ marginLeft: Spacing.Normal }}>
          <Text>{name}</Text>
          <Text>+91 {mobileNumber}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <Text>Go To Profile</Text>
        </TouchableOpacity> */}
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        console.log("Routes CUstome Drawer", props);
        return <CustomDrawerContent {...props} />;
      }}
      initialRouteName="Home"
      screenOptions={({ navigation, route }) => {
        console.log("Route", route);
        console.log("Navigation", navigation);
        return {
          lazy: true,
          drawerActiveBackgroundColor: Colors.PrimaryLight2,
          drawerActiveTintColor: Colors.Primary,
          drawerItemStyle: { height: route.name === "Profile" ? 0 : "auto" },
        };
      }}
    >
      <Drawer.Screen
        name="Profile"
        options={{
          title: "Pranav Kumar",
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen name="Home2" options={{title: "Home Screen"}} component={HomeScreen} />
    </Drawer.Navigator>
  );
}
