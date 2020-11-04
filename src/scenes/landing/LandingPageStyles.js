import {StyleSheet, Dimensions} from 'react-native';
import {Colors} from '../../styles/index';
import {fonts, getHeightScale} from '../../constant/Utils';
import {Utils} from '../../constant';

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: Colors.LANDING_PAGE_COLOR,
    paddingTop: 50,
  },
  categoryViewStyle: {flexDirection: 'row', justifyContent: 'center'},
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
    marginLeft: Utils.getHeightScale(20),
    fontFamily: Utils.fonts.bold,
    color: Colors.BLACK,
    fontSize: 14,
  },
  flatPercentageImageStyle: {
    height: Utils.getHeightScale(64),
    backgroundColor: '#466F03',
    alignSelf: 'center',
    width: Dimensions.get('window').width - 40,
  },
  imageCategoryStyle: {
    width: Utils.getHeightScale(60),
    height: Utils.getHeightScale(60),
    borderRadius: 12,
  },
  categoryFlatListStyle: {
    height: Utils.getHeightScale(104),
    borderRadius: 12,
  },
  imageDailyEssentialStyle: {
    width: Utils.getWidthScale(55),
    height: Utils.getWidthScale(55),
    marginTop: Utils.getHeightScale(4),
    borderRadius: 12,
  },
  dailyEssentialViewStyle: {
    height: Utils.getHeightScale(110),
    width: Utils.getWidthScale(100),
    marginRight: 20,
    backgroundColor: Colors.WHITE,
    justifyContent:'center',
    borderRadius: 12,
    alignItems: 'center',
  },
  categoryItemStyle: {
    marginRight: 20,
    alignSelf: 'center',
    height: Utils.getHeightScale(80),
    backgroundColor: '#FFECC9',
    justifyContent: 'center',
    width: Utils.getWidthScale(80),
    alignItems: 'center',
    borderRadius: 12,
  },
  dailyEssentialTextStyle: {
    alignSelf: 'center',
    marginTop: 2,
    color: Colors.DAILY_ESSENTIAL_TEXT_STYLE,
    letterSpacing: 0.5,
    fontFamily: Utils.fonts.regular,
  },
  offTextStyle:{
    fontSize:12,
    fontFamily:Utils.fonts.bold,
    color:Colors.DAILY_ESSENTIAL_TEXT_STYLE
  },
  moreDiscountViewStyle:{
    width: Dimensions.get('window').width - 40,
   minHeight:getHeightScale(200),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius:12,
    marginTop:10,
    marginBottom:150,
  }
});

export default styles;
