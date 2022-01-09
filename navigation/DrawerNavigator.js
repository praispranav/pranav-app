import * as React from "react";
import { Button, View, TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "../screens/Login";
import SighUpScreen from "../screens/Signup";
import HomeScreen from "../screens/HomeScreen";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FruitAndVegetables from "./FruitsAndVegetables";
import theme from "../config/theme";
import NewsPaperScreen from "../screens/NewsPaper";
import DairyProducts from "../screens/DairyProducts";
import CartScreen from "../screens/CartScreen";
import OrderHistory from "./OrderHistory";
import * as SecureStore from "expo-secure-store";
import Tifin from "../screens/TifinScreen";
import Flowers from "../screens/FlowersScreen";
import AccountScreen from "../screens/AccountScreen";
import Loading from "../components/Loading";
import Stationary from "../screens/Stationary";
import Groceries from "../screens/Groceries";

const removeTOken = async (setTokenRemoved) => {
  await SecureStore.deleteItemAsync("token");
  setTokenRemoved(true);
  // navigation.navigate('LoginScreen')
};

const LogOutScreen = ({ navigation }) => {
  const [tokenRemoved, setTokenRemoved] = React.useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(true)

  React.useEffect(() => {
    const listner = navigation.addListener("focus", () =>
      removeTOken(setTokenRemoved)
    );
    return () => listner;
  }, [navigation]);
  
  // React.useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       if (hasUnsavedChanges) {
  //         // If we don't have unsaved changes, then we don't need to do anything
  //         return;
  //       }
  //       
  //     }),
  //   [navigation, hasUnsavedChanges]
  // );
  if (!tokenRemoved) return <Loading />;
  
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Text>You Are Successfully LoggedOut</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen") }
        style={{
          backgroundColor: theme.backgroundColorlight,
          borderRadius: 200,
          paddingHorizontal: 10,
          paddingVertical: 4,
           marginTop: 10
        }}
      >
        <Text style={{ color: 'white'}}>Go To Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// const theme = {
//   backgroundColor: "red",
//   border: "red",
//   grey: "rgb(170,170,170)",
//   lightgrey: "rgb(245,245,245)",
//   backgroundColorlight: "#ef9a9a",
// };

const Drawer = createDrawerNavigator();

export default function App({ navigation, route }) {
  // const [tokenLoaded, setTokenLoaded] = React.useState(true);
  // const [token, setToken] = React.useState("");

  // const check = async () => {
  //   try {
  //     const r = await getValueFor();
  //     setToken(r);
  //     setTokenLoaded(false);
  //   } catch (err) {
  //     setTokenLoaded(false);
  //   } finally {
  //     console.log(token);
  //   }
  // };
  const handleAuth = (navigation) => {
    navigation.navigate("Account");
  };
  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", async () => {
  //     try {
  //       check()
  //     } catch (error) {}
  //   });
  //   return unsubscribe;
  // }, [navigation, route]);

  const ShoppingCartButton = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("CartScreen")}
      style={{
        width: 35,
        height: 35,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.backgroundColorlight,
        marginRight: 15,
        marginTop: 5,
      }}
    >
      <AntDesign name="shoppingcart" size={15} color="white" />
    </TouchableOpacity>
  );

  const UserButton = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => handleAuth(navigation)}
      style={{
        width: 35,
        height: 35,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.backgroundColorlight,
        marginRight: 15,
        marginTop: 5,
      }}
    >
      <AntDesign name="user" size={15} color="white" />
    </TouchableOpacity>
  );

  const DrawerButton = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{
        width: 35,
        height: 35,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.backgroundColorlight,
        marginLeft: 15,
        marginTop: 5,
      }}
    >
      <AntDesign name="bars" size={15} color="white" />
    </TouchableOpacity>
  );

  const HistoryButton = ({ navigation }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("History")}
      style={{
        width: 35,
        height: 35,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.backgroundColorlight,
        marginLeft: 15,
        marginTop: 5,
      }}
    >
      <FontAwesome5 name="history" size={15} color="white" />
    </TouchableOpacity>
  );

  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Varad Foods",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <ShoppingCartButton navigation={navigation} />
                <UserButton navigation={navigation} />
              </View>
            ),
            headerLeft: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <DrawerButton navigation={navigation} />
                <HistoryButton navigation={navigation} />
              </View>
            ),
            headerShadowVisible: false,
          };
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Fruits & Vegetables",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Fruits & Vegetables`}
        component={FruitAndVegetables}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Foods",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Tifin`}
        component={Tifin}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Flowers",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Flowers`}
        component={Flowers}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "News Paper",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Newspaper`}
        component={NewsPaperScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Cart",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => (
              <>
                <DrawerButton navigation={navigation} />
              </>
            ),
            headerShadowVisible: false,
          };
        }}
        name={`CartScreen`}
        component={CartScreen}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Dairy Products",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Dairy Products`}
        component={DairyProducts}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Groceries",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Groceries`}
        component={Groceries}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Stationary",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => <UserButton navigation={navigation} />,
            headerLeft: () => <DrawerButton navigation={navigation} />,
            headerShadowVisible: false,
          };
        }}
        name={`Stationary`}
        component={Stationary}
      />
      <Drawer.Screen
        options={({ navigation }) => {
          return {
            title: "Order History",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
            headerRight: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <ShoppingCartButton navigation={navigation} />
                <UserButton navigation={navigation} />
              </View>
            ),
            headerLeft: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <DrawerButton navigation={navigation} />
              </View>
            ),
            headerShadowVisible: false,
          };
        }}
        name="History"
        component={OrderHistory}
      />
      {false ? (
        <>
          {/* <Drawer.Screen
            options={{ headerShown: false }}
            name="SignUpScreen"
            component={SighUpScreen}
          />
          <Drawer.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          /> */}
        </>
      ) : (
        <>
          <Drawer.Screen
            options={({ navigation }) => {
              return {
                title: "My Account",
                headerTitleAlign: "center",
                headerTitleStyle: { fontFamily: "PT_SansBold", marginTop: 5 },
                headerRight: () => (
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <ShoppingCartButton navigation={navigation} />
                  </View>
                ),
                headerLeft: () => (
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <DrawerButton navigation={navigation} />
                    <HistoryButton navigation={navigation} />
                  </View>
                ),
                headerShadowVisible: false,
              };
            }}
            name="Account"
            component={AccountScreen}
          />
          <Drawer.Screen
            options={({ navigation }) => {
              return {
                title: "Logout",
                headerShadowVisible: false,
                headerShown: false,
              };
            }}
            name="Logout"
            component={LogOutScreen}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}


