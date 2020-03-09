import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Navigator from './src/navigator/Navigator';
import Navigatorx from './src/navigator/Navigatorx';
import {Provider} from 'react-redux';
import store from './src/store/Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigatorx />
      </Provider>
    );
  }
}
