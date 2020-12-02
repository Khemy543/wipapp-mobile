import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View
} from "react-native";
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapInput from './MapInput';
import MyMapView from './MyMapView'


export default class Maps extends React.Component {

    state = {
        region:{},
    };

    componentDidMount() {
       
        this.getInitialState();
    }


    async getInitialState(){
    const { status, permissions } = await Location.requestPermissionsAsync();

            if (status === 'granted') {
                
                let location = Location.getCurrentPositionAsync({enableHighAccuracy:true})
                console.log("location",location)
                this.updateState({
                    latitude:(await location).coords.latitude,
                    longitude:(await location).coords.longitude
                });
                
            }else{
                alert("We Need Your Location")
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

    render() {


        return (
            <>
                {!this.state.region['latitude']?
                <Text style={styles.container}>Finding your current location...</Text>
                :
                <View style={{flex:1}}>
                <View style={{flex:0.4}}>
                    <MapInput notifyChange={(loc)=>this.geCoordsFromName(loc)} />
                </View>
                <MyMapView
                    region={this.state.region}
                    onRegionChange={(reg)=>this.onMapRegionChange(reg)}
                />
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
    }
})