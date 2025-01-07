import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import CalendarPicker, {ChangedDate} from 'react-native-calendar-picker';
import ReactNativeModal from 'react-native-modal';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {GET_EMPLOYEE_LOAN_STATUS} from '../../api/query';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import NoDataFound from '../../components/noDataFound';
import {EmployeeLoanRequestLoader} from '../../components/skeletonLoader/employeeLoanRequestLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as String from '../../constants/string';
import {COLORS, Fonts, deviceScreenHeight} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {Styles} from '../../styles/employeeLoanRequest';
import {
  convertDatetoApi,
  removeUnderScore,
  shortenApplicationNo,
} from '../../utlis/functions';

const EmployeeLoanRequest: React.FC<{}> = (props: any) => {
  const {navigation} = props;

  const [isVisible, setIsVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [footerloader, setFooterLoader] = useState(false);
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [employeeLoanDetails, setEmployeeLoanDetails] = useState([]);
  const [convertFromDate, setConvertFromDate] = useState('');
  const [convertToDate, setConvertToDate] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  const {data, loading, refetch} = useQuery(GET_EMPLOYEE_LOAN_STATUS, {
    variables: {
      filter: {
        page: page,
        limit: 100,
        status: status == '' ? 'all' : status,
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
    setRefreshing(false);
  };

  //Others variables
  const nextPage = data?.getAllLoanRequest?.pagination?.next;

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setEmployeeLoanDetails(data?.getAllLoanRequest?.data);
      } else {
        setEmployeeLoanDetails(prevDetails => [
          ...prevDetails,
          ...data?.getAllLoanRequest?.data,
        ]);
      }
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      refetch({
        filter: {
          page: 1,
          limit: 100,
          status: status == '' ? 'all' : status,
          fromDate: convertFromDate,
          toDate: convertToDate,
        },
      });
    }, [refetch, status]),
  );

  // console.log('SATUES:::::::', status);
  console.log('EmployeeLoanDetails:::', JSON.stringify(employeeLoanDetails));
  // console.log('CONVERTFROMDATE:::', convertDatetoApi(selectedStartDate));
  // console.log('CONVERTTODATE:::', convertDatetoApi(selectedEndDate));

  const minusOneDay = (date: string | number | Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  };

  const onClickDate = () => {
    setStatus('');
    if (selectedStartDate && selectedEndDate) {
      refetch({
        filter: {
          page: 1,
          limit: 10,
          fromDate: convertDatetoApi(selectedStartDate),
          toDate: convertDatetoApi(selectedEndDate),
          status: 'all',
        },
      });
    }
  };
  const onDateChange = (date: Date, type: ChangedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time part for accurate comparison

    if (type === 'END_DATE') {
      setSelectedEndDate(date?.toString() ?? '');
      const selectedStart = new Date(selectedStartDate);
      const selectedEnd = new Date(date);

      if (
        selectedStart.toDateString() === today.toDateString() &&
        selectedEnd.toDateString() === today.toDateString()
      ) {
        const adjustedStartDate = minusOneDay(selectedEnd);
        setSelectedStartDate(adjustedStartDate.toString());
        setConvertFromDate(convertDatetoApi(adjustedStartDate));
      } else {
        setConvertFromDate(convertDatetoApi(selectedStart));
        setConvertToDate(convertDatetoApi(selectedEnd));
      }
    } else {
      setSelectedStartDate(date?.toString() ?? '');
      setConvertFromDate(convertDatetoApi(date?.toString()));
      setConvertToDate('');
      setSelectedEndDate('');
    }
  };

  const renderFilter = () => {
    return (
      <View style={Styles.dateContainer}>
        <Pressable
          style={Styles.mainContainer1}
          onPress={() => setIsVisible(true)}>
          <View style={Styles.datePickerMain}>
            {selectedStartDate && selectedEndDate ? (
              <Text style={Styles.selectedText}>
                {moment(selectedStartDate).format('DD/MM/YYYY')} -{' '}
                {moment(selectedEndDate).format('DD/MM/YYYY')}
              </Text>
            ) : (
              <Text style={Styles.selectedText}>DD/MM/YYYY - DD/MM/YYYY</Text>
            )}
          </View>
        </Pressable>
        <View style={Styles.mainContainer2}>
          <Menu>
            <MenuTrigger>
              <View style={Styles.filterContainer}>
                <Image
                  tintColor={COLORS.secondaryColor}
                  source={Icons.filter}
                  resizeMode="contain"
                  style={{height: RFPercentage(2), width: RFPercentage(2)}}
                />
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{optionsContainer: {marginTop: -20, width: 150}}}>
              <MenuOption
                onSelect={() => {
                  setStatus('Draft');
                  setConvertFromDate('');
                  setConvertToDate('');
                  setSelectedStartDate('');
                  setSelectedEndDate('');
                }}
                text="Draft"
                customStyles={{
                  optionText: Styles.menuOptionStyles,
                }}
              />
              <MenuOption
                onSelect={() => {
                  setStatus('Pending');
                  setConvertFromDate('');
                  setConvertToDate('');
                  setSelectedStartDate('');
                  setSelectedEndDate('');
                }}
                text="Pending"
                customStyles={{
                  optionText: {
                    color: COLORS.secondaryColor,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 5,
                  },
                }}
              />
              <MenuOption
                onSelect={() => {
                  setStatus('Cancelled');
                  setConvertFromDate('');
                  setConvertToDate('');
                  setSelectedStartDate('');
                  setSelectedEndDate('');
                }}
                text="Cancelled"
                customStyles={{
                  optionText: {
                    color: COLORS.errorRed,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 5,
                  },
                }}
              />
              <MenuOption
                onSelect={() => {
                  setStatus('Approved');
                  setConvertFromDate('');
                  setConvertToDate('');
                  setSelectedStartDate('');
                  setSelectedEndDate('');
                }}
                text="Approved"
                customStyles={{
                  optionText: {
                    color: 'green',
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 5,
                  },
                }}
              />
              <MenuOption
                onSelect={() => {
                  setStatus('Rejected');
                  setConvertFromDate('');
                  setConvertToDate('');
                  setSelectedStartDate('');
                  setSelectedEndDate('');
                }}
                text="Rejected"
                customStyles={{
                  optionText: {
                    color: COLORS.errorRed,
                    fontFamily: Fonts.SemiBold,
                    marginLeft: 5,
                  },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    );
  };

  const EmptyListMessage = (item: any) => {
    return (
      // Flat List Item
      <View style={[Styles.noDataFoundContainer]}>
        <NoDataFound />
      </View>
    );
  };

  const renderLoanRequest = (): React.JSX.Element => {
    const sortedEmployeeLoanDetails = [...employeeLoanDetails].sort((a, b) => {
      // Sort "Pending" status items to the top
      if (a.status === 'Pending' && b.status !== 'Pending') {
        return -1;
      }
      if (a.status !== 'Pending' && b.status === 'Pending') {
        return 1;
      }

      // Next, prioritize "Waiting_For_Confirm" status
      if (
        a.status === 'Waiting_For_Confirm' &&
        b.status !== 'Waiting_For_Confirm'
      ) {
        return -1;
      }
      if (
        a.status !== 'Waiting_For_Confirm' &&
        b.status === 'Waiting_For_Confirm'
      ) {
        return 1;
      }

      // If statuses are the same, no change in order
      return 0;
    });

    // console.log(
    //   'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
    //   sortedEmployeeLoanDetails,
    // );

    return (
      <FlashList
        estimatedItemSize={1000}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.secondaryColor, COLORS.primaryColor]}
          />
        }
        showsVerticalScrollIndicator={false}
        data={sortedEmployeeLoanDetails}
        ListEmptyComponent={EmptyListMessage}
        ListFooterComponent={() => {
          return (
            <ActivityIndicator
              animating={footerloader}
              size={'large'}
              color={COLORS.secondaryColor}
            />
          );
        }}
        onEndReached={() => {
          setFooterLoader(true);
          if (nextPage) {
            setPage(prevPage => prevPage + 1);
          } else {
            setFooterLoader(false);
          }
        }}
        renderItem={({item, index}) => {
          let color;
          switch (item?.status) {
            case 'Draft':
              color = '#645E5E';
              break;
            case 'Pending':
              color = '#315874';
              break;
            case 'Cancelled':
              color = '#9D1E0E';
              break;
            case 'Approved':
              color = 'green';
              break;
            case 'Rejected':
              color = 'red';
              break;

            default:
              color = COLORS.primaryColor;
              break;
          }
          // console.log(
          //   'loanStatus::::::::::::::::::::::::::::::::::::::::::::::::::::',
          //   item?.documents,
          // );
          // console.log(JSON.stringify(item), 'NavigationList');
          return (
            <Pressable
              style={Styles.loanRequestContainer}
              onPress={() => {
                if (item?.status == 'Draft') {
                  navigation.navigate(
                    String.EMPLOYEE_LOAN_REQUEST_REVIEW_DETAILS,
                    {
                      documentsList: item?.documents,
                      statusId: item?._id,
                      statusPage: true,
                      processingFees: item?.processingFee,
                      processingFeePercentage: item?.processingFeePercentage,
                      creditAmount: item?.creditAmount,
                    },
                  );
                  dispatch(
                    Actions.employeeLoanDetails({
                      loanAmount: item?.loanAmount,
                      interest: 0,
                      tenure: 1,
                    }),
                  );
                } else if (item?.status == 'Cancelled') {
                  dispatch(
                    Actions.errorMessage({
                      errorMessage: 'Your Salary Advance Was Cancelled',
                      status: true,
                      errorType: ModalErrorType.Info,
                    }),
                  );
                } else if (item?.status == 'Approved') {
                  navigation.navigate('TrackLoanStack', {
                    screen: String.EMPLOYEE_TRACK_LOAN_REQUEST,
                    params: {
                      loanRequestId: item?._id,
                    },
                  });
                } else if (item?.status == 'Rejected') {
                  // dispatch(
                  //   Actions.errorMessage({
                  //     errorMessage: 'Your Salary Advance Was Rejected',
                  //     status: true,
                  //     errorType: ModalErrorType.Info,
                  //   }),
                  // );
                  navigation.navigate('TrackLoanStack', {
                    screen: String.EMPLOYEE_TRACK_LOAN_REQUEST,
                    params: {
                      loanRequestId: item?._id,
                    },
                  });
                } else {
                  navigation.navigate('TrackLoanStack', {
                    screen: String.EMPLOYEE_TRACK_LOAN_REQUEST,
                    params: {
                      loanRequestId: item?._id,
                    },
                  });
                }
              }}>
              <View style={Styles.loanRequestContainer1}>
                <Image
                  source={Icons.loan}
                  resizeMode="contain"
                  style={{height: RFPercentage(2), width: RFPercentage(2)}}
                />
              </View>
              <View style={Styles.loanRequestContainer2}>
                <View style={Styles.loanRequestIdContainer}>
                  <Text style={Styles.loanRequestText}>
                    {shortenApplicationNo(item?.applicationNo) ?? ''}
                  </Text>
                  <View
                    style={[Styles.statusContainer, {backgroundColor: color}]}>
                    <Text style={Styles.statusText}>
                      {removeUnderScore(item?.status)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={
                    Styles.loanDescription
                  }>{`Requested amount has been processed ${item?.loanAmount} rupees.`}</Text>
                <Text style={Styles.loanDate}>
                  {moment(item?.createdAt).format('DD/MM/YYYY')}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    );
  };

  const renderModal = (): React.JSX.Element => {
    const renderCalenderPicker = (): React.JSX.Element => {
      const renderPrevious = (): React.JSX.Element => {
        return (
          <View style={Styles.nextAndPrevious}>
            <Image
              source={Icons.previous}
              resizeMode={String.CONTAIN}
              style={Styles.nextAndPreviousImage}
            />
          </View>
        );
      };

      const renderNext = (): React.JSX.Element => {
        return (
          <View style={Styles.nextAndPrevious}>
            <Image
              source={Icons.next}
              resizeMode={String.CONTAIN}
              style={Styles.nextAndPreviousImage}
            />
          </View>
        );
      };
      return (
        <View style={Styles.pickerContainer}>
          <CalendarPicker
            dayShape="square"
            initialView="days"
            allowBackwardRangeSelect={true}
            startFromMonday={true}
            allowRangeSelection={true}
            yearTitleStyle={{
              color: COLORS.darkGrey,
              fontFamily: Fonts.ExtraBold,
            }}
            monthTitleStyle={{
              color: COLORS.darkGrey,
              fontFamily: Fonts.ExtraBold,
            }}
            maxDate={new Date(2050, 12, 31)}
            todayBackgroundColor="#6464c3"
            selectedDayColor="#6464c3"
            selectedDayTextColor={COLORS.whiteColor}
            onDateChange={onDateChange}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            width={RFPercentage(40.0)}
            previousComponent={renderPrevious()}
            nextComponent={renderNext()}
          />
          <View style={Styles.buttonContainer}>
            <Pressable
              onPress={() => {
                setSelectedStartDate('');
                setSelectedEndDate('');
                setIsVisible(false);
              }}
              style={[
                Styles.selectTextContainer,
                {
                  backgroundColor: '#D7D7D7',
                },
              ]}>
              <Text
                style={{
                  color: COLORS.darkGrey,
                  textAlign: 'center',
                  fontFamily: Fonts.Medium,
                }}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                refetch();
                onClickDate();
                setIsVisible(false);
              }}
              style={Styles.selectTextContainer}>
              <Text style={Styles.selectText}>Select</Text>
            </Pressable>
          </View>
        </View>
      );
    };
    return (
      <ReactNativeModal
        deviceHeight={deviceScreenHeight}
        isVisible={isVisible}
        statusBarTranslucent
        useNativeDriver
        onBackdropPress={() => {
          setIsVisible(false);
        }}>
        {renderCalenderPicker()}
      </ReactNativeModal>
    );
  };

  return (
    <MenuProvider>
      <SafeAreaView style={Styles.container}>
        <EmployeeLoanRequestSubHeader
          title={String.LOAN_REQUEST}
          onPress={() => navigation.goBack()}
        />
        {!loading ? (
          <>
            {renderFilter()}
            {renderLoanRequest()}
            {renderModal()}
          </>
        ) : (
          <EmployeeLoanRequestLoader />
        )}
      </SafeAreaView>
    </MenuProvider>
  );
};

export {EmployeeLoanRequest};
