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

export function useHistory( callback ) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([])
  const fetch = async ({ type, body: Payload }) => {
    setLoading(true);
    try {
      const body = {
        token: await getValueFor(),
        ...Payload
      };
      const response = await axios({
        url: type === 'fetch' ? '/order/get' : '/order/cancel' ,
        method: "POST",
        data: body,
      });
      setLoading(false);
      setState(response.data)
      if(callback) callback()

    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert(
        "Error",
        "Something Went Wrong.",
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
  return [fetch, state, loading];
}
