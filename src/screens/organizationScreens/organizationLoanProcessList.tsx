import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import * as Query from '../../api/query';
import {ORGANIZATION_GET_ALL_LOAN_REQUEST} from '../../api/query';
import * as queryInterface from '../../api/queryInterface';
import NoDataFound from '../../components/noDataFound';
import {
  OrganizationHeader,
  OrganizationLoanStatusCard,
  OrganizationSubHeader,
} from '../../components/organizationComponents';
import OrganizationLoanProcessLoader from '../../components/skeletonLoader/organizationLoanProcessLoader';
import * as Interfaces from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, deviceWidth} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

interface Employee {
  _id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  profile: string | null;
  organizationId: string | null;
  org_name: string;
  gender: string;
  branch_location: string;
}

interface LoanApplicationDetails {
  _id: string;
  employee: Employee;
  employeeId: string;
  organizationId: string;
  applicationNo: string;
  status: string;
  stage: string;
  loanType: string;
  loanAmount: number;
  tenure: string;
  documents: string | null;
  isMove: boolean;
  createdAt: string;
  loanFlowLogs: string | null;
}

const OrganizationLoanProcessList: React.FC<{}> = (props: any) => {
  const [headername, setHeaderName] = useState<String>('Loan Received');
  const [refreshing, setRefreshing] = React.useState(false);
  const {filterData} = props?.route?.params ?? '';

  const [page, setPage] = useState(1);
  const [footerloader, setFooterLoader] = useState(false);
  const [loanListDetails, setLoanListDetails] = useState<
    LoanApplicationDetails[]
  >([]);
  const [selectedHeaderIndex, setSelectedHeaderIndex] = useState<number | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef<SwiperFlatList>(null);
  useEffect(() => {
    if (filterData) {
      const findItem =
        loanProcessStats.find(item => item?.status == filterData) ?? null;
      const findindex = loanProcessStats
        ?.map(item => item?.status)
        ?.indexOf(filterData);
      console.log('Findindex', findindex);
      console.log('AA', findItem);
      if (findItem && findindex > -1) {
        onClickHeader(findItem, findindex);
      }
    } else {
      const findItem =
        loanProcessStats.find(item => item?.status == filterData) ?? null;
      const findindex = loanProcessStats
        ?.map(item => item?.status)
        ?.indexOf(filterData);
      console.log('Findindex', findindex);
      console.log('AA', findItem);
      if (findItem && findindex > -1) {
        onClickHeader(findItem, findindex);
      }
    }
  }, [filterData]);
  const getCurrentIndex = () => {
    const currentIndex = scrollRef.current?.getCurrentIndex();
  };
  //get mobile userdata from store
  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  const {
    data: loanStatus,
    loading: loanStatusLoading,
    refetch: loanStatusRefetch,
  } = useQuery(Query.GET_ORGANIZATION_LOAN_COUNT, {
    skip: !mobileUserData?.user?._id,
    variables: {
      organizationId: mobileUserData?.user?._id ?? '',
    },
  });

  const loanProcess: queryInterface.organizationLoanTypeCount =
    loanStatus?.getLoansCountMobile ?? [];

  const [loanProcessStats, setLoanProcessStats] =
    useState<queryInterface.organizationLoanTypeCount>(loanProcess);

  const filteredList = loanProcessStats.find(item => {
    return item.isCheck == true;
  });

  //query
  const {
    data,
    refetch,
    loading: loanRequestListLoading,
  } = useQuery(ORGANIZATION_GET_ALL_LOAN_REQUEST, {
    variables: {
      filter: {
        limit: 100,
        page: page,
      },
    },
    onCompleted: () => {
      setRefreshing(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  // hook functions
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setLoanListDetails(data?.getAllLoanRequestOrganizationMobile?.data);
      } else {
        setLoanListDetails(prevDetails => [
          ...prevDetails,
          ...data?.getAllLoanRequestOrganizationMobile?.data,
        ]);
      }
    }
  }, [data]);

  // console.log('BBBBBBBBBBBBBBBBBBBB', loanListDetails);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      refetch({
        filter: {
          page: 1,
          limit: 100,
          status: filteredList?.status,
        },
      });
    }, [refetch, filteredList?.status]),
  );
  //Hook functions
  useEffect(() => {
    setLoanProcessStats(loanProcess);
  }, []);

  //Functions
  const onClickHeader = (item: any, index: number) => {
    console.log('ITEM::', item);
    console.log('INDEX::', index);

    let updatedStats = loanProcessStats.map(it => {
      if (it === item) {
        return {
          ...it,
          isCheck: true,
        };
      } else {
        return {
          ...it,
          isCheck: false,
        };
      }
    });
    setLoanProcessStats(updatedStats);

    if (scrollRef.current) {
      scrollRef.current.scrollToIndex({index, animated: false});
    }
  };

  const header = useRef<FlatList>(null);

  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  const HeaderRenderItem = ({item, index}: any) => {
    return (
      <Pressable
        onPress={() => onClickHeader(item, index)}
        style={{
          backgroundColor: item.isCheck
            ? COLORS.secondaryColor
            : COLORS.deepLightGrey,
          paddingHorizontal: moderateScale(10),
          height: verticalScale(25),
          justifyContent: 'center',
          alignItems: 'center',
          elevation: moderateScale(2),
          borderRadius: moderateScale(20),
        }}>
        <Text
          style={[
            styles.name,
            {
              color: item.isCheck
                ? COLORS.whiteColor
                : COLORS.secondaryTextColor,
            },
          ]}>
          {item.category}
        </Text>
      </Pressable>
    );
  };

  const getItemLayout = (data, index) => ({
    length: deviceWidth / 4 + 30,
    offset: (deviceWidth / 4 + 30 + 20) * index,
    index,
  });

  const EmptyListMessage = (item: any) => {
    return <NoDataFound />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: COLORS.DashboardBackgroundColor}}>
        <OrganizationHeader title={Strings.LOANS} />
        <OrganizationSubHeader />
        {!loader ? (
          <>
            <View
              style={{
                flex: 0.1,
                marginVertical: moderateScale(10),
              }}>
              <SwiperFlatList
                ref={scrollRef}
                style={{marginTop: moderateScale(10)}}
                onChangeIndex={({index}) => {
                  setSelectedHeaderIndex(index);
                  setCurrentIndex(index);
                }}
                data={loanProcessStats}
                renderItem={({item, index}) => (
                  <View style={styles.headerItem} key={index}>
                    <HeaderRenderItem item={item} index={index} />
                  </View>
                )}
                getItemLayout={getItemLayout}></SwiperFlatList>
            </View>
            <View style={{flex: 0.9, marginBottom: 100}}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[COLORS.secondaryColor, COLORS.primaryColor]}
                  />
                }
                showsVerticalScrollIndicator={false}
                data={loanListDetails}
                scrollEnabled={true}
                ListEmptyComponent={EmptyListMessage}
                renderItem={({item, index}) => {
                  return <OrganizationLoanStatusCard data={item} />;
                }}
              />
            </View>
          </>
        ) : (
          <OrganizationLoanProcessLoader />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrganizationLoanProcessList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
    marginBottom: isIos && 40,
  },
  name: {
    ...FONTS.body4,
    color: COLORS.secondaryTextColor,
    marginLeft: moderateScale(5),
  },
  headerFlatList: {
    marginHorizontal: moderateScale(2),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20),
    flexGrow: 1,
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
  headerItem: {
    marginHorizontal: moderateScale(6),
  },
});
