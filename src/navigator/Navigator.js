import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';
import Attendance from '../screens/Attendance';
import StaffContact from '../screens/StaffContact';
import NotificationDetail from '../screens/NotificationDetail';
import Approval from '../screens/Approval';
import ApprovalDetail from '../screens/ApprovalDetail';
import ApprovalEntertain from '../screens/ApproveEntertain';

const Stack = createStackNavigator();
const MaterialTopTabs = createMaterialTopTabNavigator();
const LoginStack = createStackNavigator();

export default class Navigator extends Component {
  createLoginStack = () => {
    return (
      <LoginStack.Navigator headerMode="none">
        <LoginStack.Screen name="Login" component={Login} />
        <LoginStack.Screen name="Home" children={this.createHomeStack} />
      </LoginStack.Navigator>
    );
  };

  createHomeStack = props => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" children={this.createTopTabs} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Staff Contact" component={StaffContact} />
        <Stack.Screen name="News Detail" component={NotificationDetail} />
        <Stack.Screen name="Approval" component={Approval} />
        <Stack.Screen name="Approval Request" component={ApprovalDetail} />
        <Stack.Screen name="Approval Entertain" component={ApprovalEntertain} />
      </Stack.Navigator>
    );
  };

  createTopTabs = props => {
    return (
      <MaterialTopTabs.Navigator>
        <MaterialTopTabs.Screen name="Home" component={Home} />
        <MaterialTopTabs.Screen name="Profile" component={Profile} />
        <MaterialTopTabs.Screen name="News" component={Notification} />
      </MaterialTopTabs.Navigator>
    );
  };

  render() {
    return <NavigationContainer>{this.createLoginStack()}</NavigationContainer>;
  }
}
