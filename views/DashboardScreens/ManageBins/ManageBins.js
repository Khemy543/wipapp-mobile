import React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";


export default function ManageBins({navigation}){
    return(
        <View style={styles.container}>
            <Text>Manage Bins page</Text>
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