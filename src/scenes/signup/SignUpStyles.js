import {StyleSheet} from 'react-native';
import {fonts} from '../../constant/Utils';

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    marginHorizontal: 20,
  },
  imageStyle: {
    width: 172,
    height: 135,
    alignSelf: 'center',
    marginTop: 81,
  },
  welcomeTextStyle: {
    fontSize: 30,
    marginTop: 76,
    marginLeft: 12,
    fontFamily: fonts.bold,
  },
  enterMobileNumberTextStyle: {
    fontSize: 18,
    marginLeft: 12,
    fontFamily: fonts.regular,
    marginTop: 24,
  },
  buttonStyle: {
    backgroundColor: '#F27113',
    width: 306,
    height: 52,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTextStyle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: 'white',
  },
  firstTimeUserTextStyle: {
    fontSize: 12,
    fontFamily: fonts.regular,
    alignSelf: 'center',
    marginTop: 34,
  },
  signUpHereTextStyle: {
    fontSize: 17,
    fontFamily: fonts.bold,
    alignSelf: 'center',
  },
  signUpHereTouchableStyle: {
    padding: 10,
  },
  phoneNumberViewStyle: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  countryCodeTextStyle: {
    marginLeft: 12,
    fontSize: 16,
    color: 'black',
    fontFamily: fonts.bold,
  },
  phoneNumberTextStyle: {
    width: '80%',
    fontSize: 16,
    height: 50,
    padding: 0,
    fontFamily: fonts.bold,
    color: 'black',
    paddingLeft: 12,
    paddingRight: 12,
  },
  lineStyle: {
    height: 1,
    backgroundColor: 'gray',
    marginLeft: 12,
    marginRight: 12,
  },
});
export default styles;
