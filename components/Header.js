import React from "react";
import {
    StyleSheet, View, Text, TextInput
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"

export default class Header extends React.Component{

    OpenMenu=()=>{
        this.props.navigation.openDrawer();
    }

    render(){
        return(
            <View style={styles.header}>
                <Ionicons name="ios-list" size={28} color="white" style={styles.icon} onPress={()=>this.OpenMenu()}/>
                <View>
                    <Text style={styles.headerText}>{this.props.name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:110,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#FF1654",
    },
    headerText:{
        fontWeight:'bold',
        fontSize:20,
        color:"white",
        marginTop:30
    },
    icon:{
        position:'absolute',
        left:16,
        bottom:30
    }
})