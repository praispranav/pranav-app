import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import theme from "../config/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome"

export default function HelpScreen() {
    const openPhoneCall = () => Linking.openURL("tel://9616170526");
    const openWhatsup = () => Linking.openURL("https://wa.me/919616170526")
  return (
    <View style={styles.screen}>
      <Text style={styles.normalText}>
        For Any Kind of App, Delivery, Scbscription, Product Information, etc.
      </Text>
      <View style={[styles.flex, styles.marginTop]}>
        <Text style={styles.boldText}>9616170526</Text>
        <View style={[styles.flex, { width: 200 }]}>
            <TouchableOpacity onPress={openPhoneCall} style={[, { backgroundColor: theme.backgroundColor, overflow: 'hidden' }, styles.icon]}>
                <Feather name="phone-call" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openWhatsup} style={[, { backgroundColor: 'green', overflow: 'hidden' }, styles.icon]}>
                <FontAwesome name="whatsapp" size={30} color="white" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 19,
  },
  marginTop:{
    marginTop: 15
  },
  flex:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 80
  },
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 15,
    paddingVertical: 15
  },
});
