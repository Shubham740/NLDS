import {StyleSheet} from 'react-native';
import {Colors} from '../../styles'
import {Utils} from '../../constant/'
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
  verificationTextStyle: {
    fontSize: 30,
    marginTop: 76,
    marginLeft: 12,
    fontFamily: Utils.fonts.bold,
    color:Colors.BLACK
  },
  enterfourDigitTextStyle: {
    fontSize: 18,
    marginLeft: 12,
    fontFamily: Utils.fonts.regular,
    marginTop: 24,
    color:Colors.BLACK
  },
  otpTextInputStyle: {
    width: 40,
    fontSize: 48,
    fontFamily: Utils.fonts.bold,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.PRIMARY,
    borderBottomWidth: 1,
  },
  otpViewStyle: {
    flexDirection: 'row',
    marginLeft: 14,
    marginRight:14,
    justifyContent: 'space-evenly',
    marginTop: 31,
  },
  resendOtpStyle:{
    alignSelf:'center',
    fontSize:14,
    color:Colors.PRIMARY,
    fontFamily:Utils.fonts.bold
  },
  resendOtpButtonStyle:{
    padding:10,
    marginTop:10
  }

});
export default styles;
