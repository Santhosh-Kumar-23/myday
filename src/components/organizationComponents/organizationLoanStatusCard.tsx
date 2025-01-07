import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Elevation, LoanRequestStatus, StatusColor} from '../../constants/enums';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {acronym, isIos, removeUnderScore} from '../../utlis/functions';

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
  workAddress: {
    addressLine1: string;
    addressLine2: string;
    addressType: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  branch_location: string;
}
interface LoanDetail {
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
interface LoanDetailObject {
  data: LoanDetail;
}

const OrganizationLoanStatusCard: React.FC<LoanDetailObject> = ({data}) => {
  // console.log('AAAAAAAAAAAAAAAAAAAAAAA:::::::::', data);

  const navigation = useNavigation();
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const employeeFirstName: string = data?.employee?.first_name;
  const employeeLastName: string = data?.employee?.last_name;
  const employeeFullName: string = [employeeFirstName, employeeLastName]?.join(
    ' ',
  );
  const employeeDesignation: string = data?.employee?.job_title ?? '';
  const employeeEligibleLoanAmount: number = data?.loanAmount ?? Strings.ZERO;
  const employeeBranch: string = data?.employee?.workAddress?.city;
  const employeeProfile: string = data?.employee?.profile ?? '';
  const status: string = data?.status ?? '';
  const loanRequestId: string = data?._id ?? '';

  let statusColor;
  switch (status) {
    case LoanRequestStatus.Approved:
      statusColor = StatusColor.Approved;
      break;
    case LoanRequestStatus.Rejected:
      statusColor = StatusColor.Rejected;
      break;
    case LoanRequestStatus.Pending:
      statusColor = StatusColor.Pending;
      break;
    case LoanRequestStatus.Cancelled:
      statusColor = StatusColor.Cancelled;
      break;
    case LoanRequestStatus.New_Application:
      statusColor = StatusColor.New_Application;
      break;
    case LoanRequestStatus.waitingForApproval:
      statusColor = StatusColor.waitingForApproval;
      break;
    case LoanRequestStatus.Final_Authorizer:
      statusColor = StatusColor.Final_Authorizer;
      break;
    case LoanRequestStatus.Preliminary_Review:
      statusColor = StatusColor.Preliminary_Review;
      break;
    default:
      statusColor = COLORS.primaryColor;
      break;
  }

  return (
    <Pressable
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate(Strings.ORGANIZATION_EMPLOYEE_VIEW as never, {
          loanRequestId: loanRequestId,
        });
      }}>
      <View
        style={{
          flex: 0.3,
          backgroundColor: COLORS.whiteColor,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 80,
            width: 80,
            backgroundColor: COLORS.DashboardBackgroundColor,
            padding: employeeProfile ? 0 : 20,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 1.3,
          }}>
          {employeeProfile ? (
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
                source={{uri: employeeProfile}}
                resizeMode="cover"
                style={{height: '100%', width: '100%', borderRadius: 100}}
              />
            </>
          ) : (
            <Text
              style={{
                color: COLORS.secondaryColor,
                fontFamily: Fonts.SemiBold,
                fontSize: 20,
                paddingTop: 5,
              }}>
              {acronym(employeeFullName)}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.name}>{employeeFullName}</Text>
        <Text style={styles.role}>{employeeDesignation}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.headingText}>{`${Strings.LOAN_AMOUNT} : `}</Text>
          <Text style={styles.LoanAmount2}>{employeeEligibleLoanAmount}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.headingText}>{`${Strings.BRANCH} : `}</Text>
          <Text style={styles.LoanAmount2}>{employeeBranch}</Text>
        </View>

        <View
          style={{
            backgroundColor: statusColor,
            borderRadius: 20,
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateScale(1.5),
            marginVertical: moderateScale(3),
          }}>
          <Text style={styles.status}>{removeUnderScore(status)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default OrganizationLoanStatusCard;
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(7),
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
    backgroundColor: COLORS.whiteColor,
    borderRadius: moderateScale(10),
    flexDirection: 'row-reverse',
    paddingHorizontal: moderateScale(10),
  },
  name: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(13),
    color: COLORS.blackColor,
  },
  details: {
    flex: 0.7,
    alignItems: 'flex-start',
    paddingVertical: moderateScale(6),
    backgroundColor: COLORS.whiteColor,
    paddingHorizontal: moderateScale(9),
  },
  role: {
    ...FONTS.body5,
    color: COLORS.blackColor,
  },
  LoanAmount: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(12),
    color: COLORS.blackColor,
    marginVertical: moderateScale(2),
  },
  LoanAmount2: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(11),
    color: COLORS.grey,
    marginVertical: moderateScale(2),
  },
  status: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(10),
    color: COLORS.whiteColor,
  },
  dept: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(10),
    color: COLORS.grey,
    marginRight: moderateScale(5),
    marginLeft: moderateScale(1),
  },
  headingText: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(10),
    color: COLORS.blackColor,
    marginVertical: moderateScale(2),
  },
});
