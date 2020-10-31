
import React , {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../home';
import AboutScreen from '../about';
import CartScreen from '../cart';
import CategoriesScreen from '../categories';
import PrivacyPolicyScreen from '../privacy policy'
import ConsultancyScreen from '../consultancy';
import ServicesScreen from '../services'
import CategoryProductsScreen from '../category products'
import Product from '../product'
import LoginScreen from '../login/index'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import GlobalFont from 'react-native-global-font'

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { img_path } from '../../constant/images';


//declare const global: {HermesInternal: null | {}};

const Drawer = createDrawerNavigator();

//Define a color for toolbar
global.backgroundColor = 'red';

export default class Root extends Component { 
  constructor(props) {
    super(props)
  } 

  componentDidMount() {
    let fontName = 'SourceSansPro-Light'
    GlobalFont.applyGlobal(fontName)
}

render(){
  
  return (
     <NavigationContainer>
      <Drawer.Navigator initialRouteName="LoginScreen">
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />

        <Drawer.Screen name="NeedLife Store" component={HomeScreen} />
        <Drawer.Screen name="Categories" component={CategoriesScreen} />
        <Drawer.Screen name="Services" component={ServicesScreen} />
        <Drawer.Screen name="Consultancy" component={ConsultancyScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
        <Drawer.Screen name="Category Products" component={CategoryProductsScreen} />
        <Drawer.Screen name="Product" component={Product} />
      </Drawer.Navigator>
      {/* <Cat />
      <View style={styles.container}>
      <Text onPress={this.abc} style={styles.xyz}>kkk</Text>
      <Image
          source={img_path.logo}
          style={{ width: 120, height: 60 , borderRadius: 10}}
        /> 
      </View> */}
    </NavigationContainer>
  );
}

}



const styles = StyleSheet.create({
   container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black",
    marginTop: 5,
  },
//   scrollView: {
//     //backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
  body: {
    backgroundColor: "red",
  },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
});


