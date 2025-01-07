import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import * as Query from '../../api/query';
import CommonButton from '../../components/commonButton';
import {EmployeeSettingsSubHeader} from '../../components/employeeComponents/employeeSettingsSubHeader';
import NoDataFound from '../../components/noDataFound';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Images from '../../constants/images';
import * as Strings from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const EmployeeVerification: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const {data, refetch, loading} = useQuery(Query.GET_PROOF_DETAILS);
  // const {isVerification} = props?.route?.params ?? false;
  // console.log('aaaaaaaaaaaaaaaaaaaaa', isVerification);

  const datats = data?.getEmployeeKycDetails;
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );
  const dispatch = useDispatch();

  const GettingData = datats?.map((item: any, index: number) => {
    console.log(item?.Document);

    return {
      id: item?.id,
      Document: item?.Document,
      Notification: item?.Notification,
      Status: item?.Status,
      img: item?.Document === 'PAN Verification' ? Images.pan : Images.aadhar,
    };
  });
  console.log('GettingData', GettingData);

  const RenderItem = ({item}: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.cardTopView}>
            <Text style={styles.panText}>{item?.Document ?? ''}</Text>
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: item?.id == 1 ? 'flex-end' : 'flex-end',
            }}>
            <Image
              source={item?.img}
              style={{
                width: item?.id == 1 ? scale(40) : scale(40),
                height: item == 1 ? verticalScale(40) : verticalScale(40),
                marginRight: moderateScale(25),
              }}
              resizeMode={'contain'}
            />
          </View>
        </View>
        <View style={{flex: 0.8, paddingVertical: moderateScale(12)}}>
          <Text style={styles.notification}>{item?.Notification ?? ''}</Text>

          {item?.Status == 'Verify' ? (
            <CommonButton
              title={item?.Status}
              containerStyle={styles.commonButtonStyle}
              textStyle={styles.comomButtonText}
              onPress={() => {
                navigation.navigate(Strings.EMPLOYEE_PROOF_VERIFICATION, {
                  data_Item: item,
                });
              }}
            />
          ) : (
            <View style={styles.verified}>
              <Image
                source={Icons.complete}
                style={styles.verifiedImageStyle}
                resizeMode={Strings.CONTAIN}
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <EmployeeSettingsSubHeader
        title={'Verification'}
        // onPress={() => {
        //   if (isVerification == true) {
        //     navigation.navigate('LoanRequestStack', {
        //       screen: Strings.EMPLOYEE_LOAN_REQUEST_REVIEW_DETAILS,
        //     });
        //   } else {
        //     navigation.goBack();
        //   }
        // }}
        onPress={() => navigation.goBack()}
      />
      {!loading ? (
        <FlatList
          data={GettingData}
          renderItem={RenderItem}
          contentContainerStyle={{flexGrow: 1}}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <NoDataFound />
              </View>
            );
          }}
        />
      ) : (
        <EmployeeCommonLoader />
      )}
    </SafeAreaView>
  );
};

export default EmployeeVerification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  verified: {
    alignSelf: 'flex-end',
    height: verticalScale(25),
    marginRight: moderateScale(20),
    flexDirection: 'row',
    borderRadius: 8,
    marginTop: moderateScale(10),
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: moderateScale(14),
    fontFamily: Fonts.Bold,
    color: COLORS.darkGrey,
  },
  verifiedImageStyle: {
    height: verticalScale(14),
    width: scale(14),
    marginRight: moderateScale(5),
  },
  card: {
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(15),
    backgroundColor: COLORS.backgroundColour,
    elevation: Elevation.cardContainerElevation,
    marginBottom: moderateScale(10),
    borderRadius: moderateScale(10),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  header: {
    flex: 0.2,
    backgroundColor: COLORS.secondaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  panText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 14,
    color: COLORS.backgroundColour,
    marginLeft: moderateScale(20),
  },
  notification: {
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(13),
    color: COLORS.darkGrey,
    marginLeft: moderateScale(20),
  },
  cardTopView: {flex: 0.5, justifyContent: 'center'},
  commonButtonStyle: {
    height: verticalScale(25),
    width: scale(100),
    alignSelf: 'flex-end',
    marginRight: moderateScale(10),
    marginVertical: moderateScale(10),
  },
  comomButtonText: {fontSize: moderateScale(10)},
});
