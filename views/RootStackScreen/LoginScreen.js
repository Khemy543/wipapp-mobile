import React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,TextInput
} from "react-native";

import axios from 'axios';
import{ AuthContext } from '../../context.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


var domain = "https://wipap.herokuapp.com";

export default function Login({navigation}){


    const [data, setData] = React.useState({
        email:"",
        password:""
    });

    const { dispatch } = React.useContext(AuthContext);

    const textInputChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                email:value
            })
        }
    }

    const passowrdInputChange = (value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                password:value
            })
        }
    }

    const hanldeLogin=()=>{
        let token = null;
        let userData = null
        dispatch({type:'LOADING'})
        axios.post(`${domain}/api/auth/login`,{
            email:data.email,
            password:data.password,
            lat:'25',
            long:'24'
        })
        .then(async(res)=>{
            console.log(res.data);
             token = res.data.access_token
             userData = null;
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
              dispatch({type:'LOGIN', token:token, data:userData})
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
        })
        .catch(error=>{
            Alert.alert('Inncorrect Credentials', 'Email or passowrd is not correct')
            dispatch({type:'STOP_LOADING'})
        })
    }
        return(
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{marginTop:130, alignItems:"center", justifyContent:"center"}}>
                            <Image source={require('../../assets/images/logo.png')} style={{height:150, width:150}}/>
                            <Text style={[styles.text, {marginTop:5, marginBottom:20, fontSize:22, fontWeight:"500"}]}>Welcome</Text>
                        </View>
                        <View>
                            <Text style={styles.inputTitle}>Email</Text>
                            <TextInput
                                secureTextEntry={false}
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={(value) => textInputChange(value)}
                            />
                            <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                            </View>
                        </View>
                        <View style={styles.margin}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.input}
                                onChangeText={(value=>passowrdInputChange(value))}
                            />
                            <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                            </View>
                        </View>
                        <Text style={[styles.text, styles.link,{textAlign:"right", marginTop:15}]}>Forgot Password?</Text>
                        
                        <TouchableOpacity style={styles.submitContainer}  onPress={()=>{hanldeLogin(data.email, data.password)}}>
                            <Text style={[styles.text, {color:"#fff", fontWeight:"600", fontSize:16}]}>Login</Text>
                        </TouchableOpacity>

                        <Text style={[styles.text, {fontSize:14, color:"#ABB4BD", textAlign:"center", marginTop:24}]}>
                            Don't have an account,? <Text style={styles.text, styles.link}
                            onPress={() =>
                                    navigation.navigate('Register')
                                }
                            >Register Now!</Text>
                        </Text>
                    </View>
                </ScrollView>
        );
    }

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#ffff',
        paddingHorizontal:30
    },
    text:{
        fontFamily:"Avenir Next",
        color:"#1D2029"
    },
    link:{
        color:"#FF1654",
        fontSize:14,
        fontWeight:"500"
    },
    submitContainer:{
        backgroundColor:"#009387",
        fontSize:14,
        borderRadius:4,
        paddingVertical:12,
        marginTop:32,
        alignItems:"center",
        justifyContent:"center",
        shadowColor:"rgba(255, 22, 84, 0.24)",
        shadowOffset:{width:0, height:9},
        shadowOpacity:1,
        shadowRadius:20
    },
    inputTitle:{
        color:"#ABB4BD",
        fontSize:14
    },
    input:{
        paddingVertical:12,
        color:"#1D2029",
        fontSize:14,
        fontFamily:"Avenir Next"
    },
    margin:{
        marginTop:20
    }
}) 