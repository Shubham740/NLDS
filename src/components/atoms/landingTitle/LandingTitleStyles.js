const { StyleSheet } = require("react-native");
import {Colors} from '../../../styles';
import {Utils} from '../../../constant/';

const styles = StyleSheet.create({
    viewAllTextStyle: {
        fontSize: 12,
        fontFamily: Utils.fonts.bold,
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
        fontFamily: Utils.fonts.bold,
        color: Colors.LANDING_PAG_TITLE_SCREEN,
        fontSize: 14,
      },
})

export default styles;
