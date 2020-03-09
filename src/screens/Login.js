import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import TextInput from 'react-native-textinput-with-icons';
import {ServiceLogin} from '../utils/Services';
import Loader from '../components/components/Loader';
import {Constants} from '../utils/Constants';
import {AuthContext} from '../navigator/Context';
import PushNotification from 'react-native-push-notification';
import iid from '@react-native-firebase/iid';
import {trackScreenView} from '../utils/Utils';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState();
  const [password, setPassword] = useState();

  const {signIn} = React.useContext(AuthContext);

  useEffect(() => {
    console.log('useEffect');
    checkPermission;
    configure;
    trackScreenView('LOGIN');
  }, []);

  const configure = async () => {
    await PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      //onRegister: onRegister, //this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification: onNotif, //this._onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: Constants.senderID,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  };

  const checkPermission = () => {
    return PushNotification.checkPermissions();
  };

  const onNotif = notif => {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  };

  const logIn = async () => {
    setIsLoading(true);
    if (uid !== '' && password !== '') {
      const id = await iid().getToken();
      const dataUser = {
        uid: uid,
        password: password,
        registrationId: id,
      };
      console.log(dataUser);
      const login = await ServiceLogin(dataUser, '1');
      setIsLoading(false);
      //console.log(login);
      if (login.status === 'SUCCESS') {
        signIn();
      } else {
        Alert.alert('Error', login.status);
      }
    } else {
      setIsLoading(false);
      Alert.alert('Error', 'NIK and/or Password cannot be empty.');
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Loader loading={isLoading} />

      <View style={styles.loginContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../components/images/logo-gold.png')}
        />
      </View>
      <View style={styles.formContainer}>
        <StatusBar barStyle="light-content" />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          keyboardType="numeric"
          label="NIK"
          labelColor="#fff"
          color="#fff"
          activeColor="#fff"
          underlineColor="#fff"
          onChangeText={value => setUid(value)}
          value={uid}
        />

        <TextInput
          style={styles.input}
          label="Password"
          labelColor="#fff"
          color="#fff"
          activeColor="#fff"
          underlineColor="#fff"
          secureTextEntry
          onChangeText={value => setPassword(value)}
          value={password}
        />
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: Dimensions.get('window').width - 50,
          }}>
          <CheckBox
            title="Remember me"
            checked={checked}
            containerStyle={{backgroundColor: undefined, borderWidth: 0}}
            textStyle={{color: '#fff'}}
            checkedColor="#fff"
            uncheckedColor="#fff"
            onPress={() => setChecked(!checked)}
          />
        </View> */}

        <TouchableOpacity style={styles.buttonContainer} onPress={logIn}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
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
    justifyContent: 'flex-end',
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100,
  },
  title: {
    color: '#FFF',
    marginTop: 120,
    width: 180,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    flex: 2,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 60,
    width: Dimensions.get('window').width - 50,
    // backgroundColor: "#fff",
    // marginBottom: 30,
    // padding: 10,
    // color: "#000",
    // borderRadius: 30
  },
  buttonContainer: {
    backgroundColor: '#997A2D',
    borderRadius: 30,
    paddingVertical: 8,
    width: 150,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
