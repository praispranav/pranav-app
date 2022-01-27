import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { Alert } from 'react-native';

export const API_URL = "https://hris-backend-api.azurewebsites.net/payment"
// export const API_URL = "http://192.168.1.70:3000/payment"

export async function fetchPublishableKey(
  paymentMethod
){
  try {
    const response = await fetch(
      `${API_URL}/stripe-key?paymentMethod=${paymentMethod}`
    );

    const { publishableKey } = await response.json();

    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}


export const colors = {
    blurple: '#635BFF',
    blurple_dark: '#5851DF',
    white: '#FFFFFF',
    light_gray: '#F6F9FC',
    dark_gray: '#425466',
    slate: '#0A2540',
  };
  

const PaymentScreen = ({ paymentMethod, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const publishableKey = await fetchPublishableKey(paymentMethod);
      if (publishableKey) {
        console.warn("Key", publishableKey)
        try{
          await initStripe({
            publishableKey,
            merchantIdentifier: 'merchant.com.stripe.react.native',
            urlScheme: 'stripe-example',
            setUrlSchemeOnAndroid: true,
          });
        } catch(error){
          Alert.alert("Error","Something Went Wrong")
          console.log("Stripe Error",error)
        }
        setLoading(false);
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color={"blue"} style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      style={styles.container}
      keyboardShouldPersistTaps="handled">
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    minHeight: 100,
  },
});

export default PaymentScreen;
