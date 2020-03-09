import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TextInput} from 'react-native';
import Card from '../components/components/Card';
import CardSection from '../components/components/CardSection';
import Icon from 'react-native-vector-icons/FontAwesome';
import StaffCOntactList from './StaffCOntactList';
import Loader from '../components/components/Loader';
import {serviceGetStaffContactList} from '../utils/Services';
import {Constants} from '../utils/Constants';
import {trackScreenView} from '../utils/Utils';

export default function StaffContact() {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataStaffContact, setDataStaffContact] = useState(null);

  useEffect(() => {
    trackScreenView('Staff Contact');
  }, []);

  const onButtonPress = async () => {
    setIsLoading(true);

    const getDataStaffContact = await serviceGetStaffContactList(keyword);

    if (getDataStaffContact !== 'error') {
      setDataStaffContact(getDataStaffContact);
    }
    setIsLoading(false);
  };

  const renderDataStaffContact = () => {
    if (dataStaffContact !== null) {
      return (
        <FlatList
          data={dataStaffContact}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Card>
              <CardSection>
                <StaffCOntactList key={item.UCODE} dataStaffContact={item} />
              </CardSection>
            </Card>
          )}
          keyExtractor={item => item.ucode}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />

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
              onPress={() => onButtonPress()}
            />
          </View>
        </CardSection>
      </Card>
      <View style={{flex: 4}}>{renderDataStaffContact()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Constants.BG_COLOR_LIGHT,
    padding: 5,
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
