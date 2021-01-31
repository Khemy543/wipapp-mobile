import React from  'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './RootStackScreen/LoginScreen';
import Register from './RootStackScreen/RegistrationScreen';
import SplashScreen from './RootStackScreen/SplashScreen';
import OnboardingScreen from './RootStackScreen/OnBoardingScreens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootStack = createStackNavigator();


const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
          return value
      }
    } catch(e) {
      console.log(e)
    }
  }
  

const RootStackScreen = ()=>{
    const [isFirstLanch, setIsFirstLaunch] = React.useState(undefined);

    React.useEffect(()=>{
      fetcData();
    },[])

    const fetcData = async () =>{
      const firstLaunch = await getData();
      console.log("me ", firstLaunch);
      if(firstLaunch === undefined){
        await storeData('true');
        setIsFirstLaunch(true);
      }
      else{
        setIsFirstLaunch(false)
      }
    }

    if(isFirstLanch === undefined){
      return null;
    }
    else if(isFirstLanch === true){
      return(
        <RootStack.Navigator headerMode='none'>
              <RootStack.Screen name="onboarding" component={OnboardingScreen}/>
              <RootStack.Screen name="SplashScreen" component={SplashScreen} />
              <RootStack.Screen name="Login" component={Login}/>
              <RootStack.Screen name="Register" component={Register}/>
        </RootStack.Navigator>
      )
    }else{
      return(
        <RootStack.Navigator headerMode='none'>
              <RootStack.Screen name="SplashScreen" component={SplashScreen} />
              <RootStack.Screen name="Login" component={Login}/>
              <RootStack.Screen name="Register" component={Register}/>
        </RootStack.Navigator>
      )
    }
}

export default RootStackScreen;