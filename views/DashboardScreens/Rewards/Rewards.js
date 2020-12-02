import React from 'react';
import {
    StyleSheet, 
    Text, 
    View
} from "react-native";


export default function Rewards({navigation}){
    return(
        <View style={styles.container}>
            <Text>Rewards page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginTop:100
    }
})