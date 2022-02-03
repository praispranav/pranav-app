import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const ERROR_INITIAL_STATE = { error: false, errorMessage: "" };

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

export function useAddCart() {


  const [loading, setLoading] = useState(false);
  const fetch = async (productId, quantity) => {
    console.warn("Quantity", quantity);
    if (Number(quantity) > 0) {
      setLoading(true);
      try {
        const body = {
          token: await getValueFor(),
          productId: productId,
          selectedQuantity: quantity,
        };
        const response = await axios({
          url: "/order/cart/add",
          method: "POST",
          data: body,
        });
        setLoading(false);

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

        // console.log(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        Alert.alert(
          "Error",
          "Something Went Wrong While Adding Product.",
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
    } else {
      Alert.alert(
        "Error",
        "Please Select Quantity.",
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
  return [fetch, loading];
}
