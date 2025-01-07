import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import * as Interfaces from '../constants/interfaces';
import * as String from '../constants/string';
import {commonStyles} from '../styles';

const Network: FC<Interfaces.NetworkInterface> = (
  props: Interfaces.NetworkInterface,
) => {
  // Props Variables
  const {children, position = String.BOTTOM} = props;

  // Other Variables
  const {backOnline, networkStatus} = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.appReducer,
  );

  const renderNetwork = (): React.JSX.Element => {
    const renderBackOnline = (): React.JSX.Element => {
      return (
        <View style={NetworkStyles.backOnlineContainer}>
          <Text
            style={commonStyles.textView(
              RFPercentage(1.4),
              'Overpass-Regular',
              'white',
              RFPercentage(2),
              'center',
            )}>
            {String.BACK_ONLINE}
          </Text>
        </View>
      );
    };

    const renderNoConnection = (): React.JSX.Element => {
      return (
        <View style={NetworkStyles.noConnectionContainer}>
          <Text
            style={commonStyles.textView(
              RFPercentage(1.4),
              'Overpass-Regular',
              'white',
              RFPercentage(2),
              'center',
            )}>
            {String.NO_CONNECTION}
          </Text>
        </View>
      );
    };

    return (
      <>
        {backOnline && renderBackOnline()}
        {!networkStatus && renderNoConnection()}
      </>
    );
  };

  return (
    <>
      {position == String.TOP && renderNetwork()}
      {children}
      {position == String.BOTTOM && renderNetwork()}
    </>
  );
};

const NetworkStyles = StyleSheet.create({
  backOnlineContainer: {
    backgroundColor: '#2DD612',
    paddingVertical: RFPercentage(0.5),
  },
  noConnectionContainer: {
    backgroundColor: '#D61212',
    paddingVertical: RFPercentage(0.5),
  },
});

export default Network;
