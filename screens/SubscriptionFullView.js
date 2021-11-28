import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import { Font } from "../constants/Fonts";
import theme from "../config/theme";
import moment from "moment";
import TextFont from "../elements/Text";

const styles = StyleSheet.create({
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
  deliveries:[
      {
          comment:'',
          status: "Delivered",
          deliveryDate: new Date(),
            quantity: "69"
      }
  ]
};
const days = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];

const timeRanges = [
  "8pm - 9pm",
  "7pm - 8pm",
  "6pm - 7pm",
  "5pm - 6pm",
  "6am - 7am",
  "7am - 8am",
  "8am - 9am",
];

export default function SubscriptionDetails() {
  const [changesUpdate, setChangesUpdate] = useState(false);

  const [daysUpdated, setDaysUpdates] = useState(false);
  const [timeRangeUpdate, setTimeRangeUpdate] = useState(false);

  const [data, setData] = useState(d);

  const getBackgroundColor = (status) => {
    status = status.toLowerCase();
    if (status === "active") return theme.greenLight;
  };

  const checkDays = (currentDay) => {
    const a = data.days.findIndex((dayCh) => dayCh === currentDay);
    if (a !== -1) return true;
    return false;
  };

  const handleDaySelector = (value) => {
    const dayCopy = [...data.days];
    const index = data.days.findIndex(
      (item) => item.toLowerCase() === value.toLowerCase()
    );
    if (index === -1) {
      const newData = { ...data, days: [...dayCopy, value] };
      setData(newData);
    } else {
      dayCopy.splice(index, 1);
      const newData = { ...data, days: dayCopy };
      setData(newData);
    }
    setDaysUpdates(true);
  };

  const discardDayEdit = () => {
    const dataCopy = { ...data, days: d.days };
    setData(dataCopy);
    setDaysUpdates(false);
  };

  const discardDeliveryTime =() =>{
      const dataCopy = { ...data,deliveryTimeRange: d.deliveryTimeRange }
      setData(dataCopy)
  }

  const onChangeTimeRange = (value) =>{
    setTimeRangeUpdate(true)
    const dataCopy = { ...data, deliveryTimeRange: [value]  }
    setData(dataCopy)
  }
  
  useEffect(()=>{
    setData(d)
  },[])

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
              {data.name}
            </Text>
            <View style={[styles.flex, { marginTop: 5 }]}>
              <Text
                style={{ fontSize: Font.PrimarySmall, fontFamily: "MPlusBold" }}
              >
                Order Date:
              </Text>
              <TextFont style={{ fontSize: Font.PrimarySmall }}>
                {moment(data.startDate).format("YYYY-MM-DD")}
              </TextFont>
            </View>
            <View style={[styles.flex, { marginTop: Spacing.ExtraSmall }]}>
              <Text
                style={{ fontSize: Font.PrimarySmall, fontFamily: "MPlusBold" }}
              >
                End Date:
              </Text>
              <TextFont style={{ fontSize: Font.PrimarySmall }}>
                {moment(data.endDate).format("YYYY-MM-DD")}
              </TextFont>
            </View>
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
            {days.map((day) => (
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
                onPress={() => discardDayEdit()}
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
          <Text style={{ fontSize: Font.Primary, fontFamily: "MPlusBold" }}>
            Delivery Time
          </Text>

          <View style={[styles.flex, { flexWrap: "wrap" }]}>
            {timeRanges.map((day) => (
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
                    day == data.deliveryTimeRange[0]
                      ? theme.backgroundColor
                      : theme.lightgrey,
                  marginTop: Spacing.Medium,
                  marginRight: Spacing.Small,
                }}
              >
                <Text
                  style={{
                    color: day == data.deliveryTimeRange[0] ? "white" : "black",
                  }}
                >
                    {console.log(day, data.deliveryTimeRange[0])}
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
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

      </View>
    </ScrollView>
  );
}
