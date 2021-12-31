import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import { Font } from "../constants/Fonts";
import theme from "../config/theme";
import moment from "moment";
import TextFont from "../elements/Text";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Input from "../components/TextInput";
import AntDesign from "react-native-vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Headline } from "react-native-paper";

const styles = StyleSheet.create({
  badge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 20,
    borderRadius: 50,
    backgroundColor: theme.backgroundColor,
    width: 60,
    right: 0,
    position: "absolute",
    top: 25,
  },
  screen: {
    flex: 1,
    paddingHorizontal: Spacing.Normal,
    backgroundColor: "white",
    paddingVertical: Spacing.Normal,
  },
  container: {
    borderRadius: 8,
    padding: Spacing.Normal,
    width: "100%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
});

const d = {
  name: "Milk",
  dailyQuantity: ["2"],
  quantityUnit: "liter",
  image: require("../assets/img/dairy.jpg"),
  status: "Active",
  canceledDates: [],
  extraQuantity: [
    { date: new Date(), quantity: "2" },
    { date: new Date(), quantity: "6" },
  ],
  startDate: new Date(),
  endDate: new Date(),
  deliveryTimeRange: ["7pm - 8pm"],
  days: ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
  deliveries: [
    {
      comment: "",
      status: "Delivered",
      deliveryDate: new Date(),
      quantity: "69",
    },
  ],
};
const allDays = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

// const timeRanges = [
//   "8pm - 9pm",
//   "7pm - 8pm",
//   "6pm - 7pm",
//   "5pm - 6pm",
//   "6am - 7am",
//   "7am - 8am",
//   "8am - 9am",
// ];

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

const LoadingIndicator = ({ loadingState, text }) => {
  if (loadingState) return <ActivityIndicator color={"white"} />;
  return <Text style={{ color: "white" }}>{text}</Text>;
};

const INITIAL_LOADING = {
  extraQuantity: false,
  cancelDelivery: false,
  extraQuantityError: false,
  cancelError: false,
};

