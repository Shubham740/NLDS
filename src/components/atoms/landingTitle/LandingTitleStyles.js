const { StyleSheet } = require("react-native");
import {Colors} from '../../../styles';
import {fonts} from '../../../constant/Utils';

const styles = StyleSheet.create({
    viewAllTextStyle: {
        fontSize: 12,
        fontFamily: fonts.bold,
        color: Colors.LIGHT_BLACK,
      },
      viewAllTouchableStyle: {alignSelf: 'flex-end', padding: 15, marginRight: 20},
      exploreCategoryViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      exploreCategoryTextStyle: {
        marginLeft: 20,
        fontFamily: fonts.bold,
        color: Colors.BLACK,
        fontSize: 14,
      },
})

export default styles;
