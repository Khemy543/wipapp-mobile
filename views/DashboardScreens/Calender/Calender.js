import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../../../components/Header';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default function Calender({navigation}){
    return(
        <View>
            <Calendar />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        textAlign:"center",
        marginTop:100
    }
})