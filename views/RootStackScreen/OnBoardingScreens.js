import React from 'react';
import {Text, TouchableOpacity, Button, StyleSheet, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


/* const Skip=({...props}) =>(
    <Button
        title="Skip"
        color="#000000"
        {...props}
    />
);

const Next=({...props}) =>(
    <Button
        title="Next"
        color="#000000"
        {...props}
    />
);

const Done=({...props}) =>(
    <TouchableOpacity
        style={{marginHorizontal:10}}
        title="Done"
        color="#000000"
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
); */

const OnboardingScreen = ({navigation}) => {

    return(
            <Onboarding
            onSkip={()=>navigation.replace("Login")}
            onDone={()=>navigation.replace("Login")}
            pages={[
                {
                backgroundColor: '#f2e9d8',
                image: <Image source={require('../../assets/images/onboard1.jpeg')} style={styles.image}/>,
                title: 'WipApp',
                subtitle: 'Everyone is a partener'
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../../assets/images/onboard2.png')} style={styles.image}/>,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../../assets/images/onboard3.jpeg')} style={styles.image}/>,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
            />
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height:420,
        width:370,
        resizeMode:'stretch'
    }
})