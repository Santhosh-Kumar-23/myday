import React, {MutableRefObject, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Strings from '../../constants/string';
import {COLORS, Fonts, deviceWidth} from '../../constants/theme';
import {isIos, removeUnderScore} from '../../utlis/functions';
import Dots from '../dots';

export type IemployeeLoanPaymentHistoryCardProps = {
  onPress?: () => void;
  onPressPaymentCard?: () => void;
  historyData?: any;
};

const numColumns = 4;
const data = [
  {id: 1, amount: '', date: 'Jan'},
  {id: 2, amount: '', date: 'Feb'},
  {id: 3, amount: '', date: 'Mar'},
  {id: 4, amount: '', date: 'Apr'},
  {id: 5, amount: '', date: 'May'},
  {id: 6, amount: '', date: 'Jun'},
  {id: 7, amount: '', date: 'July'},
  {id: 8, amount: '', date: 'Aug'},
  {id: 9, amount: '', date: 'Sep'},
  {id: 10, amount: '', date: 'Oct'},
  {id: 11, amount: '', date: 'Nov'},
  {id: 12, amount: '', date: 'Dec'},
];
const data1 = [
  {id: 1, amount: '', date: 'Jan'},
  {id: 2, amount: '', date: 'Feb'},
  {id: 3, amount: '', date: 'Mar'},
  {id: 4, amount: '', date: 'Apr'},
  {id: 5, amount: '', date: 'May'},
  {id: 6, amount: '', date: 'Jun'},
  {id: 7, amount: '', date: 'Jul'},
  {id: 8, amount: '', date: 'Aug'},
  {id: 9, amount: '', date: 'Sep'},
  {id: 10, amount: '', date: 'Oct'},
  {id: 11, amount: '', date: 'Nov'},
  {id: 12, amount: '', date: 'Dec'},
];

const datas = [
  {year: '', tenures: data1},
  // {year: '', tenures: data},
];

const Divider = () => {
  return <View style={styles.divider} />;
};
const EmployeeLoanPaymentHistoryCard: React.FC<
  IemployeeLoanPaymentHistoryCardProps
> = ({onPress, onPressPaymentCard, historyData}) => {
  const ScrollViewRef: MutableRefObject<any> = useRef<any>(null);
  const [SliderIndex, setSliderIndex] = useState<number>(0);
  const width = Dimensions.get('window').width * 0.9;

  const handleSlider = (scrollIndex: null | number = null): void => {
    const targetIndex = scrollIndex ?? SliderIndex;
    if (targetIndex >= 0 && targetIndex < datas.length) {
      ScrollViewRef.current.scrollToIndex({
        animated: true,
        index: targetIndex,
      });
    }
  };

  const handleOnScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    const {x}: NativeScrollPoint = event.nativeEvent.contentOffset;

    const indexOfNextScreen: number = Math.round(x / width);

    if (indexOfNextScreen !== SliderIndex) {
      setSliderIndex(indexOfNextScreen);
    }
  };

  const Item = ({item}) => (
    <Pressable
      onPress={onPressPaymentCard}
      style={[
        styles.item,
        {backgroundColor: '#E5E4E2'},
        // {
        //   backgroundColor: !item.amount
        //     ? COLORS.dimSecondaryColor
        //     : COLORS.secondaryColor,
        // },
      ]}>
      <Text style={[styles.date, {color: '#c0c0c0'}]}>{item.date}</Text>
      <Text style={[styles.date, {color: '#c0c0c0'}]}>
        {item.amount || 'NA'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}>
        <View style={styles.header}>
          <Text style={[styles.viewAll, {color: COLORS.secondaryTextColor}]}>
            {Strings.PAYMENT_HISTORY}
          </Text>
          <Pressable
            // onPress={onPress}
            style={{
              // backgroundColor: 'white',
              backgroundColor: '#E5E4E2',
              elevation: 2,
              paddingHorizontal: 18,
              paddingVertical: 2,
              borderRadius: 5,
              shadowOffset: {width: 0, height: 2},
              // shadowColor: '#000',
              // shadowOpacity: 0.2,
            }}>
            <Text
              style={[
                styles.viewAll,
                {fontSize: 12, fontFamily: Fonts.Bold, color: '#c0c0c0'},
              ]}>
              {Strings.VIEW_ALL}
            </Text>
          </Pressable>
        </View>
        <Carousel
          enabled={false}
          onScrollEnd={index => {
            setSliderIndex(index);
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10], // Enable horizontal panning
            failOffsetY: [-5, 5], // Limit vertical movement to fail the gesture
          }}
          loop={false}
          width={width}
          height={width / 2}
          autoPlay={!true}
          data={datas}
          scrollAnimationDuration={200}
          renderItem={({item, index}) => (
            <>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 15,
                  color: COLORS.primaryColor,
                  fontFamily: Fonts.SemiBold,
                  marginTop: moderateScale(10),
                }}>
                {item.year}
              </Text>
              <FlatList
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
                      <Text
                        style={{
                          color: COLORS.darkGrey,
                          fontSize: 15,
                          fontFamily: Fonts.SemiBold,
                        }}>
                        No repayment histories found
                      </Text>
                    </View>
                  );
                }}
                data={item.tenures}
                onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                  handleOnScroll(event);
                }}
                renderItem={Item}
                keyExtractor={item => item.id.toString()}
                numColumns={numColumns}
                contentContainerStyle={styles.flatListContainer}
              />
            </>
          )}
        />
        <View style={{marginTop: moderateScale(15)}}>
          <Dots
            dotColor="#c0c0c0"
            borderColor={COLORS.whiteColor}
            currentIndex={SliderIndex}
            isCustom={true}
            numberOfDots={datas.length}
            size={0.8}
            onPress={(index: number): void => {
              handleSlider(index);
            }}
          />
        </View>
      </View>
      <View style={styles.secondCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {historyData.map((item, index) => (
            <>
              <View style={styles.dateView}>
                <Divider />
                <Text style={styles.sectionCardText}>{item?.date}</Text>
                <Divider />
              </View>
              <View style={styles.sectionCard} key={index}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  data={item?.data}
                  scrollEnabled={false}
                  renderItem={({item}) => (
                    <View style={styles.listItem}>
                      <View style={{flex: 0.1, padding: 5}}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={Icons.notesRound}
                            style={styles.icons}
                            resizeMode={Strings.CONTAIN}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.9,
                          padding: 5,
                          justifyContent: 'center',
                        }}>
                        <View style={styles.dataView}>
                          <Text
                            style={[
                              styles.listItemText,
                              {
                                color: COLORS.darkGrey,
                                fontFamily: Fonts.Bold,
                              },
                            ]}>
                            {item?.time}
                          </Text>
                          <Text style={[styles.listItemText]}> - </Text>
                          <Text
                            style={[
                              styles.listItemText,
                              {
                                marginRight: moderateScale(50),
                                fontFamily: Fonts.Medium,
                              },
                            ]}>
                            {removeUnderScore(item?.title)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  // keyExtractor={item => item.id.toString()}
                />
              </View>
            </>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default EmployeeLoanPaymentHistoryCard;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderRadius: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    marginVertical: RFPercentage(2.0),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  loanText: {
    fontFamily: Fonts.Bold,
    fontSize: RFPercentage(2.2),
    color: COLORS.secondaryColor,
  },
  viewAll: {
    fontFamily: Fonts.SemiBold,
    fontSize: RFPercentage(1.8),
    color: COLORS.secondaryColor,
  },
  flatListContainer: {
    // marginVertical: 10,
    flexGrow: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    elevation: 2,
    margin: 3,
    height: 40, // fixed height
    width: deviceWidth / 4.9,
    borderRadius: 5,
  },
  title: {
    fontFamily: Fonts.Regular,
    color: COLORS.whiteColor,
    fontSize: 14,
    textAlign: 'center',
  },
  date: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
    fontSize: 10,
    textAlign: 'center',
  },
  secondCard: {
    marginTop: 15,
    elevation: 2,
    backgroundColor: COLORS.whiteColor,
    flex: 0.7,
    borderRadius: RFPercentage(2.0),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  sectionCard: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  sectionCardText: {
    fontFamily: Fonts.ExtraBold,
    fontSize: RFPercentage(1.6),
    color: COLORS.darkGrey,
    marginBottom: 5,
    marginHorizontal: RFPercentage(0.5),
  },
  listItem: {
    flexDirection: 'row',
  },
  listItemText: {
    fontFamily: Fonts.Bold,
    fontSize: 12,
    color: COLORS.grey,
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    justifyContent: 'center',
    // marginHorizontal: 20,
  },
  divider: {height: 1, width: 120, backgroundColor: COLORS.lightGrey},
  icons: {height: 30, width: 30},
  dataView: {
    flexDirection: 'row',
  },
});
