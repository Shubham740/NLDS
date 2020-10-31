import React, {Component} from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';

import {img_path} from '../../constant/images';
import STRINGS from '../../constant/STRINGS.js';
import styles from './LoginStyles';
export default class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.parentView}>
        <Image
          style={styles.imageStyle}
          source={img_path.SHOPPING_ICON}
          resizeMode={'contain'}
        />
        <Text style={styles.welcomeTextStyle}>{STRINGS.WELCOME}</Text>
        <Text style={styles.enterMobileNumberTextStyle}>
          {STRINGS.ENTER_YOUR_MOBILE_NUMBER_TO_LOGIN}
        </Text>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.loginTextStyle}>{STRINGS.LOGIN}</Text>
        </TouchableOpacity>
        <Text style={styles.firstTimeUserTextStyle}>
          {STRINGS.FIRST_TIME_USER}
        </Text>
        <TouchableOpacity style={styles.signUpHereTouchableStyle}>
          <Text style={styles.signUpHereTextStyle}>{STRINGS.SIGN_UP_HERE}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
