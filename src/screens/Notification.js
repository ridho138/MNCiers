import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  serviceGetNotificationsList,
  serviceUpdateNotification,
} from '../utils/Services';
import Loader from '../components/components/Loader';
import {toDateTime} from '../utils/Utils';
import {useDispatch} from 'react-redux';
import {fetchNotification} from '../actions/index';
import {Constants} from '../utils/Constants';
import {trackScreenView} from '../utils/Utils';

export default function Notification({navigation}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dataNotifications, setDataNotifications] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getNotificationList();
    trackScreenView('Notification');
  }, []);

  const getNotificationList = async () => {
    const NotificationList = await serviceGetNotificationsList();
    if (NotificationList !== 'error') {
      setDataNotifications(NotificationList);
    }
    setIsRefreshing(false);
  };

  const _onRefresh = () => {
    setIsRefreshing(true);
    getNotificationList();
  };

  const onButtonPress = async item => {
    setIsLoading(true);

    if (item.ISREAD === '0') {
      const updateNotif = await serviceUpdateNotification(item.ID);
      await getNotificationList();
      if (!updateNotif.includes('SUCCESS')) {
        Alert.alert(updateNotif);
      }
    }

    dispatch(fetchNotification(item));

    setIsLoading(false);

    navigation.push('Notification Detail');
  };

  const renderNotification = item => {
    const {ISREAD, TITLE, MESSAGE, DATE} = item;

    return (
      <TouchableOpacity
        style={styles.flatlistRow}
        onPress={() => onButtonPress(item)}>
        <View
          style={
            ISREAD == '0' ? styles.leftContentNRead : styles.leftContentRead
          }
        />
        <View style={styles.rightContent}>
          <Text style={styles.title}>{TITLE} </Text>
          <Text style={styles.date}>{toDateTime(DATE)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={_onRefresh} />
      }>
      <Loader loading={isLoading} />
      <FlatList
        data={dataNotifications}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderNotification(item)}
        keyExtractor={item => item.ID.toString()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.BG_COLOR_LIGHT,
  },
  flatlistRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  title: {
    color: '#000',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  description: {
    color: '#000',
    justifyContent: 'center',
    fontSize: 15,
  },
  date: {
    marginTop: 5,
    color: 'grey',
    justifyContent: 'center',
    fontSize: 13,
  },
  leftContentRead: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06397B',
    width: 3,
  },
  leftContentNRead: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 3,
  },
  rightContent: {
    flexDirection: 'column',
    paddingLeft: 5,
  },
});
