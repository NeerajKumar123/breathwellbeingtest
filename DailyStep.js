/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Text, View} from 'react-native';

const DailyStep = props => {
  const {date, count} = props;
  return (
    <View
      style={{
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        elevation: 3,
        borderRadius: 8,
        backgroundColor: 'white',
        overflow: 'hidden',
      }}>
      <Text style={{fontSize: 18, fontWeight: '500'}}>Date:{date}</Text>
      <Text style={{fontSize: 18, fontWeight: '500'}}>Steps:{count}</Text>
    </View>
  );
};

export default DailyStep;
