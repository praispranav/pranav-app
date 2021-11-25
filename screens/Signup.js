// import React from "react"
// import { View, Text, StyleSheet } from "react-native"
// import { Spacing } from "../constants/MarginPadding"
// import routes from "../config/routes.json"
// import Button from "../components/Button"
// import Input from "../components/TextInput"

// const theme = {
//     backgroundColor: "red"
// }

// export default function SignupScreen(props) {
//     return (
//         <View style={styles.screen}>
//             <View style={styles.navigationContainer}>
//                 <Button textStyle={{ color: "black" }} onClick={()=> navigation.navigate(routes.login)} text="Login"  />
//                 <Button containerStyle={{ backgroundColor: theme.backgroundColor, borderRadius: Spacing.ExtraLarge }} textStyle={{ color: "white" }} text="Signup" />
//             </View>
//             <View>
//                 <View style={{ marginTop: Spacing.ExtraLarge + 15 }}>
//                     <Input placeholder={"Enter Your Email Here"} />
//                 </View>

//                 <View style={{ marginTop: Spacing.Large }}>
//                     <Input placeholder={"Enter Your Password Here"} secureTextEntry={true} />
//                 </View>

//                 <View style={{ marginTop: Spacing.Large }}>
//                     <Input placeholder={"Enter Password Again"} secureTextEntry={true} />
//                 </View>

//             </View>

//             <View style={[styles.navigationContainer, { marginTop: Spacing.ExtraLarge + 15, height: 40 }]}>
//                 <Button containerStyle={{ backgroundColor: theme.backgroundColor, borderRadius: Spacing.ExtraLarge }} textStyle={{ color: "white" }} text="Register" />
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     screen: {
//         display: "flex",
//         flex: 1,
//         margin: Spacing.Normal,
//         borderRadius: 10,
//         elevation: 3,
//         backgroundColor: "white",
//         padding: Spacing.ExtraLarge + 15
//     },
//     navigationContainer: {
//         width: '100%',
//         height: 35,
//         borderRadius: Spacing.ExtraLarge + 15,
//         borderWidth: 1,
//         borderColor: 'rgb(220,220,220)',
//         display: "flex",
//         flexDirection: 'row',
//     }
// })

import React from "react"
import { View, StyleSheet , Dimensions , TouchableOpacity } from "react-native"
import { Spacing } from "../constants/MarginPadding"
import routes from "../config/routes.json"
import Button from "../components/Button"
import Input from "../components/TextInput"
import Text from "../elements/Text"
import theme from "../config/theme"

// const theme = {
//     backgroundColor: "red",
//     grey: 'rgb(170,170,170)'
// }

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default function LoginScreen(props) {
    return (
        <View style={{ display: "flex", flex: 1 }}>

            <View style={{ width: width + 110, height: width+ 110, borderRadius: 5000, position: "absolute", top: -200, left: -100 , backgroundColor: theme.backgroundColor }}></View>
            <View style={{ width: width + 110, height: width+ 110, borderRadius: 5000, position: "absolute", bottom: -300, right: -200 , backgroundColor: theme.backgroundColor }}></View>

            <View style={styles.screen}>
                <View style={styles.navigationContainer}>
                    <Button textStyle={{ color: "black" }} onPress={()=> {
                        console.warn("CLicked")
                        props.navigation.navigate(routes.login)}} text="Login" />
                    <Button containerStyle={{ backgroundColor: theme.backgroundColor, borderRadius: Spacing.ExtraLarge }} textStyle={{ color: "white" }} text="Signup" />
                </View>
                <View style={{ marginVertical: Spacing.ExtraLarge }}>
                    <View style={{ marginTop: Spacing.ExtraLarge + 15 }}>
                        <Input placeholder={"Enter Your Email Here"} />
                    </View>

                    <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
                        <Input placeholder={"Enter Your Mobile Here"}  />
                    </View>

                    <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
                        <Input placeholder={"Enter Your Password Here"} secureTextEntry={true} />
                    </View>
                    <View style={{ marginTop: Spacing.ExtraLarge + 5 }}>
                        <Input placeholder={"Enter Your Password Here"} secureTextEntry={true} />
                    </View>
                </View>

                <View style={{ display: "flex", justifyContent: 'space-between', flex: 1 }}>

                    <View style={[styles.navigationContainer, { marginTop: Spacing.ExtraLarge + 15, height: 55, borderRadius: 400, overflow: "hidden"}]}>
                        <Button containerStyle={{ backgroundColor: theme.backgroundColor, borderRadius: Spacing.ExtraLarge }} textStyle={{ color: "white" }} text="Signup" />
                    </View>

                    <Text style={{ textAlign: "center", color: theme.grey }}>OR</Text>

                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: theme.grey, borderRadius: 15, width: 60, height: 60, marginHorizontal: Spacing.Small }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: theme.grey, borderRadius: 15, width: 60, height: 60, marginHorizontal: Spacing.Small }}></TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: theme.grey, borderRadius: 15, width: 60, height: 60, marginHorizontal: Spacing.Small }}></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        display: "flex",
        flex: 1,
        margin: Spacing.Normal,
        marginHorizontal: 30,
        marginTop: 125,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: "white",
        padding: Spacing.ExtraLarge + 20,
        marginBottom: 65
    },
    navigationContainer: {
        width: '100%',
        height: 40,
        borderRadius: Spacing.ExtraLarge + 15,
        borderWidth: 1,
        borderColor: 'rgb(220,220,220)',
        display: "flex",
        flexDirection: 'row',
    }
})