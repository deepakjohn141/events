import { NavigationContainer } from "@react-navigation/native"
import Login from "../login/Login"

import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignUp from "../signUp/SignUp"


const Stack = createNativeStackNavigator()

export default AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Login'
            >
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name='SignUp'
                    component={SignUp}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}