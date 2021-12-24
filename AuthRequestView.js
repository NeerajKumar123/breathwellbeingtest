/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export const STEP_SOURCES = {
  XIOMI_HEALTH: 'com.Xiaomi.hm.health',
  GMS_DELTAS: 'com.google.android.gms:merge_step_deltas',
  GMS_ESTIMATED: 'com.google.android.gms:estimated_steps',
};

import GoogleFit, {Scopes} from 'react-native-google-fit';

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE, //done
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE, //done
    Scopes.FITNESS_HEART_RATE_READ,
    Scopes.FITNESS_HEART_RATE_WRITE,
  ],
};

const AuthRequestView = props => {
  const {onAuthcompletion = () => {}} = props;

  const checkifAuth = () => {
    GoogleFit.checkIsAuthorized().then(() => {
      var authorized = GoogleFit.isAuthorized;
      console.log(authorized);
      if (authorized) {
        // if already authorized, fetch data
      } else {
        // Authentication if already not authorized for a particular device
        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              console.log('AUTH_SUCCESS');
              // if successfully authorized, fetch data
              onAuthcompletion(true);
            } else {
              console.log('AUTH_DENIED ' + JSON.stringify(authResult));
              Alert.alert('BreathWellBeing',`User authorization failed.`);
              }
          })
          .catch(() => {
            Alert.alert('BreathWellBeing',`User authorization failed.`);
          });
      }
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
        width:'100%'
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#0065ff',
          justifyContent: 'center',
          alignItems: 'center',
          width: 200,
          paddingVertical:15,
          borderRadius:4
        }}
        onPress={() => {
          checkifAuth();
        }}>
        <Text style = {{fontSize:18, fontWeight:'500', color:'white'}}>Get Health Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthRequestView;
