import React, {Component} from 'react';
import styles from './NldsButtonStyles';
import {Text, TouchableOpacity} from 'react-native';
export default class NldsButton extends Component {
  render() {
    const {title} = this.props;
    const {callback}= this.props
    const {containerStyle}= this.props
    return (
      <TouchableOpacity style={[styles.parentView,{...containerStyle}]}
      
        onPress={()=>{
          if(callback!=null && callback!=undefined){
            callback()
          }
        }}
      >
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
