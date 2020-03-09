import React, {useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {toDateTime} from '../utils/Utils';
import {useSelector} from 'react-redux';
import Card from '../components/components/Card';
import CardSection from '../components/components/CardSection';
import {Constants} from '../utils/Constants';
import {trackScreenView} from '../utils/Utils';

export default function NotificationDetail() {
  //Access Redux Store State
  const dataReducer = useSelector(state => state.dataNotification.data);
  const {ID, TITLE, MESSAGE, DATE, ISREAD} = dataReducer;

  useEffect(() => {
    trackScreenView('Notification Detail');
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <CardSection>
          <Text style={styles.title}>{TITLE}</Text>
        </CardSection>
        <CardSection>
          <Text style={styles.message}>{MESSAGE}</Text>
        </CardSection>
        <CardSection>
          <Text>{toDateTime(DATE)}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  message: {
    color: '#000',
  },
});
