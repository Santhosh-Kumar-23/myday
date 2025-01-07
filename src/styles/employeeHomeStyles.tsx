import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {COLORS, FONTS} from '../constants/theme';
import {isIos} from '../utlis/functions';
export const employeeHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  quick_Links: {
    ...FONTS.h3,
    color: COLORS.blackColor,
    marginHorizontal: RFPercentage(3),
    marginTop: RFPercentage(1.8),
  },
  masonryList: {
    marginTop: RFPercentage(1.0),
    marginHorizontal: RFPercentage(3.0),
    backgroundColor: COLORS.whiteColor,
    height: RFPercentage(11.8),
    borderRadius: RFPercentage(2.0),
    elevation: 5,
    justifyContent: 'space-evenly',
  },
  body: {
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  masonrtList_title: {
    marginTop: RFPercentage(2.0),
    ...FONTS.body3,
    // color: COLORS.darkGrey,
  },
  masonryCard: {
    // backgroundColor: COLORS.whiteColor,
    marginBottom: 10,
    borderRadius: RFPercentage(2.0),
    justifyContent: 'center',
    // paddingTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(1.7),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.darkGrey,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 20,
    shadowRadius: isIos ? 5 : 2,
    elevation: isIos ? 10 : 8,
  },

  masonryCardImg: {
    height: RFPercentage(4.5),
    width: RFPercentage(4.5),
    marginTop: 5,
  },
  employeeCardView: {marginTop: RFPercentage(-4.6)},
  masronycontentContainerStyle: {
    paddingHorizontal: RFPercentage(3.5),
    paddingVertical: RFPercentage(1.0),
  },
  masronyCardView: {flexDirection: 'row', justifyContent: 'space-between'},
  leftCard: {flex: 1, marginRight: RFPercentage(1), gap: 10},
  rightCard: {flex: 1, marginLeft: RFPercentage(1), gap: 10},
});
