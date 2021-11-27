import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import theme from "../config/theme";
import { Font } from "../constants/Fonts";
import TextFont from "../elements/Text";
import { Spacing } from "../constants/MarginPadding";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    marginHorizontal: Spacing.Normal,
    marginTop: Spacing.Medium,
    padding: Spacing.Medium,
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
  },
  childContainer: {
    marginLeft: Spacing.Medium,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  blueBadge: {
    borderRadius: 20,
    height: 20,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: theme.blueMedium,
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
    alignItems: "center",
  },
  blueBadge2: {
    borderRadius: 20,
    height: 20,
    paddingHorizontal: Spacing.ExtraSmall,
    backgroundColor: theme.blueMedium,
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
    alignItems: "center",
  },
  whiteBadge: {
    borderRadius: 20,
    height: 20,
    paddingHorizontal: Spacing.ExtraSmall,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
    alignItems: "center",
    position: "absolute",
    bottom: -10,
    left: 5,
    width: 60,
  },
  redBadge: {
    borderRadius: 20,
    height: 20,
    width: 65,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: theme.redMedium,
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
  },
  greenBadge: {
    borderRadius: 20,
    height: 20,
    width: 75,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: theme.greenMedium,
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
  },
  activeBadge: {
    borderRadius: 20,
    height: 20,
    width: 55,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: theme.greenMedium,
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
  },
  normalBadge: {
    borderRadius: 20,
    height: 20,
    width: 69,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
  },
  closedBadge: {
    borderRadius: 20,
    height: 20,
    width: 60,
    paddingHorizontal: Spacing.Medium,
    backgroundColor: "grey",
    display: "flex",
    justifyContent: "center",
    marginTop: Spacing.ExtraSmall,
  },
  statusStyle: {
    color: "white",
    fontSize: Font.Small,
  },
});

const data = [
  {
    id: "1",
    name: "Grapes",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["1"],
    initialQuantity: "1",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
    status: "Processing",
    orderDate: new Date(),
  },
  {
    id: "2",
    name: "Orange",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["5"],
    initialQuantity: "5",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
    status: "Closed",
    orderDate: new Date(),
  },
  {
    id: "3",
    name: "Apple",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["10"],
    initialQuantity: "10",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
    status: "Closed",
    orderDate: new Date(),
  },
  {
    id: "4",
    name: "Milk",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["10"],
    initialQuantity: "10",
    unit: "liter",
    price: "100",
    priceUnit: "liter",
    status: "Rejected",
    orderDate: new Date(),
  },
];
const dataActive = [
  {
    id: "1",
    name: "Grapes",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["1"],
    initialQuantity: "1",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
    status: "Active",
    orderDate: new Date(),
    days: ["Sun", "Mon", "Tue"],
  },
  {
    id: "2",
    name: "Orange",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["5"],
    initialQuantity: "5",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
    status: "Confirmed",
    orderDate: new Date(),
    days: ["Mon", "Tue", "Thr", "Sat"],
  },
  {
    id: "3",
    name: "Apple",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["10"],
    initialQuantity: "10",
    unit: "kg",
    price: "100",
    priceUnit: "kg",
    status: "Active",
    orderDate: new Date(),
    days: ["Sun", "Mon", "Tue", "Thr", "Sat"],
  },
  {
    id: "4",
    name: "Milk",
    image: require("../assets/img/fruits.jpg"),
    availableQuantity: ["10"],
    initialQuantity: "10",
    unit: "liter",
    price: "100",
    priceUnit: "liter",
    status: "Active",
    orderDate: new Date(),
    days: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri"],
  },
];

