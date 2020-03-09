import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import {toDateTime} from '../utils/Utils';
import Card from '../components/components/Card';
import CardSection from '../components/components/CardSection';
import {useSelector} from 'react-redux';
import Button from '../components/components/Button';
import {serviceUpdateApproval} from '../utils/Services';
import Loader from '../components/components/Loader';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {Constants} from '../utils/Constants';
import {trackScreenView} from '../utils/Utils';

export default function ApprovalEntertain({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [voidReason, setVoidReason] = useState('');
  const dataReducer = useSelector(state => state.dataApproval.data);
  const {id, request_date, request_by, remarks, amount} = dataReducer;
  useEffect(() => {
    trackScreenView('Approval Form Entertain');
  }, []);
  const onButtonPress = status => {
    Alert.alert(
      'Confirmation',
      `${status} this request?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => onConfirm(status),
        },
      ],
      {cancelable: false},
    );
  };

  const onConfirm = async status => {
    setIsLoading(true);
    setIsDialogVisible(false);

    const update = await serviceUpdateApproval(
      id,
      'MANAGER',
      status,
      voidReason,
      'Form Entertain',
    );
    setIsLoading(false);

    if (update.includes('SUCCESS')) {
      navigation.navigate('Approval', {
        itemId: Math.floor(Math.random() * 100) + 1,
      });
    } else {
      Alert.alert('Error!', update);
    }
  };

  const setModalVisible = visible => {
    setIsDialogVisible(visible);
  };

  return (
    <ScrollView style={styles.container}>
      <Loader loading={isLoading} />
      <ConfirmDialog
        title="Void this request?"
        visible={isDialogVisible}
        animationType="fade"
        onTouchOutside={() => setIsDialogVisible(true)}
        positiveButton={{
          title: 'OK',
          onPress: () => onConfirm('VOID'),
        }}
        negativeButton={{
          title: 'Cancel',
          onPress: () => setIsDialogVisible(false),
        }}>
        <View>
          <TextInput
            style={{borderBottomColor: 'grey', borderBottomWidth: 1}}
            placeholder="Reason"
            onChangeText={value => {
              setVoidReason(value);
            }}
          />
        </View>
      </ConfirmDialog>
      <Card>
        <CardSection>
          <View style={styles.view01}>
            <Text style={styles.message}>Ticket No. {id}</Text>
            <Text style={styles.message}>Request By {request_by}</Text>
          </View>
        </CardSection>
        <CardSection>
          <View style={styles.view01}>
            <Text style={styles.message}>{remarks}</Text>
            <Text style={styles.message}>Amount: {amount}</Text>
            {/* <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
          </View>
        </CardSection>
        <CardSection>
          <Text>{toDateTime(request_date)}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={() => onButtonPress('APPROVE')}>APPROVE</Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => setModalVisible(true)}>VOID</Button>
        </CardSection>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR_LIGHT,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  message: {
    color: '#000',
  },
});
