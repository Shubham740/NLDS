import {StyleSheet} from 'react-native'
import {Colors} from '../../styles'
import {Utils} from '../../constant'
const styles = StyleSheet.create({
    parentView:{
        flex:1,
        marginHorizontal:35,
        marginTop:23
    },
    signUpStyle:{
        fontSize:30,
        color:Colors.SIGNUP_COLOR,
        fontFamily:Utils.fonts.bold
    },
    createAccountStyle:{
        fontSize:20,
        color:Colors.SIGNUP_COLOR,
        fontFamily:Utils.fonts.regular,
        marginTop:Utils.getHeightScale(13),
        letterSpacing:1
    }
})

export default styles;