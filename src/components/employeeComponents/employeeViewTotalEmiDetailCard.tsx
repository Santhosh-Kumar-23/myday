import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Elevation} from '../../constants/enums';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
import CommonButton from '../commonButton';

export type IemployeeViewTotalEmiDetailCardProps = {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  onPressFaq?: null | ((event: GestureResponderEvent) => void) | undefined;
  loanAmount?: string;
  interest?: string;
  tenure?: string;
};

const EmployeeViewTotalEmiDetailCard: React.FC<
  IemployeeViewTotalEmiDetailCardProps
> = ({onPress, loanAmount, interest, tenure, onPressFaq}) => {
  return (
    <View style={Styles.container}>
      <View>
        <Text style={Styles.title}>{String.EMPLOYEE_LOAN}</Text>
        {/* <View style={Styles.divider}></View> */}
        <View style={Styles.textContainer}>
          <Text style={Styles.text1}>{String.LOAN_AMOUNT}</Text>
          <Text style={Styles.text2}>{`₹${loanAmount}.00`}</Text>
        </View>
        <View style={Styles.textContainer}>
          <Text style={Styles.text1}>{String.RATE_OF_INTEREST}</Text>
          <Text style={Styles.text2}>{`@ ${interest}%`}</Text>
        </View>
        <View style={Styles.textContainer}>
          <Text style={Styles.text1}>{String.TENURE}</Text>
          <Text style={Styles.text2}>{`${tenure} Month`}</Text>
        </View>
      </View>
      <View style={{marginTop: 30}}>
        <CommonButton
          title="Proceed"
          containerStyle={Styles.button1}
          textStyle={[{...FONTS.body4}]}
          onPress={onPress}
        />
        <CommonButton
          onPress={onPressFaq}
          title="Quick Help/FAQs"
          icon={true}
          textStyle={[{...FONTS.body4}]}
          containerStyle={Styles.button2}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    padding: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    justifyContent: 'space-between',
    marginBottom: RFPercentage(2.0),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.blackColor,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginTop: RFPercentage(1),
  },
  text1: {
    color: COLORS.darkGrey,
    ...FONTS.h3,
  },
  text2: {
    color: COLORS.secondaryColor,
    ...FONTS.h3,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: RFPercentage(1.6),
  },
  button1: {
    height: RFPercentage(6),
  },
  button2: {
    marginVertical: RFPercentage(1),
    height: RFPercentage(6),
  },
});

export {EmployeeViewTotalEmiDetailCard};
