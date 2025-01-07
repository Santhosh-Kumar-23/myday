import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants/theme';

const Loader: React.FC<{}> = ({}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={COLORS.primaryColor} size={'large'} />
    </View>
  );
};

export {Loader};
