import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import theme from "../config/theme";
import * as SecureStore from "expo-secure-store";
import { Spacing } from "../constants/MarginPadding";
import Input from "../components/TextInput";

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return result;
  } else {
    return false;
  }
}

const AddressItem = ({
  city,
  state,
  phone,
  address1,
  address2,
  pinCode,
  _id,
  fetch,
}) => {
  const [loading, setLoading] = useState(false);
  const deleteAddress = async () => {
    try {
      const response = await axios.post(`/user/address/delete/${_id}`, {
        token: await getValueFor(),
      });
      fetch();
      Alert.alert(
        "Success",
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
    } catch (error) {
      Alert.alert(
        "Error",
        "Something Went Wrong",
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
    }
  };
  return (
    <View
      style={{
        marginTop: 15,
        marginHorizontal: 15,
        backgroundColor: theme.themeLight,
        padding: Spacing.Normal,
        borderRadius: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ width: 100 }}>{address1 + ","}</Text>
          {address2 ? <Text style={{ marginTop: 5, width: 100 }}>{address2}</Text> : <></>}
          <Text style={{ marginTop: 5 }}>{phone}</Text>
        </View>
        <View style={{ position: "absolute", right: 100 }}>
          <Text>{city + "," + state}</Text>
          <Text style={{ marginTop: 5 }}>{pinCode}</Text>
        </View>
        <View />
        <TouchableOpacity
          onPress={deleteAddress}
          style={{
            backgroundColor: theme.redMedium,
            marginTop: 15,
            borderRadius: 40,
            paddingHorizontal: 20,
            position: "absolute",
            right: 0,
            bottom: 0,
            paddingVertical: 4,
            width: 70,
          }}
        >
          <Text style={{ fontSize: 12, color: "white" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    height: "95%",
  },
  userContainer: {
    height: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    borderRadius: 200,
    height: 100,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.backgroundColor,
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  actionButton: {
    display: "flex",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: theme.themeLight,
  },
  actionFields: {
    marginTop: Spacing.Normal,
    marginHorizontal: Spacing.Normal,
  },
  actionFields: {
    marginHorizontal: Spacing.Large,
    marginVertical: Spacing.Large,
  },
  actionButton2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.Normal,
  },
  buttonBG: {
    backgroundColor: theme.themeLight,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 30,
  },
  fieldmargin: {
    marginTop: 15,
  },
});

const INITIAL_USER_STATE = {
  _id: "61ae5366e6529e299619c923",
  name: "",
  email: "",
  phone: "",
};

async function saveToken(key, value) {
  await SecureStore.deleteItemAsync("token");
}

export default function AccountScreen(props) {
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const [address, setAddress] = useState([]);

  const [loading, setLoading] = useState(false);
  const [addAddressField, setAddAddressField] = useState(false);
  const [newPasswordField, setNewPasswordField] = useState(false);

  const [newpassword, setNewPassword] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [token, setToken] = useState("");

  const logout = async () => {
    await saveToken();
    props.navigation.navigate("HomeScreen");
  };

  const submitPassword = async () => {
    try {
      const response = await axios.post("/user/auth/change-password", {
        newpassword: newpassword,
        token: await getValueFor(),
      });
      Alert.alert(
        "Success",
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
      setNewPasswordField(false);
      setNewPassword("");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            cancelable: true,
            text: "OK",

            style: "cancel",
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  };
  const saveAddress = async () => {
    try {
      const response = await axios.post("/user/address/add", {
        address1,
        address2,
        city,
        pinCode,
        state,
        phone,
        token: await getValueFor(),
      });
      Alert.alert(
        "Success",
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
      setAddAddressField(false);
    } catch (error) {
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("HomeScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("HomeScreen"),
        }
      );
    }
  };

  const getUser = async (t) => {
    setLoading(true);
    try {
      const response = await axios.post("/user/", {
        token: t && t.length > 100 ? t : token  ,
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("HomeScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("HomeScreen"),
        }
      );
    }
  };
  const getAddress = async (t) => {
    setLoading(true);
    try {
      const response = await axios.post("/user/address/get", {
        token: t && t.length > 100 ? t : token,
      });
      setAddress(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("HomeScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("HomeScreen"),
        }
      );
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      try {
        const r = await getValueFor();
        setToken(r);
        if (r.length < 100) {
          props.navigation.navigate("LoginScreen");
        } else {
          getUser(r);
          getAddress(r);
        }
      } catch (error) {}
    });
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ height: "100%" }}>
      <ScrollView style={styles.screen}>
        <View style={styles.userContainer}>
          <View style={styles.circle}>
            <AntDesign name="user" size={45} color={theme.backgroundColor} />
          </View>
          <Text style={{ marginTop: Spacing.Normal }}>{user.name}</Text>
          <Text>{user.phone}</Text>
          <Text>{user.email}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setAddAddressField((prevState) => !prevState)}
          >
            <Text>Add Address</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setNewPasswordField((prevState) => !prevState)}
          >
            <Text>Change Password</Text>
          </TouchableOpacity>
        </View>

        {newPasswordField && (
          <View style={styles.actionFields}>
            <Input
              placeholder="Enter New Password Here"
              value={newpassword}
              onChangeText={setNewPassword}
            />
            <View style={styles.actionButton2}>
              <TouchableOpacity
                style={styles.buttonBG}
                onPress={submitPassword}
              >
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {addAddressField && (
          <View style={styles.actionFields}>
            <Input
              placeholder="Enter New Address1 Here"
              value={address1}
              onChangeText={setAddress1}
              style={styles.fieldmargin}
            />
            <View style={styles.fieldmargin} />
            <Input
              placeholder="Enter New Address2 Here"
              value={address2}
              onChangeText={setAddress2}
              style={styles.fieldmargin}
            />
            <View style={styles.fieldmargin} />
            <Input
              placeholder="Enter New City Here"
              value={city}
              onChangeText={setCity}
            />
            <View style={styles.fieldmargin} />
            <Input
              placeholder="Enter New State Here"
              value={state}
              onChangeText={setState}
              style={styles.fieldmargin}
            />
            <View style={styles.fieldmargin} />
            <Input
              placeholder="Enter New Pin Code Here"
              value={pinCode}
              onChangeText={setPinCode}
              style={styles.fieldmargin}
            />
            <View style={styles.fieldmargin} />
            <Input
              placeholder="Enter Phone Number Here"
              value={phone}
              onChangeText={setPhone}
              style={styles.fieldmargin}
            />
            <View style={styles.actionButton2}>
              <TouchableOpacity style={styles.buttonBG} onPress={saveAddress}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ marginTop: Spacing.ExtraLarge }}>
          {address.map((item) => (
            <AddressItem {...item} fetch={getAddress} />
          ))}
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        onPress={() => logout()}
        style={{
          backgroundColor: theme.backgroundColor,
          width: "100%",
          height: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
}
