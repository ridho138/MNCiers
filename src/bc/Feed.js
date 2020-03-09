import React, {Component} from 'react';
import {View, Text, Button, Platform, TouchableOpacity} from 'react-native';

import {styles} from './styles/styles';

class Feed extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Feed</Text>
      </View>
    );
  }
}

export default Feed;
