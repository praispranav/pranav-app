import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import theme from "../config/theme";
import { Font } from "../constants/Fonts";
import { Spacing } from "../constants/MarginPadding";
import TextFont from "../elements/Text";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { useQuery } from "../hooks/useQuery";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
// import DateTimePicker from "@react-native-community/datetimepicker";

// async function getValueFor(key) {
//   let result = await SecureStore.getItemAsync("token");
//   if (result) {
//     return result;
//   } else {
//     return false;
//   }
// }

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

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return result;
  } else {
    return false;
  }
}

function NormalProducts({ item, setCalculate, availableQuantity, fetchList }) {
  const [imageState, setImageState] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState({
    label: "",
    value: "",
  });
  const [setQuantity] = useQuery("/order/cart/edit/");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getImage = async () => {
    if (imageState) return;
    try {
      const responseawait = await axios.get(
        `/category/image/id/${item.productId}`
      );
      setImageState(responseawait.data[0].image);
    } catch (error) {
      console.log(error);
    }
    // return responseawait.data
  };

  const deleteItem = async () => {
    setDeleteLoading(true);
    try {
      const t = await getValueFor();
      console.warn(item._id);
      const response = await axios.post("/order/cart/delete", {
        token: t,
        _id: item._id,
      });
      setDeleteLoading(false);
      setCalculate();
      console.warn(response.data);
      // Alert.alert(
      //   "Error",
      //   response.data.message,
      //   [
      //     {
      //       text: "OK",
      //       style: "cancel",
      //     },
      //   ],
      //   {
      //     cancelable: true,
      //   }
      // );
    } catch (error) {
      console.log(error);
      setDeleteLoading(false);
      Alert.alert(
        "Error",
        "Something Went Wrong.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    } finally {
      console.log("Ended");
    }
  };

  const handleQuantityChange = (qty) => {
    setSelectedQuantity(qty);
    console.warn(qty);
    setQuantity(null, { _id: item._id, selectedQuantity: qty.value });
    setCalculate((prevState) => prevState + 1);
  };

  useEffect(() => {
    getImage();
    setSelectedQuantity({ label: "", value: item.selectedQuantity });
  }, [item.selectedQuantity]);
  const dis = (item.price / 100) * (item.discount > 0 ? item.discount : 0);
  const discountedPrice = item.price - dis;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        marginVertical: Spacing.ExtraLarge,
      }}
    >
      <View style={{ position: "absolute", right: 0, top: 5 }}>
        <TouchableOpacity
          onPress={() => deleteItem()}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 20,
            backgroundColor: theme.redLight,
            marginRight: Spacing.ExtraSmall,
            borderRadius: 100,
            paddingHorizontal: Spacing.Small,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: Font.Small,
            }}
          >
            {deleteLoading ? <ActivityIndicator color="red" /> : "Delete"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ position: "relative" }}>
        {imageState ? (
          <>
            <Image
              source={{ uri: imageState }}
              style={{ width: 70, height: 70, borderRadius: 5 }}
            />
            {item.subscription == 1 ? (
              <View
              style={{
                position: "absolute",
                bottom: -10,
                backgroundColor: theme.backgroundColor,
                borderRadius: 100,
                padding: 5,
                paddingVertical: 2,
                right: 6,
              }}
              >
                <Text style={{ fontSize: 9, color: "white" }}>
                  Subscription
                </Text>
              </View>
            ) : (
              <></>
            )}
            {
              <View
                style={{
                  position: "absolute",
                  top: -22,
                  backgroundColor: "white",
                  borderRadius: 100,
                  padding: 5,
                  right: 12,
                  width: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 10, color: "black" }}>
                  ₹ {discountedPrice * item.selectedQuantity}
                </Text>
              </View>
            }
          </>
        ) : (
          <View style={{ width: 70, height: 70, borderRadius: 5 }} />
        )}
      </View>
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
          <Text style={{ fontFamily: "MPlusBold", fontSize: Font.Small }}>
            ₹ {discountedPrice}/
            {item.subscription == 1 ? "month" : item.priceUnit}
          </Text>
          {item.discount > 0 ? (
            <Text
              style={{
                fontFamily: "MPlusBold",
                fontSize: Font.Small,
                textDecorationLine: "line-through",
                color: "grey",
                marginLeft: Spacing.Normal,
              }}
            >
              ₹ {item.price}/{item.subscription == 1 ? "month" : item.priceUnit}
            </Text>
          ) : (
            <></>
          )}
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
                onPress={() => handleQuantityChange(quantity)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 20,
                  backgroundColor:
                    selectedQuantity.value === quantity.value
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
                      selectedQuantity.value === quantity.value
                        ? "white"
                        : "black",
                    fontSize: Font.Small,
                  }}
                >
                  {quantity.value} {item.priceUnit}
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
}

export default function CartScreen({ navigation }) {
  const [subscriptionData, setSubscriptionData] = useState([]);
  // const [products, setProducts] = useState([]);
  const [calculate, setCalculate] = useState(0);
  const [fetchProducts, response, productsLoading, productError] = useQuery();

  const products = response.data || [];

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

  useEffect(() => {
    const uns = navigation.addListener("focus", () => {
      fetchProducts("/order/cart/get");
    });
    return uns;
  }, [navigation]);

  const [proceedLoading, setProceedLoading] = useState();
  useEffect(() => {
    setSubscriptionData(SubscriptionData);
  }, []);

  const getAddress = async () => {
    setProceedLoading(true);
    try {
      const t = await getValueFor();
      const response = await axios.post("/user/address/get", {
        token: t && t.length > 100 ? t : "",
      });
      const length = response.data.length;
      if (length == 0) {
        Alert.alert(
          "Error",
          "Please Add An Address. By Going My Account Section",
          [
            {
              text: "OK",
              style: "cancel",
            },
          ],
          {
            cancelable: true,
          }
        );
      }
      if (response.data.length > 0) {
        navigation.navigate("PaymentPage");
      }
      setProceedLoading(false);
    } catch (error) {
      console.log(error);
      setProceedLoading(false);
      Alert.alert(
        "Error",
        "Please Add An Address.",
        [
          {
            text: "OK",
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  console.log(products);
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View>
          {products.map((item, itemIndex) => {
            const availableQuantity = item.availableQuantity.map((i, index) => {
              const newObj = new Object();
              newObj.value = i.value;
              newObj.label = i.label + item.unit;
              newObj.key = index;
              return newObj;
            });
            return (
              <NormalProducts
                item={item}
                setCalculate={() => fetchProducts("/order/cart/get")}
                availableQuantity={availableQuantity}
              />
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={getAddress} style={styles.button}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextFont style={{ fontSize: 30, color: "white" }}>
            {productsLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              response.total
            )}
          </TextFont>
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
          <TextFont style={styles.text}>
            {proceedLoading ? <ActivityIndicator color="white" /> : "Proceed"}
          </TextFont>
          <AntDesign color="white" name="caretright" size={15} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
