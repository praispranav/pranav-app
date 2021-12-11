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
import LoadingScreen from "../components/Loading"

async function save(key, value) {
  return await SecureStore.setItemAsync(key, value);
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [ verifyingTOken , setVerifyingToken]  = useState(true)

  const [token, setToken] = useState('')

  const submit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/user/auth/login", {
        username,
        password,
      });
      await save("token", response.data.token);
      Alert.alert(
        "Login Successful",
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
      Alert.alert(
        "Error",
        "Login Failed",
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
      console.warn(error);
    }
  };
  const check = async () => {
    try {
      const r = await getValueFor();
      console.log('Function Called')
      setToken(r)
      props.navigation.navigate("Drawer");
    } catch (error) {}
  };
  useEffect(() => {
    check();
    
    const unsubscribe = props.navigation.addListener("focus", async () => {
      
      try {
        if(token.length > 100){
          props.navigation.navigate("Drawer");
        }
        const r = await getValueFor();
        if (r.length > 100) {
          setToken(r)
          props.navigation.navigate("HomeScreen");
        } else{
          setVerifyingToken(false)
        }
      } catch (error) { setVerifyingToken(false)}
    });

    return unsubscribe;
  }, [token]);
  if(verifyingTOken) return <LoadingScreen />
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
            text="Login"
          />
          <Button
            textStyle={{ color: "black" }}
            onPress={() => {
              props.navigation.navigate("SignUpScreen");
            }}
            text="Signup"
          />
        </View>
        <View style={{ marginVertical: Spacing.Normal }}>
          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              placeholder={"Enter Your Mobile or Email Here"}
              onChangeText={setUsername}
            />
          </View>

          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              placeholder={"Enter Your Password Here"}
              onChangeText={setPassword}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={()=> props.navigation.navigate('ForgetPassword')} style={{  marginTop: 10 }}>
                <Text style={{ color: "rgb(170,170,170)", }}>Forget Password</Text>
              </TouchableOpacity>
            </View>
          </View>
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
              onPress={submit}
              containerStyle={{
                backgroundColor: theme.backgroundColor,
                borderRadius: Spacing.ExtraLarge,
              }}
              textStyle={{ color: "white" }}
              text={loading ? <ActivityIndicator color="white" /> : "Login"}
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
