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
import{ AuthContext } from '../../../context.js'
import AsyncStorage from '@react-native-async-storage/async-storage';


var domain = "https://wipap.herokuapp.com";

export default function UserDetails({navigation}){
const [isActive, setIsActive] = React.useState(false);
const [data, setData] = React.useState({
    firstname:"",
    lastname:"",
    email:"",
    phonenumber:""
});

const firstNameChange=(value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            firstname:value
        })
    }
}

const lastNameChange = (value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            lastname:value
        })
    }
}

const emailChange=(value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            email:value
        })
    }
}

const phonenumberChange = (value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            phonenumber:value
        })
    }
}
const handleSubmit=()=>{
    console.log(data)
    navigation.navigate('AccountDetails',{
        data:data
    });
}

    
        return(
                    <SafeAreaView style={styles.container}>
                            <View>
                                <Text style={[styles.text, {marginBottom:35, fontSize:22, fontWeight:"500"}]}>Enter User Account Details</Text>
                            </View>
                            <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="First Name"
                                placeholderTextColor="#003f5c"
                                onChangeText={(value=>firstNameChange(value))}
                            />
                            </View>
                            <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Last Name"
                                placeholderTextColor="#003f5c"
                                onChangeText={(value=>lastNameChange(value))}
                            />
                            </View>
                            <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                placeholderTextColor="#003f5c"
                                onChangeText={(value=>emailChange(value))}
                            />
                            </View>
                            <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Phone Number"
                                placeholderTextColor="#003f5c"
                                onChangeText={(value=>phonenumberChange(value))}
                            />
                            </View>

                            {!isActive?
                            <TouchableOpacity style={styles.loginBtn} onPress={() => handleSubmit()}>
                                <Text style={styles.loginText}>PROCEED</Text>
                            </TouchableOpacity> 
                            :
                            <TouchableOpacity style={styles.loginBtn}>
                                <ActivityIndicator size="small" color="#fff" />
                            </TouchableOpacity>
                            }

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