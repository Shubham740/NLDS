import React, {Component} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './OtpVerificationStyles';
import {img_path} from '../../constant/images';
import STRINGS from '../../constant/STRINGS.js';
import {NldsButton} from '../../components/atoms/button';
import SimpleToast from 'react-native-simple-toast';
import {Colors} from '../../styles';
import {Loader} from '../../components/atoms/loader/Loader';
import {ApiHelper} from '../../constant';
import NetInfo from '@react-native-community/netinfo';
import {ApiUrls} from '../../constant/';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default class OtpVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ['', '', '', ''],
      current: -1,
      phoneNumber: '',
      isLoading: false,
    };
  }
  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  componentDidMount() {
    const phoneNumber = this.props.route.params.phoneNumber;
    console.log('phoneNumber===>>>', phoneNumber);
    this.setState({phoneNumber: phoneNumber});
  }

  validateOtp = () => {
    let otpText = this.state.otp;
    if (
      otpText[0].length == 0 ||
      otpText[1].length == 0 ||
      otpText[2].length == 0 ||
      otpText[3].length == 0
    ) {
      SimpleToast.show(STRINGS.PLEASE_ENTER_VALID_OTP);
      return false;
    } else {
      return true;
    }
  };

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
      <KeyboardAwareScrollView
      
      keyboardShouldPersistTaps="handled"
      ref={ref => (this.scrollView = ref)}
      onKeyboardWillHide={frames => {
        setTimeout(() => {
          this.scrollView.scrollToPosition(0, 0, false);
        }, 250);
      }}
      style={styles.parentView}
      extraHeight={120}>
        <Image
          style={styles.imageStyle}
          source={img_path.SHOPPING_ICON}
          resizeMode={'contain'}
        />

        <Text style={styles.verificationTextStyle}>{STRINGS.VERIFICATION}</Text>
        <Text style={styles.enterfourDigitTextStyle}>
          {STRINGS.ENTER_FOUR_DIGIT_VERIFICATION}
        </Text>
        <Loader isLoading={this.state.isLoading} />
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
          onPress={() => {
            this.resendOtp();
          }}>
          <Text style={styles.resendOtpStyle}>{STRINGS.RESEND_OTP}</Text>
        </TouchableOpacity>

        <NldsButton
          callback={this.verifyButtonCallback}
          title={STRINGS.VERIFY}
          containerStyle={{marginTop: 40}}
        />
      </KeyboardAwareScrollView>
    );
  }
  verifyButtonCallback = () => {
    if (this.validateOtp() == true) {
      this.verifyOtp();
    }
  };

  showToast = (message) => {
    SimpleToast.show(message);
  };

  verifyOtp = () => {
    let finalOtp = '';
    let otpArray = this.state.otp;
    console.log('otp =>>>', otpArray);

    for (let count = 0; count < otpArray.length; count++) {
      finalOtp = finalOtp + otpArray[count];
    }
    console.log('final otp =>>>', finalOtp);

    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          const body = JSON.stringify({
            one_time_password: finalOtp,
            mobile_number: this.state.phoneNumber,
          });
          this.setState({isLoading: true});
          ApiHelper.fetchPostWithoutToken(ApiUrls.VERIFY_OTP, body)
            .then((response) => {
              this.setState({isLoading: false});
              console.log('otp verify response=>>', response);
              if (response != undefined) {
                if (response.success == true) {
                  this.props.navigation.navigate('NeedLife Store');
                } else {
                  SimpleToast.show(response.errors.message);
                }
              } else {
                this.showToast(STRINGS.SERVER_ERROR);
              }
            })
            .catch((error) => {
              console.log('error=>>>', error);
            });
        } else {
          this.showToast(STRINGS.PLEASE_PROVIDE_THE_INTERNET_CONNECTION);
        }
      })
      .catch((error) => {
        console.log('error=>>>', error);
      });
  };

  resendOtp = () => {
    const phoneNumber = this.state.phoneNumber;
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          const body = JSON.stringify({
            mobile_number: phoneNumber,
          });
          this.setState({isLoading: true});
          this.setState({otp: ['', '', '', '']});
          ApiHelper.fetchPostWithoutToken(ApiUrls.RESEND_OTP, body)
            .then((response) => {
              this.setState({isLoading: false});
              console.log('otp verification response=>>', response);
              if (response != undefined) {
                if (response.success == true) {
                  SimpleToast.show(response.data.message);
                } else {
                  SimpleToast.show(response.errors.message);
                }
              } else {
                this.showToast(STRINGS.SERVER_ERROR);
              }
            })
            .catch((error) => {
              console.log('error=>>', error);
            });
        } else {
          this.showToast(STRINGS.PLEASE_PROVIDE_THE_INTERNET_CONNECTION);
        }
      })
      .catch((error) => {
        console.log('error=>>>', error);
      });
  };
}
