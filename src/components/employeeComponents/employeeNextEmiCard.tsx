import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Elevation} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const EmployeeNextEmiCard: React.FC<Interfaces.EmployeeNextEmiCardProps> = ({
  amount = '',
  dueDate = '',
}) => {
  return (
    <View style={Styles.container}>
      <View style={Styles.mainContainer1}>
        <Text style={Styles.nextEmiText}>{String.NEXT_EMI}</Text>
        <Text style={Styles.amountStyle}>
          ₹ 11,500.
          <Text style={[{color: COLORS.secondaryColor, ...FONTS.paise}]}>
            00
          </Text>
        </Text>
        <Text style={Styles.description}>
          {String.E_MANDATE_SET_UP_FOR_AUTOMATIC_PAYMENT}
        </Text>
      </View>
      <View style={Styles.mainContainer2}>
        <Text
          style={[
            Styles.description,
            {marginTop: RFPercentage(2)},
          ]}>{`Due Date: 7th Jan\n2023`}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    flexDirection: 'row',
    marginBottom: RFPercentage(8.0),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  nextEmiText: {
    color: COLORS.blackColor,
    ...FONTS.h3,
  },
  amountStyle: {
    ...FONTS.amount,
    color: COLORS.secondaryColor,
    marginTop: RFPercentage(1),
  },
  description: {
    ...FONTS.body2,
    color: COLORS.lightGrey,
    marginTop: RFPercentage(1),
  },
  mainContainer1: {
    flex: 0.6,
  },
  mainContainer2: {
    flex: 0.4,
  },
});

export {EmployeeNextEmiCard};
