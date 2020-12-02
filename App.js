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

const Drawer = createDrawerNavigator();

var domain = "https://wipap.herokuapp.com";



const initialLoginState = {
  isLoading: true,
  userToken: null,
  userData: null
};

const loginReducer = (prevState, action) =>{
  console.log("my_action",action)
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
      
      console.log("userToken : ",userToken)
    };

    bootstrapAsync();

  },[]);

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

  /* const authContext = React.useMemo(() => ({
    signIn: async(email, password) => {
      axios.post(`${domain}/api/auth/login`,{
        email:email,
        password:password,
        lat:'25',
        long:'24'
    })
    .then(async(res)=>{
        console.log(res.data);
        let token = res.data.access_token
        let userData = null;
        try{
            await AsyncStorage.setItem('userToken', token);
        } catch(e){
          console.log(e)
        }

        axios.get(`${domain}/api/auth/user`,
        {headers:{'Authorization':`Bearer ${token}`}})
        .then(res=>{
          console.log(res.data);
          userData = res.data
        })
        .catch(async(error)=>{
          console.log(error.response.data);
          if(error.response.data.message === "Unauthenticated."){
            try{
              AsyncStorage.removeItem('userToken')
            }catch(e){
              console.log(e)
            }
          }
        })
      
        dispatch({type:'LOGIN', token:token, data:userData})
    })
    .catch(error=>{
        console.log(error)
    })
    },
    signOut: async() => {
      let token=null;
      try{
         token = await AsyncStorage.getItem('userToken')
      }catch(e){
        console.log(e)
      }
      console.log(token)
      axios.post(`${domain}/api/auth/logout`,null,
      {headers:{'Authorization':`Bearer ${token}`}})
    .then(async(res)=>{
        console.log(res.data)
        try{
          await AsyncStorage.removeItem('userToken')
        }
        catch(e){
          console.log(e)
        }
        dispatch({type:'LOGOUT'})
    })
    .catch(error=>{
        console.log(error)
    })
    },
    signUpPersonal: (name, email, phone, location, password, title) => {
        axios.post(`${domain}/api/auth/register`,
        {
            name:name,
            email:email,
            location:location,
            phone:phone,
            password:password,
            title:title
        })
        .then(res=>{
            console.log(res.data);
           Alert.alert('Success!',"Registration Successful");
            dispatch({type:'REGISTER_PERSONAL'});
        })
        .catch(error=>{
            console.log(error);
        })
    },
    signUpOrganization: () => {
      setIsLoading(false)
    },
  }),[]); */


  if(loginState.isLoading){
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:'transparent'}}>
        <ActivityIndicator size="large" />
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
          <Drawer.Screen name="Profile" component={Profile}/>
          <Drawer.Screen name="ManageBins" component={ManageBins}/>
          <Drawer.Screen name="Rewards" component={Rewards}/>
          <Drawer.Screen name="Settings" component={Settings}/>
        </Drawer.Navigator>
        ) 
        :
          <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
