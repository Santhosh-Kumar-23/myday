import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import { isIos } from '../utlis/functions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },

  modeOfPaymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  mainContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 100,
  },
  subConatiner: {
    flex: 0.6,
    paddingRight: moderateScale(10),
    flexWrap: 'wrap',
    marginTop: moderateScale(5),
  },
  headerCard: {
    borderRadius: moderateScale(20),
    marginHorizontal: moderateScale(16),
    padding: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  loanRangeDate: {
    ...FONTS.body4,
    color: COLORS.whiteColor,
    textAlign: 'right',
    marginRight: moderateScale(10),
  },
  totalAmount: {
    ...FONTS.h4,
    color: COLORS.whiteColor,
    marginLeft: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  employeescount: {
    ...FONTS.body3,
    color: COLORS.whiteColor,
    textAlign: 'left',
    marginVertical: moderateScale(5),
    marginLeft: moderateScale(10),
  },
  calenderButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(10),
    // marginVertical: moderateScale(10),
  },
  chooseDate: {
    ...FONTS.body4,
    color: COLORS.whiteColor,
  },
  calenderIcon: {
    height: scale(15),
    width: scale(15),
    resizeMode: 'contain',
    marginLeft: moderateScale(5),
  },
  loanCard: {
    marginHorizontal: moderateScale(16),
    elevation: 5,
    padding: moderateScale(10),
    paddingLeft: moderateScale(15),
    backgroundColor: COLORS.backgroundColour,
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(10),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
    
  },
  nameCard: {flex: 0.5, marginVertical: moderateScale(5)},
  nameRow: {flexDirection: 'row', justifyContent: 'space-between'},
  itemNameText: {...FONTS.body4, color: COLORS.secondaryTextColor},
  statusCard: {
    height: verticalScale(15),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.GreenColour,
    justifyContent:'center'
  },
  statusText: {...FONTS.body5, color: COLORS.whiteColor},
  loanAmount: {
    ...FONTS.h7,
    color: COLORS.secondaryTextColor,
    marginVertical: moderateScale(8),
  },
  bottomCard: {flex: 0.5, flexDirection: 'row'},
  deptCard: {flex: 0.4, padding: 5},
  deptRow: {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'},
  deptText: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.darkGrey,
  },
  deptContentText: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.lightGrey,
  },
  nextAndPrevious: {
    backgroundColor: COLORS.whiteColor,
    padding: RFPercentage(1),
    borderRadius: RFPercentage(0.5),
    elevation: 2,
  },
  nextAndPreviousImage: {
    height: RFPercentage(2),
    width: RFPercentage(2),
  },
  pickerContainer: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    marginHorizontal: moderateScale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
  },
  buttonContainer: {
    marginTop: moderateScale(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectTextContainer: {
    backgroundColor: COLORS.secondaryColor,
    // width: 90,
    borderRadius: RFPercentage(0.5),
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(0.2),
    marginLeft: RFPercentage(2),
  },
  selectText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.Medium,
  },
  fixBackground:{
    backgroundColor: COLORS.DashboardBackgroundColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000,
  }
});
