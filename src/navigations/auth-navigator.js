import {createStackNavigator} from 'react-navigation-stack';
import Home from '_scenes/home';

import LoginScreen from '../scenes/login/LoginScreen';
import OtpVerification from '../scenes/otpVerify/OtpVerification'

const AuthNavigatorConfig = {
  initialRouteName: 'OtpVerification',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Login: LoginScreen,
  OtpVerification:OtpVerification,
  Home: Home,
};

const AuthNavigator = createStackNavigator(
  {
  OtpVerification:OtpVerification,
    Login: LoginScreen,
    Home: Home,
  },
  AuthNavigatorConfig,
);

export default AuthNavigator;
