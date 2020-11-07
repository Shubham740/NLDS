import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../home';
import AboutScreen from '../about';
import CartScreen from '../cart';
import CategoriesScreen from '../categories';
import PrivacyPolicyScreen from '../privacy policy';
import ConsultancyScreen from '../consultancy';
import ServicesScreen from '../services';
import CategoryProductsScreen from '../category products';
import Product from '../product';
import LoginScreen from '../login/LoginScreen';
import OtpVerification from '../otpVerify/OtpVerification';
import {SignUpScreen} from '../signup';
import {SignUpScreen2} from '../signup';

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

import GlobalFont from 'react-native-global-font';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {img_path} from '../../constant/images';

//declare const global: {HermesInternal: null | {}};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Define a color for toolbar
global.backgroundColor = 'red';

export default class Root extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let fontName = 'SourceSansPro-Light';
    GlobalFont.applyGlobal(fontName);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUpScreen" headerMode="none">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="SignUpScreen2" component={SignUpScreen2} />
          <Stack.Screen name="OtpVerification" component={OtpVerification} />
          <Stack.Screen name="NeedLife Store" component={HomeScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Services" component={ServicesScreen} />
          <Stack.Screen name="Consultancy" component={ConsultancyScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
          <Stack.Screen
            name="Category Products"
            component={CategoryProductsScreen}
          />
          <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
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
    backgroundColor: 'black',
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
    backgroundColor: 'red',
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
