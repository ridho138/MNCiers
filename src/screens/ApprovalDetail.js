/* eslint-disable react-native/no-inline-styles */
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
import {Constants} from '../utils/Constants';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import {trackScreenView} from '../utils/Utils';

export default function ApprovalDetail({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [voidReason, setVoidReason] = useState('');
  const dataReducer = useSelector(state => state.dataApproval.data);
  const {
    id,
    request_date,
    request_by,
    remarks,
    takeover,
    category_desc,
    status_approval,
  } = dataReducer;

  useEffect(() => {
    trackScreenView('Approval Form Request');
  }, []);

  const onButtonPress = status => {
    Alert.alert(
      'CONFIRMATION',
      `${status} THIS REQUEST?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => onConfirm(id, status_approval, status),
        },
      ],
      {cancelable: false},
    );
  };

  const onConfirm = async status => {
    setIsLoading(true);
    setIsDialogVisible(false);
    let approve_type;
    if (status_approval === 'PENDING MANAGER') {
      approve_type = 'MANAGER';
    } else if (status_approval === 'PENDING PIC SUPPORT MANAGER') {
      approve_type = 'TAKEOVER MANAGER';
    }
    const update = await serviceUpdateApproval(
      id,
      approve_type,
      status,
      voidReason,
      'Form Request',
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
          <Text style={styles.title}>{category_desc}</Text>
        </CardSection>
        <CardSection>
          <View style={styles.view01}>
            <Text style={styles.message}>Ticket No. {id}</Text>
            <Text style={styles.message}>Status {status_approval}</Text>
            <Text style={styles.message}>Request By {request_by}</Text>
            <Text style={styles.message}>Takeover by {takeover}</Text>
          </View>
        </CardSection>
        <CardSection>
          <Text style={styles.message}>{remarks}</Text>
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
