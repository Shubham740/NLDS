/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
//import root from './src/scenes/root/index';
import Root from './src/scenes/root/index';

const App = () => {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
};


export default App;

