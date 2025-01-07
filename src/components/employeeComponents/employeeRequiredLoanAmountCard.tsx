import {Slider} from '@miblanchard/react-native-slider';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Elevation} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import * as string from '../../constants/string';
import {COLORS, FONTS, Fonts, deviceWidth} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {commonStyles} from '../../styles';
import {isIos} from '../../utlis/functions';
import CommonButton from '../commonButton';
import VectorIcons from '../vectorIcons';

interface ScaleLineProps {
  count: number;
  lineWidth: number;
  sliderValue: number;
}

const EmployeeRequiredLoanAmountCard: React.FC<{}> = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const renderDivider = (): React.JSX.Element => {
    return <View style={styles.dividerStyle} />;
  };

  const [loanAmountSlider, setLOanAmountSlider] = useState<number[]>([1000]);
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );
  const name = getEmployeeDetails?.first_name + getEmployeeDetails?.last_name;
  const salary = getEmployeeDetails?.compensation?.amount ?? 0;
  const loanAmount = getEmployeeDetails?.advanceSalaryLimit ?? 0;

  const RenderThumb = (): React.JSX.Element => {
    return (
      <>
        <View style={styles.thumbMainContainer} />
        <View style={styles.thumb} />
        <View style={styles.thumbMainContainer} />
      </>
    );
  };

  const RenderThumbMonth = (): React.JSX.Element => {
    return (
      <>
        <View
          style={[styles.thumbMainContainer, {backgroundColor: COLORS.grey}]}
        />
        <View style={[styles.thumb, {borderColor: COLORS.grey}]} />
        <View
          style={[styles.thumbMainContainer, {backgroundColor: COLORS.grey}]}
        />
      </>
    );
  };

  const renderRequiredLoanAmount = (): React.JSX.Element => {
    return (
      <Text style={[styles.requiredLoanText, {color: COLORS.blackColor}]}>
        {string.REQUIRED_LOAN_AMOUNT}
      </Text>
    );
  };
  const renderLoanAmount = (): React.JSX.Element => {
    return (
      <View style={styles.topView}>
        <Text style={[styles.requiredLoanText, {color: COLORS.blackColor}]}>
          {string.LOAN_AMOUNT}
        </Text>
        <Pressable
          style={[styles.amountBtn, {borderColor: COLORS.primaryColor}]}>
          <Text style={[styles.amountBtnText, {color: COLORS.primaryColor}]}>
            {string.RUPEES}
          </Text>
          <Text style={[styles.amountBtnText, {color: COLORS.primaryColor}]}>
            {loanAmountSlider}
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderLoanAmountTracker = (): React.JSX.Element => {
    return (
      <View style={styles.topViewContents}>
        <View style={styles.topViewContentsText}>
          <Text style={styles.t1}>{string.RUPEES} 1000</Text>
          <Text style={styles.t1}>{string.RUPEES + loanAmount ?? 0} </Text>
        </View>
        <Slider
          maximumValue={loanAmount ?? 0}
          minimumValue={1000}
          renderThumbComponent={() => {
            return RenderThumb();
          }}
          minimumTrackTintColor={COLORS.primaryColor}
          thumbTouchSize={{height: RFPercentage(2), width: RFPercentage(2)}}
          containerStyle={commonStyles.margin(0, moderateScale(10))}
          onValueChange={(sliderValue: number[]): void => {
            setLOanAmountSlider(sliderValue);
          }}
          startFromZero={true}
          step={500}
          thumbTintColor={COLORS.whiteColor}
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
          value={loanAmountSlider}
        />
      </View>
    );
  };

  const renderTenor = (): React.JSX.Element => {
    return (
      <View style={styles.topView}>
        <Text style={styles.requiredLoanText}>{string.TENOR_IN_MONTHS}</Text>
        <Pressable style={styles.amountBtn}>
          <VectorIcons
            type="fontisto"
            name="clock"
            size={RFPercentage(1.8)}
            color={COLORS.darkGrey}
          />
          <Text style={styles.amountBtnText}>{'1 month'}</Text>
        </Pressable>
      </View>
    );
  };

  const monthTracker = (): React.JSX.Element => {
    return (
      <View style={{marginTop: 20}}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.topViewContentsText}>
            <Text style={[styles.t1, {color: COLORS.grey}]}>{'1 month'}</Text>
            <Text style={[styles.t1, {color: COLORS.grey}]}>{'1 month'}</Text>
          </View>
        </View>
        <Slider
          maximumValue={10000}
          disabled={true}
          renderThumbComponent={() => {
            return RenderThumbMonth();
          }}
          minimumValue={0}
          containerStyle={commonStyles.margin(0, moderateScale(10))}
          minimumTrackTintColor={COLORS.primaryColor}
          onValueChange={(sliderValue: number[]): void => {
            setLOanAmountSlider(sliderValue);
          }}
          startFromZero={true}
          step={2}
          thumbTintColor={COLORS.whiteColor}
          thumbStyle={styles.thumbStyle}
          trackStyle={styles.trackStyle}
        />
      </View>
    );
  };

  const renderButton = (): React.JSX.Element => {
    return (
      <CommonButton
        // title={`Total EMI Amount = ${string.RUPEES} ${loanAmountSlider}`}
        title={`Continue`}
        textStyle={[{...FONTS.body4}]}
        containerStyle={{marginVertical: 10, height: RFPercentage(6)}}
        onPress={() => {
          navigation.navigate(string.EMPLOYEE_VIEW_TOTAL_EMI as never, {
            loanAmount: loanAmountSlider,
            interest: 0,
            tenure: 1,
          });
          dispatch(
            Actions.employeeLoanDetails({
              loanAmount: loanAmountSlider,
              interest: 0,
              tenure: 1,
            }),
          );
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderRequiredLoanAmount()}
      {/* {renderDivider()} */}
      {renderLoanAmount()}
      {renderLoanAmountTracker()}
      {renderTenor()}
      {monthTracker()}
      {renderButton()}
    </View>
  );
};

export default EmployeeRequiredLoanAmountCard;
const styles = StyleSheet.create({
  container: {
    padding: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    width: deviceWidth - 30,
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    backgroundColor: COLORS.whiteColor,
    flex: 0.7,
    marginBottom: RFPercentage(3.0),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  requiredLoanText: {
    color: COLORS.grey,
    ...FONTS.h3,
    marginBottom: moderateScale(15),
  },
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.blackColor,
    marginVertical: RFPercentage(2),
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.grey,
    borderWidth: RFPercentage(0.1),
    borderRadius: RFPercentage(1.0),
    height: RFPercentage(4.0),
    width: RFPercentage(15.0),
    paddingHorizontal: RFPercentage(1.0),
  },
  amountBtnText: {
    color: COLORS.grey,
    ...FONTS.h3,
  },
  containerScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scaleLine: {
    width: 2, // Adjust line width as needed
    marginBottom: 10, // Adjust line spacing as needed
  },
  topViewContents: {marginTop: 20, width: '100%'},
  topViewContentsText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbMainContainer: {
    height: moderateScale(8),
    backgroundColor: COLORS.primaryColor,
    width: moderateScale(2),
    alignSelf: 'center',
  },
  thumb: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.whiteColor,
    borderWidth: moderateScale(2),
    borderColor: COLORS.primaryColor,
  },
  t1: {
    fontSize: RFPercentage(1.5),
    color: COLORS.secondaryColor,
    fontFamily: Fonts.Bold,
  },
  thumbStyle: {
    borderColor: COLORS.blackColor,
    borderWidth: moderateScale(1),
  },
  trackStyle: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: moderateScale(10),
    height: moderateScale(12),
  },
});
