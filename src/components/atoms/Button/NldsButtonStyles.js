
const {StyleSheet} = require('react-native');
import {Colors} from '../../../styles'
import {Utils} from '../../../constant/'
const styles = StyleSheet.create({
  parentView: {
    width: 306,
    height: 52,
    backgroundColor:Colors.PRIMARY,
    alignSelf:'center',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  textStyle:{
    color:Colors.WHITE,
    fontFamily:Utils.fonts.bold
  }
});
export default styles;
