import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Card from '../components/components/Card';
import {toDate, toTime} from '../utils/Utils';

const AttendanceDetail = ({dataAbsen}) => {
  const {tanggal, istelat, masuk, pulang} = dataAbsen;
  return (
    // <Card>
    <View style={styles.container}>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Date</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{toDate(tanggal)}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>In</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{toTime(masuk)}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Status</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{istelat}</Text>
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.textStyle}>Out</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.textStyle}>{toTime(pulang)}</Text>
      </View>
    </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    //borderBottom
    // backgroundColor: "blue"
  },
  // content: {
  //   width: Dimensions.get("window").width / 4 - 10,
  //   padding: 5,
  // },
  contentTitle: {
    width: '20%',
    padding: 5,
  },
  content: {
    width: '30%',
    padding: 5,
  },
  textStyle: {
    color: '#06397B',
    fontSize: 13,
    fontWeight: '300',
  },
});

export default AttendanceDetail;
