import React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,TextInput,
    SafeAreaView,
    ActivityIndicator
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
    const [isActive, setIsActive] = React.useState(false)

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

    const handleLogin=()=>{
        setIsActive(true)
        let token = null;
        let userData = null
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
            setIsActive(false)
        })
    }
        return(
                    <SafeAreaView style={styles.container}>
                            <Image source={require('../../assets/images/logo.png')} style={{height:150, width:150}}/>
                            <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(value=>textInputChange(value))}
                            />
                            </View>
                            <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                secureTextEntry={true}
                                placeholder="Password"
                                placeholderTextColor="#003f5c"
                                onChangeText={(value=>passowrdInputChange(value))}
                            />
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.forgot_button}>Forgot Password?</Text>
                            </TouchableOpacity>

                            {!isActive?
                            <TouchableOpacity style={styles.loginBtn} onPress={()=>handleLogin()}>
                                <Text style={styles.loginText}>LOGIN</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.loginBtn}>
                                <ActivityIndicator size="small" color="#fff" />
                            </TouchableOpacity>
                            }

                        <Text style={[styles.text, {fontSize:14, color:"#ABB4BD", textAlign:"center", marginTop:24}]}>
                            Don't have an account,? <Text style={styles.link}
                            onPress={() =>
                                    navigation.navigate('Register')
                                }
                            >Register Now!</Text>
                        </Text>
                </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
       },
     
       image :{
        marginBottom: 40
     
      },
      inputView: {
        backgroundColor: "rgb(144,238,144)",
        borderRadius: 30,
        width: "90%",
        height: 45,
        marginBottom: 20,
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
      forgot_button: {
        height: 30,
        marginBottom: 30,
      },
      loginBtn:{
        width:"90%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#009387",
    },
    link:{
        color:"red"
    },
    loginText:{
        color:"white"
    }
}) 