import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Calender from './Calender/Calender';
import Notificatioin from './Notifications/Notifications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Maps from './Maps/Maps.js';

const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const NotificatioinStack = createStackNavigator();
const MapsStack = createStackNavigator();

const MainTabScreen=()=>(
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#ffff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor:"green",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Request Pick Up"
        component={MapsScreenStack}
        options={{
          tabBarLabel: 'Request Pick Up',
          tabBarIcon: ({ color,size }) => (
            <Icon name="google-maps" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreenStack}
        options={{
          tabBarLabel: 'Notification',
          tabBarBadge:2,
          tabBarIcon: ({ color,size }) => (
            <Icon name="bell" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>

);

export default MainTabScreen;

const HomeStackScreen=({navigation})=>(
    <HomeStack.Navigator
      screenOptions={{
        headerTitleStyle:{
          fontWeight:"bold"
        }
      }}
      >
        <HomeStack.Screen name="Home" component={Calender}
          options={{
            headerLeft: ()=>(
              <Icon name="menu" size={25} backgroundColor="white" color="black" style={{left:10}}
                onPress={()=>navigation.openDrawer()}
              />
            )
          }}
        />
      </HomeStack.Navigator>
);

const NotificationScreenStack=({navigation})=>(
  <NotificatioinStack.Navigator
     screenOptions={{
        headerTitleStyle:{
          fontWeight:"bold"
        }
      }}
    >
      <NotificatioinStack.Screen name="Notifications" component={Notificatioin}
        options={{
            headerLeft: ()=>(
              <Icon name="menu" size={25} backgroundColor="#009387" color="#fff" style={{left:10}}
                onPress={()=>navigation.openDrawer()}
              />
            )
          }}
      />
    </NotificatioinStack.Navigator>
); 

const MapsScreenStack=({navigation})=>(
    <MapsStack.Navigator
       screenOptions={{
        headerTitleStyle:{
          fontWeight:"bold"
        }
      }}
      >
        <MapsStack.Screen name="Request Pick Up" component={Maps}
          options={{
              headerLeft: ()=>(
                <Icon name="menu" size={25} backgroundColor="#009387" color="#fff" style={{left:10}}
                  onPress={()=>navigation.openDrawer()}
                />
              )
            }}
        />
      </MapsStack.Navigator>
  );
