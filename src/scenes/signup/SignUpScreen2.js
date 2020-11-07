import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './SignUpScreenStyles2';
import {ApiHelper, STRINGS, ApiUrls, Utils} from '../../constant';
import NetInfo from '@react-native-community/netinfo';
import SimpleToast from 'react-native-simple-toast';
import {Loader} from '../../components/atoms/loader/Loader';
import {NldsButton} from '../../components/atoms/button';

const SIGN_UP_RESPONSE = 'SignUpResponse=>>>>';
const SIGN_UP_ERROR = 'SignUpError=>>>>>';

export default class SignUpScreen2 extends Component {
  constructor(props) {
    super();
    this.state = {
      stateList: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getStateList();
    this.getDistrictList(6);
  }

  render() {
    console.log('stateList=>>>', this.state.stateList);
    return (
      <View style={styles.parentView}>
        <Text style={styles.signUpStyle}>{STRINGS.SIGN_UP}</Text>
        <Text style={styles.createAccountStyle}>{STRINGS.CREATE_ACCOUNT}</Text>
        <Loader isLoading={this.state.isLoading} />
        <NldsButton
        title={STRINGS.SIGN_UP}
        containerStyle={{marginTop:Utils.getHeightScale(49)}}
        />
      </View>
    );
  }

  showToast = (message) => {
    SimpleToast.show(message);
  };

  /**
   * this method is used to get the state listpAp
   */
  getStateList = () => {
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          this.setState({isLoading: true});
          ApiHelper.fetchGet(ApiUrls.GET_STATE_AND_DISTRICT_LIST)
            .then((response) => {
              console.log(SIGN_UP_RESPONSE, response);
              this.setState({isLoading: false});
              if (response != undefined) {
                if (response.success == true) {
                  this.setState({stateList: response.data});
                } else {
                  this.showToast(response.errors.message);
                }
              } else {
                this.showToast(STRINGS.SERVER_ERROR);
              }
            })
            .catch((error) => {
              console.log(SIGN_UP_ERROR, error);
            });
        } else {
          this.showToast(STRINGS.PLEASE_PROVIDE_THE_INTERNET_CONNECTION);
        }
      })
      .catch((error) => {
        console.log(SIGN_UP_ERROR, error);
      });
  };

  /**
   * this method is used to get the district list by state id
   * @param {*} stateId : it contains the state id
   */
  getDistrictList = (stateId) => {
    const url = ApiUrls.GET_STATE_AND_DISTRICT_LIST + '?state=' + stateId;
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          this.setState({isLoading: true});
          ApiHelper.fetchGet(url)
            .then((response) => {
              this.setState({isLoading: false});
              console.log(SIGN_UP_RESPONSE, 'districtList=>>', response);
            })
            .catch((error) => {
              console.log(SIGN_UP_ERROR, error);
            });
        } else {
          this.showToast(STRINGS.PLEASE_PROVIDE_THE_INTERNET_CONNECTION);
        }
      })
      .catch((error) => {
        console.log(SIGN_UP_ERROR, error);
      });
  };
  /**
   * this method is used to call the signup api
   */
  signUpApi = () => {
    const body = JSON.stringify({
      phone_number: '8332943533',
      country_code: 91,
      state: 2,
      district: 14,
      pin_code: 120012,
    });

    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          ApiHelper.fetchPostWithoutToken(ApiUrls.SIGN_UP, body)
            .then((response) => {
              console.log(SIGN_UP_RESPONSE, 'signUpApi=>>', response);
            })
            .catch((error) => {
              console.log(SIGN_UP_ERROR, error);
            });
        } else {
          this.showToast(STRINGS.PLEASE_PROVIDE_THE_INTERNET_CONNECTION);
        }
      })
      .catch((error) => {
        console.log(SIGN_UP_ERROR, error);
      });
  };
}
