import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import {COLORS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
export interface ApplicationInterface {
  applicationNumber: string | number;
  type: string;
  CompanyName: string;
}
const EmployeePipeLineCard: React.FC<ApplicationInterface> = ({
  applicationNumber,
  type,
  CompanyName,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.applicationNumber}>{'Application Number'}</Text>
      <Text
        style={[
          styles.applicationNumber,
          {color: COLORS.primaryColor, fontFamily: Fonts.SemiBold},
        ]}>
        {applicationNumber ? applicationNumber : ''}
      </Text>

      <Text style={styles.loantype}>
        <Text
          style={{
            color: COLORS.secondaryTextColor,
            fontFamily: Fonts.SemiBold,
          }}>
          Company Name :{' '}
        </Text>
        {`${CompanyName ? CompanyName : ''}`}
      </Text>
      <Text style={styles.loantype}>
        <Text
          style={{
            color: COLORS.secondaryTextColor,
            fontFamily: Fonts.SemiBold,
          }}>
          Type :{' '}
        </Text>
        {`${type ? type : ''}`}
      </Text>
    </View>
  );
};

export default EmployeePipeLineCard;

const styles = StyleSheet.create({
  container: {
    elevation: Elevation.cardContainerElevation,
    backgroundColor: COLORS.backgroundColour,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    height: verticalScale(120),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  applicationNumber: {
    fontFamily: Fonts.Bold,
    color: COLORS.secondaryTextColor,
    fontSize: moderateScale(14),
    marginVertical: verticalScale(2),
  },
  loantype: {
    fontFamily: Fonts.Medium,
    color: COLORS.grey,
    fontSize: moderateScale(12),
    marginVertical: verticalScale(2),
  },
});
