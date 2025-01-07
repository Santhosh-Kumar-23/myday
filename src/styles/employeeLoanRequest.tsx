import {StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Elevation} from '../constants/enums';
import {COLORS, Fonts, FONTS} from '../constants/theme';
import {isIos} from '../utlis/functions';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  noDataFound: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
  },
  pickerContainer: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    marginHorizontal: RFPercentage(2),
    padding: RFPercentage(2),
    borderRadius: RFPercentage(2),
  },
  selectTextContainer: {
    backgroundColor: COLORS.secondaryColor,
    width: 80,
    borderRadius: RFPercentage(0.5),
    // paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(0.3),
    marginLeft: RFPercentage(2),
  },
  selectText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.Medium,
  },
  buttonContainer: {
    marginTop: RFPercentage(2),
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectedText: {
    ...FONTS.body3,
    color: COLORS.blackColor,
  },
  loanRequestText: {
    ...FONTS.body4,
    color: COLORS.secondaryColor,
  },
  loanRequestIdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: 11,
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
  },
  statusContainer: {
    backgroundColor: 'red',
    borderRadius: RFPercentage(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(3),
  },
  loanDescription: {
    ...FONTS.body3,
    color: COLORS.darkGrey,

    marginTop: RFPercentage(1),
    width: 230,
  },
  loanDate: {
    color: COLORS.lightGrey,
    ...FONTS.body3,
    marginTop: RFPercentage(1),
  },
  loanRequestContainer1: {
    flex: 0.1,
    alignItems: 'center',
  },
  menuOptionStyles: {
    color: COLORS.lightGrey,
    fontFamily: Fonts.SemiBold,
    marginLeft: 5,
  },
  loanRequestContainer2: {
    flex: 0.9,
  },
  loanRequestContainer3: {
    flex: 0.25,
  },
  loanRequestContainer: {
    marginHorizontal: RFPercentage(2),
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(1.2),
    flexDirection: 'row',
    padding: RFPercentage(2),
    marginBottom: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  dateContainer: {
    flexDirection: 'row',
    marginVertical: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
  },
  mainContainer1: {
    flex: 0.85,
  },
  mainContainer2: {
    flex: 0.15,
    alignItems: 'flex-end',
  },
  datePickerMain: {
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(1),
    elevation: Elevation.cardContainerElevation,
    padding: RFPercentage(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  filterContainer: {
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFPercentage(1.8),
    borderRadius: RFPercentage(1),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  dateText: {
    color: COLORS.lightGrey,
    fontFamily: Fonts.Bold,
    fontSize: RFPercentage(1.6),
  },
  nextAndPrevious: {
    backgroundColor: COLORS.whiteColor,
    padding: RFPercentage(1),
    borderRadius: RFPercentage(0.5),
    elevation: 2,
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  nextAndPreviousImage: {
    height: RFPercentage(2),
    width: RFPercentage(2),
  },
});
