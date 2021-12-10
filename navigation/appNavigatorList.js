import DrawerNavigator from "./DrawerNavigator"
import SubscriptionDetails from "../screens/SubscriptionFullView"
import LoginScreen from "../screens/Login"
import OrderFailed from "../screens/OrderFailed"
import OrderSuccessful from "../screens/OrderSuccessfull"
import SignUpScreen from "../screens/Signup";
import PaymentPage from "../screens/PaymentPage";
import ForgetPasswordScreen from "../screens/ForgetPassword"

export const AppNavigatorList = [
    {
        name: "LoginScreen",
        component: LoginScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: "SignUpScreen",
        component: SignUpScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: "ForgetPassword",
        component: ForgetPasswordScreen,
        options: {
            headerShown: false
        }
    },
    {
        name: "PaymentPage",
        component: PaymentPage,
        options: {
            headerShown: true,
            title: "Payment"
        }
    },
    {
        name: "Drawer",
        component: DrawerNavigator,
        options: {
            headerShown: false,
        }
    },
    {
        name: "Subscription Detail",
        component: SubscriptionDetails,
        options: {
            headerShown: true,
            title: "Subscription Detail"
        }
    },
    {
        name: "OrderSuccess",
        component: OrderSuccessful,
        options: {
            headerShown: true,
            title: "Subscription Detail"
        }
    },
    {
        name: "OrderFailed",
        component: OrderFailed,
        options: {
            headerShown: true,
            title: "Subscription Detail"
        }
    },
]