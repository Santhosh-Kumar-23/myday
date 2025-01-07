import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  ScaledSize,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {
  convertDateToWord,
  isIos,
  removeUnderScore,
  shortenApplicationNo,
} from '../../utlis/functions';
import Dots from '../dots';
const dummydata = [
  {
    id: 1,
    loanProcess: '',
    application: '',
    date: '',
    loanAmount: '',
    loanStatus: '',
    loanType: ' ',
    source: ' ',
  },
];
const EmployeeTrackLoanStatusCard: React.FC<Interfaces.LoanProcessItemList> = ({
  data: LoanData = [],
}) => {
  const ScrollViewRef: MutableRefObject<any> = useRef<any>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width}: ScaledSize = useWindowDimensions();
  const widthh = width + 50;
  const [SliderIndex, setSliderIndex] = useState<number>(0);

  console.log('LoanData::::::::::::::', LoanData);

  useEffect(() => {
    SliderIndex == 0 && setSliderIndex(LoanData.length - 1);
  }, [LoanData]);

  const renderItems = ({item}: Interfaces.LoanProcessItem) => (
    <>
      {item.loanStatus == 'Approved' ? (
        <LinearGradient
          style={styles.carouselItem}
          colors={COLORS.cardLinearGradient}
          start={{x: -1, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={[styles.cardContainer, {marginTop: RFPercentage(1.5)}]}>
            <View style={styles.colorLineView}>
              <View style={styles.redLine} />
              <View style={styles.yellowLine} />
              <View style={styles.blueLine} />
            </View>
            <Pressable style={styles.loanTypeButton}>
              <Text style={[styles.loantypeText, {color: COLORS.darkGrey}]}>
                {item.loanType}
              </Text>
            </Pressable>
          </View>
          <View
            style={{marginTop: RFPercentage(2), marginBottom: RFPercentage(4)}}>
            <Text style={styles.loanProcessText}>
              {removeUnderScore(item.loanProcess) ?? item.loanProcess}{' '}
              {`- ${item.source}`}
            </Text>
            <View style={styles.colorLineView}>
              <Text style={styles.applicationText}>
                {shortenApplicationNo(item.application)}
              </Text>
              {item?.orgLabel && (
                <Text
                  style={[
                    styles.branch,
                    {
                      backgroundColor: COLORS.primaryColor,
                      paddingHorizontal: 5,
                      borderRadius: 5,
                      marginHorizontal: 3,
                      marginLeft: 10,
                      fontFamily: Fonts.SemiBold,
                    },
                  ]}>
                  {item?.orgLabel}
                </Text>
              )}
              <View style={[styles.dot, {backgroundColor: '#14A44D'}]} />
              <Text style={styles.applicationText}>
                {convertDateToWord(item.date) ?? ''}
              </Text>
            </View>
          </View>
          <View style={styles.amountView}>
            {item.loanProcess !== 'New_Application' && (
              <Pressable
                style={[styles.statusButton, {backgroundColor: '#14A44D'}]}>
                <Text style={[styles.statusText, {color: COLORS.whiteColor}]}>
                  {item.loanStatus}
                </Text>
              </Pressable>
            )}
            <View></View>
            <Text style={[styles.amountText]}>₹{item.loanAmount}</Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.carouselItem}>
          <View style={styles.cardContainer}>
            <View style={styles.colorLineView}>
              <View style={styles.redLine} />
              <View style={styles.yellowLine} />
              <View style={styles.blueLine} />
            </View>
            <Pressable
              style={[
                styles.loanTypeButton,
                {backgroundColor: COLORS.secondaryColor},
              ]}>
              <Text style={[styles.loantypeText, {color: COLORS.whiteColor}]}>
                {item.loanType}
              </Text>
            </Pressable>
          </View>
          <View
            style={{marginTop: RFPercentage(2), marginBottom: RFPercentage(4)}}>
            <Text style={[styles.loanProcessText, {color: COLORS.blackColor}]}>
              {removeUnderScore(item.loanProcess) ?? item.loanProcess}{' '}
              {`- ${item.source}`}
            </Text>
            <View
              style={[styles.colorLineView, {marginTop: RFPercentage(1.0)}]}>
              <Text style={[styles.applicationText, {color: COLORS.darkGrey}]}>
                {shortenApplicationNo(item.application) ?? ''}
              </Text>
              <View style={[styles.dot, {backgroundColor: COLORS.darkGrey}]} />
              <Text style={[styles.applicationText, {color: COLORS.darkGrey}]}>
                {convertDateToWord(item.date) ?? ''}
              </Text>
            </View>
          </View>
          <View style={styles.amountView}>
            <Pressable
              style={[
                styles.statusButton,
                {
                  backgroundColor:
                    item.loanStatus === 'Pending'
                      ? '#3B71CA'
                      : item.loanStatus == 'Approved'
                      ? '#85cf9f'
                      : '#FF474D',
                },
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      item.loanStatus === 'Pending'
                        ? COLORS.whiteColor
                        : COLORS.whiteColor,
                  },
                ]}>
                {item.loanStatus}
              </Text>
            </Pressable>
            <Text style={[styles.amountText2]}>₹{item.loanAmount}</Text>
          </View>
        </View>
      )}
    </>
  );

  const handleSlider = (scrollIndex: null | number = null): void => {
    const targetIndex = scrollIndex ?? SliderIndex;
    if (targetIndex >= 0 && targetIndex < LoanData.length) {
      ScrollViewRef.current.scrollToIndex({
        animated: true,
        index: targetIndex,
      });
    }
  };

  const cardiosLength: number = LoanData.length;

  return (
    <View style={styles.container}>
      <Carousel
        mode="parallax"
        defaultIndex={LoanData.length - 1}
        loop={false}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10], // Enable horizontal panning
          failOffsetY: [-5, 5], // Limit vertical movement to fail the gesture
        }}
        onScrollBegin={() => {
          console.log('onScrollBegin');
        }}
        onScrollEnd={index => {
          setSliderIndex(index);
        }}
        width={widthh}
        height={widthh / 2.2}
        autoPlay={!true}
        data={LoanData ?? dummydata}
        scrollAnimationDuration={0}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={renderItems}
      />

      <Dots
        borderColor={COLORS.whiteColor}
        currentIndex={SliderIndex}
        isCustom={true}
        numberOfDots={cardiosLength}
        size={0.8}
        onPress={(index: number): void => {
          handleSlider(index);
        }}
      />
    </View>
  );
};

export default EmployeeTrackLoanStatusCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RFPercentage(2.0),
  },
  carouselItem: {
    width: '100%',
    backgroundColor: COLORS.backgroundColour,
    // height: 180,
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    alignSelf: 'center',
    marginTop: 1.2,
    // marginLeft: RFPercentage(4),
    // marginHorizontal: 4,
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  flatListContainer: {
    backgroundColor: COLORS.blackColor,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 20,
  },
  colorLineView: {flexDirection: 'row', alignItems: 'center'},
  redLine: {
    backgroundColor: COLORS.errorRed,
    height: 4,
    width: RFPercentage(4.5),
    borderRadius: RFPercentage(1.5),
  },
  yellowLine: {
    backgroundColor: COLORS.lightYellow,
    height: 4,
    width: RFPercentage(4.5),
    borderRadius: RFPercentage(1.5),
  },
  blueLine: {
    backgroundColor: '#37C6DA',
    height: 4,
    width: RFPercentage(4.5),
    borderRadius: RFPercentage(1.5),
  },
  loanTypeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderRadius: RFPercentage(1),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(2),
  },
  loantypeText: {
    ...FONTS.body3,
    color: COLORS.secondaryColor,
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(14),
  },
  loanProcessText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
  },
  applicationText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
  },
  branch: {
    ...FONTS.body5,
    color: COLORS.whiteColor,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: RFPercentage(50),
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: RFPercentage(1.5),
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1),
  },
  statusButton: {
    justifyContent: 'center',
    elevation: 2,
    alignItems: 'center',
    backgroundColor: COLORS.backgroundColour,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(2),
    borderRadius: RFPercentage(1),
  },
  statusText: {
    ...FONTS.body3,
    color: COLORS.secondaryColor,
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(14),
  },
  amountText: {
    ...FONTS.body2,
    color: COLORS.whiteColor,
    fontSize: moderateScale(16),
  },
  amountText2: {
    color: COLORS.blackColor,
    fontSize: moderateScale(16),
    fontFamily: Fonts.SemiBold,
  },
});
