import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

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
    <Text
    style={styles.enterMobileNumberTextStyle}
    >{STRINGS.ENTER_YOUR_MOBILE_NUMBER_TO_LOGIN}</Text>
      </SafeAreaView>
    );
  }
}
