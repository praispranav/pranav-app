import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-native"
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

export function useQuery(apiUrl) {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(ERROR_INITIAL_STATE);

  const fetch = async (url, payload, callback) => {
    setLoading(true);
    try {
      const body = {
        token: await getValueFor(), ...payload
      };
      const response = await axios({
        url: url ? url : apiUrl,
        method: "post",
        data: body,
      });
      if (response.data) {
        // Alert.alert("Success", response.data.message)
        setState(response.data);
        console.log(response.data)
      } else {
        setState([]);
      }
      // console.log(response.data);
    } catch (error) {
      setState([]);
      console.log("Error", error)
      setError({ error: true, errorMessage: error });
      Alert.alert(
        "Error",
        error.response.data.message,
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
    } finally {
      setLoading(false);
      console.log(state);
      if (callback) {
        callback();
      }
    }
  };
  return [fetch, state, loading, error];
}
