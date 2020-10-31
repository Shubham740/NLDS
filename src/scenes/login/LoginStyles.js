import {StyleSheet} from 'react-native'
import {fonts} from '../../constant/Utils'

const styles = StyleSheet.create({
    parentView:{
        flex:1,
        marginHorizontal:20,
    },
    imageStyle:{
        width:172, 
        height:135,
        alignSelf:'center',
        marginTop:81
    },
    welcomeTextStyle:{
        fontSize:30,
        marginTop:76,
        marginLeft:12,
        fontFamily:fonts.bold
    },
    enterMobileNumberTextStyle:{
        fontSize:18,
        marginLeft:12,
        fontFamily:fonts.regular,
        marginTop:24
    }
})
export default styles;
