import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import routes from "../config/routes.json";
import Button from "../components/Button";
import Input from "../components/TextInput";
import Text from "../elements/Text";
import theme from "../config/theme";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import LoadingScreen from "../components/Loading";

async function save(key, value) {
  return await SecureStore.setItemAsync("token", value);
}

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
// const theme = {
//     backgroundColor: "red",
//     grey: 'rgb(170,170,170)'
// }

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function LoginScreen(props) {
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [otp, setOpt] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  const [verifyingTOken, setVerifyingToken] = useState(true);

  const [token, setToken] = useState("");

  const sendOtp = async () => {
    try {
      setLoading(true);
      let value;
      if (email) value = { email: email };
      if (phone) value = { phone: phone };
      const response = await axios.post("/user/auth/reqforotp", value);
      //   await save("token", response.data.token);
      Alert.alert(
        "Otp Sent",
        response.data.message,
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
      setLoading(false);
      setOtpRequested(true)
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        "Error",
        "Login Failed",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("LoginScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
      console.warn(error);
    }
  };

  const submit = async () => {
    try {
      setLoading(true);
      let value;
      if (email) value = { email: email, otp:otp };
      if (phone) value = { phone: phone, otp: otp };
      const response = await axios.post("/user/auth/otpverify", value);
      //   await save("token", response.data.token);

      if(response.status !== 201){
        Alert.alert(
            "Otp Sent",
            response.data.message,
            [
              {
                text: "OK",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
            }   )  
      }
       if(response.status === 200 ) {
        save("k",response.data.token.toString())
           Alert.alert(
             "Otp Sent",
             response.data.message,
             [
               {
                 text: "OK",
                 onPress: () => props.navigation.navigate("Drawer"),
                 style: "cancel",
               },
             ],
             {
               cancelable: true,
               onDismiss: () => props.navigation.navigate("Drawer"),
             }
           );
       }
      setLoading(false);
      setOtpRequested(true)
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        "Error",
        "Could Not Sent Otp",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("LoginScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("Drawer"),
        }
      );
      console.warn(error);
    }
  };

  const callback = () =>{
      if(otpRequested){
          submit()
      } 
      if(!otpRequested){
          sendOtp()
      }
  }

  const check = async () => {
    try {
      const r = await getValueFor();
      console.log("Function Called");
      setToken(r);
      props.navigation.navigate("Drawer");
    } catch (error) {}
  };
  useEffect(() => {
    check();

    const unsubscribe = props.navigation.addListener("focus", async () => {
      try {
        if (token.length > 100) {
          props.navigation.navigate("Drawer");
        }
        const r = await getValueFor();
        if (r.length > 100) {
          setToken(r);
          props.navigation.navigate("HomeScreen");
        } else {
          setVerifyingToken(false);
        }
      } catch (error) {
        setVerifyingToken(false);
      }
    });

    return unsubscribe;
  }, [token]);
  if (verifyingTOken) return <LoadingScreen />;
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View
        style={{
          width: width + 110,
          height: width + 110,
          borderRadius: 5000,
          position: "absolute",
          top: -200,
          left: -100,
          backgroundColor: theme.backgroundColor,
        }}
      ></View>
      <View
        style={{
          width: width + 110,
          height: width + 110,
          borderRadius: 5000,
          position: "absolute",
          bottom: -300,
          right: -200,
          backgroundColor: theme.backgroundColor,
        }}
      ></View>

      <View style={styles.screen}>
        <View style={styles.navigationContainer}>
          <Button
            containerStyle={{
              backgroundColor: theme.backgroundColor,
              borderRadius: Spacing.ExtraLarge,
            }}
            textStyle={{ color: "white" }}
            text="Forget"
          />
          <Button
            textStyle={{ color: "black" }}
            onPress={() => {
              props.navigation.navigate("LoginScreen");
            }}
            text="Login"
          />
        </View>
        <View style={{ marginVertical: Spacing.Normal }}>
          {phone == true ? (
            <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
              <Input
                placeholder={"Enter Your Mobile or Email Here"}
                onChangeText={setEmail}
              />
            </View>
          ) : (
            <></>
          )}
          {email == true ? (
            <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
              <Input
                placeholder={"Enter Your Mobile or Email Here"}
                onChangeText={setPhone}
              />
            </View>
          ) : (
            <></>
          )}
          {otpRequested && (
            <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
              <Input placeholder={"Enter Otp"} onChangeText={setOpt} />
            </View>
          )}
        </View>

        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View
            style={[
              styles.navigationContainer,
              {
                marginTop: Spacing.Normal,
                height: 45,
                borderRadius: 400,
                overflow: "hidden",
              },
            ]}
          >
            <Button
              onPress={callback}
              containerStyle={{
                backgroundColor: theme.backgroundColor,
                borderRadius: Spacing.ExtraLarge,
              }}
              textStyle={{ color: "white" }}
              text={
                loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  "Submit"
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    margin: Spacing.Normal,
    marginHorizontal: 30,
    marginTop: 125,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: "white",
    padding: Spacing.ExtraLarge + 20,
    marginBottom: 65,
  },
  navigationContainer: {
    width: "100%",
    height: 40,
    borderRadius: Spacing.ExtraLarge + 15,
    borderWidth: 1,
    borderColor: "rgb(220,220,220)",
    display: "flex",
    flexDirection: "row",
  },
});
