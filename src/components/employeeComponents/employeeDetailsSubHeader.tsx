import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import * as InterFaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';

const EmployeeDetailsSubHeader: React.FC<
  InterFaces.EmployeeDetailsSubHeaderProps
> = ({
  name = '',
  description = String.YOU_HAVE_AN_OPERATING_ADVANCE_DUE_IN_CURRENT,
  imageUrl = require('../../../assets/images/profile.png'),
}) => {
  const navigation = useNavigation();

  const renderName = (): React.JSX.Element => {
    return (
      <View>
        <Text style={Styles.heading1}>
          {String.HELLO} {name},
        </Text>
        <Text style={Styles.heading2}>{description}</Text>
      </View>
    );
  };

  const renderProfile = (): React.JSX.Element => {
    return (
      <Pressable
        style={Styles.profileContainer}
        onPress={() => {
          navigation.navigate('ProfileStack' as never);
        }}>
        <View style={Styles.profileSubContainer}>
          <Image
            resizeMode={String.COVER}
            source={imageUrl}
            style={Styles.imageStyle}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={Styles.container}>
      {renderName()}
      {renderProfile()}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomLeftRadius: RFPercentage(5),
    borderBottomRightRadius: RFPercentage(5),
    height: RFPercentage(17.2),
    paddingHorizontal: RFPercentage(3),
    paddingTop: RFPercentage(4),
    // alignItems: 'center',
  },
  heading1: {
    ...FONTS.h4,
    color: COLORS.whiteColor,
  },
  heading2: {
    color: COLORS.whiteColor,
    ...FONTS.body2,
  },
  profileContainer: {
    backgroundColor: COLORS.lightYellow,
    borderRadius: RFPercentage(20),
    height: RFPercentage(6.0),
    width: RFPercentage(6.0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSubContainer: {
    height: RFPercentage(4.5),
    width: RFPercentage(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(20),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(20),
  },
});

export {EmployeeDetailsSubHeader};
