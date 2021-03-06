import React from "react";
import {
    StyleSheet, View, Text, TextInput
} from "react-native";

export default class InputTextField extends React.Component{
    render(){
        return(
            <View>
                <Text style={styles.inputTitle}>{this.props.title}</Text>
                <TextInput
                    placeholder={this.props.placeholderText}
                    value={this.props.value}
                    secureTextEntry={this.props.isSecure}
                    style={styles.input}
                />
                <View style={{borderBottomWidth:1, borderBottomColor:"#D8D8D8"}}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputTitle:{
        color:"#ABB4BD",
        fontSize:14
    },
    input:{
        paddingVertical:12,
        color:"#1D2029",
        fontSize:14
    }
})