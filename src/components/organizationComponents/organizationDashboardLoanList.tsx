import React from 'react';
import {FlatList, Pressable, StyleSheet, Text} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
import NoDataFound from '../noDataFound';

const OrganizationDashboardLoanList: React.FC<
  Interfaces.OrganizationLoanListProps
> = ({LoanListData, onPressLoan}) => {
  const RenderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.button}
        onPress={() => {
          onPressLoan && onPressLoan(item);
        }}>
        <Text
          style={[
            styles.category,
            {fontFamily: Fonts.Medium, color: COLORS.darkGrey},
          ]}>
          {item?.category ?? ''}
        </Text>
        <Text style={styles.category}>{item?.count ?? ''}</Text>
      </Pressable>
    );
  };
  return (
    <FlatList
      data={LoanListData}
      renderItem={RenderItem}
      scrollEnabled={true}
      contentContainerStyle={{marginBottom: moderateScale(100)}}
      ListEmptyComponent={() => {
        return <NoDataFound />;
      }}
    />
  );
};

export default OrganizationDashboardLoanList;

const styles = StyleSheet.create({
  button: {
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(16),
    backgroundColor: COLORS.backgroundColour,
    borderRadius: moderateScale(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(5),
    flexDirection: 'row',
    height: verticalScale(50),
    paddingHorizontal: moderateScale(20),
    elevation: moderateScale(2),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
  },
  noDataFound: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
  },
  category: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(14),
    color: COLORS.blackColor,
  },
});
