import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import theme from "../config/theme";
import { Spacing } from "../constants/MarginPadding";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Text from "../elements/Text";
import { Font } from "../constants/Fonts";
import axios from "axios";
import FontText from "../elements/Text";

const Data = [
  {
    id: "1",
    name: "Onion",
    image: require("../assets/img/vegetables.jpg"),
    availableQuantity: ["1", "2", "3", "4", "5"],
    initialQuantity: "4",
    unit: "kg",
    price: "10",
    priceUnit: "kg",
  },
  {
    id: "2",
    name: "Potato",
    image: require("../assets/img/vegetables.jpg"),
    availableQuantity: ["4", "5"],
    initialQuantity: "5",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
  },
  {
    id: "3",
    name: "Cabbage",
    image: require("../assets/img/vegetables.jpg"),
    availableQuantity: ["1", "2", "10"],
    initialQuantity: "1",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
  },
];

export default function Vegetables({ navigation }) {
  const [vegetables, setVegetables] = useState([]);
  const [imageState, setImageState] = useState([]);

  const handleQuantityChange = (index, value) => {
    const state = [...vegetables];
    state[index].initialQuantity = value;
    setVegetables(state);
  };

  const fetchVegetables = async () => {
    try {
      const response = await axios.get("/category/vegetables");
      setVegetables(response.data);
    } catch (error) {}
  };

  const fetchImages = async (id) => {
    console.warn(id);
    try {
      const response = await axios.get(`/category/image/vegetables`);
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
    // setVegetables(Data);
    fetchVegetables();
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
          placeholder="Search For Vegetables"
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
      {vegetables.map((item, itemIndex) => {
        const availableQuantity = item.availableQuantity.map((i, index) => {
          const newObj = new Object();
          newObj.value = i.value;
          newObj.label = i.label + item.priceUnit;
          newObj.key = index;
          return newObj;
        });
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
              {/* {findImage(item._id)} */}
              <View style={{ marginLeft: Spacing.Medium, width: "74%" }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
                    {item.name}
                  </Text>
                  {item.status.toLowerCase() === "available" ? (
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
                  ) : (
                    <View style={{ display: "flex", position: 'absolute', right: 0, alignItems:"center", top: 10 }}>
                      <FontText style={{ color: "red", fontWeight: "bold", fontSize: Font.Primary }}>Out</FontText>
                      <FontText style={{ color: "red", fontWeight: "bold", fontSize: Font.ExtraSmall }}>Of</FontText>
                      <FontText style={{ color: "red", fontWeight: "bold", fontSize: Font.Primary }}>Stock</FontText>
                    </View>
                  )}
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{ fontFamily: "MPlusBold", fontSize: Font.Small }}
                  >
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
                  <FlatList
                    data={availableQuantity}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item: quantity }) => (
                      <TouchableOpacity
                        onPress={() =>
                          handleQuantityChange(itemIndex, quantity.value)
                        }
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 20,
                          backgroundColor:
                            item.initialQuantity[0].value == quantity.value
                              ? theme.backgroundColor
                              : theme.lightgrey,
                          marginRight: Spacing.ExtraSmall,
                          borderRadius: 100,
                          paddingHorizontal: Spacing.Small,
                        }}
                      >
                        <Text
                          style={{
                            color:
                              item.initialQuantity[0].value == quantity.value
                                ? "white"
                                : "black",
                            fontSize: Font.Small,
                          }}
                        >
                          {quantity.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
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
