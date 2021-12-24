/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  useColorScheme,
  View,
  FlatList,
  Alert,
} from 'react-native';
import GoogleFit, {BucketUnit} from 'react-native-google-fit';
import AuthRequestView from './AuthRequestView';
import DailyStep from './DailyStep';

export const STEP_SOURCES = {
  XIOMI_HEALTH: 'com.Xiaomi.hm.health',
  GMS_DELTAS: 'com.google.android.gms:merge_step_deltas',
  GMS_ESTIMATED: 'com.google.android.gms:estimated_steps',
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [dailySteps, setdailySteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [isGFitAuthorized, setIsGFitAuthorized] = useState(false);

  const prepareOptions = () => {
    var today = new Date();
    var lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 8,
    );
    const opt = {
      startDate: lastWeekDate.toISOString(), // required ISO8601Timestamp
      endDate: today.toISOString(), // required ISO8601Timestamp
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    };
    return opt;
  };

  let fetchStepsData = async opt => {
    const res = await GoogleFit.getDailyStepCountSamples(opt);
    if (res.length !== 0) {
      for (var i = 0; i < res.length; i++) {
        if (res[i].source === 'com.google.android.gms:estimated_steps') {
          let data = res[i].steps.reverse();
          setdailySteps(data);
        }
      }
    } else {
      console.log('Not Found');
    }
  };

  let fetchHeartData = async opt => {
    const res = await GoogleFit.getHeartRateSamples(opt);
    let data = res.reverse();
    setHeartRate(data?.[0]?.value);
  };

  return (
    <View style={{flex: 1, paddingVertical: 30}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!isGFitAuthorized ? (
        <AuthRequestView
          onAuthcompletion={isAuth => {
            setIsGFitAuthorized(isAuth);
            const options = prepareOptions();
            fetchStepsData(options);
            fetchHeartData(options);
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
          }}>
          {dailySteps?.length && (
            <>
              <Text style={{fontSize: 20, fontWeight: '600', marginBottom: 10}}>
                Daily Steps
              </Text>
              <FlatList
                style={{width: '100%', padding: 10}}
                data={dailySteps}
                ItemSeparatorComponent={() => (
                  <View style={{height: 10, width: '100%'}} />
                )}
                renderItem={({item, index}) => {
                  return <DailyStep date={item.date} count={item.value} />;
                }}
              />
            </>
          )}

          {heartRate?.length ? (
            <>
              <Text style={{fontSize: 20, fontWeight: '600', marginTop: 30}}>
                Heart Rates
              </Text>
              <Text style={{fontSize: 15, fontWeight: '600', marginTop: 30}}>
                {heartRate}
              </Text>
            </>
          ) : (
            <>
              <Text style={{fontSize: 20, fontWeight: '600', marginTop: 30}}>
                Heart Rates
              </Text>
              <Text style={{fontSize: 15, fontWeight: '600'}}>
                No heart reate data to be shown!
              </Text>
            </>
          )}
        </View>
      )}
    </View>
  );
};


export default App;
