import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import theme from "../config/theme";
import { Spacing } from "../constants/MarginPadding";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Text from "../elements/Text";
import { Font } from "../constants/Fonts";
import axios from "axios";
import FontText from "../elements/Text";
import { useAddCart } from "../hooks/useAddCart";
import Modal from "../components/Modal";

const Item = ({ item, discountedPrice, availableQuantity, findImage }) => {
  const [selectedQuantity, setSelectedQuantity] = useState({
    label: "",
    value: "0",
  });
  const [addItemToCart, loading] = useAddCart();
  useEffect(() => {
    setSelectedQuantity(item.initialQuantity);
    console.warn(item.initialQuantity);
  }, [item]);
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginVertical: Spacing.Large,
        }}
      >
        {findImage(item._id) ? (
          <Image
            source={{ uri: findImage(item._id) }}
            style={{ width: 70, height: 70, borderRadius: 5 }}
          />
        ) : (
          <View style={{ width: 70, height: 70, borderRadius: 5 }} />
        )}
        <View style={{ marginLeft: Spacing.Medium, width: "74%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontSize: 18,
                width: "70%",
                fontFamily: "MPlusBold",
              }}
            >
              {item.name}
            </Text>
            {item.status.toLowerCase() === "available" ? (
              <TouchableOpacity
                onPress={() => addItemToCart(item._id, selectedQuantity.value)}
                style={{
                  borderRadius: 5,
                  backgroundColor: theme.backgroundColor,
                  paddingHorizontal: Spacing.ExtraLarge,
                  paddingVertical: Spacing.ExtraSmall,
                }}
              >
                <Text style={{ color: "white" }}>
                  {loading ? <ActivityIndicator color="white" /> : "Add"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  display: "flex",
                  position: "absolute",
                  right: 0,
                  alignItems: "center",
                  top: 10,
                  zIndex: 1,
                }}
              >
                <FontText
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: Font.Primary,
                  }}
                >
                  Out
                </FontText>
                <FontText
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: Font.ExtraSmall,
                  }}
                >
                  Of
                </FontText>
                <FontText
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: Font.Primary,
                  }}
                >
                  Stock
                </FontText>
              </View>
            )}
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontFamily: "MPlusBold", fontSize: Font.Small }}>
              ₹ {discountedPrice}/{item.priceUnit}
            </Text>
            <Text
              style={{
                fontFamily: "MPlusBold",
                fontSize: Font.Small,
                textDecorationLine: "line-through",
                color: "grey",
                marginLeft: Spacing.Normal,
              }}
            >
              ₹ {item.price}/{item.priceUnit}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: Spacing.Small,
            }}
          >
            <FlatList
              data={availableQuantity}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.key}
              renderItem={({ item: quantity }) => (
                <TouchableOpacity
                  onPress={() => setSelectedQuantity(quantity)}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 20,
                    backgroundColor:
                      selectedQuantity.value === quantity.value
                        ? theme.backgroundColor
                        : theme.lightgrey,
                    marginRight: Spacing.ExtraSmall,
                    borderRadius: 100,
                    paddingHorizontal: Spacing.Small,
                  }}
                >
                  <Text
                    style={{
                      color:
                        selectedQuantity.value === quantity.value
                          ? "white"
                          : "black",
                      fontSize: Font.Small,
                    }}
                  >
                    {quantity.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
      <FontText style={{ marginBottom: 15 }}>{item.description}</FontText>
    </>
  );
};

export default function Tifin({ navigation }) {
  const [Tifin, setTifin] = useState([]);
  const [imageState, setImageState] = useState([]);
  const [responseData, setResponseData] = useState([])
  const [queryString, setQueryString] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onSearch= (changeEvent) =>{
    const value = changeEvent
    setQueryString(value)
    const result = responseData.filter((item)=> item.name.toLowerCase().includes(value.toLowerCase()))
    setTifin(result)
  }

  const handleQuantityChange = (index, value) => {
    const state = [...Tifin];
    state[index].initialQuantity = value;
    setTifin(state);
  };

  const fetchTifin = async () => {
    try {
      const response = await axios.get("/category/tifin");
      setTifin(response.data);
      setResponseData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async (id) => {
    console.warn(id);
    try {
      const response = await axios.get(`/category/image/tifin`);
      if (response.data) {
        setImageState(response.data.data);
      } else {
      }
    } catch (error) {}
  };

  const findImage = (id) => {
    let item1 = "";
    imageState.find((item) => {
      if (item.productId == id) {
        item1 = item.image;
      }
    });
    if (item1) {
      return item1;
    }
    return false;
  };

  useEffect(() => {
    fetchTifin();
    fetchImages();
  }, []);
  return (
    <ScrollView style={styles.screen}>
      <Modal
        visible={modalVisible}
        data={Tifin}
        setData={setTifin}
        setModalVisible={setModalVisible}
      ></Modal>
      <View
        style={{
          marginVertical: "5%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Search For Tifin"
          onChangeText={onSearch}
          value={queryString}
          style={{
            fontFamily: "MPlus",
            paddingHorizontal: Spacing.Large,
            backgroundColor: theme.lightgrey,
            width: "85%",
            borderRadius: 30,
            height: 40,
          }}
        />
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.backgroundColor,
          }}
        >
          <FontAwesome name="sort-amount-asc" size={15} color="white" />
        </TouchableOpacity>
      </View>
      {Tifin.map((item, itemIndex) => {
        const availableQuantity = item.availableQuantity.map((i, index) => {
          const newObj = new Object();
          newObj.value = i.value;
          newObj.label = i.label + " " + item.priceUnit;
          newObj.key = index;
          return newObj;
        });
        const dis = (item.price / 100) * item.discount;
        const discountedPrice = item.price - dis;
        return (
          <Item
            item={item}
            findImage={findImage}
            discountedPrice={discountedPrice}
            availableQuantity={availableQuantity}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: "5%",
  },
});
