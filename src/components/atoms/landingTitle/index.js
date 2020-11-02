import React,{ Component } from "react";
import styles from './LandingTitleStyles'
import {ApiUrls, STRINGS} from '../../../constant/';
import SimpleToast from 'react-native-simple-toast';

import {View, Text, TouchableOpacity} from 'react-native'
export default class LandingTitle extends Component{
        render(){
            return (
                <View style={styles.exploreCategoryViewStyle}>
                  <Text style={styles.exploreCategoryTextStyle}>
                    {this.props.title}
                  </Text>
                  <TouchableOpacity
                    style={styles.viewAllTouchableStyle}
                    onPress={() => {
                      SimpleToast.show(STRINGS.COMING_SOON);
                    }}>
                    <Text style={styles.viewAllTextStyle}>{STRINGS.VIEW_ALL}</Text>
                  </TouchableOpacity>
                </View>
              );
        }
}