import React from 'react';
import{ AuthContext } from '../../../context.js'
import {
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios'
import { Avatar, Card } from 'react-native-paper';

var domain = "https://wipap.herokuapp.com";

const timeToString = (time)=>{
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}

export default function Calender({navigation}){

    const { dispatch, loginState } = React.useContext(AuthContext);
    const [items,setItems] = React.useState({});
    const [selectedDay, setSelectedDay] = React.useState('');
    const [day, setDay] = React.useState('')

   /*  const loadItems = (day) =>{
        setTimeout(()=>{
            for(let i=-15;i<85; i++){
                const time = day.timestamp + 1*24*60*60*1000;
                const strTime = timeToString(time);
                if(!items[strTime]){
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random()*3+1);
                    for(let j=0; j<numItems;j++){
                        items[strTime].push({
                            name:'Bin Collection Day',
                            height:Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }

            const newItems = {};
            Object.keys(items).forEach((key)=>{
                newItems[key] = items[key];
            });
            setItems(newItems);
        },1000);
    } */
    React.useEffect(()=>{
        //get current data
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        setSelectedDay(today)
        var date = new Date(today).toDateString();
        console.log(date)
        setDay(date)
        //get dates
        axios.get(`${domain}/api/get/company/pick-up`,
        {headers:{'Authorization':`Bearer ${loginState.userToken}`}})
        .then(res=>{
            console.log("data:",res.data);
            for(let i=0; i<res.data.length; i++){
                const strTime = res.data[i].pick_up_date;
                if(!items[strTime]){
                    items[strTime] = [];
                        items[strTime].push({
                            date:`${res.data[i].formatted_date}`,
                            company:`${res.data[i].waste_company.company_name}`,
                            name:`${res.data[i].garbage_type.garbage_type}`,
                            height:Math.max(50, Math.floor(Math.random() * 150))
                        });
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key)=>{
                newItems[key] = items[key];
            });
            setItems(newItems);
        })
        .catch(error=>{
            console.log(error)
        })
    },[]);


    const getDay=(day)=>{
        var date = new Date(day.dateString).toDateString();
        console.log(date)
        setDay(date)
    }

    const renderItem = (item)=>{
        return(
            <TouchableOpacity
            style={{
                marginRight:10, 
                marginTop:17
            }}
            >
            {console.log(item)}
                <Card>
                    <Card.Content>
                        <View
                        style={{
                            flexDirection:'row',
                            justifyContent:"space-between",
                            alignItems:"center"
                        }}
                        >
                            <View style={{flexDirection:"column"}}>
                                <Text style={{marginBottom:10}}>{item.date}</Text>
                                <Text style={{fontSize:18, fontWeight:'bold', color:"#454545"}}>{item.company}</Text>
                                <Text style={{fontSize:15}}>{item.name}</Text>
                            </View>
                            <Avatar.Text label={`${item.name.toUpperCase().charAt(0)}`} style={{backgroundColor:"#6EC7E0", color:"white"}}/>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    const renderEmpty = ()=>{
        return(
            <TouchableOpacity
            style={{
                marginRight:10, 
                marginTop:17,
                alignItems:"center"
            }}
            onPress={()=>navigation.navigate('Request Pick Up',{day:day})}
            >
                <Card style={{
                    width:"80%",
                    backgroundColor:"#6EC7E0"
                }}>
                    <Card.Content>
                        <View
                        style={{
                            alignItems:"center"
                        }}
                        >
                                <Text style={{fontSize:15}}>Request Pick Up</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <Agenda
             items={items}
             selected={`${selectedDay}`}
             renderItem={renderItem}
             renderEmptyData ={renderEmpty}
             onDayPress={(day)=>{getDay(day)}}
             />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})