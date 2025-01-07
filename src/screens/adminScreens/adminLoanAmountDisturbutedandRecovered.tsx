import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import CalendarPicker, {ChangedDate} from 'react-native-calendar-picker';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {AdminHeader, AdminMiddleHeader} from '../../components/adminComponents';
import {AdminLoanAmountDisturbutedandRecoveredLoader} from '../../components/skeletonLoader/adminLoanAmountDisturbutedandRecoveredLoader';
import * as Icons from '../../constants/icons';
import * as Strings from '../../constants/string';
import {COLORS, Fonts, deviceScreenHeight} from '../../constants/theme';
import {styles} from '../../styles/adminLoanAmountDisturbutedandRecoveredStyles';
import {isIos} from '../../utlis/functions';

const loanDetails = [
  {
    name: 'Venkatesh Gaurav',
    status: 'Approved',
    loanAmount: '₹ 20,000',
    department: 'IT',
    branch: 'Vellore',
    designation: 'UI',
    modeOfPayment: 'HDFC',
  },
  {
    name: 'Krithi Shetty',
    status: 'Approved',
    loanAmount: '₹ 20,000',
    department: 'IT',
    branch: 'Vellore',
    designation: 'UI',
    modeOfPayment: 'HDFC',
  },
  {
    name: 'Iswarya Rajesh',
    status: 'Approved',
    loanAmount: '₹ 20,000',
    department: 'IT',
    branch: 'Vellore',
    designation: 'UI',
    modeOfPayment: 'Through SBI Bank',
  },
  {
    name: 'Venkatesh Gaurav',
    status: 'Approved',
    loanAmount: '₹ 20,000',
    department: 'IT',
    branch: 'Vellore',
    designation: 'UI',
    modeOfPayment: 'Through HDFC',
  },
  {
    name: 'Krithi Shetty',
    status: 'Approved',
    loanAmount: '₹ 20,000',
    department: 'IT',
    branch: 'Vellore',
    designation: 'UI',
    modeOfPayment: 'HDFC',
  },
  {
    name: 'Iswarya Rajesh',
    status: 'Approved',
    loanAmount: '₹ 20,000',
    department: 'IT',
    branch: 'Vellore',
    designation: 'UI',
    modeOfPayment: 'Through SBI Bank',
  },
];

