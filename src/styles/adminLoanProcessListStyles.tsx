import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {COLORS, FONTS, Fonts} from '../constants/theme';
import {isIos} from '../utlis/functions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
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
  mainContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headerFlatList: {
    marginHorizontal: moderateScale(2),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20),
  },
  name: {
    fontSize: 13,
    fontFamily: Fonts.SemiBold,
    color: COLORS.secondaryTextColor,
  },
  cardContainer: {
    elevation: 2,
    marginHorizontal: moderateScale(16),
    backgroundColor: COLORS.whiteColor,
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginVertical: moderateScale(10),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  statusView: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.whiteColor,
  },
  detailsView: {
    flex: 0.65,
    backgroundColor: COLORS.whiteColor,
  },
  member: {
    ...FONTS.h7,
    color: COLORS.secondaryTextColor,
  },
  email: {
    ...FONTS.body5,
    color: COLORS.lightGrey,
  },
  status: {
    backgroundColor: COLORS.errorRed,
    padding: moderateScale(2),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(20),
    marginTop: moderateScale(10),
  },
  statusText: {
    ...FONTS.h6,
    color: COLORS.whiteColor,
  },
  companyDetailsView: {
    flexDirection: 'row',
  },
  deptView: {
    flex: 0.4,
    backgroundColor: COLORS.whiteColor,
  },
  branchView: {
    flex: 0.4,
    backgroundColor: COLORS.whiteColor,
  },
  profileView: {
    flex: 0.2,
    alignItems: 'center',
    backgroundColor: COLORS.whiteColor,
    justifyContent: 'flex-end',
  },
  profileImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  heading: {
    ...FONTS.h6,
    color: COLORS.lightGrey,
  },
  headingText: {
    ...FONTS.h6,
    color: COLORS.secondaryTextColor,
  },
  fixBackground: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000,
  },
});
