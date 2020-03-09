/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Icon} from 'react-native-elements';

import {AuthContext} from './Context';

import SplashScreen from '../screens/SplashScreen';
// import Login from '../screens/v2/Login';
import Login from '../screens/Login';
// import Home from '../screens/v2/Home';
//import Home from '../screens/Home';
import Notification from '../screens/Notification';
// import Notification from '../screens/v2/Notification';
// import Profile from '../screens/v2/Profile';
import Profile from '../screens/Profile';
import Attendance from '../screens/Attendance';
import StaffContact from '../screens/StaffContact';
import NotificationDetail from '../screens/NotificationDetail';
import Approval from '../screens/Approval';
import ApprovalDetail from '../screens/ApprovalDetail';
import ApprovalEntertain from '../screens/ApproveEntertain';
import HomeTest from '../screens/HomeTest';

import {getData} from '../utils/Utils';
import {Constants} from '../utils/Constants';

const LogoTitle = () => {
  return (
    <Image
      resizeMode="contain"
      style={{width: 150, height: 50}}
      source={require('../components/images/logo-gold.png')}
    />
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{title: 'Log In'}}
    />
  </AuthStack.Navigator>
);

// const MaterialTopTabs = createMaterialTopTabNavigator();
// const createTopTabs = () => {
//   return (
//     <MaterialTopTabs.Navigator
//       backBehavior="none"
//       tabBarOptions={{
//         labelStyle: {fontSize: 9},
//         style: {backgroundColor: Constants.BG_COLOR_BLUE},
//         showIcon: true,
//         activeTintColor: '#FFFFFF',
//         inactiveTintColor: '#aeaeae',
//         indicatorStyle: {
//           borderBottomColor: '#F8F8F8',
//           borderBottomWidth: 1,
//         },
//       }}>
//       <MaterialTopTabs.Screen
//         name="Home"
//         component={HomeTest}
//         options={{
//           tabBarIcon: props => (
//             <Icon name="compass" color={props.color} size={25} />
//           ),
//         }}
//       />
//       <MaterialTopTabs.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: props => (
//             <Icon name="user-circle" color={props.color} size={25} />
//           ),
//         }}
//       />
//       <MaterialTopTabs.Screen
//         name="News"
//         component={Notification}
//         options={{
//           tabBarIcon: props => (
//             <Icon name="envelope" color={props.color} size={25} />
//           ),
//         }}
//       />
//     </MaterialTopTabs.Navigator>
//   );
// };

const MainStack = createStackNavigator();
const MainStackkScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      animationEnabled: false,
      headerStyle: {
        backgroundColor: Constants.BG_COLOR_BLUE,
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerTintColor: '#fff',
    }}>
    <MainStack.Screen
      name="Home"
      children={HomeTest}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerStyle: {
          backgroundColor: Constants.BG_COLOR_BLUE,
        },
      }}
    />
    <MainStack.Screen name="Profile" component={Profile} />
    <MainStack.Screen name="News" component={Notification} />
    <MainStack.Screen
      name="Notification Detail"
      component={NotificationDetail}
    />
    <MainStack.Screen name="Attendance" component={Attendance} />
    <MainStack.Screen name="Staff Contact" component={StaffContact} />
    <MainStack.Screen name="Approval" component={Approval} />
    <MainStack.Screen name="Approval Request" component={ApprovalDetail} />
    <MainStack.Screen name="Approval Entertain" component={ApprovalEntertain} />
  </MainStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator
    backBehavior="initialRoute"
    drawerPosition="right"
    drawerType="back">
    <Drawer.Screen name="Home" component={HomeTest} />
    <Drawer.Screen name="Attendance" component={Attendance} />
    <Drawer.Screen name="Staff Contact" component={StaffContact} />
    <Drawer.Screen name="Approval" component={Approval} />
    <Drawer.Screen name="News" component={Notification} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator
    headerMode="none"
    screenOptions={{
      animationEnabled: false,
    }}>
    {userToken ? (
      <RootStack.Screen name="App" component={MainStackkScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [userToken, setUserToken] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken(true);
      },
      signUp: () => {
        setUserToken(true);
      },
      signOut: () => {
        setUserToken(false);
      },
    };
  }, []);

  const isLogin = async () => {
    const DataLogin = await getData(Constants.KEY_DATA_USER);
    DataLogin.isLogin === '1' ? setUserToken(true) : setUserToken(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    isLogin();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