const AdminLoanAmountDisturbutedandRecovered: React.FC<{}> = (props: any) => {
  //Props variables
  const {navigation} = props;
  const {loanDisbursed} = props.route.params;

  //State variables
  const [loanRange, setLoanRange] = useState<String>('Last 6 months');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [loader, setLoader] = useState<boolean>(true);

  //Hook functions
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  //Functions
  const onDateChange = (date: Date, type: ChangedDate) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date?.toString() ?? '');
      console.log(selectedStartDate);
    } else {
      setSelectedStartDate(date?.toString() ?? '');
      setSelectedEndDate('');
    }
  };

  function HeaderCard(props: any) {
    return (
      <LinearGradient
        style={styles.headerCard}
        colors={
          loanDisbursed
            ? [COLORS.secondaryColor, COLORS.secondaryColor]
            : [COLORS.primaryColor, COLORS.primaryColor]
        }
        start={{
          x: 1,
          y: 0,
        }}
        end={{
          x: -1,
          y: 0,
        }}>
        {selectedStartDate && selectedEndDate ? (
          <Text style={styles.loanRangeDate}>
            {moment(selectedStartDate).format('D MMMM YYYY')} -{' '}
            {moment(selectedEndDate).format('D MMMM YYYY')}
          </Text>
        ) : (
          <Text style={styles.loanRangeDate}>{props.loanRange}</Text>
        )}

        <Text style={styles.totalAmount}>
          {loanDisbursed
            ? Strings.TOTAL_AMOUNT_DISBURSED
            : Strings.TOTAL_AMOUNT_RECOVERED}{' '}
          - 2,00,000
        </Text>
        <Text style={styles.employeescount}>
          {Strings.NO_OF_EMPLOYEES} - 30
        </Text>
        <Pressable
          style={styles.calenderButton}
          onPress={() => {
            setIsVisible(true);
          }}>
          <Text style={styles.chooseDate}>{Strings.CHOOSE_DATE}</Text>
          <Image source={Icons.calenderIcon} style={styles.calenderIcon} />
        </Pressable>
      </LinearGradient>
    );
  }

  //UI functions
  const RenderCard = ({item}: any): React.JSX.Element => {
    const renderNameAndStatus = (): React.JSX.Element => {
      return (
        <View style={styles.nameRow}>
          <Text style={styles.itemNameText}>{item.name}</Text>
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      );
    };
    const renderLoanAmount = (): React.JSX.Element => {
      return (
        <Text style={styles.loanAmount}>{Strings.LOAN_AMOUNT} : ₹ 20,000</Text>
      );
    };

    const renderDepartment = (): React.JSX.Element => {
      return (
        <View style={styles.deptRow}>
          <Text style={styles.deptContentText}>{Strings.DEPARTMENT} : </Text>
          <Text style={styles.deptText}>{item.department}</Text>
        </View>
      );
    };

    const renderDesignation = (): React.JSX.Element => {
      return (
        <View style={styles.deptRow}>
          <Text style={styles.deptContentText}>{Strings.DESIGNATION} : </Text>
          <Text style={styles.deptText}>{item.designation}</Text>
        </View>
      );
    };

    const renderBranch = (): React.JSX.Element => {
      return (
        <View style={styles.deptRow}>
          <Text style={styles.deptContentText}>{Strings.BRANCH} : </Text>
          <Text style={styles.deptText}>{item.branch}</Text>
        </View>
      );
    };

    const renderModeOfPayment = (): React.JSX.Element => {
      return (
        <View style={styles.modeOfPaymentContainer}>
          <Text style={styles.deptContentText}>
            {Strings.MODE_OF_PAYMENTS} :
          </Text>
          <Text style={styles.deptText}> {item.modeOfPayment}</Text>
        </View>
      );
    };
    return (
      <Pressable style={styles.loanCard}>
        <View style={styles.nameCard}>
          {renderNameAndStatus()}
          {renderLoanAmount()}
        </View>
        <View style={styles.bottomCard}>
          <View style={styles.deptCard}>
            {renderDepartment()}
            {renderDesignation()}
          </View>
          <View style={styles.subConatiner}>
            {renderBranch()}
            {renderModeOfPayment()}
          </View>
        </View>
      </Pressable>
    );
  };

  const renderModal = (): React.JSX.Element => {
    const renderCalenderPicker = (): React.JSX.Element => {
      const renderPrevious = (): React.JSX.Element => {
        return (
          <View style={styles.nextAndPrevious}>
            <Image
              source={Icons.previous}
              resizeMode={Strings.CONTAIN}
              style={styles.nextAndPreviousImage}
            />
          </View>
        );
      };

      const renderNext = (): React.JSX.Element => {
        return (
          <View style={styles.nextAndPrevious}>
            <Image
              source={Icons.next}
              resizeMode={Strings.CONTAIN}
              style={styles.nextAndPreviousImage}
            />
          </View>
        );
      };

      const renderCancel = (): React.JSX.Element => {
        return (
          <Pressable
            onPress={() => {
              setSelectedStartDate('');
              setSelectedEndDate('');
              setIsVisible(false);
            }}
            style={[
              styles.selectTextContainer,
              {
                backgroundColor: '#D7D7D7',
              },
            ]}>
            <Text
              style={{
                color: COLORS.darkGrey,
                textAlign: 'center',
                fontFamily: Fonts.Regular,
              }}>
              {Strings.CANCEL}
            </Text>
          </Pressable>
        );
      };

      const renderSelect = (): React.JSX.Element => {
        return (
          <Pressable
            onPress={() => setIsVisible(false)}
            style={styles.selectTextContainer}>
            <Text style={styles.selectText}>{Strings.SELECT}</Text>
          </Pressable>
        );
      };

      return (
        <View style={styles.pickerContainer}>
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
            minDate={new Date()}
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
          <View style={styles.buttonContainer}>
            {renderCancel()}
            {renderSelect()}
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
    <SafeAreaView style={styles.container}>
      <AdminHeader back={true} />
      <View style={styles.mainContainer}>
        <AdminMiddleHeader
          ImageUrl={''}
          email={'kreonfinnancialsservff@gmail.com'}
          companyName={'Kreon Finnancials Service Limited'}
          loader={loader}
        />
        {!loader ? (
          <>
            <HeaderCard loanRange={loanRange}></HeaderCard>
            <FlatList
              data={loanDetails}
              renderItem={RenderCard}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <AdminLoanAmountDisturbutedandRecoveredLoader />
        )}
        {renderModal()}
      </View>
      {isIos && <View style={styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminLoanAmountDisturbutedandRecovered;
