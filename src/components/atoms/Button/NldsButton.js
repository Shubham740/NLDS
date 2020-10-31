import React, {Component} from 'react';
import styles from './NldsButtonStyles';
import {TouchableOpacity} from 'react-native';

export default class NldsButton extends Component {
  render() {
    return <TouchableOpacity style={styles.parentView}></TouchableOpacity>;
  }
}
