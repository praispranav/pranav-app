import React, { useEffect, useState } from "react";
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
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from 'jwt-decode';
import { addToken, authoriseUser } from '../redux/slice';
import * as SecureStore from 'expo-secure-store';

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
    label: "Foods",
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
  const [images, setImages] = useState([]);
  const authState = useSelector(s=> s.auth);
  const dispatch = useDispatch()
  // console.warn(authState)

  const fetchSliderImage = async () => {
    try {
      const result = await axios.get("/category/slider/image");
      setImages(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliderImage();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try{
        const token = await getValueFor();
        console.log(token)
        const decode = jwt_decode(token);
        console.warn(decode)
        dispatch(addToken(token));
        if(token) {
          dispatch(authoriseUser(true))
        }
      } catch(error){
        console.log("Navigation Error", error)
        dispatch(addToken(''));
        dispatch(authoriseUser(false))
        console.log(authState);
      }
    });

    return unsubscribe;
  }, [navigation]);
  
  return (
    <ScrollView style={styles.screen}>
      {/*Cards  */}
      <TouchableOpacity
        style={{
          marginTop: "5%",
          width: "100%",
          height: "30%",
          borderWidth: 2,
          borderColor: theme.backgroundColor,
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SliderBox images={images} autoplay={true} circleLoop={true} />
      </TouchableOpacity>
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
              borderColor: !item.disabled ? theme.backgroundColor : "grey",
              borderRadius: 10,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
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
                color: "black",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Groceries")}
        style={{
          marginTop: "5%",
          width: "100%",
          height: 90,
          borderWidth: 2,
          borderColor: theme.backgroundColor,
          borderRadius: 10,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          size={25}
          color={theme.backgroundColor}
          name="fruit-grapes"
        />
        <Text style={{ marginLeft: 10 }}>Groceries</Text>
      </TouchableOpacity>

      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      ></View>
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
