import React from  'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './RootStackScreen/LoginScreen';
import Register from './RootStackScreen/RegistrationScreen';
import SplashScreen from './RootStackScreen/SplashScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ()=>(
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="Login" component={Login}/>
        <RootStack.Screen name="Register" component={Register}/>
    </RootStack.Navigator>
);

export default RootStackScreen;