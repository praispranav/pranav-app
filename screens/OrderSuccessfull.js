import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import theme from "../config/theme";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  // conatiner:{
  marginTop: {
    marginTop: 15,
  },
  font1:{
      fontFamily: 'PT_SansBold',
      fontWeight: 'bold',
      fontSize: 20
  },
  button:{
      backgroundColor: theme.backgroundColor,
      borderRadius: 100,
      paddingHorizontal: 10,
      color: 'white',
       paddingVertical: 4
  }
  // }
});

export default function Success({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <MaterialIcons name="verified" size={100} color={theme.backgroundColor} />
        <Text style={[styles.marginTop, styles.font1]}>Order Placed Successfully.</Text>
        <Text style={[styles.marginTop]}>Thanks For Shopping with us.</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('HomeScreen')} style={[styles.button, styles.marginTop]}><Text style={{ color: "white"}}>Home</Text></TouchableOpacity>
      </View>
    </View>
  );
}
