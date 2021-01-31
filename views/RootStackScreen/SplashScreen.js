import React,{useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    SafeAreaView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Animatable from "react-native-animatable"

const clear = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
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
  

export default function SplashScreen({navigation}){

    useEffect(()=>{
        getScreen();
       /*  clearStorage() */
    },[])

    const getScreen= async ()=>{
        const firstLaunch = await getData();
        if(getData === undefined){
            setTimeout(()=>{
                navigation.replace("onboarding")
            },1500
        )
        }else{
            setTimeout(()=>{
                navigation.replace("Login")
            },1500
        )
        }
        
    }

    const clearStorage= async ()=>{
        await clear();
    }

    

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                    animation="bounceIn"

                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Powered By Orion Innovations</Text>
            </View>
        </SafeAreaView>
    )
}

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffff"
    },
    header:{
        flex:2,
        justifyContent:"center",
        alignItems:"center"
    },  
    logo:{
        width:height_logo,
        height:height_logo
    },
    footer:{
        justifyContent: 'flex-end',
        marginBottom: 50,
        alignItems:"center",
        justifyContent:"center",
    },
    footerText:{
        fontWeight:'bold'
    }
})