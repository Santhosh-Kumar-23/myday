import {useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {ADMIN_GET_ALL_LOAN_REQUEST} from '../../api/query';
import AdminHeader from '../../components/adminComponents/adminHeader';
import AdminMiddleHeader from '../../components/adminComponents/adminMiddleHeader';
import NoDataFound from '../../components/noDataFound';
import OrganizationLoanProcessLoader from '../../components/skeletonLoader/organizationLoanProcessLoader';
import * as Enums from '../../constants/enums';
import * as Strings from '../../constants/string';
import {COLORS, Fonts, deviceWidth} from '../../constants/theme';
import {styles} from '../../styles/adminLoanProcessListStyles';
import * as Function from '../../utlis/functions';
import {isIos} from '../../utlis/functions';

const filterData = Object.values(Enums.AdminLoanRequestStatus);

interface EmployeeLoanDetailsInterface {
  _id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  hashMail: string;
  gender: string;
  marital_status: string;
  dob: string;
  job_title: string;
  profile: string;
  workAddress: {
    addressLine1: string;
    addressLine2: string;
    addressType: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
  organizationId: string;
  org_name: string;
  exp_years: string;
  resign_submitted_date: string;
  attendance_percentage: number;
  probation_period: string;
  contact_number: string[];
  joining_date: string;
  salary: Salary;
  salaryId: string;
  account: Account;
  accountId: string;
  loan_details: string;
  repayment_details: string;
  employess_documents: string;
  branch_location: string;
  type: string;
  isNew: boolean;
  isLoanRaised: string;
  loans: string;
  role: Role;
  status: string;
  activeapplication: string;
}

interface Salary {
  _id: string;
  basic: number;
  basic_arrears: number;
  conveyance: number;
  conveyance_arrears: number;
  HRA: number;
  HRA_arrears: number;
  medical_allowance: number;
  medical_allowance_arrears: number;
  special_allowance: number;
  employee_pf: number;
  professional_tax: number;
  total_salary: number;
  annual_income: number;
}

interface Account {
  _id: string;
  account_holder_name: string;
  bank_name: string;
  identifier_code: string;
  account_number: string;
  branch_location: string;
}

interface Role {
  _id: string;
  Role_Name: string;
  panel_type: string;
  Permissions: string;
}

interface Document {
  _id: string;
  name: string;
  file: string;
  title: string;
  fileType: string;
  size: string;
  uploadedDate: string;
  status: string;
  application: string;
}

interface Organization {
  _id: string;
  org_name: string;
  email: string;
  contact: string[];
  country: string;
  address_1st_line: string;
  address_2nd_line: string;
  city: string;
  post_code: string;
  website: string;
  founders_name: string[];
  directors_name: string[];
  sector: string;
  legal_structure: string;
  registration_info: string;
  no_of_employees: string;
  description: string;
  company_logo: CompanyLogo[];
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  branch_location: string;
  identifier_code: string;
  tax_payerId: string;
  tax_identification_number: string;
  license_permits: string;
  privacy_policy: string;
  terms_conditions: string;
  status: string;
  type: string;
  roleId: string;
  workflowId: string;
  organizationWorkflowId: string;
  branches: string;
  settingConfiguration: SettingConfiguration;
}

interface CompanyLogo {
  _id: string;
  name: string;
  file: string;
  fileType: string;
  size: string;
  uploadedDate: string;
}

interface SettingConfiguration {
  _id: string;
  name: string;
  loan_details: string;
  employee_information: string;
  credit_information: string;
  repayment_terms: string;
  organization_policies: string;
}

interface ApprovalStatus {
  _id: string;
  application: string;
  label: string;
  verifiedBy: string;
  status: string;
  comments: string;
  enable: string;
  createdAt: string;
  applicationNo: string;
  updatedAt: string;
}

interface Workflow {
  _id: string;
  name: string;
  components: string;
  organizations: string;
  status: string;
}

interface LoanApplicationInterface {
  _id: string;
  employee: EmployeeLoanDetailsInterface;
  organization: Organization;
  employeeId: string;
  organizationId: string;
  label: string;
  applicationNo: string;
  status: string;
  stage: string;
  loanType: string;
  loanAmount: number;
  tenure: string;
  documents: Document[];
  isMove: boolean;
  organizationWorkflow: Workflow;
  organizationWorkflowId: string;
  workflow: Workflow;
  workflowId: string;
  createdAt: string;
  loanFlowLogs: string;
  ownerApprovalStatus: ApprovalStatus[];
  organizationApprovalStatus: ApprovalStatus[];
  OrganizationWorkflow: string;
  organizationLoanFlowLogs: string;
  loansCount: string;
  previousLoanDueStatus: string;
}

const loanProcess = [
  {
    id: 1,
    name: 'All',
    ischeck: true,
    status: filterData,
  },
  // {id: 2, name: 'Draft', ischeck: false, status: ['Draft']},
  {id: 3, name: 'Pending', ischeck: false, status: ['Pending']},
  {id: 4, name: 'Rejected', ischeck: false, status: ['Rejected']},
  {id: 5, name: 'Approved', ischeck: false, status: ['Approved']},
  // {id: 6, name: 'Cancelled', ischeck: false, status: ['Cancelled']},
  // {id: 7, name: 'New_Application', ischeck: false, status: ['New_Application']},
];

const AdminLoanProcessList: React.FC<{}> = (props: any) => {
  //Props variables
  const {navigation} = props;
  const {companyLogo, companyName, email, organizationId} =
    props?.route?.params ?? '';

  //State variables
  const [loader, setLoader] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loanProcessStats, setLoanProcessStats] = useState(loanProcess);
  const [page, setPage] = useState(1);
  const [footerloader, setFooterLoader] = useState(false);
  const [loanListDetails, setLoanListDetails] = useState<
    LoanApplicationInterface[]
  >([]);

  const filteredList = loanProcessStats.find(item => {
    return item?.ischeck == true;
  });

  //Ref variables
  const header = useRef<FlatList>(null);
  // console.log('organizationId', organizationId);

  //query
  const {data, refetch} = useQuery(ADMIN_GET_ALL_LOAN_REQUEST, {
    variables: {
      filter: {
        limit: 100,
        page: page,
        organization: [organizationId],
      },
    },
    onCompleted: () => {
      setRefreshing(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  // hook functions
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setLoanListDetails(data?.getAllLoanRequest?.data ?? []);
      } else {
        setLoanListDetails(prevDetails => [
          ...prevDetails,
          ...(data?.getAllLoanRequest?.data ?? []),
        ]);
      }
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setPage(1);
      refetch({
        filter: {
          page: 1,
          limit: 100,
          status: filteredList?.status,
          organization: [organizationId],
        },
      });
    }, [refetch, filteredList?.status, organizationId]),
  );

  //Hook functions
  useEffect(() => {
    setLoanProcessStats(loanProcess);
  }, []);

  //Functions
  const onClickHeader = (item: any, index: number) => {
    let updatedStats = loanProcessStats.map(it => {
      if (it === item) {
        return {
          ...it,
          ischeck: true,
        };
      } else {
        return {
          ...it,
          ischeck: false,
        };
      }
    });
    setLoanProcessStats(updatedStats);
    if (header.current) {
      header.current.scrollToIndex({index, animated: true, viewPosition: 1.0});
    }
  };

  const HeaderRenderItem = ({item, index}: any) => {
    return (
      <Pressable
        onPress={() => onClickHeader(item, index)}
        style={{
          backgroundColor: item.ischeck
            ? COLORS.secondaryColor
            : COLORS.whiteLightSilver,
          paddingHorizontal: moderateScale(30),
          paddingVertical: moderateScale(2),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: moderateScale(20),
          elevation: 2,
        }}>
        <Text
          style={[
            styles.name,
            {
              color: item.ischeck
                ? COLORS.whiteColor
                : COLORS.secondaryTextColor,
            },
          ]}>
          {Function.removeUnderScore(item.name)}
        </Text>
      </Pressable>
    );
  };
  const getItemLayout = (data: any, index: number) => ({
    length: deviceWidth / 2 + 30,
    offset: (deviceWidth / 2 + 30 + 20) * index,
    index,
  });
  const card = ({item}: any) => {
    const employeeFullName: string = [
      item?.employee?.first_name ?? '',
      item?.employee?.last_name ?? '',
    ]?.join(', ');

    return (
      <Pressable
        style={styles.cardContainer}
        onPress={() =>
          navigation.navigate(Strings.ADMIN_EMPLOYEE_DETAILS, {
            employeeId: item?.employee?._id,
            status: item?.status,
          })
        }>
        <>
          <View style={styles.statusView}>
            <View>
              <Text style={styles.member}>{employeeFullName}</Text>
              <Text style={styles.email}>{item?.employee?.email ?? ''}</Text>
            </View>
            <View
              style={[
                styles.status,
                {backgroundColor: Function.backgroundColored(item.status)},
              ]}>
              <Text style={styles.statusText}>
                {Function.removeUnderScore(item?.status ?? '')}
              </Text>
            </View>
          </View>
          <View style={styles.detailsView}>
            <Text style={styles.member}>{`${
              Strings.ORGANIZATION_LOAN_AMOUNT
            } : ${item?.loanAmount ?? ''}`}</Text>
            <View style={styles.companyDetailsView}>
              <View style={styles.deptView}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: moderateScale(10),
                    flexWrap: 'wrap',
                  }}>
                  <Text style={styles.heading}>{'Department : '}</Text>
                  <Text style={styles.headingText} numberOfLines={1}>
                    {Function.truncateText({
                      text: item?.employee?.department ?? '-',
                      maxLength: 7,
                    })}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: moderateScale(10),
                    flexWrap: 'wrap',
                  }}>
                  <Text style={styles.heading}>{'Designation : '}</Text>
                  <Text style={styles.headingText} numberOfLines={1}>
                    {Function.truncateText({
                      text: item?.employee?.job_title ?? '-',
                      maxLength: 7,
                    })}
                  </Text>
                </View>
              </View>
              <View style={styles.branchView}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: moderateScale(10),
                    flexWrap: 'wrap',
                  }}>
                  <Text style={styles.heading}>{'Branch : '}</Text>
                  <Text style={styles.headingText} numberOfLines={1}>
                    {Function.truncateText({
                      text: item?.employee?.workAddress?.city ?? '-',
                      maxLength: 7,
                    })}
                  </Text>
                </View>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: moderateScale(10),
                    flexWrap: 'wrap',
                  }}>
                  <Text style={styles.heading}>{'Manager : '}</Text>
                  <Text style={styles.headingText} numberOfLines={1}>
                    {Function.truncateText({
                      text: item?.organization?.directors_name[0] ?? [''],
                      maxLength: 7,
                    })}
                  </Text>
                </View> */}
              </View>
              <View style={styles.profileView}>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    backgroundColor: COLORS.DashboardBackgroundColor,
                    // padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: moderateScale(50),
                    elevation: 1.5,
                  }}>
                  {item?.employee?.profile ? (
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
                        source={{uri: item?.employee?.profile ?? ''}}
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
                        color: COLORS.secondaryColor,
                        fontFamily: Fonts.SemiBold,
                        fontSize: 16,
                        paddingTop: 5,
                      }}>
                      {Function.acronym(employeeFullName)}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </>
      </Pressable>
    );
  };
  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };
  const EmptyListMessage = (item: any) => {
    return <NoDataFound />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader back={true} search={!true} />
      <View style={styles.mainContainer}>
        <AdminMiddleHeader
          ImageUrl={companyLogo}
          email={email}
          companyName={companyName}
          loader={loader}
        />
        {!loader ? (
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.1,
                backgroundColor: COLORS.DashboardBackgroundColor,
                marginVertical: 5,
              }}>
              <FlatList
                ref={header}
                data={loanProcessStats}
                renderItem={HeaderRenderItem}
                horizontal={true}
                ItemSeparatorComponent={() => <View style={{width: 20}} />}
                contentContainerStyle={styles.headerFlatList}
                showsHorizontalScrollIndicator={false}
                getItemLayout={getItemLayout}
                initialNumToRender={loanProcessStats.length}
              />
            </View>
            <View
              style={{
                flex: 0.8,
                paddingBottom: moderateScale(40),
              }}>
              <FlashList
                estimatedItemSize={1000}
                data={loanListDetails}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[COLORS.secondaryColor, COLORS.primaryColor]}
                  />
                }
                renderItem={card}
                showsVerticalScrollIndicator={false}
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
              />
            </View>
          </View>
        ) : (
          <OrganizationLoanProcessLoader />
        )}
      </View>
      {isIos && <View style={styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminLoanProcessList;
