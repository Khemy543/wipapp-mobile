import React,{useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage
} from 'react-native'

import * as Animatable from "react-native-animatable"


export default function SplashScreen({navigation}){

    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace("Login")
        },1500
    )
    },[])

    return(
        <View style={styles.container}>
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
        </View>
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