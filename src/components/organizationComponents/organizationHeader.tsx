import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS} from '../../constants/theme';
import {commonStyles} from '../../styles';

const OrganizationHeader: React.FC<Interfaces.OrganizationHeaderProps> = ({
  title = '',
  showBackArrow = false,
}) => {
  const navigation = useNavigation();
  const renderBackArrow = (): React.JSX.Element => {
    return (
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={commonStyles.padding(5, 5)}>
        {showBackArrow && (
          <Image
            tintColor={COLORS.whiteColor}
            source={Icons.backArrow}
            style={Styles.iconStyle}
          />
        )}
      </Pressable>
    );
  };

  const renderTitle = (): React.JSX.Element => {
    return <Text style={Styles.title}>{title}</Text>;
  };

  return (
    <View style={Styles.container}>
      {renderBackArrow()}
      {renderTitle()}
      <View style={commonStyles.padding(5, 5)}>
        {showBackArrow && (
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.backArrow}
            style={Styles.iconStyle}
          />
        )}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: moderateScale(40),
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RFPercentage(2.5),
  },
  title: {
    ...FONTS.h4,
    color: COLORS.whiteColor,
  },
  iconStyle: {
    height: verticalScale(9),
    width: scale(14),
  },
});

export default OrganizationHeader;
