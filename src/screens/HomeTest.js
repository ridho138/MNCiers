/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Constants} from '../utils/Constants';
import {Icon} from 'react-native-elements';

export default function HomeTest({navigation}) {
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

  const HeaderButton = () => {
    return (
      <View style={{flexDirection: 'row', marginRight: 20}}>
        <TouchableOpacity style={{marginRight: 20}}>
          <Icon
            name="person"
            type="MaterialIcons"
            color="#997A2D"
            onPress={() => navigation.push('Profile')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon
            name="mail-outline"
            type="MaterialIcons"
            color="#997A2D"
            onPress={() => navigation.push('News')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton />,
    });
  }, []);

  const data = [
    {
      name: 'MV',
      production: 125,
      color: '#C18149',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'FR',
      production: 112.65,
      color: '#3218ED',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'MC',
      production: 100,
      color: '#5B8946',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'PA',
      production: 85,
      color: '#F1C019',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'Others',
      production: 57,
      color: '#D156A4',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
  ];

  const dataClaim = [
    {
      name: 'MV',
      claim: 55,
      color: '#C18149',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'FR',
      claim: 15,
      color: '#3218ED',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'MC',
      claim: 23,
      color: '#5B8946',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'PA',
      claim: 4.56,
      color: '#F1C019',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
    {
      name: 'Others',
      claim: 3.65,
      color: '#D156A4',
      legendFontColor: '#143360',
      legendFontSize: 15,
    },
  ];

  const screenWidth = Dimensions.get('window').width - 40;
  const screenHeigth = Dimensions.get('window').height / 4;
  const chartConfig = {
    // backgroundColor: '#143360',
    // backgroundGradientFrom: '#143360',
    // backgroundGradientTo: '#e7eaef',
    // decimalPlaces: 2, // optional, defaults to 2dp
    color: () => '#143360',
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#143360',
    },
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          //flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          //   backgroundColor: 'red',
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#d0d6df'}]}
            onPress={() => onMenuPress('')}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="pie-chart" type="MaterialIcons" color="#143360" />
              <Text style={styles.buttonText}>Production Report Test</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#d0d6df'}]}
            onPress={() => onMenuPress('')}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="insert-chart" type="MaterialIcons" color="#143360" />
              <Text style={styles.buttonText}>Claim Report</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#d0d6df'}]}
            onPress={() => onMenuPress('Attendance')}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="alarm" type="MaterialIcons" color="#143360" />
              <Text style={styles.buttonText}>Attendance</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#d0d6df'}]}
            onPress={() => onMenuPress('Staff Contact')}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="contacts" type="MaterialIcons" color="#143360" />
              <Text style={styles.buttonText}>Satff Contact</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#d0d6df'}]}
            onPress={() => onMenuPress('')}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="business" type="MaterialIcons" color="#143360" />
              <Text style={styles.buttonText}>Branches</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#d0d6df'}]}
            onPress={() => onMenuPress('Approval')}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="playlist-add-check"
                type="MaterialIcons"
                color="#143360"
              />
              <Text style={styles.buttonText}>Approval</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.boxChart}>
        <View style={styles.boxTitle}>
          <Text style={styles.titleText}>Attendance - Month To Date</Text>
        </View>
        <View
          style={{
            backgroundColor: '#d0d6df',
            paddingBottom: 15,
            paddingTop: 15,
          }}>
          <Text
            style={{fontWeight: 'bold', textAlign: 'left', paddingLeft: 10}}>
            You've come late 5 times this month
          </Text>
        </View>
      </View> */}

      <View style={styles.boxChart}>
        <View style={styles.boxTitle}>
          <Text style={styles.titleText}>
            Production Summary - YTD (2020) - in million
          </Text>
        </View>
        <PieChart
          data={data}
          width={screenWidth}
          height={screenHeigth}
          chartConfig={chartConfig}
          accessor="production"
          backgroundColor="#d0d6df"
          paddingLeft="15"
          absolute
        />
      </View>
      <View style={styles.boxChart}>
        <View style={styles.boxTitle}>
          <Text style={styles.titleText}>
            Claim Summary - YTD (2020) - in million
          </Text>
        </View>
        <PieChart
          data={dataClaim}
          width={screenWidth}
          height={screenHeigth}
          chartConfig={chartConfig}
          accessor="claim"
          backgroundColor="#d0d6df"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Constants.BG_COLOR_LIGHT,
  },
  boxTitle: {
    backgroundColor: '#143360',
    padding: 10,
    // borderRadius: 10,
  },
  titleText: {
    color: '#fff',
  },
  boxChart: {
    //flex: 2,
    paddingTop: 15,
  },
  chart: {
    backgroundColor: '#d0d6df',
  },
  buttonContainer: {
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    padding: 5,
    borderRadius: 20,
    borderColor: '#a1adbf',
    borderWidth: 1,
    elevation: 5,
    //width: (Dimensions.get('window').width - 60) / 2,
  },
  buttonText: {
    color: '#143360',
    marginLeft: 5,
  },
});
