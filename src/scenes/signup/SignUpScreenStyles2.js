import {StyleSheet} from 'react-native';
import {Colors} from '../../styles';
import {Utils} from '../../constant';
const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    marginHorizontal: 35,
    marginTop: 23,
  },
  signUpStyle: {
    fontSize: 30,
    color: Colors.SIGNUP_COLOR,
    fontFamily: Utils.fonts.bold,
  },
  createAccountStyle: {
    fontSize: 20,
    color: Colors.SIGNUP_COLOR,
    fontFamily: Utils.fonts.regular,
    marginTop: Utils.getHeightScale(13),
    letterSpacing: 1,
  },
  materialDropDownFont: {
    fontFamily: Utils.fonts.bold,
    paddingLeft: 12,
  },
  materialItemStyle: {
    borderBottomColor: Colors.PRIMARY,
    color: Colors.PRIMARY,
    fontSize: 16,
    paddingLeft: 12,
    fontFamily: Utils.fonts.bold,
  },
  pinCode: {
    width: '80%',
    height: 50,
    padding: 0,
    fontFamily: fonts.bold,
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 10,
    color: Colors.BLACK,
    fontSize: 20,
  },
  lineStyle: {
    height: 1,
    backgroundColor: 'gray',
  },
});

export default styles;
