import {useMutation, useQuery, useSubscription} from '@apollo/client';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import FastImage from 'react-native-fast-image';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import * as Mutations from '../../api/mutation';
import * as Query from '../../api/query';
import {GetMobileUserDataResponse} from '../../api/queryInterface';
import {EmployeeAttendanceWeightageCard} from '../../components/employeeComponents/employeeAttendanceWeightageCard';
import {EmployeeChooseNonLoanCard} from '../../components/employeeComponents/employeeChooseLoanCard';
import EmployeeDashboardDueCard from '../../components/employeeComponents/employeeDashboardDueCard';
import {EmployeeNextEmiCard} from '../../components/employeeComponents/employeeNextEmiCard';
import {EmployeeNonLoanCard} from '../../components/employeeComponents/employeeNonLoanCard';
import EmployeePrincipleBalanceCard from '../../components/employeeComponents/employeePrincipleBalanceCard';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import {EmployeeLoanHomeLoader} from '../../components/skeletonLoader/employeeLoanHomeLoader';
import {ModalErrorType} from '../../constants/enums';
import * as employeeImages from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as Strings from '../../constants/string';
import * as employeeHomeStrings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {employeeHomeStyles} from '../../styles';
import {
  acronym,
  deviceId,
  deviceType,
  getFcmToken,
  isIos,
} from '../../utlis/functions';

interface Item {
  id: number;
  aspectratio: number;
  color: string;
  img: any; // Replace 'any' with the actual type for images if available
  title: string;
}

interface QueryVariables {
  deviceType: 'ios' | 'android';
}

const width: number = Dimensions.get('window').width / 2.5;

const items: Item[] = [
  {
    id: 1,
    aspectratio: 170 / 200,
    color: '#ffcdd2',
    img: employeeImages.trackLoan,
    title: employeeHomeStrings.TRACK_LOAN_STATUS,
  },
  {
    id: 2,
    aspectratio: 1.3,
    color: '#bbdefb',
    img: employeeImages.checkPayment,
    title: employeeHomeStrings.CHECK_REPAYMENTS,
  },
  {
    id: 3,
    aspectratio: 1.3,
    color: '#c8e6c9',
    img: employeeImages.applyForLoan,
    title: employeeHomeStrings.APPLY_FOR_A_LOAN,
  },
  {
    id: 4,
    aspectratio: 170 / 200,
    color: '#ffccbc',
    img: employeeImages.approveAutoPay,
    title: employeeHomeStrings.APPROVE_AUTOPAY,
  },
];

