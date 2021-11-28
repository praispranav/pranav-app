import DrawerNavigator from "./DrawerNavigator"
import SubscriptionDetails from "../screens/SubscriptionFullView"

export const AppNavigatorList = [
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
]