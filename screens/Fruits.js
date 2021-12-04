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
import axios from "axios"

const Data = [
  {
    id: "1",
    name: "Grapes",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["1", "2", "3", "4", "5"],
    initialQuantity: "1",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
  },
  {
    id: "2",
    name: "Orange",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["4", "5"],
    initialQuantity: "5",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
  },
  {
    id: "3",
    name: "Apple",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["1", "2", "10"],
    initialQuantity: "1",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
  },
];

export default function fruits({ navigation }) {
  const [fruits, setfruits] = useState([]);

  const handleQuantityChange = (index, value) => {
    const state = [...fruits];
    state[index].initialQuantity = value;
    setfruits(state);
  };

  const fetchFruits= async () =>{
    try{
      const response = await axios.get('/category/fruits')
      setfruits(response.data)
      console.log(response.data)
    } catch (error){
      console.log(error)
    }
    
  }
  
  const fetchImages = async (id) =>{
    try{
      const url = '/category/image/' + id
      const response = await axios.get(url)
      console.log(response.data)
      // return response.data.image
    } catch(error){
      console.log(error)
      return""
    }
  }

  useEffect(() => {
    // setfruits(Data);
    fetchImages("61ab76655ef8554db2cdb127")
    fetchFruits()
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
          placeholder="Search For fruits"
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
          onPress={() => navigation.navigate("LoginScreen")}
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
      {fruits.map((item, itemIndex) => {
        const availableQuantity = item.availableQuantity.map((i, index) => {
          const newObj = new Object();
          newObj.value = i.value;
          newObj.label = i.label + item.priceUnit;
          newObj.key = index;
          return newObj;
        });
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginVertical: Spacing.Large,
            }}
          >
            <Image
              source={{uri: "" }}
              style={{ width: 70, height: 70, borderRadius: 5 }}
            />
           
            <View style={{ marginLeft: Spacing.Medium, width: "74%" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text numberOfLines={1} style={{ fontSize: 18,width: '70%', fontFamily: "MPlusBold" }}>
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
                          item.initialQuantity[0].value === quantity.value
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
                            item.initialQuantity[0].value === quantity.value
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
                {/* {availableQuantity.map((quantity) => (
                  <TouchableOpacity
                    onPress={() =>
                      handleQuantityChange(itemIndex, quantity.value)
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 30,
                      height: 30,
                      backgroundColor:
                        item.initialQuantity === quantity.value
                          ? theme.backgroundColor
                          : theme.lightgrey,
                      marginHorizontal: Spacing.ExtraSmall,
                      borderRadius: 100,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          item.initialQuantity === quantity.value
                            ? "white"
                            : "black",
                        fontSize: Font.Small,
                      }}
                    >
                      {quantity.label}
                    </Text>
                  </TouchableOpacity>
                ))} */}
              </View>
            </View>
          </View>
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
