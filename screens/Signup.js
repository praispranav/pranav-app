import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Spacing } from "../constants/MarginPadding";
import routes from "../config/routes.json";
import Button from "../components/Button";
// import Input from "../components/TextInput";
import Text from "../elements/Text";
import { TextInput as Input, Headline } from "react-native-paper";
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

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  const submit = async () => {
    var re = /\S+@\S+\.\S+/;
    if (name.length < 5) return showToast("Name must be 6 characters long");
    if (Number(phone) < 1000000000 || Number(phone) > 9999999999)
      showToast("Phone must be of 10 digits");
    if (re.test(email) == false) return showToast("Properly fill email field.");
    if (password.length < 6 && password !== password2)
      return showToast("Password must be same and must be at least 6.");
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

  React.useEffect(()=>{
    props.navigation.addListener(()=>{
      setName("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setPhone("");
    })
  },[props.navigation])

  return (
    <ScrollView style={{ display: "flex", flex: 1, backgroundColor: "white" }}>
      <View style={styles.screen}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text
            style={{ fontFamily: "PT_Sans", fontWeight: "bold", fontSize: 18 }}
          >
            Varad Foods
          </Text>
        </View>
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
              mode="outlined"
              placeholder={"Enter Your Email Here"}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              mode="outlined"
              placeholder={"Enter Your Name"}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              mode="outlined"
              placeholder={"Enter Your Mobile Here"}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              mode="outlined"
              placeholder={"Enter Your Password Here"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
            <Input
              mode="outlined"
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
              text={loading ? <ActivityIndicator color="white" /> : "Signup"}
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
