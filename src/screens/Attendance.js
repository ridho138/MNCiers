import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Alert} from 'react-native';
import Card from '../components/components/Card';
import CardSection from '../components/components/CardSection';
import DatePicker from 'react-native-datepicker';
import Button from '../components/components/Button';
import AttendanceDetail from './AttendanceDetail';
import Loader from '../components/components/Loader';
import {serviceGetAttendaceList} from '../utils/Services';
import moment from 'moment';
import {Constants} from '../utils/Constants';
import {trackScreenView} from '../utils/Utils';

export default function Attendance() {
  const dateNow = moment(new Date()).format('YYYY-MM-DD');
  const [dateFrom, setDateFrom] = useState(dateNow);
  const [dateTo, setDateTo] = useState(dateNow);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAbsen, setDataAbsen] = useState(null);
  const [late, setLate] = useState(0);

  useEffect(() => {
    onButtonPress();
    trackScreenView('Attendance');
  }, []);

  const onButtonPress = async () => {
    setIsLoading(true);

    let diff = moment(dateTo).diff(moment(dateFrom), 'days');

    if (dateFrom !== '' && dateTo !== '') {
      if (diff < 31) {
        const getDataAbsen = await serviceGetAttendaceList(dateFrom, dateTo);
        // alert(getDataAbsen)
        if (getDataAbsen !== 'error') {
          let late = 0;
          getDataAbsen.map(data => {
            if (data.istelat === 'Late') {
              late += 1;
            }
          });
          setDataAbsen(getDataAbsen);
          setLate(late);
        }
      } else {
        Alert.alert('Info', 'Maksimum periode absen adalah 31 hari');
      }
    } else {
      Alert.alert('Error', 'Date Tidak Boleh Kosong');
    }
    setIsLoading(false);
  };

  const renderDataAbsen = () => {
    // return <AttendanceDetail key={data.tanggal} dataAbsen={data} />;
    if (dataAbsen !== null) {
      if (dataAbsen.length !== 0) {
        return (
          <Card>
            {/* <CardSection>
              <Text style={styles.textStyle}>Total Late : {late}</Text>
            </CardSection> */}
            <CardSection>
              <FlatList
                //style={{flex: 1}}
                data={dataAbsen}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <AttendanceDetail key={item.tanggal} dataAbsen={item} />
                )}
                keyExtractor={item => item.tanggal}
              />
            </CardSection>
          </Card>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Loader loading={isLoading} />
      <View>
        <Card>
          <CardSection>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerContent}>
                <DatePicker
                  customStyles={{
                    dateInput: {
                      borderRadius: 5,
                      borderColor: '#06397B',
                    },
                  }}
                  date={dateFrom} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Date From"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date => {
                    setDateFrom(date);
                  }}
                />
              </View>
              <View style={styles.datePickerContent}>
                <DatePicker
                  customStyles={{
                    dateInput: {
                      borderRadius: 5,
                      borderColor: '#06397B',
                    },
                  }}
                  date={dateTo} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Date To"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date => {
                    setDateTo(date);
                  }}
                />
              </View>
            </View>
          </CardSection>
          <CardSection>
            <Button onPress={() => onButtonPress()}>SEARCH</Button>
          </CardSection>
          <CardSection>
            <Text style={styles.textStyle}>Total Late : {late}</Text>
          </CardSection>
        </Card>
      </View>
      <View style={{flex: 1}}>{renderDataAbsen()}</View>
      {/* <Loader loading={isLoading} />
      <View style={{justifyContent: 'center'}}>
        <Card>
          <CardSection>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerContent}>
                <DatePicker
                  customStyles={{
                    dateInput: {
                      borderRadius: 5,
                      borderColor: '#06397B',
                    },
                  }}
                  date={dateFrom} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Date From"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date => {
                    setDateFrom(date);
                  }}
                />
              </View>
              <View style={styles.datePickerContent}>
                <DatePicker
                  customStyles={{
                    dateInput: {
                      borderRadius: 5,
                      borderColor: '#06397B',
                    },
                  }}
                  date={dateTo} //initial date from state
                  mode="date" //The enum of date, datetime and time
                  placeholder="Date To"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  onDateChange={date => {
                    setDateTo(date);
                  }}
                />
              </View>
            </View>
          </CardSection>
          <CardSection>
            <Button onPress={() => onButtonPress()}>SEARCH</Button>
          </CardSection>
        </Card>
      </View>
      <View style={{justifyContent: 'flex-start'}}>{renderDataAbsen()}</View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.BG_COLOR_LIGHT,
    flexDirection: 'column',
    padding: 5,
  },
  datePickerContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    // flexWrap: "wrap",
    alignItems: 'center',
    // justifyContent: "center"
  },
  datePickerContent: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#06397B',
    textAlign: 'center',
    fontWeight: '700',
  },
  textStyle: {
    color: '#06397B',
    fontSize: 13,
    fontWeight: '300',
  },
});
