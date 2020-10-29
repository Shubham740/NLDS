import React from 'react';
import {SafeAreaView, Text,View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import { Colors } from '../../styles/index';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { img_path } from '../../constant/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-native-elements'

export default function Header({ title, back }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.crt.cart);  
//   const backButton = () => {
//     const navigation = useNavigation();
//     return (
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//                 {/* <Image source={img_path.back} style={styles.backImage} resizeMode={'contain'} /> */}
//                 <Text>Back</Text>
//             </TouchableOpacity>
//             <Text>{title}</Text>
//         </View>
//     )
// }
const navigation = useNavigation();
  return (
    
    <View style={styles.headercontainer}>
             <View style={{flex:1,flexDirection:"row"}}>
       
             {/* <Image source={img_path.back} style={styles.backImage} resizeMode={'contain'} /> */}
             <TouchableOpacity style={styles.leftheader}>
                   <Icon name="long-arrow-left" size={25} color="#fff" onPress={() => navigation.goBack()}/>
                  <Text style={styles.headertitle}>{title}</Text> 
             </TouchableOpacity>

             <TouchableOpacity style={styles.rightheader}>
                   <Icon name="search" size={15} color="#fff" style={styles.headersearch} onPress={() => navigation.navigate('Shop')}/>
                   <Icon name="shopping-cart" size={15} color="#fff" options={{ tabBarBadge: 2 }} onPress={() => navigation.navigate('Cart')}/>
                   <Badge value={Object.keys(cart).length} status="success" containerStyle={styles.badgeStyle}/> 
             </TouchableOpacity>
  
             </View>
      </View>
  );

}


const styles = StyleSheet.create({
  badgeStyle: { 
    position: 'absolute',
    top: -8,
    right: -15
  },
  headertitle:{
     color: "white",
     marginLeft:15,
     fontSize:16,
     marginTop:5
  },
  headersearch:{
    marginRight: 18
  },
  headercontainer: { 
    flex: 1,
  backgroundColor: Colors.PRIMARY, 
    flexDirection: 'row', 
    alignContent: 'flex-end', 
   justifyContent: 'space-between',
  padding: 12
},
leftheader:{
  flexDirection: 'row', 
  width: 270
},
rightheader:{
  flexDirection: 'row', 
  marginTop:5
},
nacoLogo: { 
    //height: heightPercentageToDP(4.3), 
   // width: widthPercentageToDP(11.7)
},
backImage: { 
    height: heightPercentageToDP(1.4),
    width: widthPercentageToDP(5.3),
   // marginRight: AppStyles.horizontal10
  // height:20,
  // width:25
}
})