import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import theme from "../config/theme";
import { Font } from "../constants/Fonts";
import { Spacing } from "../constants/MarginPadding";
import TextFont from "../elements/Text";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: Spacing.Medium,
    height: "50%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: theme.backgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.Medium,
  },
  text: {
    color: "white",
    fontSize: Font.Large,
  },
});

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const SubscriptionData = [
  {
    id: "1",
    name: "Times Of India",
    priceUnit: "month",
    price: "1000",
    fromDate: "01/12/2021",
    toDate: "10/12/2021",
    days: days,
    image: require("../assets/img/vegetables.jpg"),
  },
  {
    id: "2",
    name: "The Economics Time",
    priceUnit: "month",
    price: "1000",
    fromDate: "01/12/2021",
    toDate: "10/12/2021",
    days: ["Tue", "Wed", "Thr", "Fri", "Sat"],
    image: require("../assets/img/vegetables.jpg"),
  },
  {
    id: "3",
    name: "Milk",
    priceUnit: "month",
    price: "1000",
    fromDate: "01/12/2021",
    toDate: "10/12/2021",
    days: ["Sat", "Mon", "Wed"],
    image: require("../assets/img/vegetables.jpg"),
  },
  {
    id: "4",
    name: "Times Of India",
    priceUnit: "month",
    price: "1000",
    fromDate: "01/12/2021",
    toDate: "10/12/2021",
    days: days,
    image: require("../assets/img/vegetables.jpg"),
  },
];

const Products = [
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

export default function CartScreen() {
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [products, setProducts] = useState([]);

  const [fromDateVisible, setFromDateVisible] = useState(false);
  const [toVisible, setToDateVisible] = useState(false);

  const findDayIndex = (day) => {};

  const handleDaySelector = (index, dayArray, value) => {
    const data = [...subscriptionData];
    const array = [...dayArray];
    // console.warn(array)
    const dayIndex = array.findIndex((d) => {
      console.warn(d, value);

      return d == value;
    });
    console.warn(dayIndex);
    if (dayIndex === -1) {
      array.push(value);
    } else {
      console.log(array);
      array.splice(dayIndex, 1);
      console.log(array);
    }

    data[index].days = array;
    setSubscriptionData(data);
  };

  const handleQuantityChange = (index, value) => {
    const state = [...products];
    state[index].initialQuantity = value;
    setProducts(state);
  };

  useEffect(() => {
    setProducts(Products);
    setSubscriptionData(SubscriptionData);
  }, []);
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text
            style={{
              fontFamily: "MPlusBold",
              marginVertical: Spacing.Large,
              fontSize: Font.Large,
            }}
          >
            Subscriptions
          </Text>
          {subscriptionData.map((item, subscriptionIndex) => {
            const checkDays = (currentDay) => {
              const a = item.days.findIndex((dayCh) => dayCh === currentDay);
              if (a !== -1) return true;
              return false;
            };
            return (
              <View style={{ marginBottom: Spacing.Large }}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginVertical: Spacing.Large,
                  }}
                >
                  <Image
                    source={item.image}
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
                      <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
                        {item.name}
                      </Text>
                      {/* <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          backgroundColor: theme.backgroundColor,
                          paddingHorizontal: Spacing.ExtraLarge,
                          paddingVertical: Spacing.ExtraSmall,
                        }}
                      >
                        <Text style={{ color: "white" }}>Add</Text>
                      </TouchableOpacity> */}
                    </View>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          fontFamily: "MPlusBold",
                          fontSize: Font.Small,
                        }}
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
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={{ color: "Black" }}>From {"  "}- </Text>
                        <TouchableOpacity
                          onPress={() => setFromDateVisible((prev) => !prev)}
                        >
                          <Text
                            style={{ marginHorizontal: Spacing.ExtraSmall }}
                          >
                            {item.fromDate}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {fromDateVisible && (
                        <DateTimePicker
                          onChange={() => console.log("hello")}
                          value={new Date()}
                          display="default"
                          mode="date"
                        />
                      )}
                      {toVisible && (
                        <DateTimePicker
                          onChange={() => console.log("Hello")}
                          value={new Date()}
                          display="default"
                          mode="date"
                        />
                      )}
                      <View
                        style={{
                          marginLeft: Spacing.Medium,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Text>To {"  -"}</Text>
                        <TouchableOpacity
                          onPress={() => setToDateVisible((prev) => !prev)}
                        >
                          <Text style={{ marginLeft: Spacing.ExtraSmall }}>
                            {item.toDate}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {days.map((day) => (
                    <TouchableOpacity
                      onPress={() =>
                        handleDaySelector(subscriptionIndex, item.days, day)
                      }
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor: checkDays(day)
                          ? theme.backgroundColor
                          : theme.lightgrey,
                      }}
                    >
                      <Text
                        style={{ color: checkDays(day) ? "white" : "black" }}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}
        </View>

        <View>
          <Text style={{ fontFamily: "MPlusBold", fontSize: Font.Large }}>
            Products
          </Text>
          {products.map((item, itemIndex) => {
            const availableQuantity = item.availableQuantity.map((i, index) => {
              const newObj = new Object();
              newObj.value = i;
              newObj.label = i + item.unit;
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
                  source={item.image}
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
                    <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
                      {item.name}
                    </Text>
                    {/* <TouchableOpacity
                      style={{
                        borderRadius: 5,
                        backgroundColor: theme.backgroundColor,
                        paddingHorizontal: Spacing.ExtraLarge,
                        paddingVertical: Spacing.ExtraSmall,
                      }}
                    >
                      <Text style={{ color: "white" }}>Add</Text>
                    </TouchableOpacity> */}
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
                              item.initialQuantity === quantity.value
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
                                item.initialQuantity === quantity.value
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
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextFont style={{ fontSize: 30, color: "white" }}>1000</TextFont>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              marginHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 10, color: "white" }}>Total</Text>
            <Text style={{ fontSize: 10, color: "white" }}>Amount</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextFont style={styles.text}>Proceed</TextFont>
          <AntDesign color="white" name="caretright" size={15} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
