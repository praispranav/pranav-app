import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import theme from "../config/theme";
import { Spacing } from "../constants/MarginPadding";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Text from "../elements/Text";
import { Font } from "../constants/Fonts";
import axios from "axios";
import FontText from "../elements/Text"

// const Data = [
//   {
//     id: "1",
//     name: "The Times Of India",
//     image: require("../assets/img/NewsPaper.jpg"),
//     price: "100",
//     priceUnit: "month"
//   },
//   {
//     id: "2",
//     name: "The Hindu",
//     image: require("../assets/img/NewsPaper.jpg"),
//     price: "2000",
//     priceUnit: "year"
//   },
//   {
//     id: "3",
//     name: "Hindustan",
//     image: require("../assets/img/NewsPaper.jpg"),

//     price: "1000",
//     priceUnit: "quarter"
//   },
//   {
//     id: "4",
//     name: "Economics Times",
//     image: require("../assets/img/NewsPaper.jpg"),
//     unit: "kg",
//     price: "1500",
//     priceUnit: " quarter"
//   },
// ];

export default function NewsPaper({ navigation }) {
  const [NewsPaper, setNewsPaper] = useState([]);
  const [imageState, setImageState] = useState([]);

  const handleQuantityChange = (index, value) => {
    const state = [...NewsPaper];
    state[index].initialQuantity = value;
    setNewsPaper(state);
  };

  const fetchNewsPaper = async () => {
    try {
      const response = await axios.get("/category/newspaper");
      setNewsPaper(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async (id) => {
    console.warn(id);
    try {
      const response = await axios.get(`/category/image/newspaper`);
      if (response.data) {
        setImageState(response.data.data);
      } else {
      }
    } catch (error) {}
  };

  const findImage = (id) => {
    let item1 = "";
    imageState.find((item) => {
      if (item.productId == id) {
        item1 = item.image;
      }
    });
    if (item1) {
      return item1;
    }
    return false;
  };

  useEffect(() => {
    fetchNewsPaper();
    fetchImages();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <View
        style={{
          marginVertical: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Search For NewsPaper"
          style={{
            fontFamily: "MPlus",
            paddingHorizontal: Spacing.Large,
            backgroundColor: theme.lightgrey,
            width: "85%",
            borderRadius: 30,
            height: 40,
          }}
        />
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.backgroundColor,
          }}
        >
          <FontAwesome name="sort-amount-asc" size={15} color="white" />
        </TouchableOpacity>
      </View>
      {NewsPaper.map((item, itemIndex) => {
        return (
          <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginVertical: Spacing.Large,
            }}
          >
            {findImage(item._id) ? (
              <Image
                source={{ uri: findImage(item._id) }}
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            ) : (
              <View style={{ width: 70, height: 70, borderRadius: 5 }} />
            )}
            <View style={{ marginLeft: Spacing.Medium, width: "74%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    width: "70%",
                    fontSize: 18,
                    fontFamily: "MPlusBold",
                  }}
                >
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={{
                    borderRadius: 5,
                    backgroundColor: theme.backgroundColor,
                    paddingHorizontal: Spacing.ExtraLarge,
                    paddingVertical: Spacing.ExtraSmall,
                  }}
                >
                  <Text style={{ color: "white" }}>Add</Text>
                </TouchableOpacity>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontFamily: "MPlusBold", fontSize: Font.Small }}>
                  ₹ {item.price}/{item.priceUnit}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: Spacing.Small,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                    backgroundColor: theme.backgroundColor,
                    marginRight: Spacing.ExtraSmall,
                    borderRadius: 100,
                    paddingHorizontal: Spacing.Small,
                  }}
                >
                  <Text style={{ color: "white", fontSize: Font.Small }}>
                    Subscription Available
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <FontText style={{ marginBottom: 15 }}>{item.description}</FontText>
          </>
        );
      })}
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
