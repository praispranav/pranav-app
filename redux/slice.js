import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as SecureStore from "expo-secure-store";

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

const initialState = {
  token: '',
  isUserAuthorised: false
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToken: (state, action) =>{
      state.token = action.payload
    },
    authoriseUser: ( state, action)=>{
      state.isUserAuthorised = action.payload
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { addToken,authoriseUser  } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
