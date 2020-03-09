import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Constants} from '../utils/Constants';
import {clearData, getData, setData} from '../utils/Utils';
import Card from '../components/components/Card';
import CardSection from '../components/components/CardSection';
import Button from '../components/components/Button';
import {ServiceLogin} from '../utils/Services';

import {AuthContext} from '../navigator/Context';
import iid from '@react-native-firebase/iid';
import {trackScreenView} from '../utils/Utils';

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [departement, setDeperetement] = useState('');
  const [position, setPosition] = useState('');

  const {signOut} = React.useContext(AuthContext);

  const setProfileData = async () => {
    const Profile = await getData(Constants.KEY_DATA_USER);
    const {FULLNAME, EMAIL, DEPARTMENT, POSITION} = Profile.profile;
    setFullName(FULLNAME);
    setEmail(EMAIL);
    setDeperetement(DEPARTMENT);
    setPosition(POSITION);
  };

  const onButtonPress = async () => {
    await iid().deleteToken();
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

  useEffect(() => {
    setProfileData();
    trackScreenView('PROFILE');
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <CardSection>
          <View style={styles.cardContainer}>
            <View style={styles.leftContent}>
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                }}
              />
            </View>

            <View style={styles.rightContent}>
              <Text style={styles.name}>{fullname}</Text>
              <Text style={styles.userInfo}>{email}</Text>
              <Text style={styles.userInfo}>
                {departement} / {position}
              </Text>
            </View>
          </View>
        </CardSection>
        <CardSection>
          <Button onPress={() => onButtonPress()}>LOG OUT</Button>
        </CardSection>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR_LIGHT,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    //width: Dimensions.get("window").width / 2 - 10,
    padding: 5,
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
    fontSize: 18,
    color: '#06397B',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 12,
    color: '#06397B',
  },
});

// export default Profile;
