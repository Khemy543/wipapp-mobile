import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,ActivityIndicator, Picker, Alert
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InputTextField from '../../components/InputTextField';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import{ AuthContext } from '../../context.js'


var domain = "https://wipap.herokuapp.com";

function Personal({navigation}) {


    const [data, setData] = React.useState({
        name:"",
        location:"Tema",
        phone:"",
        confirmPassword:"",
        email:"",
        password:"",
        title:"Mr"
    });

    const { dispatch } = React.useContext(AuthContext)

    const nameChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                name:value
            })
        }
    }

    const locationChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                location:value
            })
        }
    }

    const phoneChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                phone:value
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

    const passwordChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                password:value
            })
        }
    }

    const confirmPasswordChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                confirmPassword:value
            })
        }
    }

    const titleChange=(value)=>{
        if(value.length !== 0){
            setData({
                ...data,
                title:value
            })
        }
    }

    const handlePersonalSubmit=(name, email, phone, location ,password, confirmPassword, title)=>{
        if(password === confirmPassword){
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
                    navigation.navigate('Login')
                })
                .catch(error=>{
                    console.log(error);
                })
            }
            else{
            Alert.alert("Error!","Passwords Do Not Match!!")
            }
    }


  return (
    <ScrollView style={styles.container}>
        <View>
            <View style={{marginTop:90, marginBottom:50, alignItems:"center", justifyContent:"center"}}>
                <Text style={[styles.text, {marginTop:10, fontSize:22, fontWeight:"500"}]}>Personal Account</Text>
            </View>
            <View>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    onChangeText={(value)=>nameChange(value)}
                />
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>

            <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(value)=>emailChange(value)}
                />
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>

            <View>
                <Text style={styles.inputTitle}>Phone</Text>
                <View>
                <TextInput
                    placeholder="Phone"
                    style={styles.input}
                    onChangeText={(value)=>phoneChange(value)}
                />
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>

            <View>
                <Text style={styles.inputTitle}>Title</Text>
                <TextInput
                    placeholder="Title"
                    style={styles.input}
                    onChangeText={(value)=>titleChange(value)}
                />
                </View>
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>

            <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(value)=>passwordChange(value)}
                />
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>

            <View>
                <Text style={styles.inputTitle}>Confirm Password</Text>
                <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(value)=>confirmPasswordChange(value)}
                />
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>
            
            <TouchableOpacity style={styles.submitContainer} onPress={()=>handlePersonalSubmit(data.name, data.email, data.phone, data.location, data.password, data.confirmPassword,data.title)}>
                <Text style={[styles.text, {color:"#fff", fontWeight:"600", fontSize:16}]}>Register</Text>
            </TouchableOpacity>

            <Text style={[styles.text, {fontSize:14, color:"#ABB4BD", textAlign:"center", marginTop:24}]}>
                Already Have an Account? <Text style={styles.text, styles.link}
                onPress={() =>
                    navigation.navigate('Login')
                }>Login!</Text></Text>
        </View>
    </ScrollView>
  );
}

function Organization() {
  return (
    <ScrollView style={styles.container}>
        <View>
            <View style={{marginTop:90, marginBottom:50, alignItems:"center", justifyContent:"center"}}>
                <Text style={[styles.text, {marginTop:10, fontSize:22, fontWeight:"500"}]}>Organization Account</Text>
            </View>

            <InputTextField title="Organization Name"></InputTextField>
            <InputTextField title="Organization Email"></InputTextField>
            <InputTextField title="Organization Phone"></InputTextField>
            <InputTextField title="Organization Location"></InputTextField>

            <InputTextField 
                title="Password"
                style={{marginTop:32, marginBottom:8}}
                isSecure = {true}
            ></InputTextField>
            <InputTextField 
                title="Confirm Password"
                style={{marginTop:32, marginBottom:8}}
                isSecure = {true}
            ></InputTextField>
            
            <TouchableOpacity style={styles.submitContainer}>
                <Text style={[styles.text, {color:"#fff", fontWeight:"600", fontSize:16}]}>Register</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

export default function Register() {
    const [isLoading, setIsLoading] = React.useState(false)
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Personal Account') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Organization Account') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Personal Account" component={Personal} />
        <Tab.Screen name="Organization Account" component={Organization}/>
      </Tab.Navigator>
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
    }
}) 