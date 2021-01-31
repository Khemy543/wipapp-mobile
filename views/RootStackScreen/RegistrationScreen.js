import * as React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput,ActivityIndicator, Alert, SafeAreaView
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

    const handlePersonalSubmit=(data)=>{
        if(data.password === data.confirmPassword){
                axios.post(`${domain}/api/auth/register`,
                {
                    name:data.name,
                    email:data.email,
                    location:data.location,
                    phone:data.phone,
                    password:data.password,
                    title:data.title
                })
                .then(res=>{
                    console.log(res.data);
                   Alert.alert('Success!',"Registration Successful");
                    dispatch({type:'REGISTER_PERSONAL'});
                    navigation.navigate('Login')
                })
                .catch(error=>{
                    console.log(error.response.data);
                })
            }
            else{
            Alert.alert("Error!","Passwords Do Not Match!!")
            }
    }


  return (
    <SafeAreaView style={styles.container}>
            <View>
                <Text style={[styles.text, {marginBottom:35, fontSize:22, fontWeight:"500"}]}>Personal Account</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Full Name"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>nameChange(value))}
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
                placeholder="Phone"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>phoneChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Title"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>titleChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>passwordChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>confirmPasswordChange(value))}
            />
            </View>
            
            <TouchableOpacity style={styles.loginBtn} onPress={()=>handlePersonalSubmit(data)}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>

            <Text style={[styles.text, {fontSize:14, color:"#ABB4BD", textAlign:"center", marginTop:24}]}>
                Already Have an Account? <Text style={styles.text, styles.link}
                onPress={() =>
                    navigation.navigate('Login')
                }>Login!</Text></Text>
    </SafeAreaView>
  );
}

function Organization() {
  return (
    <SafeAreaView style={styles.container}>
            <View>
                <Text style={[styles.text, {marginBottom:35, fontSize:22, fontWeight:"500"}]}>Organization Account</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Full Name"
                placeholderTextColor="#003f5c"
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Phone"
                placeholderTextColor="#003f5c"
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Title"
                placeholderTextColor="#003f5c"
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
            />
            </View>
            
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={[styles.text, {fontSize:14, color:"#ABB4BD", textAlign:"center", marginTop:24}]}>
                Already Have an Account? <Text style={styles.text, styles.link}
                onPress={() =>
                    navigation.navigate('Login')
                }>Login!</Text></Text>
    </SafeAreaView>
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