import React from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import{ AuthContext } from '../../../context.js'


export default function Profile({navigation}){

    const { dispatch, loginState } = React.useContext(AuthContext);
    const [data, setData] = React.useState([])

    React.useState(()=>{
        console.log("login",loginState)
        if(loginState.userData !== null){
            setData(loginState.userData)
        }
    },[])


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titlebar}>
                    <Icon name="menu" size={24}  onPress={()=>navigation.openDrawer()}/>
                    <Text style={{fontWeight:'bold',fontSize:16}}>Profile</Text>
                </View>
                <View style={{alignSelf:"center"}}>
                    <View style={styles.profileImage}>
                        <Image source={require('../../../assets/images/logo.png')} style={styles.image} resizeMode="center" />
                    </View>
                    <View style={styles.dm}>
                        
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>

                    </View>
                 </View>
                 <View style={styles.infoContainer}>
                    <Text style={[styles.text, {fontWeight:"200", fontSize:36}]}>{data.name}</Text>
                    <Text style={[styles.text, {color:"#AEB5BC", fontSize:14}]}>{data.email}</Text>
                 </View>
                 <Text style={[styles.subText,styles.recent]}>Profile Info</Text>

                 <View style={{alignItems:'center'}}>
                    <View style={styles.recentItem}>
                        <View style={styles.recentItemIndicator}></View>
                        <View style={{width:250}}>
                                <Text style={{fontWeight:"400"}}>
                                    {data.title}
                            </Text>
                        </View>
                    </View>
                 </View>

                 <View style={{alignItems:'center'}}>
                    <View style={styles.recentItem}>
                        <View style={styles.recentItemIndicator}></View>
                        <View style={{width:250}}>
                                <Text style={{fontWeight:"400"}}>
                                    {data.email}
                            </Text>
                        </View>
                    </View>
                 </View>

                 <View style={{alignItems:'center'}}>
                    <View style={styles.recentItem}>
                        <View style={styles.recentItemIndicator}></View>
                        <View style={{width:250}}>
                                <Text style={{fontWeight:"400"}}>
                                    {data.phone}
                            </Text>
                        </View>
                    </View>
                 </View>

                 <View style={{alignItems:'center'}}>
                    <View style={styles.recentItem}>
                        <View style={styles.recentItemIndicator}></View>
                        <View style={{width:250}}>
                            <Text style={[styles.text,{color:"#41444B", fontWeight:"300"}]}>
                                Started Following {""}
                                <Text style={{fontWeight:"400"}}>
                                    Jake and me
                                </Text>
                            </Text>
                        </View>
                    </View>
                 </View>
                 
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    text:{
        color:"#52575D",

    },
    subText:{
        fontSize:12,
        color:"#AEB5BC",
        textTransform:"uppercase",
        fontWeight:"500"
    },
    image:{
        flex:1,
        width:undefined,
        height:undefined
    },
    titlebar:{
        flexDirection:"row",
        justifyContent:"space-between",
        margin:24,
        marginHorizontal:16
    },
    profileImage:{
        width:200,
        height:200,
        borderRadius:100,
        overflow:"hidden"
    },
    dm:{
        backgroundColor:"#41444B",
        position:'absolute',
        top:20,
        width:40,
        height:40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center"
    },
    active:{
        backgroundColor:"#34FFB9",
        position:'absolute',
        bottom:28,
        left:10,
        padding:4,
        height:20,
        width:20,
        borderRadius:10
    },
    infoContainer:{
        alignItems:'center',
    },
    recent:{
        marginLeft:78,
        marginTop:32,
        marginBottom:6,
        fontSize:10
    },
    recentItem:{
        flexDirection:'row',
        alignItems:"flex-start",
        marginBottom:16
    },
    recentItemIndicator:{
        backgroundColor:"#CABFAB",
        padding:4,
        height:12,
        width:12,
        borderRadius:6,
        marginTop:3,
        marginRight:20
    }
})
