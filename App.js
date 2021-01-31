import React from 'react';
import { StyleSheet, Text, View ,Image, ActivityIndicator, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './views/DashboardScreens/MainTabScreen';
import DrawerContent from './views/DrawerContent';
import Profile from './views/DashboardScreens/Profile/ProfileScreen';
import RootStackScreen from './views/RootStackScreens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './context.js'
import axios from 'axios'
import ManageBins from './views/DashboardScreens/ManageBins/ManageBins';
import Rewards from './views/DashboardScreens/Rewards/Rewards';
import Settings from './views/DashboardScreens/Settings/Settings';
import MainPaymentStack from './views/DashboardScreens/Payment/PaymentStack';
import Maps from './views/DashboardScreens/Maps/Maps';

const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

var domain = "https://wipap.herokuapp.com";



const initialLoginState = {
  isLoading: true,
  userToken: null,
  userData: null
};

const loginReducer = (prevState, action) =>{
  switch( action.type ){
    case 'LOADING':
      return {
        ...prevState,
        isLoading:true,
      };
      case 'STOP_LOADING':
      return {
        ...prevState,
        isLoading:false,
      };
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userToken:action.token,
        isLoading:false,
        userData: action.data
      };
    case 'LOGIN':
      return {
        ...prevState,
        userToken:action.token,
        isLoading:false,
        userData:action.data
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userToken:null,
        isLoading:false,
        userData:{}
      };
    case 'REGISTER_PERSONAL':
      return {
        ...prevState,
        isLoading:false,
        userData:{}
      };
    case 'REGISTER_ORGANIZATION':
      return {
        ...prevState,
        isLoading:false
      };
    default:
      return prevState;
  }
}

export default function App(props) {

  React.useEffect(() =>{
    console.log("......")
    const bootstrapAsync = async () =>{
      let userToken = null;
      let userData =null
      try{
        userToken = await AsyncStorage.getItem('userToken');
      }catch(e){
        console.log(e)
      }

      axios.get(`${domain}/api/auth/user`,
      {headers:{'Authorization':`Bearer ${userToken}`}})
      .then(res=>{
        console.log(res.data);
        userData = res.data;
        dispatch({type:'RETRIEVE_TOKEN', token: userToken, data:userData})
      })
      .catch(async(error)=>{
        console.log(error.response.data);
        if(error.response.data.message === "Unauthenticated."){
          try{
            AsyncStorage.removeItem('userToken')
            userToken = null;
            dispatch({type:'RETRIEVE_TOKEN', token: userToken, data:userData})
          }catch(e){
            console.log(e)
          }
        }
      })
    };

    bootstrapAsync();

  },[]);

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)


  if(loginState.isLoading){
    return(
      <View style={styles.container}>
        <ActivityIndicator size="small" color="black" />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={{
      loginState,
      dispatch
      }}>
      <NavigationContainer>
        {loginState.userToken !== null?
        (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen}/>
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="ManageBins" component={ManageBins}/>
          <Drawer.Screen name="Rewards" component={Rewards}/>
          <Drawer.Screen name="Settings" component={Settings}/>
          <Drawer.Screen name="UserDetails" component={MainPaymentStack}/>
        </Drawer.Navigator>
        ) 
        :
          <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});