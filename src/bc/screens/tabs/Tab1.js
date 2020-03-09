import React, {Component} from 'react';
import {View, Text, Button, Platform, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/styles.js';

class Tab1 extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Tab 1</Text>
        <Button
          title="Go to Detail"
          onPress={() =>
            this.props.navigation.navigate('Detail', {
              screenName: 'My Detail Screen',
            })
          }
        />
        <Button
          title="Logout"
          onPress={() =>
            this.props.navigation.navigate('Login', {
              screenName: 'My Detail Screen',
            })
          }
        />
      </View>
    );
  }
}

export default Tab1;
