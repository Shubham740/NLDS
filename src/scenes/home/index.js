import React, {Component} from 'react';
import {Alert, Button, StyleSheet} from 'react-native';
import {SafeAreaView, Text,View,TouchableOpacity,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { Get_All_CATEGORIES_URL } from '../../constant/api';
import { connect } from 'react-redux';
import * as Actions from '../../actions/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from '../landing'
import ShopScreen from '../shop';
import CartScreen from '../cart';
import AccountScreen from '../account';
import ServicesScreen from '../services';
import ConsultancyScreen from '../consultancy';
//import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

class HomeScreen extends Component { 
  constructor(props) {
    super(props)
   // console.log("hi1")
    //console.log(props)
  } 
  
  decrease = () => {
   
    //https://github.com/axios/axios

  // axios.get(Get_All_CATEGORIES_URL)
  // .then(response => {
  //   if(response.status == 200){
  //     console.log(response.data)
  //   }
  // })
  // .catch(error => {
  //   console.log(error);  
  // });

  }

  increase = () => {}
 
  render() {
    const { count } = this.props; 
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'NLDS') {
            iconName = 'home'
            color = '#FF8C00'
          } 
          else if (route.name === 'Shop') {
            iconName = 'times'
            color = '#FF8C00'
          }
          else if (route.name === 'Services') {
            iconName = 'apple'
            color = '#FF8C00'
          }
          else if (route.name === 'Consultancy') {
            iconName = 'trophy'
            color = '#FF8C00'
          }
          return <Icon name={iconName} size={size} color={color} />;  
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF8C00',
        inactiveTintColor: 'black',
      }}>
      <Tab.Screen name="NLDS" component={LandingScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Services" component={ServicesScreen}/> 
      <Tab.Screen name="Consultancy" component={ConsultancyScreen}/>
    </Tab.Navigator> 
      // <View style={styles.container}> 
      //   <Text>Home screen</Text>
      //   <View style={styles.container}>
      //           <Button
      //               onPress={this.props.increment}
      //               title="Increase Count"
      //               color="#841584"
      //               accessibilityLabel="Increase Count"
      //           />
      //             <Text>{count}</Text>
      //           <Button
      //               onPress={this.props.decrement}
      //               title="Decrease Count"
      //               color="#841584"
      //               accessibilityLabel="Decrease Count"
      //           />
                
      //       </View>
      //   <Button
      //     title="About"
      //     onPress={() =>
      //       this.props.navigation.navigate('About')
      //     }
      //   />
      // </View> 
    ); 
  } 

};



const styles = StyleSheet.create({ 
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
    } 
  });


const mapStateToProps = (state) => ({
  count: state.hmr.count
});

const mapDispatchToProps = (dispatch) => ({
 increment: () => { 
   //console.log("hi2")
   return dispatch({type: Actions.COUNTER_INCREMENT})
 },
 decrement: () => dispatch({type: Actions.COUNTER_DECREMENT}),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


