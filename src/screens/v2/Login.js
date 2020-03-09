import React, {useState} from 'react';
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
import Loader from '../../components/components/Loader';
import {CheckBox} from 'react-native-elements';
import {AuthContext} from '../../navigator/Context';
import {ServiceLogin} from '../../utils/Services';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState();
  const [password, setPassword] = useState();
  const [registrationId, setRegistrationId] = useState();

  const {signIn} = React.useContext(AuthContext);

  const logIn = async () => {
    setIsLoading(true);
    if (uid !== '' && password !== '') {
      const dataUser = {
        uid: uid,
        password: password,
        registrationId: registrationId,
      };

      const login = await ServiceLogin(dataUser, '1');
      setIsLoading(false);

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
          source={require('../../components/images/logo-white.png')}
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
    backgroundColor: '#06397B',
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
