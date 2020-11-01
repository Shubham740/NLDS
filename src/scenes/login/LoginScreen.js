import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {ApiHelper} from '../../constant';
import {Loader} from '../../components/atoms/loader/Loader';
import NetInfo from '@react-native-community/netinfo';
import {img_path} from '../../constant/images';
import STRINGS from '../../constant/STRINGS.js';
import styles from './LoginStyles';
const LOGIN_SCREEN_ERROR = 'LoginScreenError=>>>';
const LOGIN_SCREEN_RESPONSE = 'LoginScreenResponse=>>>>';
import { StackActions } from '@react-navigation/native';

export default class LoginScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      isLoading: false,
      phoneNumber: '',
    };
  }
  render() {
    console.log('props=>>', this.props.navigation)
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

        <View style={styles.phoneNumberViewStyle}>
          <Text style={styles.countryCodeTextStyle}>
            {STRINGS.COUNTRY_CODE}
          </Text>

          <TextInput
            style={styles.phoneNumberTextStyle}
            underlineColorAndroid="transparent"
            placeholder={STRINGS.ENTER_YOUR_MOBILE_NUMBER}
            numberOfLines={1}
            textContentType={'none'}
            contextMenuHidden={true}
            allowFontScaling={false}
            autoComplete="false"
            maxLength={10}
            value={this.state.phoneNumber}
            selectionColor={'#F27113'}
            keyboardType={'numeric'}
            onChangeText={(newText) => {
              this.setState({phoneNumber: newText});
            }}
          />
        </View>
        <View
          style={[
            styles.lineStyle,
            {
              backgroundColor:
                this.state.phoneNumber.length > 0 ? '#F27113' : 'gray',
            },
          ]}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            this.validateForm();
          }}>
          <Text style={styles.loginTextStyle}>{STRINGS.LOGIN}</Text>
        </TouchableOpacity>

        <Text style={styles.firstTimeUserTextStyle}>
          {STRINGS.FIRST_TIME_USER}
        </Text>

        <Loader isLoading={this.state.isLoading} />
        <TouchableOpacity
          style={styles.signUpHereTouchableStyle}
          onPress={() => {
            SimpleToast.show(STRINGS.COMING_SOON);
          }}>
          <Text style={styles.signUpHereTextStyle}>{STRINGS.SIGN_UP_HERE}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  validateForm = () => {
    if (this.state.phoneNumber.trim().length == 10) {
      this.callLoginApi();
    } else {
      SimpleToast.show(STRINGS.PLEASE_ENTER_VALID_PHONE_NUMBER);
    }
  };
  callLoginApi = () => {
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          const body = JSON.stringify({
            phone_number: this.state.phoneNumber,
            country_code: STRINGS.COUNTRY_CODE,
          });
          this.setState({isLoading: true});
          ApiHelper.fetchPostWithoutToken('account/register/', body)
            .then((response) => {
              this.setState({isLoading: false});
              console.log(LOGIN_SCREEN_RESPONSE, response);
              if (response != undefined) {
                if (response.success == true) {
                  SimpleToast.show(response.data.message);
              this.props.navigation.navigate('NeedLife Store')
                } else {
                  SimpleToast.show(response.errors.message);
                }
              } else {
                SimpleToast.show(STRINGS.SERVER_ERROR);
              }
            })
            .catch((error) => {
              console.log(LOGIN_SCREEN_ERROR, error);
            });
        } else {
          SimpleToast.show(STRINGS.PLEASE_PROVIDE_THE_INTERNET_CONNECTION);
        }
      })
      .catch((error) => {
        console.log('error=>>>', error);
      });
  };
}
