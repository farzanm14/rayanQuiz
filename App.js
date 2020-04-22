import React, { Component } from 'react';
import { View ,Text} from 'react-native'
import AppNav from './AppNav'
import { Provider } from 'react-redux';
// import store from './app/redux';

const App = () => {
  console.disableYellowBox = true;
  return (
    <View style={{flex:1}}>
      {/* <Provider store={store}> */}
      <AppNav />
      {/* </Provider> */}
    </View>
  )
}
export default App
