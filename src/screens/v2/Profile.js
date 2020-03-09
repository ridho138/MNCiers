import React, {useState} from 'react';
import {Text, Button, Alert} from 'react-native';
import {getData, clearData} from '../../utils/Utils';
import {Constants} from '../../utils/Constants';
import {ServiceLogin} from '../../utils/Services';

import {AuthContext} from '../../navigator/Context';

export default function Profile() {
  const {signOut} = React.useContext(AuthContext);

  const logOut = async () => {
    const {uid, password} = await getData(Constants.KEY_DATA_USER);

    let dataUser = {
      uid: uid,
      password: password,
      registrationId: '',
    };
    const logout = await ServiceLogin(dataUser, '0');

    if (logout.status === 'SUCCESS') {
      await clearData('fcmToken');
      signOut();
    } else {
      Alert.alert('Error', logout);
    }
  };
  return <Button title="LOGOUT" onPress={() => logOut()} />;
}
