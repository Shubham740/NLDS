import React, {Component} from 'react';
import {Alert, Button, StyleSheet,Platform, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Get_All_CATEGORIES_URL } from '../../constant/api';
import { connect } from 'react-redux';
import * as Actions from '../../actions/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Utils} from '../../constant'

import LandingScreen from '../landing'
import ShopScreen from '../shop';
import CartScreen from '../cart';
import AccountScreen from '../account';
import ServicesScreen from '../services';
import ConsultancyScreen from '../consultancy';
import {img_path} from '../../constant'
const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component { 
  render() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = img_path.HOME
          } 
          else if (route.name === 'Categories') {
            iconName = img_path.CATEGORY
          }
          else if (route.name === 'Cart') {
            iconName = img_path.CART
          }
          else if (route.name === 'Account') {
            iconName = img_path.ACCOUNT
          }
          return <Image source={iconName} 
          resizeMode={'contain'}
          size={20} color={color} />;  
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FF8C00',
        inactiveTintColor: 'black',
        keyboardHidesTabBar: Platform.OS == 'android' ? true : false,
        labelStyle: {
          fontSize: 12,
          fontFamily:Utils.fonts.regular
        }
      }}>
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="Categories" component={ShopScreen} />
      <Tab.Screen name="Cart" component={ServicesScreen}/> 
      <Tab.Screen name="Account" component={ConsultancyScreen}/>
    </Tab.Navigator> 
    
    ); 
  } 

};








