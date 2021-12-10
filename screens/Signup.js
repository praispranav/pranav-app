import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,Alert
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import routes from "../config/routes.json";
import Button from "../components/Button";
import Input from "../components/TextInput";
import Text from "../elements/Text";
import theme from "../config/theme";
import axios from "axios";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function LoginScreen(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/user/auth/register", {
        name,
        email,
        phone,
        password,
        password2,
      });
      Alert.alert(
        "Signup Successful",
        response.data.message,
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("LoginScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("LoginScreen"),
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("LoginScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("HomeScreen"),
        }
      );
      console.warn(error);
    }
  };

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
            textStyle={{ color: "black" }}
            onPress={() => {
              props.navigation.navigate(routes.login);
            }}
            text="Login"
          />
          <Button
            containerStyle={{
              backgroundColor: theme.backgroundColor,
              borderRadius: Spacing.ExtraLarge,
            }}
            textStyle={{ color: "white" }}
            text="Signup"
          />
        </View>
        <View style={{ marginVertical: Spacing.ExtraLarge }}>
          <View style={{ marginTop: Spacing.Normal }}>
            <Input
              placeholder={"Enter Your Email Here"}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              placeholder={"Enter Your Name"}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              placeholder={"Enter Your Mobile Here"}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              placeholder={"Enter Your Password Here"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              placeholder={"Enter Your Password Here"}
              value={password2}
              onChangeText={setPassword2}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View
          style={{ display: "flex", justifyContent: "space-between", flex: 1 }}
        >
          <View
            style={[
              styles.navigationContainer,
              {
                marginTop: Spacing.ExtraLarge,
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
              text={loading ? <ActivityIndicator color="white"/> : "Signup"}
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
