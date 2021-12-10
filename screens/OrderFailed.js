import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
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

export default function Failed({ navigation }) {
  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <AntDesign name="closecircle" size={100} color="red" />
        <Text style={[styles.marginTop, styles.font1]}>Order Failed.</Text>
        <Text style={styles.marginTop}>Please Try Again After Sometime.</Text>
        <TouchableOpacity onPress={()=> navigation.navigate('HomeScreen')} style={[styles.button, styles.marginTop]}><Text style={{ color: 'white' }}>Home</Text></TouchableOpacity>
      </View>
    </View>
  );
}
