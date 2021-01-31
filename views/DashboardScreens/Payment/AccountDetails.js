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
import InputTextField from '../../../components/InputTextField';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import{ AuthContext } from '../../../context.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('userToken');
    if(value !== null) {
        return value
    }
  } catch(e) {
    console.log(e)
  }
}

var domain = "https://wipap.herokuapp.com";

function CreditCard({route,navigation}) {
  const [data, setData] = React.useState({
    accountNumber:"",
    cvv:"",
    amount:"",
    mm:"",
    yy:"",
    billingaddress:"",
    billingcity:"",
    billingstate:""
});

const accountNumberChange=(value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            accountNumber:value
        })
    }
}
const cvvChange=(value)=>{
  if(value.length !== 0){
      setData({
          ...data,
          cvv:value
      })
  }
}
const addressChange=(value)=>{
  if(value.length !== 0){
      setData({
          ...data,
          billingaddress:value
      })
  }
}

const stateChange=(value)=>{
  if(value.length !== 0){
      setData({
          ...data,
          billingstate:value
      })
  }
}

const cityChange=(value)=>{
  if(value.length !== 0){
      setData({
          ...data,
          billingcity:value
      })
  }
}
const expiryChange=(value)=>{
  if(value.length !== 0){
    let splitArray = value.split("/");
      setData({
          ...data,
          mm:splitArray[0],
          yy:splitArray[1]
      })
  }
}

const amountChange=(value)=>{
  if(value.length !== 0){
      setData({
          ...data,
          amount:value
      })
  }
}




const handleCardPayment = async()=>{
  console.log('handling card payment ...')
  let token = await getToken();
  axios.post(`${domain}/api/user/payment`,{
        cardno:data.accountNumber,
        cvv: data.cvv,
        expirymonth: data.mm,
        expiryyear: data.yy,
        phonenumber:route.params.phonenumber,
        firstname: route.params.firstname,
        lastname: route.params.lastname, 
        email:route.params.email,
        billingzip:"233",
        billingcity:data.billingcity,
        billingaddress:data.billingaddress,
        billingstate:data.billingstate,
        payment_method:'card_payment'
  },{headers:{'Authorization':`Bearer ${token}`}})
  .then(res=>{
    console.log(res.data)
  })
  .catch(error=>{
    console.log(error.response.data)
  })
}


  return (
    <SafeAreaView style={styles.container}>
            <View>
                <Text style={[styles.text, {marginBottom:35, fontSize:22, fontWeight:"500"}]}>Credit Card Details</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="ACCOUNT NUMBER"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>accountNumberChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="mm/yyyy"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>expiryChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="CVV"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>cvvChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="BILLING STATE"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>stateChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="BILLING CITY"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>cityChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="BILLING ADDRESS"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>addressChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="AMOUNT"
                placeholderTextColor="#003f5c" 
                onChangeText={(value=>amountChange(value))}
            />
            </View>
            
            <TouchableOpacity style={styles.loginBtn} onPress={()=>handleCardPayment()}>
                <Text style={styles.loginText}>PAY GH¢ 20.00</Text>
            </TouchableOpacity>

    </SafeAreaView>
  );
}

function MobileMoney({route,navigation}) {
  const [data, setData]=React.useState({
    phonenumber:"",
    voucher:"",
    vendor:""
  })
  const phonenumberChange=(value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            phonenumber:value
        })
    }
  }
  const vendorChange=(value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            vendor:value
        })
    }
  }
  const voucherChange=(value)=>{
    if(value.length !== 0){
        setData({
            ...data,
            voucher:value
        })
    }
  }
  const handleMomoPayment = async()=>{
    console.log('handling mom payment ...')
    let token = await getToken();
    axios.post(`${domain}/api/user/payment`,{
          phonenumber:data.phonenumber,
          firstname: route.params.firstname,
          lastname: route.params.lastname,
          email:route.params.email,
          vendor:'MTN',
          voucher:data.voucher,
          payment_method:'momo'
    },{headers:{'Authorization':`Bearer ${token}`}})
    .then(res=>{
      console.log(res.data)
    })
    .catch(error=>{
      console.log(error.response.data)
    })
  }
  return (
    <SafeAreaView style={styles.container}>
            <View>
                <Text style={[styles.text, {marginBottom:35, fontSize:22, fontWeight:"500"}]}>Mobile Money Details</Text>
            </View>
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Number"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>phonenumberChange(value))}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Voucher(Vodafone)"
                placeholderTextColor="#003f5c"
                onChangeText={(value=>voucherChange(value))}
            />
            </View>

            
            <TouchableOpacity style={styles.loginBtn} onPress={()=>handleMomoPayment()}>
                <Text style={styles.loginText}>PAY</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();

export default function AccountDetails({route,navigation}) {
  console.log(route)
  return (
      <Tab.Navigator
        initialRouteName="CreditCard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'CreditCard') {
              iconName = 'ios-card'
            } else if (route.name === 'MobileMoney') {
              iconName = 'ios-phone-portrait';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="CreditCard" component={CreditCard} initialParams={route.params.data}
            options={{
            headerLeft: ()=>(
              <Icon name="menu" size={25} backgroundColor="white" color="black" style={{left:10}}
                onPress={()=>navigation.openDrawer()}
              />
            )
          }}
        />
        <Tab.Screen name="MobileMoney" component={MobileMoney} initialParams={route.params.data}
            options={{
            headerLeft: ()=>(
              <Icon name="menu" size={25} backgroundColor="white" color="black" style={{left:10}}
                onPress={()=>navigation.openDrawer()}
              />
            )
          }}
        />
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