import {StyleSheet} from 'react-native';
import {Colors} from '../../styles/index';
import {fonts} from '../../constant/Utils';

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.LANDING_PAGE_COLOR,
    paddingTop: 50,
  },
  categoryViewStyle: { flexDirection: 'row', justifyContent: 'center'},
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
});

export default styles;