export default function SubscriptionDetails({ navigation, route }) {
  const { data: itemData } = route.params;
  const subscriptionInfo = JSON.parse(itemData);

  const [datePickerState, setDatePickerState] = useState({
    cancel: false,
    extra: false,
  });

  const [cancelState, setCancelState] = useState({
    token: "",
    date: new Date(),
    comment: "",
  });
  const [extraState, setExtraState] = useState({
    token: "",
    date: new Date(),
    quantity: "",
  });

  const [loading, setLoading] = useState(INITIAL_LOADING);

  const [changesUpdate, setChangesUpdate] = useState(false);
  const [timeRanges, setTimeRange] = useState([]);
  const [token, setToken] = useState("");

  const [daysUpdated, setDaysUpdates] = useState(false);
  const [timeRangeUpdate, setTimeRangeUpdate] = useState(false);

  const [details, setDetails] = useState({
    cancelled: [],
    extra: [],
    deliveries: [],
  });

  const [days, setDays] = useState([]);
  const [deliveryTimeRange, setDeliveryTimeRange] = useState("");

  const [deliveries, setDeliveries] = useState([]);

  const [data, setData] = useState(d);

  const fetchTimeRange = async () => {
    try {
      const { data } = await axios.get("/category/time-range");
      setTimeRange(data);
    } catch (err) {}
  };

  const fetchExtraQuantity = async () => {
    try {
      const { data } = await axios.post("/order/subscription/extra/get", {
        token: await getValueFor(),
        subscriptionId: subscriptionInfo._id,
      });
      setDetails((prevState) => ({ ...prevState, extra: data }));
    } catch (err) {}
  };

  const fetchCancelledQuantity = async () => {
    try {
      const { data } = await axios.post("/order/subscription/cancel/date/get", {
        token: await getValueFor(),
        subscriptionId: subscriptionInfo._id,
      });
      setDetails((prevState) => ({ ...prevState, cancelled: data }));
    } catch (err) {}
  };

  const fetchDeliveries = async () => {
    try {
      const { data } = await axios.post("/order/subscription/delivery/get", {
        token: await getValueFor(),
        subscriptionId: subscriptionInfo._id,
      });
      setDeliveries(data || []);
    } catch (err) {}
  };

  const updateTimeInterval = async (value) => {
    try {
      await axios.post("/order/subscription/edit/time-range", {
        token: await getValueFor(),
        subscriptionId: subscriptionInfo._id,
        deliveryTimeRange: value,
      });
    } catch (err) {}
  };

  const updateDays = async (value) => {
    try {
      await axios.post("/order/subscription/edit/days", {
        token: await getValueFor(),
        subscriptionId: subscriptionInfo._id,
        days: days,
      });
    } catch (err) {}
  };

  async function getToken() {
    const t = await getValueFor();
    setToken(t);
  }

  const getBackgroundColor = (status) => {
    status = status.toLowerCase();
    if (status === "active") return theme.greenLight;
  };

  const checkDays = (currentDay) => {
    const a = days.findIndex((dayCh) => dayCh === currentDay);
    if (a !== -1) return true;
    return false;
  };

  const handleDaySelector = (value) => {
    const dayCopy = [...days];
    const index = days.findIndex(
      (item) => item.toLowerCase() === value.toLowerCase()
    );
    if (index === -1) {
      const newData = [...dayCopy, value];
      setDays(newData);
    } else {
      dayCopy.splice(index, 1);
      setDays(dayCopy);
    }
    setDaysUpdates(true);
  };

  const discardDayEdit = () => {
    const dataCopy = { ...data, days: d.days };
    setData(dataCopy);
    setDaysUpdates(false);
    updateDays(value);
  };

  const discardDeliveryTime = () => {
    const dataCopy = { ...data, deliveryTimeRange: d.deliveryTimeRange };
    setData(dataCopy);
  };

  const onChangeTimeRange = (value) => {
    setDeliveryTimeRange(value);
    updateTimeInterval(value);
  };

  const handleCancelDatePicker = (e) => {
    setDatePickerState({ extra: false, cancel: false });
    setCancelState((prevState) => ({
      ...prevState,
      date: e.nativeEvent.timestamp,
      token: token,
    }));
    console.warn(cancelState, "Cancel");
  };

  const handleExtraDatePicker = (e) => {
    setDatePickerState({ extra: false, cancel: false });
    console.warn(e);
    setExtraState((prevState) => ({
      ...prevState,
      token: token,
      date: e.nativeEvent.timestamp,
    }));
  };

  const submitCancel = async () => {
    setLoading((prevState) => ({ ...prevState, cancelDelivery: true }));
    try {
      await axios.post("/order/subscription/cancel/date", {
        ...cancelState,
        subscriptionId: subscriptionInfo._id,
        token: await getValueFor(),
      });
      Alert.alert("Success", "Cancel Request Submitted");
      setCancelState({
        token: "",
        date: new Date(),
        comment: "",
      });
      fetchCancelledQuantity();
      setLoading((prevState) => ({ ...prevState, cancelDelivery: false }));
    } catch {
      setLoading((prevState) => ({
        ...prevState,
        cancelDelivery: false,
        cancelError: true,
      }));
    }
  };

  const submitExtra = async () => {
    console.log("ExtraState", extraState);
    setLoading((prevState) => ({ ...prevState, extraQuantity: true }));
    try {
      await axios.post("/order/subscription/extra/create", {
        ...extraState,
        subscriptionId: subscriptionInfo._id,
        token: await getValueFor(),
      });
      Alert.alert("Success", "Quantity Extended");
      setLoading((prevState) => ({ ...prevState, extraQuantity: false }));
      fetchExtraQuantity();
    } catch {
      setLoading((prevState) => ({
        ...prevState,
        extraQuantity: false,
        extraQuantityError: true,
      }));
    }
  };

  const showExtraDatePicker = () =>
    setDatePickerState((prevState) => ({
      ...prevState,
      extra: !prevState.extra,
    }));
  const showCancelDatePicker = () =>
    setDatePickerState((prevState) => ({
      ...prevState,
      extra: !prevState.extra,
    }));

  useEffect(() => {
    getToken();
    fetchTimeRange();
    fetchExtraQuantity();
    fetchCancelledQuantity();
    fetchDeliveries();
    setData(d);
    setDays(subscriptionInfo.days);
    setDeliveryTimeRange(subscriptionInfo.deliveryTimeRange || "");
  }, []);

  const totalDelivery = (array) =>{ 
    let total = 0
    deliveries.forEach((item)=> total = total + item.quantity)
    console.warn(total)
    return total
  }

  return (
    <ScrollView style={styles.screen}>
      <View
        style={[
          styles.container,
          { backgroundColor: getBackgroundColor(data.status) },
        ]}
      >
        <View style={styles.flex}>
          <Image source={data.image} style={styles.img} />
          <View style={{ marginLeft: Spacing.Normal }}>
            <Text style={{ fontSize: 18, fontFamily: "MPlusBold" }}>
              {subscriptionInfo.name}
            </Text>
            <View style={[styles.flex, { marginTop: 5 }]}>
              <Text
                style={{ fontSize: Font.PrimarySmall, fontFamily: "MPlusBold" }}
              >
                Order Date:
              </Text>
              <TextFont style={{ fontSize: Font.PrimarySmall }}>
                {moment(subscriptionInfo.createdDate).format("YYYY-MM-DD")}
              </TextFont>
            </View>
            <View style={[styles.flex, { marginTop: 5 }]}>
              <Text
                style={{ fontSize: Font.PrimarySmall, fontFamily: "MPlusBold" }}
              >
                End Date:
              </Text>
              <TextFont style={{ fontSize: Font.PrimarySmall }}>
                {moment(subscriptionInfo.createdDate)
                  .add(30, "d")
                  .format("YYYY-MM-DD")}
              </TextFont>
            </View>
          </View>
          <View style={{ position: "absolute", right: 0, top: 10 }}>
            <Text>
              {subscriptionInfo.selectedQuantity * 30}{" "}
              {subscriptionInfo.priceUnit + "  total"}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: Spacing.Normal }}>
          <Text style={{ fontSize: Font.Primary, fontFamily: "MPlusBold" }}>
            Days
          </Text>

          <View
            style={[
              styles.flex,
              { justifyContent: "space-between", marginTop: Spacing.Normal },
            ]}
          >
            {allDays.map((day) => (
              <TouchableOpacity
                onPress={() => handleDaySelector(day)}
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
          {daysUpdated && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => updateDays()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  height: 20,
                  borderRadius: 50,
                  marginTop: 10,
                  backgroundColor: theme.green2,
                }}
              >
                <Text style={{ color: "white" }}>{"Update"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ marginTop: Spacing.Large }}>
          <Text style={{ fontSize: Font.Primary, fontFamily: "MPlusBold" }}>
            Delivery Time
          </Text>

          <View style={[styles.flex, { flexWrap: "wrap" }]}>
            {timeRanges.length ? (
              timeRanges.map((day) => (
                <TouchableOpacity
                  onPress={() => onChangeTimeRange(day)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 5,
                    height: 20,
                    borderRadius: 50,
                    backgroundColor:
                      day == deliveryTimeRange
                        ? theme.backgroundColor
                        : theme.lightgrey,
                    marginTop: Spacing.Medium,
                    marginRight: Spacing.Small,
                  }}
                >
                  <Text
                    style={{
                      color: day == deliveryTimeRange ? "white" : "black",
                    }}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <>
                <ActivityIndicator color={theme.backgroundColor} />
              </>
            )}
          </View>
          {timeRangeUpdate && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => discardDeliveryTime()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  height: 20,
                  borderRadius: 50,
                  marginRight: 10,
                  marginTop: 10,
                  backgroundColor: theme.lightgrey,
                }}
              >
                <Text style={{ color: "black" }}>{"Cancel"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                //   onPress={() => handleDaySelector(day)}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 10,
                  height: 20,
                  borderRadius: 50,
                  marginTop: 10,
                  backgroundColor: theme.green2,
                }}
              >
                <Text style={{ color: "white" }}>{"Update"}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ marginTop: Spacing.Large }}>
          <Text
            style={{
              fontSize: Font.Primary,
              fontFamily: "MPlusBold",
              position: "relative",
            }}
          >
            Extra Quantity
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: Spacing.Normal,
              alignItems: "center",
              marginLeft: Spacing.Large,
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <Text>Selected Date</Text>
            <AntDesign
              name="calendar"
              onPress={showExtraDatePicker}
              size={25}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: Spacing.Normal,
              alignItems: "center",
              marginLeft: Spacing.Large,
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <Text>Quantity</Text>
            <Input
              onChangeText={(e) =>
                setExtraState((prevState) => ({ ...prevState, quantity: e }))
              }
              placeholder={"Extra Quantity"}
              inputStyle={{ marginLeft: Spacing.Large }}
            />
          </View>
          <TouchableOpacity onPress={submitExtra} style={styles.badge}>
            <LoadingIndicator
              loadingState={loading.extraQuantity}
              text={"Submit"}
            />
          </TouchableOpacity>
        </View>
        {datePickerState.cancel && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(e) => handleCancelDatePicker(e)}
          />
        )}
        {datePickerState.extra && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={(e) => handleExtraDatePicker(e)}
          />
        )}
        <View style={{ marginTop: Spacing.Large }}>
          <Text
            style={{
              fontSize: Font.Primary,
              fontFamily: "MPlusBold",
              position: "relative",
            }}
          >
            Cancel Delivery
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: Spacing.Normal,
              alignItems: "center",
              marginLeft: Spacing.Large,
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <Text>Selected Date</Text>
            <AntDesign
              name="calendar"
              onPress={showCancelDatePicker}
              size={25}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: Spacing.Normal,
              alignItems: "center",
              marginLeft: Spacing.Large,
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <Text>Reason</Text>
            <Input
              placeholder={"Reason Optional"}
              inputStyle={{ marginLeft: Spacing.Large }}
              onChangeText={(e) =>
                setCancelState((prevState) => ({ ...prevState, comment: e }))
              }
            />
          </View>
          <TouchableOpacity onPress={submitCancel} style={styles.badge}>
            <LoadingIndicator
              loadingState={loading.cancelDelivery}
              text={"Submit"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: Spacing.Large }}>
          <Text
            style={{
              fontSize: Font.Primary,
              fontFamily: "MPlusBold",
              position: "relative",
            }}
          >
            Cancel Requests
          </Text>
          <View style={{ margin: Spacing.Normal }}>
            {details.cancelled.map((item, index) => (
              <View
                style={{
                  display: "flex",
                  marginBottom: 8,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: 35 }}>{index + 1}.</Text>
                <Text style={{ width: 75 }}>
                  {moment(item.date).format("YYYY-MM-DD")}
                </Text>
                <Text style={{ width: 55 }}>{item.comment.slice(0, 20)}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={{ marginTop: Spacing.Large }}>
          <Text
            style={{
              fontSize: Font.Primary,
              fontFamily: "MPlusBold",
              position: "relative",
            }}
          >
            Extra Quantity Requests
          </Text>
          {details.extra.map((item, index) => (
            <View
              style={{
                display: "flex",
                marginBottom: 8,
                paddingHorizontal: 10,
                borderRadius: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ width: 30 }}>{index + 1}.</Text>
              <Text style={{ width: 75 }}>
                {moment(item.date).format("YYYY-MM-DD")}
              </Text>
              <Text style={{ width: 50 }}>{item.quantity}</Text>
            </View>
          ))}
        </View>
        <View style={{ marginTop: Spacing.Large }}>
          <Text
            style={{
              fontSize: Font.Primary,
              fontFamily: "MPlusBold",
              position: "relative",
            }}
          >
            Deliveries
          </Text>
          {deliveries.map((item, index) => (
            <View style={{ borderWidth: 1, borderColor: "grey" }}>
              <View
                style={{
                  display: "flex",
                  marginBottom: 8,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: 30 }}>{index + 1}.</Text>
                <Text style={{ width: 75 }}>
                  {moment(item.deliveryDate).format("YYYY-MM-DD")}
                </Text>
                <Text style={{ width: 50 }}>{item.quantity + ' ' + subscriptionInfo.priceUnit}</Text>
                <Text style={{ width: 50 }}>{item.status}</Text>
              </View>
              <View>
                <Text>{item.comment}</Text>
              </View>
            </View>
          ))}
          <View style={{ marginTop: 15 }}>
                <Headline>Total - {totalDelivery()} {subscriptionInfo.priceUnit}</Headline>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
