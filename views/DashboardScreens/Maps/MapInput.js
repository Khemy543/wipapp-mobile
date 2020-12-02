import React from 'react';
import {
    StyleSheet, 
    SafeAreaView
} from "react-native";
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

class MapInput extends React.Component{
    render(){
    return(
        <GooglePlacesAutocomplete
            placeholder="Search"
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            fetchDetails={true}
            onPress={(data, details = null) => {
                this.props.notifyChange(details.geometry.location)
            }}
            query={{
                key:"AIzaSyBra5TrTLORMl1dsQVuK9_PAjwrEXMoNis",
                language:"en"
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
            enableHighAccuracyLocation={true}
        />
    );
    }
}

export default MapInput;