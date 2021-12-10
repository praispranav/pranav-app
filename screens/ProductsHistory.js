import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import theme from "../config/theme";
import { Font } from "../constants/Fonts";
import TextFont from "../elements/Text";
import { Spacing } from "../constants/MarginPadding";
import moment from "moment";
import axios from "axios";
import { useHistory } from "../hooks/useHistory";
import Loading from "../components/Loading";

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
    maxWidth: 80,
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
  cancelled: {
    borderRadius: 20,
    height: 20,
    width: 75,
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

const Item = ({ item, getBadgeColor, getBackgroundColor }) => {
  const [imageState, setImageState] = useState(false);
  const [fetch, state, loading] = useHistory();

  const getImage = async () => {
    console.log(item.productId);
    if (imageState) return;
    try {
      const responseawait = await axios.get(
        `/category/image/id/${item.productId}`
      );
      setImageState(responseawait.data[0].image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImage();
  }, []);
  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: getBackgroundColor(item.status) },
      ]}
    >
      <View style={{ position: "relative" }}>
        {imageState ? (
          <Image
            source={{ uri: imageState }}
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        ) : (
          <View style={{ width: 70, height: 70, borderRadius: 5 }} />
        )}
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
            {moment(item.createdDate).format("YYYY-MM-DD")}
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
              onPress={() => fetch({ type: false, body: { id: item._id } })}
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
        {/* <Text>
                  Order Date: {moment(item.orderDate).format("YYYY/MM/DD")}
                </Text> */}
        {/* <View style={styles.blueBadge2}>
                </View> */}
      </View>
    </View>
  );
};

export default function ProductHistory({ navigation }) {
  const [http, state, loading] = useHistory();

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
    if (status.toLowerCase() === "cancelled") return styles.cancelled;
  };
  useEffect(() => {
    const unsub = navigation.addListener("focus", async () => {
      http({ type: "fetch", body: "" });
    });
    return unsub;
  }, [navigation]);
  if (loading) return <Loading />;
  return (
    <ScrollView style={styles.screen}>
      {state
        .sort((a, b) => b.createdDate.localeCompare(a.createdDate))
        .map((item) => {
          return (
            <Item
              item={item}
              getBadgeColor={getBadgeColor}
              getBackgroundColor={getBackgroundColor}
            />
          );
        })}
    </ScrollView>
  );
}
