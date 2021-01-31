import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View,
    ActivityIndicator, Alert
} from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapInput from './MapInput';
import MyMapView from './MyMapView'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from "react-native-animatable";
import axios from 'axios';

var domain = "https://wipap.herokuapp.com";

export default class Maps extends React.Component {

    state = {
        region:{},
        isActive:false
    };

    componentDidMount() {
       console.log(this.props.route)
        this.getInitialState();
    }


    async getInitialState(){
    const { status, permissions } = await Location.requestPermissionsAsync();

            if (status === 'granted') {
                
                let location = await Location.getCurrentPositionAsync({})
                console.log("location",location)
                this.updateState({
                    latitude:(location).coords.latitude,
                    longitude:(location).coords.longitude
                });
                
            }else{
                Alert.alert('Access Location!','We need your location to continue')
            }

    }

    updateState(location){
        this.setState({
            region:{
                latitude:location.latitude,
                longitude:location.longitude,
                latitudeDelta:0.0922,
                longitudeDelta:0.0421
            }
        })
    }

    geCoordsFromName(loc){
        console.log("loc",loc)
        this.updateState({
            latitude:loc.lat,
            longitude:loc.lng
        })
    }

    onMapRegionChange(region){
        console.log("newLocation",region);
        this.setState({ region })
      };


    /* requestPickUp(){
        axios.post(`${domain}/`,
        {
            date:"",
            lat:"",
            long:""
        },
        {headers:{'Authorization':`Bearer ${loginState.userToken}`}})
    } */


    render() {


        return (
            <>
                {!this.state.region['latitude']?
                <View>
                    <ActivityIndicator size="small" color="black" style={styles.container}/>
                    <Text style={{textAlign:"center", marginTop:8}}>Finding your current location</Text>
                </View>
                :
                <View style={{flex:1}}>
                    <View style={{elevation:1000, zIndex:1000}}>
                        <MapInput notifyChange={(loc)=>this.geCoordsFromName(loc)} />
                    </View>
                <MyMapView
                    region={this.state.region}
                    //onRegionChange={(reg)=>this.onMapRegionChange(reg)}
                />
                    <Animatable.View 
                    animation="fadeInUpBig"
                    style={styles.footer}>
                        <Text
                        style={{fontWeight:"bold", fontSize:18}}
                        >{this.props.route.params.day}</Text>
                        <Text style={{marginTop:5}}>Request For Pick Up </Text>
                        <Text style={{marginTop:5,fontWeight:"bold", fontSize:20}}>Danfa Madina</Text>
                        <View
                            style={{
                                marginTop:35
                            }}>
                            <TouchableOpacity onPress={()=>this.requestPickUp()}>
                                <Card style={{backgroundColor:"#6EC7E0"}}>
                                    <Card.Content>
                                    <View
                                    style={{
                                    flexDirection:'row',
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                    }}>
                                    <Icon name="phone" size={20} color="black" style={{marginLeft:20}}/>
                                        <Text style={{textAlign:"center", textTransform:"uppercase", marginRight:40}}>
                                            Request Pick Up
                                        </Text>
                                    </View>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </View>
            }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign:"center",
        fontWeight:'bold',
        fontSize:15,
        marginTop:"70%"
    },
    footer:{
        flex:0.3,
        backgroundColor:"#ffff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingVertical:50,
        paddingHorizontal:30,
        
    }
})