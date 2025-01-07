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
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
const screenWidth = Dimensions.get('screen').width;

const EmployeeNonLoanRequestCard: React.FC<
  Interfaces.EmployeeNonLoanRequestCard
> = ({onPress, onPressResumeApplication}) => {
  const renderEployeeLoan = (): React.JSX.Element => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={Styles.mainContainer1}>
          <View style={Styles.imageContainer}>
            <Image
              source={Icons.homeIcon}
              tintColor={COLORS.whiteColor}
              style={Styles.imageStyle}
              resizeMode={String.CONTAIN}
            />
          </View>
        </View>
        <View style={Styles.mainContainer2}>
          <Text style={Styles.heading}>{String.EMPLOYEE_LOAN}</Text>
          <Text style={Styles.description}>
            Interest rate starting @0.00% and flexible tenureperiod with
            approval in a short span.
          </Text>
        </View>
      </View>
    );
  };

  const renderDivider1 = (): React.JSX.Element => {
    return (
      <View style={[Styles.dividerStyle, {marginTop: RFPercentage(1)}]}></View>
    );
  };

  const renderNewLoanButton = (): React.JSX.Element => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={Styles.newLoanContainer}>
          <Image
            source={Icons.plus}
            tintColor={COLORS.whiteColor}
            style={Styles.plusIconStyle}
            resizeMode={String.CONTAIN}
          />
          <Text style={Styles.newLoanText}>{String.NEW_LOAN}</Text>
        </View>
      </View>
    );
  };

  const renderDivider2 = (): React.JSX.Element => {
    return <View style={Styles.dividerStyle}></View>;
  };

  const renderResumeYourApplication = (): React.JSX.Element => {
    return (
      <Pressable
        style={{
          alignItems: 'center',
          width: '100%',
          padding: 5,
          paddingVertical: 20,
        }}
        onPress={onPressResumeApplication}>
        <View style={Styles.refreshContainer}>
          <Image
            tintColor={COLORS.secondaryColor}
            source={Icons.refresh}
            style={Styles.refreshIconStyle}
            resizeMode={String.CONTAIN}
          />
          <Text style={Styles.description}>
            {String.RESUME_YOUR_APPLICATION}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <Pressable style={Styles.container} onPress={onPress}>
      {renderEployeeLoan()}
      {renderDivider1()}
      {renderNewLoanButton()}
      {renderDivider2()}
      {renderResumeYourApplication()}
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    paddingTop: RFPercentage(2),
    borderRadius: RFPercentage(1.5),
    width: screenWidth - 30,
    marginHorizontal: RFPercentage(2),
    marginTop: RFPercentage(3),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  mainContainer1: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer2: {
    flex: 0.8,
    marginRight: RFPercentage(2.5),
  },
  heading: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
  },
  description: {
    ...FONTS.body3,
    color: COLORS.darkGrey,
  },
  imageStyle: {
    height: RFPercentage(3.0),
    width: RFPercentage(3.0),
  },
  imageContainer: {
    height: RFPercentage(5.5),
    width: RFPercentage(5.5),
    backgroundColor: COLORS.secondaryColor,
    borderRadius: RFPercentage(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  newLoanText: {
    color: COLORS.whiteColor,
    ...FONTS.body4,
  },
  newLoanContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryColor,
    width: 200,
    height: 30,
    elevation: Elevation.inputElevation,
    borderRadius: RFPercentage(0.5),
    justifyContent: 'center',
    marginVertical: RFPercentage(1.5),
  },
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
  },
  refreshContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: RFPercentage(1.5),
  },
  plusIconStyle: {
    height: RFPercentage(1.6),
    width: RFPercentage(1.6),
    marginRight: RFPercentage(0.6),
  },
  refreshIconStyle: {
    height: RFPercentage(2.2),
    width: RFPercentage(2.2),
    marginRight: RFPercentage(1),
  },
});

export {EmployeeNonLoanRequestCard};