const EmployeeLoanHome: React.FC<{}> = (props: any) => {
  const dispatch = useDispatch();
  const [userID, setUserId] = useState<string>('');
  //Props variables
  const {navigation} = props;

  useEffect(() => {
    console.log('CALL:::::::::::::::::::');
  });

  //State Variables
  const [loader, setLoader] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  //Other Styles
  const styles = employeeHomeStyles;
  //mutations
  const [onCallNotificationApi] = useMutation(Mutations.NotificationApi);

  //Other Variables
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );

  const employeeFirstName: string = getEmployeeDetails?.first_name ?? '';
  const employeeLastName: string = getEmployeeDetails?.last_name ?? '';
  const employeeFullName = [employeeFirstName, employeeLastName].join(' ');

  const employeeTotalSalary: number | string =
    getEmployeeDetails?.compensation?.amount ?? '00';
  const checkNewUser: boolean = getEmployeeDetails?.isNew ?? '';
  (global as any).activeapplication = getEmployeeDetails?.activeapplication;
  (global as any).employeeSalary = employeeTotalSalary;
  (global as any).employeeLoanAmount = 0;
  const attendance = getEmployeeDetails?.attendance_percentage ?? 0;

  //USE QUERIES

  const {data: attendanceDetails} = useQuery(Query.ATTENDANCE_DETAILS, {
    variables: {
      userId: userID,
    },
  });

  // console.log('userID::::::::::::::::::::::', userID);

  const attendanceData =
    attendanceDetails?.getLastSixMonthsAttendance?.attendanceData;

  const {
    data: mobileUserDataQuery,
    loading: mobileUserLoading,
    refetch: refetch,
    error: mobileuserdataError,
  } = useQuery<GetMobileUserDataResponse, QueryVariables>(
    Query.GET_MOBILE_USER_DATA,
    {
      variables: {
        deviceType: isIos ? 'ios' : 'android',
      },
    },
  );

  // console.log('mobileuserdataErrorP:::::::::::::::', mobileuserdataError);

  const {
    data: employeeDetailsQuery,
    loading: employeeDetailsLoading,
    refetch: refetchEmployee,
    error: getEmployeeERROR,
  } = useQuery(Query.GET_EMPLOYEE_DETAILS, {
    skip: !userID,
    variables: {
      getEmployeeByIdId: userID,
    },
  });

  // console.log(
  //   'getEmployeeERROR::::::::::::::::::::::::::::',
  //   getEmployeeDetails.attanceRecordExists,
  // );

  const {
    data: cardData,
    refetch: refetchCardData,
    loading: cardDataLoading,
    error: loanRequestError,
  } = useQuery(Query.GET_LOAN_REQUEST_STATUS, {
    variables: {
      getLoanRequestId: (global as any).activeapplication,
    },
    skip: !(global as any).activeapplication,
  });

  // console.log('ccccccccccccccccccccccccc', (global as any).activeapplication);

  // console.log(
  //   'cardData?.getLoanRequest?.status::::::::::::::::::::::::::',
  //   cardData?.getLoanRequest?.status,
  // );

  const {data, error: pusherError} = useSubscription(
    Query.NOTIFICATION_PUSHER,
    {
      variables: {userId: userID},
      onSubscriptionData(options) {
        // console.log('showSubscriptionData', options);
      },
      onError: error => {
        // console.log('showSubscriptionError', error);
      },
    },
  );

  // console.log('pusherError::::::::::::::::::::::::::::::::::::', pusherError);

  const {
    data: countData,
    refetch: notificationRefetch,
    error: CountError,
  } = useQuery(Query.GET_NOTIFICATION_COUNT, {});

  // console.log('CountError:::::::::::::', CountError);

  const realCount = data?.notificationCount;
  // console.log(JSON.stringify(cardData), 'cardData');
  // console.log('realCount', realCount);
  ((global as any).notificationCount = countData?.getNotificationCountByUser) ||
    realCount;
  // console.log(
  //   ':::::::::::::::::',
  //   cardData?.getLoanRequest?.ownerApprovalStatus,
  // );

  // console.log('`employeeDetailsQuery`', JSON.stringify(employeeDetailsQuery));
  (global as any).isLoanAvailable =
    employeeDetailsQuery?.getEmployeeById?.isLoanRaised;
  // console.log('`isLoanAvailable`', (global as any).isLoanAvailable);
  const profileUrl = employeeDetailsQuery?.getEmployeeById?.profile ?? '';
  const rejectedData = cardData?.getLoanRequest?.status;
  // console.log('rejectedData', rejectedData);

  //Hooks Functions
  useEffect(() => {
    getUserInformation()
      .then((data: any) => {
        console.log('GET_USER_INFORMATION::::::::::::::::::::::::', data);
        setUserId(data?.userId);
      })
      .catch(error => {
        console.log(
          'GET_USER_INFORMATION ERROR::::::::::::::::::::::::::',
          error,
        );
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  useEffect(() => {
    // Listener for the custom event
    const subscription = DeviceEventEmitter.addListener(
      'REFETCH_EMPLOYEE_DETAILS',
      () => {
        refetchEmployee(); // Trigger the refetch of the query
      },
    );

    // Cleanup listener on component unmount
    return () => {
      subscription.remove();
    };
  }, []);
  useFocusEffect(
    useCallback(() => {
      let didCancel: boolean = false;

      const fetchData = async () => {
        if (mobileUserDataQuery) {
          //  await refetch();
          if (!didCancel) {
            dispatch(
              Actions.gettingMobileUserData(
                mobileUserDataQuery?.getMobileUserLoginData,
              ),
            );
          }
        }

        if (employeeDetailsQuery) {
          //await refetchEmployee();
          if (!didCancel) {
            dispatch(
              Actions.gettingEmployeeDetails(
                employeeDetailsQuery?.getEmployeeById,
              ),
            );
          }
        }
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }, [
      mobileUserDataQuery,
      employeeDetailsQuery,
      refetch,
      refetchEmployee,
      dispatch,
    ]),
  );
  useFocusEffect(
    useCallback(() => {
      refetchEmployee();
    }, [profileUrl, getEmployeeDetails]),
  );
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log(
      //   'A new FCM message arrived:::::::::::::::::::::::!',
      //   JSON.stringify(remoteMessage),
      // );
      // Show an alert or notification here
      refetchCardData();
    });

    return unsubscribe;
  }, []);
  useFocusEffect(
    useCallback(() => {
      notification();
      refetchCardData();
      notificationRefetch();
    }, []), // Dependencies
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetchCardData();
    refetch();
    refetchEmployee();
    notificationRefetch();
    notification();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const notification = async () => {
    const fcmToken = await getFcmToken();
    const deviceID = await deviceId();
    const deviceTypee = await deviceType();
    // console.log(
    //   'deviceID::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::',
    //   deviceID,
    // );

    // console.log(
    //   'fcmToken:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::',
    //   fcmToken,
    // );
    // console.log('deviceId', deviceId);
    onCallNotificationApi({
      variables: {
        fcmToken: fcmToken,
        deviceId: deviceID,
        deviceType: deviceTypee,
      },
      onCompleted: data => {
        console.log('EmployeenotificationData', data);
      },
      onError: error => {
        console.log('notificationError', error);
      },
    });
  };

  // console.log(
  //   'organizationApprovalStatus::::::::::::::::',
  //   cardData?.getLoanRequest?.organizationApprovalStatus,
  // );
  // console.log(
  //   'ownerApprovalStatus:::::::::::::::::::::',
  //   cardData?.getLoanRequest?.ownerApprovalStatus,
  // );

  const filterCardData = [
    ...(cardData?.getLoanRequest?.organizationApprovalStatus ?? []),
    ...(cardData?.getLoanRequest?.ownerApprovalStatus ?? []),
  ]
    .filter(item => item.enable)
    .map(item => ({
      id: item._id,
      loanProcess:
        item.__typename === 'OrganizationUserApprovalStatusFlow'
          ? `level ${item.level}`
          : item.label, // Conditional assignment
      application: cardData?.getLoanRequest?.applicationNo,
      date:
        item.__typename === 'OrganizationUserApprovalStatusFlow'
          ? item.createdAt
          : item.updatedAt,
      loanAmount: cardData?.getLoanRequest?.loanAmount,
      loanStatus: item.status,
      loanType: cardData?.getLoanRequest?.loanType,
      source:
        item.__typename === 'OrganizationUserApprovalStatusFlow'
          ? `${item.name}`
          : `${cardData?.getLoanRequest?.label}`, // Determine source type
      orgLabel:
        item.__typename === 'OrganizationUserApprovalStatusFlow' && item.label,
    }));

  // console.log('filterCardData::::::::::::::', filterCardData);

  const ExtractCardData = filterCardData.pop();
  // console.log('ExtractCardData:::::::::::::', ExtractCardData);
  const ExtractSecondCardData = filterCardData.at(-1);

  const RejectedStatus = [
    ...(cardData?.getLoanRequest?.organizationApprovalStatus ?? []),
    ...(cardData?.getLoanRequest?.ownerApprovalStatus ?? []),
  ].find(item => item.status === 'Rejected');
  // console.log(RejectedStatus, 'RejectedStatus=======>');

  const TotalCountfilterCardData = [
    ...(cardData?.getLoanRequest?.organizationApprovalStatus ?? []),
    ...(cardData?.getLoanRequest?.ownerApprovalStatus ?? []),
  ];
  const allEnabled = TotalCountfilterCardData.every(
    item => item.enable === true && item.status === 'Approved',
  );
  // console.log(TotalCountfilterCardData, 'allEnabled=======>', allEnabled);

  const percentage =
    allEnabled || cardData?.getLoanRequest?.stage == 'Disbursement'
      ? '100%'
      : (() => {
          const calculatedPercentage = Math.abs(
            Math.round(
              (filterCardData.length / TotalCountfilterCardData.length) * 100,
            ),
          );
          return `${calculatedPercentage}%`;
        })();

  console.log(percentage, 'percentage=======>');
  // console.log(profileUrl, 'profileUrl=======>');
  if (mobileUserLoading || employeeDetailsLoading || cardDataLoading) {
    return <EmployeeLoanHomeLoader />;
  }

  interface CardProps {
    width: number;
    color: string;
    aspectratio: number;
    img: ImageSourcePropType;
    title: string;
    navigation?: any;
  }
  const Card: React.FC<CardProps> = ({width, aspectratio, img, title}) => {
    const titles = [
      employeeHomeStrings.CHECK_REPAYMENTS,
      employeeHomeStrings.APPROVE_AUTOPAY,
    ];
    return (
      <Pressable
        onPress={() => {
          if (title == 'Track Application Status') {
            navigation.navigate('LoanRequestStack', {
              screen: employeeHomeStrings.EMPLOYEE_LOAN_REQUEST,
              initial: false,
              screenName: 'TrackLoanStatus',
            });
          } else if (title == 'Apply for a Salary Advance') {
            if (getEmployeeDetails?.attanceRecordExists == false) {
              dispatch(
                Actions.errorMessage({
                  errorMessage:
                    '"Your attendance data is missing. Please provide it to proceed with the loan application."',
                  status: true,
                  errorType: ModalErrorType.Info,
                }),
              );
            } else if (getEmployeeDetails?.advanceSalaryLimit < '1500') {
              dispatch(
                Actions.errorMessage({
                  errorMessage: 'Your are not eligible to raise Loan',
                  status: true,
                  errorType: ModalErrorType.Info,
                }),
              );
            } else {
              navigation.navigate('LoanRequestStack', {
                screen: employeeHomeStrings.EMPLOYEE_NEW_LOAN,
                initial: false,
                screenName: ' Apply for a Loan',
              });
            }
          } else if (title == 'Check Repayments') {
            // dispatch(
            //   Actions.errorMessage({
            //     errorMessage: 'update Coming Soon',
            //     status: true,
            //     errorType: ModalErrorType.Info,
            //   }),
            // );
            // navigation.navigate('TrackLoanStack', {
            //   screen: employeeHomeStrings.EMPLOYEE_PAYMENT_HISTORY,
            //   initial: false,
            //   screenName: 'Check Repayments',
            // });
          } else {
            // navigation.navigate('ProfileStack', {
            //   screen: employeeHomeStrings.EMPLOYEE_AUTO_PAYMENT_SETUP,
            //   initial: false,
            //   screenName: 'Approve Autopay',
            // });
          }
        }}
        style={[
          {
            width: width,
            height: width * aspectratio,
            backgroundColor: titles.includes(title)
              ? '#E5E4E2'
              : COLORS.whiteColor,
          },
          styles.masonryCard,
        ]}>
        <View
          style={{
            backgroundColor: titles.includes(title)
              ? '#E5E4E2'
              : COLORS.DashboardBackgroundColor,
            elevation: 3,
            height: RFPercentage(7.0),
            width: RFPercentage(7.0),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}>
          <Image
            source={img}
            style={styles.masonryCardImg}
            tintColor={
              titles.includes(title) ? '#c0c0c0' : COLORS.secondaryColor
            }
            resizeMode={employeeHomeStrings.CONTAIN}
          />
        </View>
        <Text
          style={[
            styles.masonrtList_title,
            {
              color: titles.includes(title) ? '#c0c0c0' : COLORS.darkGrey,
            },
          ]}>
          {title}
        </Text>
      </Pressable>
    );
  };

  const renderName = (): React.JSX.Element => {
    return (
      <View>
        <Text style={Styles.heading1} numberOfLines={1}>
          {employeeHomeStrings.HELLO + ' ' + employeeFirstName},
        </Text>
        <Text style={Styles.heading2}>
          {Strings.YOU_HAVE_AN_OPERATING_ADVANCE_DUE_IN_CURRENT}
        </Text>
      </View>
    );
  };

  const renderProfile = (): React.JSX.Element => {
    return (
      <Pressable
        style={[Styles.profileContainer]}
        onPress={() => {
          navigation.navigate('ProfileStack' as never);
        }}>
        <View style={Styles.profileSubContainer}>
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={{position: 'absolute'}}
              color={'white'}
            />
          )}
          {profileUrl ? (
            <FastImage
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              source={{uri: profileUrl, priority: FastImage.priority.high}}
              style={Styles.imageStyle}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <Text
              style={{
                color: COLORS.whiteColor,
                fontFamily: Fonts.SemiBold,
                marginTop: 5,
                fontSize: 18,
              }}>
              {acronym(employeeFullName)}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  const handleScroll = event => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;

    // Detect if user has scrolled to the top
    if (contentOffset.y <= 0) {
      // console.log('Reached the top');
    }

    // Detect if user has scrolled to the end (bottom)
    const isEndReached =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;
    if (isEndReached) {
      // console.log('Reached the end');
    }
  };

  const renderLoanHome = (): React.JSX.Element => {
    return (
      <>
        <View>
          <View>
            <View style={Styles.container}>
              {renderName()}
              {renderProfile()}
            </View>
            <View style={Styles.v1}></View>
          </View>
          <ScrollView
            onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.secondaryColor, COLORS.primaryColor]}
              />
            }
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: !checkNewUser ? 100 : 0,
            }}>
            {!checkNewUser ? (
              <View style={styles.employeeCardView}>
                {/* <EmployeeLoanCard /> */}
                <EmployeeDashboardDueCard
                  applicationNo={ExtractCardData?.application}
                  percentage={
                    percentage == '100%' &&
                    cardData?.getLoanRequest?.status !== 'Disbursed'
                      ? '99%'
                      : percentage == '100%' &&
                        cardData?.getLoanRequest?.status == 'Disbursed'
                      ? '100%'
                      : percentage
                  }
                  globalStatus={cardData?.getLoanRequest?.status}
                  Amount={ExtractCardData?.loanAmount}
                  approvedDate={ExtractCardData?.date}
                  LoanType={ExtractCardData?.loanType}
                  ApprovalType={ExtractSecondCardData?.loanProcess}
                  name={employeeFirstName}
                  nextStatus={
                    rejectedData == 'Rejected'
                      ? '-'
                      : `${ExtractCardData?.loanProcess} - ${ExtractCardData?.source}`
                  }
                  status={ExtractSecondCardData?.orgLabel}
                  ApproverName={
                    rejectedData === 'Rejected'
                      ? RejectedStatus?.status
                      : ExtractSecondCardData?.source ?? ''
                  }
                  orgLabel={cardData?.getLoanRequest?.stage}
                />
                <Text style={styles.quick_Links}>
                  {employeeHomeStrings.QUICK_LINKS}
                </Text>
              </View>
            ) : (
              <View>
                <EmployeeNonLoanCard
                  name={employeeFirstName}
                  amount={getEmployeeDetails?.advanceSalaryLimit ?? 0}
                  interest={Strings.ZERO}
                  onPress={() => {}}
                  showDivider={true}
                />
              </View>
            )}
            {!checkNewUser ? (
              <>
                <ScrollView
                  contentContainerStyle={styles.masronycontentContainerStyle}>
                  <View style={styles.masronyCardView}>
                    <View style={styles.leftCard}>
                      {items
                        .filter((_, i) => i % 2 === 0)
                        .map(item => (
                          <Card
                            key={item.id}
                            width={width}
                            aspectratio={item.aspectratio}
                            color={item.color}
                            img={item.img}
                            title={item.title}
                          />
                        ))}
                    </View>
                    <View style={styles.rightCard}>
                      {items
                        .filter((_, i) => i % 2 !== 0)
                        .map(item => (
                          <Card
                            key={item.id}
                            width={width}
                            aspectratio={item.aspectratio}
                            color={item.color}
                            img={item.img}
                            title={item.title}
                          />
                        ))}
                    </View>
                  </View>
                </ScrollView>
                {percentage == '100%' && <EmployeePrincipleBalanceCard />}
                <EmployeeAttendanceWeightageCard
                  LastSixMonthsAttendance={attendanceData}
                  attendancePercentage={
                    attendanceDetails?.getLastSixMonthsAttendance
                      ?.attendancePercentageByUser
                  }
                />
                {percentage == '100%' && <EmployeeNextEmiCard />}
              </>
            ) : (
              <View
                style={{marginBottom: 120, marginTop: checkNewUser ? -20 : 0}}>
                <EmployeeChooseNonLoanCard
                  onPress={() => {
                    if (getEmployeeDetails?.attanceRecordExists == false) {
                      dispatch(
                        Actions.errorMessage({
                          errorMessage:
                            'Your attendance data is missing. Please provide it to proceed with the loan application.',
                          status: true,
                          errorType: ModalErrorType.Info,
                        }),
                      );
                    } else if (
                      getEmployeeDetails?.advanceSalaryLimit < '1500'
                    ) {
                      dispatch(
                        Actions.errorMessage({
                          errorMessage: 'Your are not eligible to raise Loan',
                          status: true,
                          errorType: ModalErrorType.Info,
                        }),
                      );
                    } else {
                      navigation.navigate('LoanRequestStack', {
                        screen: employeeHomeStrings.EMPLOYEE_NON_LOAN_REQUEST,
                        initial: false,
                      });
                    }
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
        {/* {!checkNewUser ? (
          <CommonButton
            title="Pay Now"
            containerStyle={Styles.btn}
            onPress={() => {
              navigation.navigate('LoanRequestStack', {
                screen: employeeHomeStrings.EMPLOYEE_NEW_LOAN,
                initial: false,
              });
            }}
          />
        ) : (
          <></>
        )} */}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!(mobileUserLoading || employeeDetailsLoading || loader) ? (
        renderLoanHome()
      ) : (
        <>
          {!checkNewUser ? (
            <EmployeeLoanHomeLoader />
          ) : (
            <EmployeeCommonLoader />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondaryColor,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: RFPercentage(13.2),
    paddingHorizontal: RFPercentage(3),
    paddingTop: RFPercentage(4),
  },
  heading1: {
    ...FONTS.h4,
    color: COLORS.whiteColor,
  },
  heading2: {
    color: COLORS.whiteColor,
    fontFamily: Fonts.Regular,
    fontSize: moderateScale(11),
  },
  profileContainer: {
    backgroundColor: COLORS.secondaryColor,
    borderRadius: RFPercentage(20),
    height: RFPercentage(6.0),
    width: RFPercentage(6.0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSubContainer: {
    height: RFPercentage(6.5),
    width: RFPercentage(6.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(20),
    backgroundColor: COLORS.darkGrey,
    borderColor: COLORS.grey,
    borderWidth: 1.5,
    elevation: 2,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(20),
  },
  v1: {
    backgroundColor: COLORS.secondaryColor,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -40,
    height: moderateScale(45),
    borderBottomLeftRadius: RFPercentage(5),
    borderBottomRightRadius: RFPercentage(5),
  },
  btn: {
    width: ScreenWidth - 250,
    borderRadius: 50,
    height: 40,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

export default EmployeeLoanHome;
