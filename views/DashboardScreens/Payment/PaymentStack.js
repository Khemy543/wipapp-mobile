import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import UserDetails from './UserDetails';
import AccountDetails from './AccountDetails';

const Payment = createStackNavigator();

const MainPaymentStack=({navigation})=>(
    <Payment.Navigator
      initialRouteName="UserDetails"
      activeColor="#ffff"
    >
      <Payment.Screen
      option={{
        headerLeft: ()=>(
              <Icon name="menu" size={25} backgroundColor="white" color="black" style={{left:10}}
                onPress={()=>navigation.openDrawer()}
              />
            )
      }}
        name="UserDetails"
        component={UserDetails}
      />
      <Payment.Screen
      options={{
        headerLeft: ()=>(
              <Icon name="menu" size={25} backgroundColor="white" color="black" style={{left:10}}
                onPress={()=>navigation.openDrawer()}
              />
            )
      }}
        name="AccountDetails"
        component={AccountDetails}
      />
    </Payment.Navigator>

);

export default MainPaymentStack;

