import {createBottomTabNavigator} from 'react-navigation-tabs';

import Home from '_scenes/home';
import AboutScreen from '_scenes/about';

const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home: {
    screen: Home,
  },
  About: {
    screen: AboutScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
