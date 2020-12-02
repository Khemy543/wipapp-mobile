import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View
} from "react-native";
import MapView from 'react-native-maps';


export default function MyMapView(props){
    return(
        <MapView
            showsUserLocation
            style={{flex: 1}}
            region={props.region}
            onRegionChange={(reg) => props.onRegionChange(reg)}
        >

        </MapView>
    );
}