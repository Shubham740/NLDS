import { exp } from "react-native-reanimated";

export const fonts = {
    regular: "Quicksand",
    bold: "Quicksand-Bold",
  };

  export function validatePhoneNumber(phoneNumber){
    return (phoneNumber.trim().length==10)?true:false
  }