import React from 'react';
import {View, StyleSheet, Alert } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
    DrawerContentScrollView,
    DrawerItem
}from "@react-navigation/drawer";
import axios from 'axios';
import{ AuthContext } from '../context.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


var domain = "https://wipap.herokuapp.com";

 
export default function DrawerContent(props){

    const { dispatch, loginState } = React.useContext(AuthContext);
    const [data, setData] = React.useState([])

    React.useState(()=>{
        console.log("login",loginState)
        if(loginState.userData !== null){
            setData(loginState.userData)
        }
    },[])

    async function signOut(){
        dispatch({type:'LOADING'})
        let token=null;
        try{
           token = await AsyncStorage.getItem('userToken')
        }catch(e){
          console.log(e)
        }
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
          console.log(error.response.data);
          dispatch({type:'STOP_LOADING'})
      })
      }

      const alertSignOut = () =>{
        props.navigation.closeDrawer()
        Alert.alert(
        "Sign Out",
        "Are You Sure?",
        [
            {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: () => signOut() }
        ],
        { cancelable: false }
        );
    }


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:"row", marginTop:15}}>
                            <Avatar.Image 
                                source={require('../assets/images/Cilantro.jpg')}
                            />
                            <View style={{marginLeft:15,flexDirection:"column"}}>
                                <Title style={styles.title}>{data.name}</Title>
                                <Caption style={styles.caption}>{data.email}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={(color,size)=>(
                                <Icon name="home-outline"  color={color.color} size={25}/>
                            )}
                            label="Home"
                            onPress={()=>props.navigation.navigate('Home')}

                        />
                        <DrawerItem 
                            icon={(color,size)=>(
                                <Icon name="account-outline"  color={color.color} size={25}/>
                            )}
                            label="Profile"
                            onPress={()=>props.navigation.navigate('Profile')}
                        />
                        <DrawerItem 
                            icon={(color,size)=>(
                                <Icon name="trash-can-outline"  color={color.color} size={25}/>
                            )}
                            label="Manage Bins"
                            onPress={()=>props.navigation.navigate('ManageBins')}

                        />
                        <DrawerItem 
                            icon={(color,size)=>(
                                <Icon name="gift-outline"  color={color.color} size={25}/>
                            )}
                            label="Rewards"
                            onPress={()=>props.navigation.navigate('Rewards')}

                        />
                        <DrawerItem 
                            icon={(color,size)=>(
                                <Icon name="credit-card-outline"  color={color.color} size={25}/>
                            )}
                            label="Payment"
                            onPress={()=>props.navigation.navigate('UserDetails')}

                        />
                        <DrawerItem 
                            icon={(color,size)=>(
                                <Icon name="settings-outline"  color={color.color} size={25}/>
                            )}
                            label="Settings"
                            onPress={()=>props.navigation.navigate('Settings')}

                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color,size}) =>(
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={()=>alertSignOut()}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent:{
        flex:1
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title:{
        fontSize:16,
        marginTop:3,
        fontWeight:'bold'
    },
    caption:{
        fontSize:14,
        lineHeight:14
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center'
    },
    section:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:15,
    },
    paragraph:{
        fontWeight:'bold',
        marginRight:3
    },
    drawerSection:{
        marginTop:30
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:"#f4f4f4",
        borderTopWidth:1
    },
    preference:{
        flexDirection:'row',
        justifyContent:"space-around",
        paddingVertical:12,
        paddingHorizontal:16
    }
});