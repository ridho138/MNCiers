/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from '../utils/Constants';

export default function Home({navigation}) {
  const showAlert = (title, body) => {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };

  const onMenuPress = key => {
    if (key !== '') {
      navigation.push(key);
    } else {
      showAlert('Coming Soon!', 'This feature still under construction.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.card} onPress={() => onMenuPress('')}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <Icon name="line-chart" color="#06397B" size={30}>
                {/* <Text>Daily Production</Text>     */}
              </Icon>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <Text style={styles.textTitle}>Daily Production</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => onMenuPress('')}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <Icon name="bar-chart" color="#06397B" size={30}>
                {/* <Text>Daily Production</Text>     */}
              </Icon>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.textTitle}>Daily Claim</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => onMenuPress('Attendance')}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <Icon name="calendar" color="#06397B" size={30}>
                {/* <Text>Daily Production</Text>     */}
              </Icon>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.textTitle}>Attendance</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => onMenuPress('Staff Contact')}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <Icon name="address-book" color="#06397B" size={30}>
                {/* <Text>Daily Production</Text>     */}
              </Icon>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.textTitle}>Staff Contact</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => onMenuPress('')}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <Icon name="building" color="#06397B" size={30}>
                {/* <Text>Daily Production</Text>     */}
              </Icon>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <Text style={styles.textTitle}>Branch</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => onMenuPress('Approval')}>
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
              }}>
              <Icon name="tasks" color="#06397B" size={30}>
                {/* <Text>Daily Production</Text>     */}
              </Icon>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
              <Text style={styles.textTitle}>Approval</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 10,
          //margin: 10,
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{flex: 1, width: '100%', borderRadius: 25}}
          source={require('../components/images/image-2.jpg')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR_LIGHT,
  },
  menu: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    margin: 5,
    borderRadius: (Dimensions.get('window').width / 3 - 15) / 2,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
    width: Dimensions.get('window').width / 3 - 15,
    height: Dimensions.get('window').width / 3 - 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: '#06397B',
    fontSize: 9,
  },
});
