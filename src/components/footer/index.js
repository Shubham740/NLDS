import React from 'react';
import {SafeAreaView, Text,View,StyleSheet} from 'react-native';
import { Colors } from '../../styles/index';



export default function Footer() {


  return (
    <View style={styles.footercontainer}>
      <Text style={styles.footertext}>Copyright @2020 Needlife Pvt Ltd</Text>
    </View>
  );

}




const styles = StyleSheet.create({
  footercontainer: {
  flex: 1,
  padding: 10,
  flexDirection: "row",
  backgroundColor: Colors.PRIMARY,
  justifyContent: "center",
  textAlign: "center"
  },
  footertext:{
    color : Colors.WHITE
  }
})