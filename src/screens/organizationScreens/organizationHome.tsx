import {useMutation, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import * as mutuation from '../../api/mutation';
import * as Query from '../../api/query';
import * as queryInterface from '../../api/queryInterface';
import {
  OrganizationDashboardLoanList,
  OrganizationHeader,
  OrganizationHomeOverViewCard,
  OrganizationHomeTotalEmployeeCard,
  OrganizationLoanProcessGraph,
  OrganizationSubHeader,
} from '../../components/organizationComponents';
import OrganizationDashboardLoader from '../../components/skeletonLoader/organizationDashboardLoader';
import {Elevation} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as Strings from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {deviceId, deviceType, getFcmToken, isIos} from '../../utlis/functions';

interface LoanProcessDetails {
  value: number;
  color: string;
  marginBottom?: number;
}

interface LoanProcessGraph {
  stacks: LoanProcessDetails[];
  label: string;
}

interface TotalApplicationDataInterface {
  received: number;
  approved: number;
  approvedPercentage: number;
}

interface EmployeeCountInterface {
  totalEmployee: number;
  totalActiveEmployee: number;
  employeeIncreasePercentage: number;
  employeeActivePercentage: number;
}

const OrganizationHome: React.FC<{}> = (props: any) => {
  //Props variables
  const {navigation} = props;

  //State variables
  const [overViewTabPress, setOverViewTabPress] = useState(true);
  const [loansTabPress, setLoansTabPress] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loader, setLoader] = useState<boolean>(true);

  //other variables
  const dispatch = useDispatch();

  //USE QUERIES
  const {data: deviceDetails, refetch: refetch} = useQuery(
    Query.GET_MOBILE_USER_DATA,
    {
      variables: {
        deviceType: isIos ? Strings.IOS : Strings.ANDROID,
      },
    },
  );

  useEffect(() => {
    refetch();
    getUserInformation().then(res => {
      console.log('USER TOKEN:::::', res.token);
    });
  }, [deviceDetails]);

  //dispatch to store
  useEffect(() => {
    dispatch(
      Actions.gettingMobileUserData(deviceDetails?.getMobileUserLoginData),
    );
  });

  //get mobile userdata from store
  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state?.appReducer?.mobileUserData,
  );

  const {data: organizationDetailsQuery, loading: detailsLoading} = useQuery(
    Query.GET_ORGANIZATION_BY_ID,
    {
      // skip: !mobileUserData?.user?._id,
      variables: {
        getOrganizationByIdId: mobileUserData?.user?._id,
      },
    },
  );

  const {
    data: loanCountDetails,
    loading: loanCountLoading,
    refetch: loanCountRefetch,
  } = useQuery(Query.GET_ORGANIZATION_LOAN_COUNT, {
    skip: !mobileUserData?.user?._id,
    variables: {
      organizationId: mobileUserData?.user?._id ?? '',
    },
  });

  const loansCountDetails: queryInterface.organizationLoanTypeCount =
    loanCountDetails?.getLoansCountMobile ?? [];

  const {
    data: dashboard,
    refetch: refetchDashbord,
    loading,
  } = useQuery(Query.ORGANIZATION_DASHBOARD, {
    skip: !mobileUserData?.user?._id,
    variables: {
      getDashboardDataForOrganizationId: mobileUserData?.user?._id,
    },
  });

  // console.log('DASHBOARD:::', dashboard);
  console.log('LOAN COUNT DETAILS::::', loanCountDetails);

  const onRefresh = () => {
    setRefreshing(true);
    refetchDashbord();
    loanCountRefetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  const [onCallNotificationApi] = useMutation(mutuation.NotificationApi);

  useEffect(() => {
    refetchDashbord();
  }, [dashboard]);
  useEffect(() => {
    notification();
  }, []);

  const notification = async () => {
    const fcmToken = await getFcmToken();
    const deviceID = await deviceId();
    const deviceTypee = await deviceType();
    console.log('fcmToken', fcmToken);
    console.log('deviceId', deviceId);
    onCallNotificationApi({
      variables: {
        fcmToken: fcmToken,
        deviceId: deviceID,
        deviceType: deviceTypee,
      },
      onCompleted: data => {
        console.log('notificationData', data);
      },
      onError: error => {
        console.log('notificationError', error);
      },
    });
  };

  //dispatch to store
  useEffect(() => {
    dispatch(
      Actions.gettingOrganizationDetails(
        organizationDetailsQuery?.getOrganizationById,
      ),
    );
  });

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  useEffect(() => {
    setOverViewTabPress(true);
    setLoansTabPress(false);
  }, []);

  const dashboardData: LoanProcessGraph[] =
    dashboard?.getDashboardDataForOrganization?.Loan ?? [];
  const overViewDetails: TotalApplicationDataInterface =
    dashboard?.getDashboardDataForOrganization?.Application;
  console.log('overViewDetails::::::::::', overViewDetails);

  const employeeCountDetails: EmployeeCountInterface =
    dashboard?.getDashboardDataForOrganization?.Employee;

  const convertValueStringToNumber: LoanProcessGraph[] = dashboardData.map(
    item => ({
      ...item,
      stacks: item.stacks.map(stack => ({
        ...stack,
        value: Number(stack.value),
      })),
    }),
  );

  const graphsData: LoanProcessGraph[] = convertValueStringToNumber;

  function onClickOverViewTab() {
    setOverViewTabPress(true);
    setLoansTabPress(false);
    setLoader(true);
    refetchDashbord();
    loanCountRefetch();
  }
  function onClickLoansTab() {
    setOverViewTabPress(false);
    setLoader(true);
    setLoansTabPress(true);
    refetchDashbord();
    loanCountRefetch();
  }
  function HeaderTab(props: any) {
    return (
      <>
        {!loanCountLoading ? (
          <View style={styles.tab}>
            <Pressable
              style={[
                styles.overViewBtn,
                {
                  backgroundColor: props.overViewTabPress
                    ? COLORS.secondaryColor
                    : COLORS.deepLightGrey,
                },
              ]}
              onPress={() => {
                onClickOverViewTab();
              }}>
              <Text
                style={[
                  styles.overViewText,
                  {
                    color: props.overViewTabPress
                      ? COLORS.whiteColor
                      : COLORS.grey,
                  },
                ]}>
                {Strings.OVERVIEW}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.overViewBtn,
                {
                  backgroundColor: props.loansTabPress
                    ? COLORS.secondaryColor
                    : COLORS.deepLightGrey,
                },
              ]}
              onPress={() => onClickLoansTab()}>
              <Text
                style={[
                  styles.overViewText,
                  {
                    color: props.loansTabPress
                      ? COLORS.whiteColor
                      : COLORS.grey,
                  },
                ]}>
                {Strings.LOANS}
              </Text>
            </Pressable>
          </View>
        ) : (
          <OrganizationDashboardLoader showLoan={overViewTabPress} />
        )}
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: COLORS.DashboardBackgroundColor}}>
        <OrganizationHeader title={Strings.DASHBOARD} />
        {!(loading || detailsLoading || loader) ? (
          <>
            <OrganizationSubHeader loading={loading} />

            <HeaderTab
              overViewTabPress={overViewTabPress}
              loansTabPress={loansTabPress}></HeaderTab>

            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.secondaryColor, COLORS.primaryColor]}
                />
              }>
              {loansTabPress && (
                <OrganizationDashboardLoanList
                  LoanListData={loansCountDetails}
                  onPressLoan={item => {
                    refetch();
                    navigation.navigate('OrganizationLoanRequestStack', {
                      screen: Strings.ORGANIZATION_LOAN_PROCESS_LIST,
                      params: {
                        filterData: item.status,
                      },
                    });
                  }}
                />
              )}
              {overViewTabPress && (
                <OrganizationHomeOverViewCard
                  overViewDetails={overViewDetails}
                  onPressLoanDetails={() =>
                    navigation.navigate('OrganizationLoanRequestStack')
                  }
                />
              )}
              {overViewTabPress && (
                <OrganizationLoanProcessGraph data={graphsData} />
              )}
              {overViewTabPress && (
                <OrganizationHomeTotalEmployeeCard
                  employeeCountDetails={employeeCountDetails}
                />
              )}
            </ScrollView>
          </>
        ) : (
          <OrganizationDashboardLoader showLoan={loansTabPress} />
        )}
      </View>
    </SafeAreaView>
  );
};

export {OrganizationHome};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: isIos && 50,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(16),
  },
  overViewBtn: {
    marginHorizontal: moderateScale(5),
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(15),
    backgroundColor: COLORS.secondaryColor,
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(5),
    elevation: Elevation.inputElevation,
  },
  overViewText: {
    color: COLORS.whiteColor,
    ...FONTS.body4,
  },
});
