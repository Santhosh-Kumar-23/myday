import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CommonButton from '../../components/commonButton';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import {EmployeeProcessPipeLineLoader} from '../../components/skeletonLoader/employeeProcessPipeLineLoader';
import * as Images from '../../constants/images';
import {COLORS, Fonts} from '../../constants/theme';
import { isIos } from '../../utlis/functions';

const EmployeePaymentHistory: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });
  const data = [
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
    {
      Paid_Amount: '9687.00',
      Date: '28/08/2024',
      Bank: 'Dedcuted from HDFC Bank Ltd',
      Status: 'Paid',
      Remaining_Amount: 0,
    },
  ];
  const RenderCard = ({item}: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.paidAmount}>Paid Amount: {item.Paid_Amount}</Text>
          <Text style={styles.bankText}>{item.Bank}</Text>
          <Image source={Images.bankLogo} style={styles.logo} />
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.date}>{item.Date}</Text>
          <View
            style={{
              marginTop: moderateScale(40),
              marginBottom: moderateScale(10),
            }}>
            <CommonButton
              title={item.Status}
              containerStyle={{
                width: scale(50),
                height: verticalScale(18),
                alignSelf: 'flex-end',
              }}
              textStyle={{fontSize: moderateScale(10)}}
            />
            <Text style={styles.remainingAmount}>
              Remaining Amount: {item.Remaining_Amount}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <EmployeeLoanRequestSubHeader
        title="Payment History"
        onPress={() => navigation.goBack()}
      />
      {!loader ? (
        <FlatList
          data={data}
          renderItem={RenderCard}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmployeeProcessPipeLineLoader />
      )}
    </SafeAreaView>
  );
};

export default EmployeePaymentHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  mainView: {
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  card: {
    backgroundColor: 'whitesmoke',
    elevation: 10,
    borderRadius: moderateScale(10),
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,


 
  },
  cardLeft: {
    flex: 0.5,
    paddingLeft: moderateScale(10),
  },
  cardRight: {
    flex: 0.5,
    alignItems: 'flex-end',
    paddingRight: moderateScale(10),
  },
  paidAmount: {
    fontSize: moderateScale(13),
    fontFamily: Fonts.SemiBold,
    color: COLORS.secondaryTextColor,
    marginTop: moderateScale(10),
  },
  bankText: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.SemiBold,
    color: COLORS.secondaryColor,
  },
  remainingAmount: {
    fontSize: moderateScale(11),
    fontFamily: Fonts.Regular,
    color: COLORS.grey,
  },
  logo: {
    height: verticalScale(25),
    width: verticalScale(25),
    resizeMode: 'contain',
    marginTop: moderateScale(20),
    marginLeft: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  date: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.Regular,
    color: COLORS.grey,
    marginTop: moderateScale(10),
  },
});