export default function ProductHistory({ navigation }) {
  const getBackgroundColor = (status) => {
    if (status.toLowerCase() === "delivered") return theme.lightgrey;
    if (status.toLowerCase() === "rejected") return theme.redLight;
    if (status.toLowerCase() === "confirmed") return theme.themeLight;
    if (status.toLowerCase() === "active") return theme.greenLight;
    if (status.toLowerCase() === "processing") return theme.themeLight;
    if (status.toLowerCase() === "closed") return theme.lightgrey;
  };

  const getBadgeColor = (status) => {
    if (status.toLowerCase() === "delivered") return styles.normalBadge;
    if (status.toLowerCase() === "rejected") return styles.redBadge;
    if (status.toLowerCase() === "confirmed") return styles.blueBadge;
    if (status.toLowerCase() === "processing") return styles.blueBadge;
    if (status.toLowerCase() === "active") return styles.activeBadge;
    if (status.toLowerCase() === "closed") return styles.closedBadge;
  };

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

  return (
    <View style={styles.screen}>
      <ScrollView>
        <TextFont
          style={{
            fontSize: 17,
            marginTop: 10,
            marginLeft: 10,
            fontFamily: "PT_SansBold",
          }}
        >
          Active
        </TextFont>

        <FlatList
          data={dataActive}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const checkDays = (currentDay) => {
              const a = item.days.findIndex((dayCh) => dayCh === currentDay);
              if (a !== -1) return true;
              return false;
            };
            return (
              <View>
                <View
                  style={[
                    styles.mainContainer,
                    {
                      backgroundColor: getBackgroundColor(item.status),
                      flexWrap: "wrap",
                    },
                  ]}
                >
                  <View style={{ position: "relative" }}>
                    <Image
                      source={item.image}
                      style={{ borderRadius: 5, width: 70, height: 70 }}
                    />
                    <View style={styles.whiteBadge}>
                      <Text>{item.id}</Text>
                    </View>
                  </View>
                  <View style={styles.childContainer}>
                    <View>
                      <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
                        {item.name}
                      </Text>
                      <View style={getBadgeColor(item.status)}>
                        <Text style={styles.statusStyle}>{item.status}</Text>
                      </View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: Font.Small,
                          marginTop: Spacing.ExtraSmall,
                        }}
                      >
                        {item.availableQuantity[0] + " " + item.unit} --{" "}
                        {moment(item.orderDate).format("YYYY-MM-DD")}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: "flex-end",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 17, fontFamily: "MPlusBold" }}>
                        Total
                      </Text>
                      <Text style={{ fontFamily: "MPlusBold", fontSize: 12 }}>
                        {" "}
                        Amount
                      </Text>
                      <Text>{item.price}</Text>
                    </View>
                    {/* <Text>
                  Order Date: {moment(item.orderDate).format("YYYY/MM/DD")}
                </Text> */}
                    {/* <View style={styles.blueBadge2}>
                </View> */}
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: Spacing.Large,
                    }}
                  >
                    {days.map((day) => (
                      <TouchableOpacity
                        // onPress={() =>
                        //   handleDaySelector(subscriptionIndex, item.days, day)
                        // }
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
                  <View
                    style={{
                      width: "100%",
                      marginTop: Spacing.Small,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor: theme.green2,
                      }}
                    >
                      <Text style={{ color: "white", fontSize: Font.Small }}>Cancel Today</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 10,
                        height: 20,
                        borderRadius: 50,
                        backgroundColor: theme.green2,
                        marginLeft: 10
                      }}
                    >
                      <Text style={{ color: "white", fontSize: Font.Small }}>Edit Days</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <TextFont
          style={{
            fontSize: 17,
            marginTop: 10,
            marginLeft: 10,
            fontFamily: "PT_SansBold",
          }}
        >
          Others
        </TextFont>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View
                style={[
                  styles.mainContainer,
                  { backgroundColor: getBackgroundColor(item.status) },
                ]}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    source={item.image}
                    style={{ borderRadius: 5, width: 70, height: 70 }}
                  />
                  <View style={styles.whiteBadge}>
                    <Text>{item.id}</Text>
                  </View>
                </View>
                <View style={styles.childContainer}>
                  <View>
                    <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
                      {item.name}
                    </Text>
                    <View style={getBadgeColor(item.status)}>
                      <Text style={styles.statusStyle}>{item.status}</Text>
                    </View>
                    <Text
                      style={{
                        color: "black",
                        fontSize: Font.Small,
                        marginTop: Spacing.ExtraSmall,
                      }}
                    >
                      {item.availableQuantity[0] + " " + item.unit} --{" "}
                      {moment(item.orderDate).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 17, fontFamily: "MPlusBold" }}>
                      Total
                    </Text>
                    <Text style={{ fontFamily: "MPlusBold", fontSize: 12 }}>
                      {" "}
                      Amount
                    </Text>
                    <Text>{item.price}</Text>
                  </View>
                  {/* <Text>
                  Order Date: {moment(item.orderDate).format("YYYY/MM/DD")}
                </Text> */}
                  {/* <View style={styles.blueBadge2}>
                </View> */}
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
