import React from "react";
import {
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
    status: "Confirmed",
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
    status: "Delivered",
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

export default function ProductHistory({ navigation }) {
  const getBackgroundColor = (status) => {
    if (status.toLowerCase() === "delivered") return theme.lightgrey;
    if (status.toLowerCase() === "rejected") return theme.redLight;
    if (status.toLowerCase() === "processing") return theme.themeLight;
    if (status.toLowerCase() === "confirmed") return theme.greenLight;
  };

  const getBadgeColor = (status) => {
    if (status.toLowerCase() === "delivered") return styles.normalBadge;
    if (status.toLowerCase() === "rejected") return styles.redBadge;
    if (status.toLowerCase() === "processing") return styles.blueBadge;
    if (status.toLowerCase() === "confirmed") return styles.greenBadge;
  };
  return (
    <View style={styles.screen}>
      {data.map(( item ) => {
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
                    {item.availableQuantity[0] + " " + item.unit} -- {moment(item.orderDate).format('YYYY-MM-DD')}
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
          )})
        }
    </View>
  );
}
