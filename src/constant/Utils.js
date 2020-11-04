
import {Dimensions} from 'react-native'

export const fonts = {
    regular: "Quicksand",
    bold: "Quicksand-Bold",
  };
  export const STANDARD_WIDTH=375.0;
  export const STANDARD_HEIGHT=767.0;

  const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;

  export function validatePhoneNumber(phoneNumber){
    return (phoneNumber.trim().length==10)?true:false
  }

  export function getDummyCategoryList(){
    let dummyList = [];
      for(let count =0 ;count<100; count++){
        dummyList.push(count)
      }
      return dummyList;
  }
  export function getDummyDiscountList(){
    let dummyList = [];
      for(let count =0 ;count<100; count++){
        dummyList.push(count)
      }
      return dummyList;
  }


  /**
 * this method is used to get the width scale
 * @param {*} dimensions : it contains the dimensions
 */
export function getWidthScale(dimensions) {
  return (dimensions / STANDARD_WIDTH) * myWidth;
}
/**
 * this method is used to get the height scale
 * @param {*} dimensions : it contains the dimensions.
 */
export function getHeightScale(dimensions) {
  return (dimensions / STANDARD_HEIGHT) * myHeight;
}


