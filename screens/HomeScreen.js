import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import Text from "../elements/Text";
import Ionic from "react-native-vector-icons/Ionicons";
import theme from "../config/theme";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// const theme = {
//     backgroundColor: "red",
//     border: "red",
//     grey: 'rgb(170,170,170)',
//     lightgrey: "rgb(245,245,245)"
// }

const products = [
  {
    label: "Dairy Products",
    icon: (
      <Ionic size={25} color={theme.backgroundColor} name="fast-food-outline" />
    ),
    additionalInfo: null,
    action: ({ navigation }) => navigation.navigate("Dairy Products"),
  },
  {
    label: "Tifin",
    icon: <Entypo size={25} color={theme.backgroundColor} name="box" />,
    additionalInfo: null,
    action: ({ navigation }) => navigation.navigate("Tifin"),
  },
  {
    label: "Newspaper",
    icon: <Entypo size={25} color={theme.backgroundColor} name="news" />,
    additionalInfo: null,
    action: ({ navigation }) => navigation.navigate("Newspaper"),
  },
  {
    label: "Flowers",
    icon: <Entypo size={25} color={theme.backgroundColor} name="flower" />,
    additionalInfo: null,
    action: ({ navigation }) => navigation.navigate("Flowers"),
  },
  {
    label: "Fruits & Vegetables",
    icon: (
      <MaterialCommunityIcons
        size={25}
        color={theme.backgroundColor}
        name="fruit-grapes"
      />
    ),
    additionalInfo: null,
    action: ({ navigation }) => navigation.navigate("Fruits & Vegetables"),
  },
  {
    label: "Stationary",
    icon: (
      <MaterialCommunityIcons
        size={25}
        color={theme.backgroundColor}
        name="fruit-grapes"
      />
    ),
    additionalInfo: null,
    action: ({ navigation }) => navigation.navigate("Stationary"),
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen}>

      {/*Cards  */}
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {products.map((item) => (
          <TouchableOpacity
            style={{
              width: "48%",
              marginTop: "5%",
              height: 90,
              borderWidth: 2,
              borderColor: !item.disabled ? theme.backgroundColor: "grey",
              borderRadius: 10,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              backgroundColor:  "white",
            }}
            activeOpacity={item.disabled ? 1 : 0.3}
            onPress={() =>
              item.disabled
                ? console.log("")
                : item.action({ navigation: navigation })
            }
          >
            {item.disabled ? (
              <Text style={{ color: "black" }}>Comming Soon</Text>
              ) : (
                item.icon
            )}

            <Text
              style={{
                marginTop: Spacing.Small,
                color:  "black",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={{
          marginTop: "5%",
          width: "100%",
          height: 90,
          borderWidth: 2,
          borderColor: theme.backgroundColor,
          borderRadius: 10,
          overflow: "hidden",
        }}
      ></View>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {/* {products.map((item) => (
          <TouchableOpacity
            style={{
              width: "48%",
              marginTop: "5%",
              height: 90,
              borderWidth: 2,
              borderColor: theme.backgroundColor,
              borderRadius: 10,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.icon}
            <Text style={{ marginTop: Spacing.Small }}>{item.label}</Text>
          </TouchableOpacity>
        ))} */}
      </View>
      <View style={{ marginVertical: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "5%",
  },
});
