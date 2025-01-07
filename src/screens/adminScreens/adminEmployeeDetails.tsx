import {useQuery} from '@apollo/client';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {moderateScale, scale} from 'react-native-size-matters';
import {GET_EMPLOYEE_DETAILS} from '../../api/query';
import {AdminHeader} from '../../components/adminComponents';
import CommonButton from '../../components/commonButton';
import {AdminEmployeeDetailsStyles} from '../../components/skeletonLoader/adminEmployeeDetailsStyles';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {
  acronym,
  getEmailName,
  isIos,
  removeUnderScore,
} from '../../utlis/functions';

const AdminEmployeeDetails: React.FC<{}> = (props: any) => {
  //Props variables
  const {navigation} = props;
  const {employeeId, status} = props?.route?.params ?? '';
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  //State variables
  const [loader, setLoader] = useState<boolean>(true);
  const {data} = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: {
      getEmployeeByIdId: employeeId,
    },
  });

  // console.log('DATATATATATATATATATATATATATATAT::::::', data);

  const fullName: string = [
    data?.getEmployeeById?.first_name ?? '',
    data?.getEmployeeById?.last_name ?? '',
  ]?.join(' ');

  const profile: string = data?.getEmployeeById?.profile;
  const phoneNumber: string[] = data?.getEmployeeById?.contact_number?.phones;
  const allNumbers = phoneNumber?.map((phone: any) => phone.number).join(', ');

  const managerEmail: string = data?.getEmployeeById?.manager?.email ?? '';
  const managerName: string = getEmailName(managerEmail);

  const gender: string = data?.getEmployeeById?.gender ?? '-';
  const contact: string = '';
  const department: string = data?.getEmployeeById?.department ?? '-';
  const branch: string = data?.getEmployeeById?.workAddress?.city ?? '-';
  const dob = moment(data?.getEmployeeById?.dob).format('DD-MM-YYYY');
  const requestingLoan: number | string =
    data?.getEmployeeById?.loans?.length ?? '1';
  // console.log('adminEmployeedata', data);
  //Hook functions
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  //UI functions
  const OthersDetails = (): React.JSX.Element => {
    const renderDepartment = (): React.JSX.Element => {
      return (
        <View style={styles.box1Container}>
          <Text style={styles.t4}>HR</Text>
          <Text style={styles.t3}>-</Text>
        </View>
      );
    };

    const renderBranch = (): React.JSX.Element => {
      return (
        <View style={styles.box1Container}>
          <Text style={styles.t4}>CEO</Text>
          <Text style={styles.t3}>-</Text>
        </View>
      );
    };

    const renderName = (): React.JSX.Element => {
      return (
        <View style={styles.box1Container}>
          <Text style={styles.t4}>{Strings.MANAGER}</Text>
          <Text style={styles.t3}>{managerName}</Text>
        </View>
      );
    };
    return (
      <View style={styles.departmentContainer}>
        {renderDepartment()}
        {renderBranch()}
        {renderName()}
      </View>
    );
  };

  const renderDetails = (): React.JSX.Element => {
    const renderName = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.NAME}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{fullName}</Text>
          </View>
        </View>
      );
    };

    const renderCompanyName = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.COMPANY_NAME}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>
              {data?.getEmployeeById?.org_name}
            </Text>
          </View>
        </View>
      );
    };

    const renderRequestingALoan = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.REQUESTING_A_LOAN}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{requestingLoan} times</Text>
          </View>
        </View>
      );
    };

    const renderEmail = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.EMAIL}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{data?.getEmployeeById?.email}</Text>
          </View>
        </View>
      );
    };

    const renderPhone = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.PHONE}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{allNumbers}</Text>
          </View>
        </View>
      );
    };

    const renderDOB = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.DOB}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{dob}</Text>
          </View>
        </View>
      );
    };

    const renderDepartment = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.DEPARTMENT}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{department}</Text>
          </View>
        </View>
      );
    };

    const renderBranch = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.BRANCH}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>{branch}</Text>
          </View>
        </View>
      );
    };

    const renderCEO = (): React.JSX.Element => {
      return (
        <View style={styles.contentRow}>
          <View style={styles.flex}>
            <Text style={styles.nameDetail}>{Strings.CEO}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.nameValue}>Ruban</Text>
          </View>
        </View>
      );
    };

    return (
      <>
        <View style={styles.content}>
          {renderName()}
          {renderCompanyName()}
          {renderRequestingALoan()}
          {renderEmail()}
          {renderPhone()}
          {renderDOB()}
          {renderDepartment()}
          {renderBranch()}
          {/* {renderCEO()} */}
        </View>
      </>
    );
  };
  const LoanDisbursed = (): React.JSX.Element => {
    const renderLoanDisbursed = (): React.JSX.Element => {
      return (
        <Text style={{...FONTS.h5, color: COLORS.secondaryTextColor}}>
          {Strings.LOAN_DISBURSED}
        </Text>
      );
    };

    const renderDateButton = (): React.JSX.Element => {
      return (
        <CommonButton
          title="Date : 15-04-2024"
          textStyle={{fontSize: moderateScale(12)}}
          containerStyle={{
            height: moderateScale(30),
            paddingHorizontal: moderateScale(10),
          }}
        />
      );
    };

    const renderDisbursedAmount = (): React.JSX.Element => {
      return <Text style={styles.cardText}>{Strings.DISBURSED_AMOUNT}</Text>;
    };

    const renderPendingAmountForDisbursal = (): React.JSX.Element => {
      return (
        <Text style={styles.cardText}>
          {Strings.PENDING_AMOUNT_FOR_DISBURSAL}
        </Text>
      );
    };

    const renderAccountNumber = (): React.JSX.Element => {
      return <Text style={styles.cardText}>{Strings.ACCOUNT_NUMBER}</Text>;
    };

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardSuContainer1}>
          {renderLoanDisbursed()}
          {renderDateButton()}
        </View>
        <View style={styles.cardSuContainer2}>
          <View style={{flex: 0.6, paddingLeft: moderateScale(15)}}>
            {renderDisbursedAmount()}
            {renderPendingAmountForDisbursal()}
            {renderAccountNumber()}
          </View>
          <View style={{flex: 0.4}}>
            <Text style={styles.cardText}>{': 400000'}</Text>
            <Text style={styles.cardText}>{': 12000'}</Text>
            <Text style={styles.cardText}>{': 34774727722'}</Text>
          </View>
        </View>
      </View>
    );
  };

  let statusColor;
  switch (status) {
    case 'Rejected':
      statusColor = '#FF5733';
      break;
    case 'Approved':
      statusColor = COLORS.seeMoreGreen;
      break;

    default:
      statusColor = COLORS.primaryColor;
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader back={true} />
      <View style={styles.mainContainer}>
        <View
          style={{
            height: scale(70),
            width: scale(70),
            borderRadius: 50,
            alignSelf: 'center',
            backgroundColor: COLORS.secondaryColor,
            marginTop: -40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.whiteColor,
            // padding: 10,
          }}>
          {profile ? (
            <>
              {imageLoading && (
                <ActivityIndicator
                  size={'small'}
                  color={COLORS.primaryColor}
                  style={{position: 'absolute'}}
                />
              )}
              <Image
                onLoadStart={() => {
                  setImageLoading(true);
                }}
                onLoadEnd={() => setImageLoading(false)}
                source={{uri: profile ?? ''}}
                resizeMode="cover"
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 100,
                }}
              />
            </>
          ) : (
            <Text
              style={{
                color: COLORS.whiteColor,
                fontFamily: Fonts.SemiBold,
                fontSize: 20,
                paddingTop: 5,
              }}>
              {acronym(fullName)}
            </Text>
          )}
        </View>
        {!loader ? (
          <View style={{paddingBottom: 150}}>
            <Text style={styles.name}>{fullName}</Text>
            <OthersDetails />
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderDetails()}
              <View
                style={{
                  backgroundColor: statusColor,
                  marginVertical: 20,
                  marginHorizontal: 30,
                  borderRadius: 10,
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: COLORS.whiteColor,
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: Fonts.Bold,
                  }}>
                  {removeUnderScore(status)}
                </Text>
              </View>
              {/* <LoanDisbursed /> */}
            </ScrollView>
          </View>
        ) : (
          <AdminEmployeeDetailsStyles />
        )}
      </View>
      {isIos && <View style={styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminEmployeeDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  cardSuContainer1: {
    flex: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10),
  },
  cardSuContainer2: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: moderateScale(100),
  },
  profileImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 50,
    alignSelf: 'center',
  },
  name: {
    ...FONTS.h4,
    color: COLORS.secondaryColor,
    textAlign: 'center',
    marginTop: 10,
  },
  box1Container: {
    backgroundColor: COLORS.whiteColor,
    elevation: 5,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(8),
    marginTop: moderateScale(10),
  },
  t3: {
    ...FONTS.body5,
    color: COLORS.primaryColor,
  },
  t4: {
    ...FONTS.body4,
    color: COLORS.darkGrey,
  },
  departmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: moderateScale(10),
  },
  content: {
    marginHorizontal: moderateScale(30),
    marginVertical: moderateScale(10),
  },
  nameDetail: {
    ...FONTS.h5,
    color: COLORS.lightGrey,
  },
  nameValue: {
    ...FONTS.h5,
    color: COLORS.secondaryTextColor,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  flex: {flex: 0.5},
  cardContainer: {
    marginHorizontal: moderateScale(30),
    backgroundColor: COLORS.whiteColor,
    elevation: 5,
    padding: moderateScale(5),
    marginBottom: moderateScale(50),
    borderRadius: moderateScale(10),
  },
  cardText: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(12),
    color: COLORS.lightGrey,
    marginVertical: moderateScale(8),
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
