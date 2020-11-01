import React, {Component} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './OtpVerificationStyles';
import {img_path} from '../../constant/images';
import STRINGS from '../../constant/STRINGS.js';
import {NldsButton} from '../../components/atoms/button';
import SimpleToast from 'react-native-simple-toast';
import {Colors} from '../../styles';

export default class OtpVerification extends Component {
  constructor(props) {
    super();
    this.state = {
      otp: ['', '', '', ''],
      current: -1,
    };
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  onChangeOtpHandler = (text, index) => {
    console.log('otp array value =>>>', this.state.otp);
    if (text === '' || text === ' ') {
      if (this.state.current >= 0) {
        let newOtp = this.state.otp.map((item, loc) => {
          if (loc === index) {
            return '';
          } else {
            return item;
          }
        });
        this.setState(
          {
            otp: newOtp,
            current:
              this.state.current === 0
                ? this.state.current
                : this.state.current - 1,
          },
          () => {
            this.focusNextField(this.state.current);
          },
        );
      }
    } else {
      let newOtp = this.state.otp.map((item, loc) => {
        if (loc === index) {
          return text;
        } else {
          return item;
        }
      });
      if (this.state.current == -1) {
        this.setState({otp: newOtp, current: 1}, () => {
          this.focusNextField(this.state.current);
        });
      } else {
        this.setState(
          {
            otp: newOtp,
            current:
              this.state.current < this.state.otp.length - 1
                ? this.state.current + 1
                : this.state.current,
          },
          () => {
            this.focusNextField(this.state.current);
          },
        );
      }
    }
  };

  render() {
    return (
      <View style={styles.parentView}>
        <Image
          style={styles.imageStyle}
          source={img_path.SHOPPING_ICON}
          resizeMode={'contain'}
        />

        <Text style={styles.verificationTextStyle}>{STRINGS.VERIFICATION}</Text>
        <Text style={styles.enterfourDigitTextStyle}>
          {STRINGS.ENTER_FOUR_DIGIT_VERIFICATION}
        </Text>

        <View style={styles.otpViewStyle}>
          {this.state.otp.map((item, index) => {
            return (
              <TextInput
                ref={index}
                key={index}
                value={item}
                maxLength={1}
                keyboardType={'numeric'}
                selectionColor={Colors.PRIMARY}
                style={[
                  styles.otpTextInputStyle,
                  {
                    borderBottomColor:
                      this.state.current == index
                        ? Colors.PRIMARY
                        : item != ''
                        ? Colors.PRIMARY
                        : Colors.GRAY_DARK,
                  },
                ]}
                onChangeText={(newText) => {
                  console.log('new text=>>', newText);
                  this.onChangeOtpHandler(newText, index);
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity
        style={styles.resendOtpButtonStyle}
        onPress={()=>{
          SimpleToast.show('coming soon')
        }}
        >

        <Text
        style={styles.resendOtpStyle}
        >{STRINGS.RESEND_OTP}</Text>
        </TouchableOpacity>

        <NldsButton
          callback={this.verifyButtonCallback}
          title={STRINGS.VERIFY}
          containerStyle={{marginTop: 40}}
        />
      </View>
    );
  }
  verifyButtonCallback = () => {
    SimpleToast.show('coming soon');
  };
}
