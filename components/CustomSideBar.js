import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <Image
        source={require('../assets/images/Cilantro.jpg')}
        style={styles.sideMenuProfileIcon}
      />
      <View style={styles.text}>
        <Text style={styles.name}>Gideon Assafuah</Text>
        <Text style={styles.email}>gassafuah@gamil.com</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={() => console.log('logging out')}
        />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 13,
          textAlign: 'center',
          color: 'grey'
        }}>
            copyright@2020wipApp.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop:20
  },
  text:{
    alignSelf: 'center',
    marginTop:20,
  },
  name:{
      fontWeight:'bold',
      fontSize:20
  },
  email:{
      textAlign:"center"
  }
});

export default CustomSidebarMenu;