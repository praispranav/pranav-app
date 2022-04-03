import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,ScrollView, ToastAndroid
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import routes from "../config/routes.json";
import Button from "../components/Button";
// import Input from "../components/TextInput";
import Text from "../elements/Text";
import theme from "../config/theme";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { TextInput as InputText, Headline } from "react-native-paper"
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
    if(username.length < 6) return ToastAndroid.show("Please Fill Username", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    if(password.length < 6) return ToastAndroid.show("Please Fill Password", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    try {
      setLoading(true);
      const response = await axios.post("/user/auth/login", {
        username: username.toLowerCase() || username,
        password,
      });
      console.warn("Username", username)
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
        "No Internet Connection Or Password May be wrong.",
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
        setUsername("");
        setPassword("");
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
    <ScrollView style={{ display: "flex", flex: 1, backgroundColor:"white" }}>
      <View style={styles.screen}>
        <View style={{ display:'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
          <Text style={{ fontFamily: "PT_Sans", fontWeight: 'bold', fontSize: 18 }}>Varad Foods</Text>
        </View>
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
            <Headline>Username</Headline>
            <InputText mode="outlined"
              placeholder={"Enter Your Mobile or Email Here"}
              onChangeText={setUsername}
            />
          </View>

          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
          <Headline>Password</Headline>
            <InputText mode="outlined" secureTextEntry={true}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: "flex",
    flex: 1,
    borderRadius: 30,
    backgroundColor: "white",
    padding: Spacing.ExtraLarge + 20,
    paddingTop: 0,
    marginTop: 40,
    height:'100%'
  },
  navigationContainer: {
    width: "100%",
    borderRadius: Spacing.ExtraLarge,
    height:40,
    borderWidth: 1,
    borderColor: "rgb(220,220,220)",
    display: "flex",
    flexDirection: "row",
  },
});
