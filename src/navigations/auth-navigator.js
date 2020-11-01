import {createStackNavigator} from 'react-navigation-stack';
import Home from '_scenes/home';

import LoginScreen from '../scenes/login/LoginScreen';

const AuthNavigatorConfig = {
  initialRouteName: 'Login',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Login: LoginScreen,
  Home: Home,
};

const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Home: Home,
  },
  AuthNavigatorConfig,
);

export default AuthNavigator;
