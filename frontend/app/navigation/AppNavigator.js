import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Admin from '../screens/Admin';
import AddDustbin from '../screens/AddDustbin';
import Driver from '../screens/Driver';

const Stack = createNativeStackNavigator();


export function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
            <Stack.Screen name="AddDustbin" component={AddDustbin} options={{ headerShown: false }} />
            <Stack.Screen name="Driver" component={Driver} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
