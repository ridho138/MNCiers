import React, {Component} from 'react';
import {View, Text, Button, Platform, TouchableOpacity} from 'react-native';
import {styles} from './styles/styles';

class Login extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Login</Text>
        {Platform.select({
          ios: (
            <Button
              title="Login"
              onPress={() =>
                this.props.navigation.navigate('Main', {
                  screenName: 'Home Screen',
                })
              }
            />
          ),
          android: (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Main', {
                  screenName: 'Home Screen',
                })
              }>
              <Text style={styles.androidButtonText}>Login</Text>
            </TouchableOpacity>
          ),
        })}
      </View>
    );
  }
}

export default Login;
