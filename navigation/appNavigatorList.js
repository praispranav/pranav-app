import HomeScreen from '../screens/HomeScreen'
import DrawerNavigator from "./DrawerNavigator"

export const AppNavigatorList = [
    {
        name: "Drawer",
        component: DrawerNavigator,
        options: {
            headerShown: false,
        }
    },
    {
        name: "Home",
        component: HomeScreen,
    },
]