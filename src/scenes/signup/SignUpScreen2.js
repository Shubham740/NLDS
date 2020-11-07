import React, {Component} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import styles from './SignUpScreenStyles2';
import {ApiHelper, STRINGS, ApiUrls, Utils} from '../../constant';
import NetInfo from '@react-native-community/netinfo';
import SimpleToast from 'react-native-simple-toast';
import {Loader} from '../../components/atoms/loader/Loader';
import {NldsButton} from '../../components/atoms/button';
import {Dropdown} from 'react-native-material-dropdown';
import {Colors} from '../../styles';

const SIGN_UP_RESPONSE = 'SignUpResponse=>>>>';
const SIGN_UP_ERROR = 'SignUpError=>>>>>';

export default class SignUpScreen2 extends Component {
  constructor(props) {
    super();
    this.state = {
      stateList: [],
      districtList: [],
      stateListDropDown: [],
      isLoading: false,
      phoneNumber: '',
      selectedState: 'Select State',
      selectedCity: 'Select City',
      selectedStateId: -1,
      selectedCityId: -1,
      districtListDropDown: [],
      pinCode:''
    };
  }

  componentDidMount() {
    const phoneNumber=  this.props.route.params.phoneNumber
    console.log('phone Number=>>>', phoneNumber)
    this.setState({phoneNumber:phoneNumber})
    this.getStateList();
  }

  render() {
    console.log(
      'stateList=>>>',
      this.state.stateList,
      this.state.selectedStateId,
      this.state.districtList,
      this.state.selectedCityId,
    );
    return (
      <View style={styles.parentView}>
        <Text style={styles.signUpStyle}>{STRINGS.SIGN_UP}</Text>
        <Text style={styles.createAccountStyle}>{STRINGS.CREATE_ACCOUNT}</Text>
        {this.state.stateListDropDown != null &&
          this.state.stateListDropDown != undefined &&
          this.state.stateListDropDown.length > 0 && (
            <Dropdown
              data={this.state.stateListDropDown}
              rippleCentered={true}
              itemColor={Colors.PRIMARY}
              baseColor={Colors.PRIMARY}
              textColor={Colors.BLACK}
              itemTextStyle={styles.materialItemStyle}
              fontSize={20}
              selectedItemColor={Colors.BLACK}
              value={this.state.selectedState}
              inputContainerStyle={{textAlign: 'center',marginTop:10}}
              style={styles.materialDropDownFont}
              onChangeText={(text) => {
                this.setState(
                  {
                    selectedState: text,
                    selectedStateId: Utils.getSelectedStateIndex(
                      this.state.stateList,
                      text,
                    ),
                    selectedCityId: -1,
                    selectedCity: 'Select City',
                  },
                  () => {
                    this.getDistrictList(this.state.selectedStateId);
                  },
                );
              }}
            />
          )}

        {this.state.districtListDropDown != null &&
          this.state.districtListDropDown != undefined &&
          this.state.districtListDropDown.length > 0 && (
            <Dropdown
              data={this.state.districtListDropDown}
              rippleCentered={true}
              itemColor={Colors.PRIMARY}
              baseColor={Colors.PRIMARY}
              textColor={Colors.BLACK}
              itemTextStyle={styles.materialItemStyle}
              fontSize={20}
              selectedItemColor={Colors.BLACK}
              inputContainerStyle={{textAlign: 'center',marginTop:10}}
              style={styles.materialDropDownFont}
              value={this.state.selectedCity}
              onChangeText={(text) => {
                this.setState({
                  selectedCity: text,
                  selectedCityId: Utils.getSelectedStateIndex(
                    this.state.districtList,
                    text,
                  ),
                });
              }}
            />
          )}
              {this.state.selectedCityId!=-1 && 
              <View>
                <TextInput
                style={styles.pinCode}
                placeholder={STRINGS.PLEASE_ENTER_PIN_CODE}
                numberOfLines={1}
                textContentType={'none'}
                contextMenuHidden={true}
                allowFontScaling={false}
                autoComplete="false"
                maxLength={6}
                selectionColor={'#F27113'}
                keyboardType={'numeric'}
                value={this.state.pinCode}
                onChangeText={(text)=>{
                    this.setState({pinCode:text})
                }}
                />
                <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      this.state.pinCode.length > 0 ? '#F27113' : 'gray',
                  },
                ]}
              />
      </View>
              }
        <Loader isLoading={this.state.isLoading} />
        <NldsButton
          title={STRINGS.SIGN_UP}
          containerStyle={{ position:'absolute', marginTop:((Dimensions.get('window').height/5)*4)}}
          callback={()=>{
           if( this.validateForm()==true){
             this.signUpApi()
           }
          }}
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
                  this.setState({
                    stateListDropDown: Utils.getStateListForDropDown(
                      response.data,
                    ),
                    stateList: response.data,
                  });
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
              if (response != undefined) {
                if (response.success == true) {
                  this.setState({
                    districtListDropDown: Utils.getStateListForDropDown(
                      response.data,
                    ),
                    districtList: response.data,
                  });
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

  validateForm=()=>{
    if(this.state.selectedStateId==-1){
      this.showToast(STRINGS.PLEASE_SELECT_STATE)
      return false
    }
    else if(this.state.selectedCityId==-1){
      this.showToast(STRINGS.PLEASE_SELECT_CITY)
    }
    else{
      return true;
    }
  }
  /**
   * this method is used to call the signup api
   */
  signUpApi = () => {
    const body = JSON.stringify({
      phone_number: this.state.phoneNumber,
      country_code: 91,
      state: this.state.selectedStateId,
      district: this.state.selectedCityId,
      pin_code: this.state.pinCode,
    });
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {
          this.setState({isLoading:true})
          ApiHelper.fetchPostWithoutToken(ApiUrls.SIGN_UP, body)
            .then((response) => {
              console.log(SIGN_UP_RESPONSE, 'signUpApi=>>', response);
             this.setState({isLoading:false})
              if(response!=undefined){
                    if(response.success==true){
                      this.showToast((response.data.message))
                      this.props.navigation.navigate('OtpVerification',{
                        phoneNumber:this.state.phoneNumber
                      })
                    }else{
                      this.showToast(response.errors.message)
                    }
              }else{
                this.showToast(STRINGS.SERVER_ERROR)
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
}
