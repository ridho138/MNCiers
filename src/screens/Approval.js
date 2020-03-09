import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  RefreshControl,
} from 'react-native';
import {serviceGetApprovalList} from '../utils/Services';
import Loader from '../components/components/Loader';
import {toDateTime} from '../utils/Utils';
import {useDispatch} from 'react-redux';
import {fetchApproval} from '../actions/index';
import Card from '../components/components/Card';
import CardSection from '../components/components/CardSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Constants} from '../utils/Constants';
import {trackScreenView} from '../utils/Utils';

export default function Approval({route, navigation}) {
  const {itemId} = route.params ? route.params : '';
  const dispatch = useDispatch();
  const [dataApproval, setDataApproval] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    onSearchPress();
    trackScreenView('Approval');
  }, [itemId]);

  const getApprovalList = async () => {
    const approvalList = await serviceGetApprovalList(keyword);
    if (approvalList !== 'error') {
      setDataApproval(approvalList);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  };

  const _onRefresh = () => {
    setIsRefreshing(true);
    getApprovalList();
  };

  const onButtonPress = item => {
    dispatch(fetchApproval(item));
    if (item.TYPE === 'FORM REQUEST') {
      navigation.push('Approval Request');
    } else if (item.TYPE === 'FORM ENTERTAIN') {
      navigation.push('Approval Entertain');
    }
  };

  const onSearchPress = () => {
    setIsLoading(true);
    getApprovalList();
  };

  return (
    <View style={styles.container}>
      <Card>
        <CardSection>
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#ddd"
            />
            <TextInput
              style={styles.input}
              placeholder="Keyword"
              onChangeText={value => {
                setKeyword(value);
              }}
              underlineColorAndroid="transparent"
            />
            <Icon
              style={styles.searchIcon}
              name="arrow-right"
              size={25}
              color="#06397B"
              onPress={() => onSearchPress()}
            />
          </View>
        </CardSection>
      </Card>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={_onRefresh} />
        }>
        <Loader loading={isLoading} />

        <FlatList
          data={dataApproval}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => onButtonPress(item)}>
              <View style={styles.content}>
                <Text style={styles.txtContent}>{item.TYPE}</Text>
                <Text style={styles.txtContent}>Ticket No : {item.id}</Text>
                <Text style={styles.txtContent}>
                  Request By : {item.request_by}
                </Text>
                <Text style={styles.txtDate}>
                  {toDateTime(item.request_date)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constants.BG_COLOR_LIGHT,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  content: {
    padding: 10,
    width: '80%',
  },
  txtType: {
    color: '#000',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  txtContent: {
    color: '#000',
    justifyContent: 'center',
    fontSize: 12,
  },
  txtDate: {
    color: 'grey',
    fontSize: 12,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#06397B',
  },
});
