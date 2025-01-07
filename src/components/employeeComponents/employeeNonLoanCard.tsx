import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as InterFaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
const screenWidth = Dimensions.get('window').width;
const EmployeeNonLoanCard: React.FC<InterFaces.EmployeeNonLoanCardProps> = ({
  name = '',
  amount = '',
  interest = '',
  onPress,
  showDivider = true,
}) => {
  const renderCongragulation = (): React.JSX.Element => {
    return (
      <View style={Styles.mainContainer}>
        <View style={[Styles.subMainContainer1, {flex: 0.6}]}>
          <Text style={Styles.text1}>
            {String.CONGRATULATIONS} {name}!
          </Text>
        </View>
        <View style={[Styles.subMainContainer2, {flex: 0.4}]}>
          <Text
            style={[
              {
                fontSize: 12,
                fontFamily: Fonts.Bold,
                color: COLORS.secondaryColor,
              },
            ]}>
            {String.TOTAL_ELIGIBILITY}
          </Text>
        </View>
      </View>
    );
  };

  const renderEligibleLoanAmount = (): React.JSX.Element => {
    return (
      <View style={[Styles.mainContainer, {marginVertical: RFPercentage(1)}]}>
        <View style={[Styles.subMainContainer1, {flex: 0.6}]}>
          <Text
            style={[
              {
                fontSize: 12,
                fontFamily: Fonts.Bold,
                color: COLORS.blackColor,
                flexWrap: 'wrap',
              },
            ]}>
            {String.ELIGIBLE_LOAN_AMOUNT}
          </Text>
        </View>
        <View style={[Styles.subMainContainer2, {flex: 0.4}]}>
          <Text
            style={[
              {fontSize: 12, fontFamily: Fonts.Bold, color: COLORS.blackColor},
            ]}>
            {String.RATE_OF_INTEREST}
          </Text>
        </View>
      </View>
    );
  };

  const renderAmountAndInterest = (): React.JSX.Element => {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.subMainContainer1}>
          <Text style={[Styles.text1, {...FONTS.amount}]}>
            {String.RUPEES} {amount}
          </Text>
        </View>
        <View style={Styles.subMainContainer2}>
          <View>
            <Text style={[{...FONTS.amount, color: COLORS.secondaryColor}]}>
              @{interest}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderDivider = (): React.JSX.Element => {
    return <View style={Styles.dividerStyle} />;
  };

  const renderNeedHigherLoanAmount = (): React.JSX.Element => {
    return (
      <View style={Styles.mainContainer}>
        <View style={Styles.subMainContainer1}>
          <Text
            style={[
              {fontSize: 12, fontFamily: Fonts.Bold, color: COLORS.blackColor},
            ]}>
            {String.NEED_HIGHER_LOAN_AMOUNT}
          </Text>
        </View>
        <View style={Styles.subMainContainer2}>
          <View>
            <Image
              source={Icons.rightArrow}
              resizeMode={String.CONTAIN}
              style={Styles.imageStyle}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Pressable style={Styles.container} onPress={onPress}>
      {renderCongragulation()}
      {renderEligibleLoanAmount()}
      {renderAmountAndInterest()}
      {/* {showDivider && (
        <View>
          {renderDivider()}
          {renderNeedHigherLoanAmount()}
        </View>
      )} */}
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    padding: RFPercentage(2),
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    marginBottom: moderateScale(10),
    width: screenWidth - 30,
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,

    // shadowColor: 'red',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.3,
    // shadowRadius: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subMainContainer1: {
    flex: 1,
  },
  subMainContainer2: {
    // flex: 0.3,
    alignItems: 'flex-end',
  },
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginVertical: RFPercentage(1),
  },
  text1: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
  },
  text2: {
    // ...FONTS.body2,
    color: COLORS.secondaryColor,
  },
  imageStyle: {
    height: RFPercentage(1.5),
    width: RFPercentage(1),
  },
});

export {EmployeeNonLoanCard};
