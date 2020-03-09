import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {Constants} from '../utils/Constants';

// create a component
class SplashScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../components/images/logo-gold.png')}
          />
        </View>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR_BLUE,
  },
  loginContainer: {
    alignItems: 'center',
    // flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: 'white',
  },
});

//make this component available to the app
export default SplashScreen;
