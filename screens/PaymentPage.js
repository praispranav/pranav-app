import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import FontText from "../elements/Text";
import { Spacing } from "../constants/MarginPadding";
import AntDesign from "react-native-vector-icons/AntDesign";
import theme from "../config/theme";
import * as SecureStore from "expo-secure-store";
import { Font } from "../constants/Fonts";
import TextFont from "../elements/Text";
import Loading from "../components/Loading";
import axios from "axios";
import { useQuery } from "../hooks/useQuery";
import { isEmpty } from "lodash";

import { useStripe } from "@stripe/stripe-react-native";
import ButtonPayment from "../components/ButtonPayment";
import PaymentScreen,{ API_URL} from "../components/PaymentScreen";
import Entypo from "react-native-vector-icons/Entypo"

// export const API_URL = "http://192.168.1.70:8080";

export const colors = {
  blurple: "#635BFF",
  blurple_dark: "#5851DF",
  white: "#FFFFFF",
  light_gray: "#F6F9FC",
  dark_gray: "#425466",
  slate: "#0A2540",
};

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync("token");
  if (result) {
    return result;
  } else {
    return false;
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  scrollView: {
    paddingHorizontal: Spacing.Medium,
    height: "50%",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: theme.backgroundColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.Medium,
  },
  text: {
    color: "white",
    fontSize: Font.Large,
  },
});

const AddressItem = ({
  city,
  state,
  phone,
  address1,
  address2,
  pinCode,
  _id,
  fetch,
  selectedAddress,
  item,
  setSelectedAddress,
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
    <TouchableOpacity
      onPress={() => setSelectedAddress(item)}
      style={{
        marginTop: 15,
        backgroundColor:
          selectedAddress._id === _id ? theme.themeLight : "white",
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
          {address2 ? <Text style={{ marginTop: 5 }}>{address2}</Text> : <></>}
          <Text style={{ marginTop: 5, width: 100 }}>{phone}</Text>
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
    </TouchableOpacity>
  );
};

const ProductItem = ({
  index,
  price,
  name,
  selectedQuantity,
  priceUnit,
  subscription,
  discount,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <View
        style={{ alignItems: "center", display: "flex", flexDirection: "row" }}
      >
        <Text style={{ marginLeft: 10 }}>{index + 1}.</Text>
        <Text style={{ marginLeft: 10 }}>{name.slice(0, 20)} </Text>
        {subscription == 1 ? (
          <View
            style={{
              backgroundColor: theme.backgroundColor,
              borderRadius: 100,
              padding: 5,
              paddingVertical: 1,
            }}
          >
            <Text style={{ fontSize: 10, color: "white" }}>Subscription</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text style={{ marginLeft: 10 }}> ₹ {price * selectedQuantity},</Text>
        <Text style={{ marginLeft: 10 }}>
          {" "}
          Qty: {selectedQuantity + " " + priceUnit}
        </Text>
        <Text style={{ marginLeft: 10 }}>
          {" "}
          Dis: ₹{" "}
          {discount > 0 ? (price / 100) * discount * selectedQuantity : 0}
        </Text>
      </View>
    </View>
  );
};

export default function PaymentPage(props) {
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchProducts, response, productsLoading, productError] = useQuery();
  const productItem = response.data || [];
  const [token, setToken] = useState("");
  const [paymentMode] = useState({ paymentMode: "Cash On Delivery" });
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("CASH")

  const generate = async () => {
    const obj = {
      address: selectedAddress,
      products: productItem,
      paymentMode: selectedPaymentMode,
      token: await getValueFor(),
    };
    console.log(obj);

    try {
      await axios.post("/order/add", obj);
      console.warn("Success");
      props.navigation.navigate("OrderSuccess");
    } catch (error) {
      props.navigation.navigate("OrderFailed");
    }
  };

  // const save = async () =>{
  //   // console.log()
  //   generate()
  //   // try{
  //   //   await axios.post('/order/add', { token: await getValueFor() , orders: generate()})

  //   // } catch(error){
  //   //   // console.log(error)
  //   // }
  // }

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState();
 
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

  const fetchPaymentSheetParams = async () => {

    const token = await getValueFor()
    const { data:response } = await axios.post(`${API_URL}/payment-sheet`,{ token: token} );
    const { paymentIntent, ephemeralKey, customer } = await response
    setClientSecret(paymentIntent);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    setPaymentLoading(true);
    const { error } = await presentPaymentSheet({
      clientSecret,
    });

    if (error) {
      // Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      generate();
    }
    setPaymentSheetEnabled(false);
    setPaymentLoading(false);
  };

  const initialisePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      customFlow: false,
      merchantDisplayName: "Varad Foods",
      style: "alwaysDark",
    });
    if (!error) {
      setPaymentSheetEnabled(true);
    }
  };

  useEffect(() => {
    // In your app’s checkout, make a network request to the backend and initialize PaymentSheet.
    // To reduce loading time, make this request before the Checkout button is tapped, e.g. when the screen is loaded.
    initialisePaymentSheet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAddress = async (t) => {
    setLoading(true);
    try {
      const respon = await axios.post("/user/address/get", {
        token: t && t.length > 100 ? t : token,
      });
      setAddress(respon.data);
      setSelectedAddress(respon.data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert(
        "Error",
        "Something Went Wrong",
        [
          {
            text: "OK",
            onPress: () => props.navigation.navigate("CartScreen"),
            style: "cancel",
          },
        ],
        {
          cancelable: true,
          onDismiss: () => props.navigation.navigate("CartScreen"),
        }
      );
    }
  };
  const save = () => generate();
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      try {
        const r = await getValueFor();
        setToken(r);
        if (r.length < 100) {
          props.navigation.navigate("LoginScreen");
        } else {
          getAddress(r);
          fetchProducts("/order/cart/get");
        }
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribe;
  }, [props.navigation]);

  if (loading) return <Loading />;

  const totalDiscount = () => {
    let total = 0;
    productItem.forEach((item) => {
      const price = item.price * item.selectedQuantity;
      total = total + price;
    });
    return total;
  };
  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View style={{ marginTop: Spacing.ExtraLarge }}>
          <TextFont style={{ fontFamily: "PT_SansBold" }}>
            Select Address
          </TextFont>
          {address.map((item) => (
            <AddressItem
              {...item}
              item={item}
              fetch={getAddress}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
        </View>
        <View style={{ marginTop: Spacing.ExtraLarge }}>
          <TextFont style={{ fontFamily: "PT_SansBold" }}>Products</TextFont>
          {productItem.map((item, index) => (
            <ProductItem
              {...item}
              index={index}
              fetch={() => fetchProducts("/order/cart/get")}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          ))}
          <View
            style={{
              marginTop: 15,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text>Discount - Rs {totalDiscount() - response.total}</Text>
          </View>
          {productItem.find((item) => item.subscription == 1) ? (
            <Text style={{ color: "green", marginTop: 10 }}>
              Please select delivery time and days from oder history section
              after sumit.
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={{ marginTop: Spacing.ExtraLarge }}>
          <TextFont style={{ fontFamily: "PT_SansBold" }}>
            Payment Mode
          </TextFont>
          <View style={{ display: 'flex', flexDirection: 'row',alignItems:'center', marginTop: 15,  }}>
            {
              selectedPaymentMode == 'CASH' && (
                <Entypo name="chevron-small-right" size={20} />
              )
            }
          <TouchableOpacity
            style={{
              width: 150,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: theme.themeLight,
            }}
            onPress={()=> setSelectedPaymentMode("CASH")}
          >
            <Text>Cash On Delivery</Text>
          </TouchableOpacity>
          </View>
          <PaymentScreen>
            {/* <ButtonPayment
              variant="primary"
              loading={paymentLoading}
              disabled={!paymentSheetEnabled}
              title="Credit/Debit Card"
              onPress={openPaymentSheet}
            /> */}
             <View style={{ display: 'flex', flexDirection: 'row',alignItems:'center', marginTop: 15,  }}>
            {
              selectedPaymentMode == 'ONLINE' && (
                <Entypo name="chevron-small-right" size={20} />
              )
            }
            <TouchableOpacity
            style={{
              width: 150,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: theme.themeLight,
            }}
            onPress={()=> { openPaymentSheet(); setSelectedPaymentMode("ONLINE")}}
          >
            <Text>Credit/Debit Card</Text>
          </TouchableOpacity>
             </View>
          </PaymentScreen>

          {/* {productItem.map((item, index) => (
            <ProductItem {...item} index={index} fetch={()=> fetchProducts('/order/cart/get') } selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
          ))} */}
        </View>
        <View style={{ marginTop: 100 }} />
      </ScrollView>
      <TouchableOpacity onPress={()=> {
        if(selectedPaymentMode === 'ONLINE'){
          return
        } else {
          generate()
        }
      }
      } style={styles.button}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextFont style={{ fontSize: 30, color: "white" }}>
            {productsLoading ? <ActivityIndicator /> : response.total}
          </TextFont>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              marginHorizontal: 5,
            }}
          >
            <Text style={{ fontSize: 10, color: "white" }}>Total</Text>
            <Text style={{ fontSize: 10, color: "white" }}>Amount</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextFont style={styles.text}>Submit</TextFont>
          <AntDesign color="white" name="caretright" size={15} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
