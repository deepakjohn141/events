import { Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllEvents from "../allEvents/AllEvents"
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAccount from "../userAccount/UserAccount"

const Tab = createBottomTabNavigator()

const Stack = createNativeStackNavigator()
export default HomeStack = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='All Events'
                screenOptions={({ route }) => ({
                    tabBarActiveBackgroundColor: 'darkorange',
                    tabBarInactiveBackgroundColor: 'orange',
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'white',
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'All Events') {
                            iconName = 'list-ul'
                        } else if (route.name === 'Favourites') {
                            iconName = 'heart'
                        } else if (route.name === 'My Events') {
                            iconName = 'address-card'
                        } else if (route.name === 'Account') {
                            iconName = 'user'
                        } else {
                            iconName = 'file-o';
                        }
                        return <Icon name={iconName} size={24} color={color} />;
                    }
                })}>
                <Tab.Screen
                    name="All Events"
                    component={AllEvents}
                />

                <Tab.Screen
                    name="My Events"
                    component={AllEvents}
                />

                <Tab.Screen
                    name="Favourites"
                    component={AllEvents}
                />

                <Tab.Screen
                    name="Account"
                    component={UserAccount}
                />





            </Tab.Navigator>
        </NavigationContainer>

    )
}