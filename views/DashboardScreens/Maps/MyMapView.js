import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Text,
    View
} from "react-native";
import MapView from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
 

export default function MyMapView(props){
    return(
        <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            style={{flex: 1}}
            region={props.region}
        >

        </MapView>
    );
}