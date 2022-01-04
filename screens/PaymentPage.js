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
  subscription,discount
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
              paddingVertical: 1
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
          Dis: ₹ {discount > 0 ? ((price/100) * discount * selectedQuantity) : 0 }
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

  const generate = async () => {
    const obj = {
      address: selectedAddress,
      products: productItem,
      paymentMode: paymentMode,
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
    productItem.forEach((item)=>{
      
      const price = item.price * item.selectedQuantity
      total = total + price
    })
    return total
  }
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
          <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent:'flex-end' }}>
            <Text>Discount - Rs {totalDiscount() - response.total}</Text>
          </View>
          {
            productItem.find((item)=> item.subscription == 1) ? (
              <Text style={{ color: 'green', marginTop: 10 }}>Please select Delivery Time and Days from Order History Section. Order History > Subscription > Delivery Time Or Days </Text>
            ):(<></>)
          }
        </View>
        <View style={{ marginTop: Spacing.ExtraLarge }}>
          <TextFont style={{ fontFamily: "PT_SansBold" }}>
            Payment Mode
          </TextFont>
          <View
            style={{
              width: 150,
              paddingHorizontal: 10,
              marginTop: 15,
              paddingVertical: 10,
              borderRadius: 10,
              backgroundColor: theme.themeLight,
            }}
          >
            <Text>Cash On Delivery</Text>
          </View>
          {/* {productItem.map((item, index) => (
            <ProductItem {...item} index={index} fetch={()=> fetchProducts('/order/cart/get') } selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
          ))} */}
        </View>
        <View style={{ marginTop: 100 }} />
      </ScrollView>
      <TouchableOpacity onPress={generate} style={styles.button}>
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
