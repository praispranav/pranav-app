import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Touchable,
} from "react-native";
import theme from "../config/theme";
import { Font } from "../constants/Fonts";
import TextFont from "../elements/Text";
import { Spacing } from "../constants/MarginPadding";
import moment from "moment";
import axios from "axios";
import Loading from "../components/Loading";
import * as SecureStore from "expo-secure-store";

const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
async function getValueFor(key) {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return result;
  } else {
    return false;
  }
}

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

const InactiveProducts = ({
  navigation,
  item,
  getBackgroundColor,
  getBadgeColor,
}) => {
  const [loading, setLoading] = useState();
  const [imageState, setImageState] = useState(false);
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
  useEffect(() => {
    getImage();
  }, []);
  const data = JSON.stringify(item)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Subscription Detail", { data: data })}
      style={[
        styles.mainContainer,
        { backgroundColor: getBackgroundColor(item.status) },
      ]}
    >
      <View style={{ position: "relative" }}>
        <View style={{ position: "relative" }}>
          {imageState ? (
            <>
              <Image
                source={{ uri: imageState }}
                style={{ width: 70, height: 70, borderRadius: 5 }}
              />
            </>
          ) : (
            <View style={{ width: 70, height: 70, borderRadius: 5 }} />
          )}
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
            {item.selectedQuantity + " " + item.priceUnit} --{" "}
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
          <Text style={{ fontSize: 17, fontFamily: "MPlusBold" }}>Total</Text>
          <Text style={{ fontFamily: "MPlusBold", fontSize: 12 }}> Amount</Text>
          <Text>{item.price * item.selectedQuantity}</Text>
          {item.status.toLowerCase() === "processing" && (
            <TouchableOpacity
              // onPress={() => fetch({ type: false, body: { id: item._id } })}
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
                {loading ? <ActivityIndicator color="red" /> : "Delete"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ActiveItem = ({
  navigation,
  item,
  getBackgroundColor,
  getBadgeColor,
  checkDays,
}) => {
  const [loading, setLoading] = useState();
  const [imageState, setImageState] = useState(false);
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
  useEffect(() => {
    getImage();
  }, []);
  const data = JSON.stringify(item)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Subscription Detail", { data: data })}
    >
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
          <View style={{ position: "relative" }}>
            <View style={{ position: "relative" }}>
              {imageState ? (
                <>
                  <Image
                    source={{ uri: imageState }}
                    style={{ width: 70, height: 70, borderRadius: 5 }}
                  />
                </>
              ) : (
                <View style={{ width: 70, height: 70, borderRadius: 5 }} />
              )}
            </View>
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
              {item.selectedQuantity + " " + item.priceUnit} --{" "}
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
            <Text style={{ fontSize: 17, fontFamily: "MPlusBold" }}>Total</Text>
            <Text style={{ fontFamily: "MPlusBold", fontSize: 12 }}>
              {" "}
              Amount
            </Text>
            <Text>{item.price * item.selectedQuantity}</Text>
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
              <Text style={{ color: checkDays(day) ? "white" : "black" }}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ProductHistory({ navigation }) {
  const [dataActive, setDataActive] = useState([]);
  const [inactive, setInactive] = useState([]);

  const [loading, setLoading] = useState(false);

  const filterActive = (originalData) => {
    const list = originalData.filter(
      (item) =>
        item.status.toLowerCase() == "active" ||
        item.status.toLowerCase() == "confirmed"
    );
    setDataActive(list);
  };
  const filterInactive = (originalData) => {
    const list = originalData.filter(
      (item) =>{
        console.warn(item.status, item.status.toLowerCase() != "confirmed")
        return item.status.toLowerCase() != "confirmed"
      } 
    );
    const list2 = list.filter(
      (item) =>{
        console.warn(item.status, item.status.toLowerCase() != "confirmed")
        return item.status.toLowerCase() != "active"
      } 
    );
    setInactive(list2);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/order/subscription/get", {
        token: await getValueFor(),
      });
      filterActive(response.data);
      filterInactive(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoading(false);
    }
  };

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

  // const handleDaySelector = (index, dayArray, value) => {
  //   const data = [...subscriptionData];
  //   const array = [...dayArray];
  //   // console.warn(array)
  //   const dayIndex = array.findIndex((d) => {
  //     console.warn(d, value);

  //     return d == value;
  //   });
  //   console.warn(dayIndex);
  //   if (dayIndex === -1) {
  //     array.push(value);
  //   } else {
  //     console.log(array);
  //     array.splice(dayIndex, 1);
  //     console.log(array);
  //   }

  //   data[index].days = array;
  //   setSubscriptionData(data);
  // };

  // const handleQuantityChange = (index, value) => {
  //   const state = [...products];
  //   state[index].initialQuantity = value;
  //   setProducts(state);
  // };

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => fetchData());
    return unsub;
  }, [navigation]);
  if (loading) return <Loading />;
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

        {dataActive.map((item) => {
          const checkDays = (currentDay) => {
            const a = item.days.findIndex(
              (dayCh) => dayCh.toLowerCase() === currentDay.toLowerCase()
            );
            if (a !== -1) return true;
            return false;
          };
          return (
            <ActiveItem
              item={item}
              navigation={navigation}
              checkDays={checkDays}
              getBackgroundColor={getBackgroundColor}
              getBadgeColor={getBadgeColor}
            />
          );
        })}
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
        {inactive.map((item) => {
          return (
            <InactiveProducts
              navigation={navigation}
              item={item}
              getBadgeColor={getBadgeColor}
              getBackgroundColor={getBackgroundColor}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
