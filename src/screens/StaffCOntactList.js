import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const StaffContactList = ({dataStaffContact}) => {
  const {
    UCODE,
    FULLNAME,
    branch,
    mobile_no,
    email,
    department,
    position,
    line_ext,
    BIT,
  } = dataStaffContact;
  const img =
    BIT === ''
      ? 'https://bootdey.com/img/Content/avatar/avatar6.png'
      : `data:image/png;base64,${BIT}`;
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          style={styles.avatar}
          source={{
            uri: img,
            //uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
          }}
        />
      </View>

      <View style={styles.rightContent}>
        <Text style={styles.name}>{FULLNAME}</Text>
        <Text style={styles.userInfo}>{email}</Text>
        <Text style={styles.userInfo}>
          {department} / {position}
        </Text>
        <Text style={styles.userInfo}>
          {mobile_no} / {line_ext}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  leftContent: {
    padding: 5,
    width: '30%',
  },
  rightContent: {
    padding: 10,
    width: '70%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 1,
    borderColor: '#06397B',
  },
  name: {
    fontSize: 14,
    color: '#06397B',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 12,
    color: '#06397B',
  },
});

export default StaffContactList;
