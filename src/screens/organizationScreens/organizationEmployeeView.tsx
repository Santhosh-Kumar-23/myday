import {useMutation, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  ImageSourcePropType,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import * as mutation from '../../api/mutation';
import {ATTENDANCE_DETAILS, GET_LOAN_REQUEST_STATUS} from '../../api/query';
import {EmployeeAttendanceWeightageCard} from '../../components/employeeComponents/employeeAttendanceWeightageCard';
import Modal from '../../components/modal/deleteModal';
import Modal1 from '../../components/modal/logoutModal';
import {
  OrganizationDocumentSubmitted,
  OrganizationEmployeeViewProfile,
  OrganizationHeader,
  OrganizationPipeLineProcess,
  OrganizationSubHeader,
} from '../../components/organizationComponents';
import OrganiozationEmployeeViewPageLoader from '../../components/skeletonLoader/organiozationEmployeeViewPageLoader';
import {
  Elevation,
  LoanRequestStatus,
  ModalErrorType,
  Stage,
} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {Styles} from '../../styles/organizationEmployeeViewStyles';
import * as Functions from '../../utlis/functions';

//Interface
interface documentProps {
  title: string;
  file: string;
  name: string;
  type: string;
}

interface OrganizationUserApprovalStatusInterface {
  __typename: string;
  _id: string;
  comments: string | null;
  createdAt: string;
  enable: boolean;
  label: string;
  level: string;
  applicationNo: string;
  application: string;
  name: string;
  status: string;
  verifiedBy: string;
}

interface EmployeeInterface {
  _id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  marital_status: string;
  dob: string;
  job_title: string;
  profile: string;
  branch_location: string;
  attendance_percentage: number;
  organizationId: string | null;
  org_name: string;
  exp_years: string;
  resign_submitted_date: string;
  probation_period: string;
  contact_number: string[];
  manager: {
    id: string;
    email: string;
  };
  joining_date: string;
  loan_details: any;
  repayment_details: any;
  employess_documents: any;
  isNew: boolean | null;
  loans: any;
  workAddress: {
    addressLine1: string;
    addressLine2: string;
    addressType: string;
    city: string;
    country: string;
    state: string;
    zipCode: string;
  };
}

interface DocumentsInterface {
  _id: string;
  name: string;
  title: string;
  file: string;
  fileType: string;
  size: string;
  uploadedDate: string;
}

interface PipeLineProcessInterface {
  _id: string;
  title: string;
  description: string | null;
  label: string;
  isCompleted: boolean;
  updatedAt: string;
}

const OrganizationEmployeeView: React.FC<{}> = (Props: any) => {
  //Props variables
  const {navigation} = Props;
  const dispatch = useDispatch();
  let {loanRequestId} = Props?.route?.params ?? '';

  // console.log('loanRequestId', loanRequestId);

  const parent_navigation = loanRequestId
    ? ''
    : navigation?.getParent()?.getState() || '';

  loanRequestId = parent_navigation
    ? parent_navigation?.routes[parent_navigation?.index]?.params
        ?.loanRequestId || ''
    : loanRequestId;

  // console.log(
  //   'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA::::::::',
  //   loanRequestId,
  // );

  //mutation
  const [onCallApproveLoan] = useMutation(mutation.APPROVAL_LOAN_STATUS);
  const [getImageUrls] = useMutation(mutation.GetViewedUrl);

  //Query
  const {data, refetch, loading} = useQuery(GET_LOAN_REQUEST_STATUS, {
    variables: {
      getLoanRequestId: loanRequestId,
    },
  });

  //State variables
  const [isApproveModal, setIsApproveModal] = useState<boolean>(false);
  const [isRejectModal, setIsRejectModal] = useState<boolean>(false);
  const [downloadModal, setDownloadModal] = useState<boolean>(false);
  const [loanStatusLoader, setLoanStatusLoader] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [downloadDocuments, setDownloadDocument] = useState<documentProps>({
    title: '',
    file: '',
    name: '',
    type: '',
  });

  //Employee variables
  const employeeDetails: EmployeeInterface =
    data?.getLoanRequest?.employee ?? {};

  const managerEmail: string = employeeDetails?.manager?.email ?? '';

  const emailName: string = Functions.getEmailName(managerEmail);
  console.log('employeeDetails::::::::::::::::::::::::', emailName);
  const userId = employeeDetails._id;

  //Query
  const {data: attendanceDetails} = useQuery(ATTENDANCE_DETAILS, {
    variables: {
      userId: userId,
    },
  });

  const attendanceData =
    attendanceDetails?.getLastSixMonthsAttendance?.attendanceData;

  const employeeFirstName: string = employeeDetails?.first_name ?? '';
  const employeeProfileUrl: string = employeeDetails?.profile ?? '';
  // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', employeeProfileUrl);
  const employeeLastName: string = employeeDetails?.last_name ?? '';
  const employeeFullName: string = [employeeFirstName, employeeLastName].join(
    ' ',
  );
  const employeeDesignation: string = employeeDetails?.job_title ?? '';
  const employeeBranch: string = employeeDetails?.workAddress?.city ?? '-';
  const employeeGender: string = employeeDetails?.gender ?? '';
  const employeeLoanAmount: number =
    data?.getLoanRequest?.loanAmount ?? Strings.ZERO;
  const employeeTenure: string = data?.getLoanRequest?.tenure ?? '-';
  const employeeSector: string =
    data?.getLoanRequest?.organization?.sector ?? '-';
  const employeeDocuments: DocumentsInterface[] =
    data?.getLoanRequest?.documents ?? [];
  const employeePipelineProcessData: PipeLineProcessInterface[] =
    data?.getLoanRequest?.organizationLoanFlowLogs ?? [];

  const attendancePercentage: number =
    employeeDetails?.attendance_percentage ?? Strings.ZERO;
  // console.log('ATTENDANCE PERCENTAGE::::::::::', attendancePercentage);

  const getStage: string = data?.getLoanRequest?.stage ?? '';
  const getStatus: string = data?.getLoanRequest?.status ?? '';

  let status: string;
  let statusColor: string;
  let statusIcon: ImageSourcePropType | undefined;

  switch (getStatus) {
    case LoanRequestStatus.Rejected:
      status = LoanRequestStatus.Rejected;
      statusColor = '#e63e32';
      statusIcon = Icons.rejectd;
      break;
    case LoanRequestStatus.Approved:
      status = LoanRequestStatus.Approved;
      statusColor = COLORS.seeMoreGreen;
      statusIcon = Icons.complete;
      break;

    default:
      status = LoanRequestStatus.waitingForApproval;
      statusColor = COLORS.primaryColor;
      statusIcon = Icons.waitingForApproval;
      break;
  }

  //organization Approval Status variables
  const organizationApprovalStatus: OrganizationUserApprovalStatusInterface[] =
    data?.getLoanRequest?.organizationApprovalStatus ?? [];
  const getLastElementApprovalStatus: OrganizationUserApprovalStatusInterface =
    organizationApprovalStatus[organizationApprovalStatus.length - Strings.ONE];
  const getLastElementLoanId: string =
    getLastElementApprovalStatus?.application ?? '';
  const getLastElementStatusId: string =
    getLastElementApprovalStatus?._id ?? '';
  const organizationFilterData =
    data?.getLoanRequest?.organizationApprovalStatus
      ?.filter((item: any) => item?.enable === true)
      .pop();
  const ownerApprovalFilterData = data?.getLoanRequest?.ownerApprovalStatus
    ?.filter((item: any) => item?.enable === true)
    .pop();
  // console.log('getLastElementApprovalStatus', getLastElementApprovalStatus);
  // console.log('getStatus', getStatus);
  // console.log('getStage', getStage);
  // console.log('ownerApprovalStatus', ownerApprovalFilterData);
  const getLoanRequiredAttention =
    getStage == 'Kreon' ? ownerApprovalFilterData : organizationFilterData;
  // console.log('getLoanRequiredAttention', getLoanRequiredAttention);

  //Hook Functions
  useEffect(() => {
    refetch();
  }, []);

  //Functions
  const handleApproveOrReject = (isAccept: boolean): void => {
    setLoanStatusLoader(true);
    console.log('APPROVE OR REJECT REQUEST DATA::', {
      variables: {
        applicationId: getLastElementLoanId,
        statusId: getLastElementStatusId,
        isAccept: isAccept,
      },
    });

    onCallApproveLoan({
      variables: {
        applicationId: getLastElementLoanId,
        statusId: getLastElementStatusId,
        isAccept: isAccept,
      },
      onCompleted: async data => {
        setLoanStatusLoader(false);
        const {status, message} = data?.approveLoanStatus ?? null;
        if (status) {
          setLoanStatusLoader(false);
          setIsApproveModal(false);
          setIsRejectModal(false);
          dispatch(
            Actions.errorMessage({
              errorMessage: message,
              status: true,
              errorType: ModalErrorType.Success,
            }),
          );
          navigation.navigate('OrganizationHomeStack');
        } else {
          setLoanStatusLoader(false);
          setIsApproveModal(false);
          setIsRejectModal(false);
          dispatch(
            Actions.errorMessage({
              errorMessage: message,
              status: true,
              errorType: ModalErrorType.Info,
            }),
          );
          navigation.navigate('OrganizationHomeStack');
        }
      },
      onError: (error: any) => {
        setLoanStatusLoader(false);
        setIsApproveModal(false);
        setIsRejectModal(false);
        dispatch(
          Actions.errorMessage({
            errorMessage: error.message,
            status: true,
            errorType: ModalErrorType.Info,
          }),
        );
      },
    });
  };

  const renderOverView = (): React.JSX.Element => {
    const renderLoanAmountAndTenure = (): React.JSX.Element => {
      const renderLoanAmount = (): React.JSX.Element => {
        return (
          <View style={Styles.box}>
            <Text style={Styles.t1}>{Strings.ORGANIZATION_LOAN_AMOUNT}</Text>
            <View style={Styles.amountContainer}>
              <Text style={Styles.t2}>₹ {employeeLoanAmount}</Text>
            </View>
          </View>
        );
      };

      const renderTenure = (): React.JSX.Element => {
        return (
          <View style={Styles.box}>
            <Text style={Styles.t1}>{Strings.TENURE}</Text>
            <View style={Styles.amountContainer}>
              <Text style={Styles.t2}>{employeeTenure}</Text>
            </View>
          </View>
        );
      };
      return (
        <View style={Styles.loanAmountContainer}>
          {renderLoanAmount()}
          {renderTenure()}
        </View>
      );
    };

    const othersDetails = (): React.JSX.Element => {
      const renderDepartment = (): React.JSX.Element => {
        return (
          <View style={Styles.box1Container}>
            <Text style={Styles.t4}>{Strings.DEPARTMENT}</Text>
            <Text style={Styles.t3} numberOfLines={2}>
              {employeeSector}
            </Text>
          </View>
        );
      };

      const renderBranch = (): React.JSX.Element => {
        return (
          <View style={Styles.box1Container}>
            <Text style={Styles.t4}>{Strings.BRANCH}</Text>
            <Text style={Styles.t3} numberOfLines={2}>
              {employeeBranch}
            </Text>
          </View>
        );
      };

      const renderName = (): React.JSX.Element => {
        return (
          <View style={Styles.box1Container}>
            <Text style={Styles.t4}>{Strings.MANAGER}</Text>
            <Text style={Styles.t3} numberOfLines={2}>
              {emailName}
            </Text>
          </View>
        );
      };
      return (
        <View style={Styles.departmentContainer}>
          {renderDepartment()}
          {renderBranch()}
          {renderName()}
        </View>
      );
    };

    return (
      <View style={{marginBottom: moderateScale(20)}}>
        <View style={Styles.overViewContainer}>
          <Text style={Styles.overView}>{Strings.OVERVIEW}</Text>
        </View>
        {renderLoanAmountAndTenure()}
        {othersDetails()}
      </View>
    );
  };
  const RenderApproveByKreon = (): React.JSX.Element => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Pressable style={Styles.approveContainer} disabled={true}>
          <Text style={Styles.approve}>Approved by kreon</Text>
        </Pressable>
      </View>
    );
  };
  const renderButtons = (): React.JSX.Element => {
    const renderApprove = (): React.JSX.Element => {
      return (
        <Pressable
          style={Styles.approveContainer}
          onPress={() => {
            setIsApproveModal(true);
          }}>
          <Text style={Styles.approve}>{Strings.APPROVE}</Text>
        </Pressable>
      );
    };

    const renderReject = (): React.JSX.Element => {
      return (
        <Pressable
          style={[Styles.approveContainer, {backgroundColor: '#FF5733'}]}
          onPress={() => {
            setIsRejectModal(true);
          }}>
          <Text style={[Styles.approve]}>{Strings.REJECT}</Text>
        </Pressable>
      );
    };
    return (
      <>
        {getStage == Stage.Organization &&
        getStatus == LoanRequestStatus.Final_Authorizer ? (
          <View style={Styles.approveMainContainer}>
            {renderApprove()}
            {renderReject()}
          </View>
        ) : getStage == LoanRequestStatus.Disbursement &&
          getStatus == 'Approved' ? (
          <RenderApproveByKreon />
        ) : (
          <View
            style={{
              backgroundColor: COLORS.whiteColor,
              marginHorizontal: 20,
              borderRadius: 15,
              marginTop: 20,
              marginBottom: 20,
              paddingHorizontal: 15,
              paddingVertical: 10,
              elevation: Elevation.cardContainerElevation,
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.darkGrey,
                marginBottom: 10,
                textAlign: 'left',
              }}>
              Loan Requiring Attention
            </Text>
            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.Bold,
                  color: COLORS.blackColor,
                }}>
                {Functions.removeUnderScore(getLoanRequiredAttention?.label) ??
                  ''}
              </Text>
              <View
                style={{
                  backgroundColor: COLORS.primaryColor,
                  paddingHorizontal: 20,
                  paddingVertical: 2,

                  borderRadius: 20,
                  elevation: Elevation.cardContainerElevation,
                }}>
                <Text
                  style={{
                    color: COLORS.whiteColor,
                    fontSize: 12,
                    fontFamily: Fonts.SemiBold,
                  }}>
                  {getLoanRequiredAttention?.status ?? ''}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: Fonts.SemiBold,
                  fontSize: 12,
                  marginTop: 3,
                }}>
                {getLoanRequiredAttention?.name ?? 'Kreon'}
                {getStage !== 'Kreon'
                  ? `(level ${getLoanRequiredAttention?.level})` ?? ''
                  : ''}
              </Text>

              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: COLORS.grey,
                    fontFamily: Fonts.SemiBold,
                    fontSize: 12,
                  }}>
                  Date:
                  {Functions.convertDateToWord(
                    getStage == 'Kreon'
                      ? getLoanRequiredAttention?.updatedAt
                      : getLoanRequiredAttention?.createdAt,
                  )}
                </Text>
              </View>
            </View>
          </View>
        )}
      </>
    );
  };

  const onClickDownload = async () => {
    const {dirs} = RNFetchBlob.fs;
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

    try {
      const {data} = await getImageUrls({
        variables: {image: downloadDocuments.file},
      });
      console.log('downloadDocuments::::::::', downloadDocuments);
      if (data?.getViewedUrl) {
        setDownloadModal(false);
        console.log('downloadUrl', downloadDocuments.file);
        // const encodedUrl = encodeURI(data.getViewedUrl);

        // Define the file path and configuration
        const downloadDest = `${dirToSave}/${`RUBAN`}/${
          downloadDocuments.name
        }`;

        const options = {
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: downloadDocuments.name,
            description: 'File downloaded by download manager',
            mime: downloadDocuments.type,
            path: downloadDest,
          },
        };

        // Fetch the file
        RNFetchBlob.config(options)
          .fetch('GET', downloadDocuments.file)
          .then(res => {
            console.log('File downloaded successfully', res.path());
            dispatch(
              Actions.errorMessage({
                errorMessage: 'File downloaded successfully',
                status: true,
                errorType: ModalErrorType.Info,
              }),
            );
          })
          .catch(error => {
            console.error('Error during download', error);
            dispatch(
              Actions.errorMessage({
                errorMessage: 'An error occurred during file download',
                status: false,
                errorType: ModalErrorType.Error,
              }),
            );
          });
      } else {
        console.error('Failed to get download URL');
        dispatch(
          Actions.errorMessage({
            errorMessage: 'Failed to retrieve the download URL',
            status: false,
            errorType: ModalErrorType.Error,
          }),
        );
      }
    } catch (error) {
      console.error('Error during URL fetching', error);
      dispatch(
        Actions.errorMessage({
          errorMessage: 'An error occurred during URL fetching',
          status: false,
          errorType: ModalErrorType.Error,
        }),
      );
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={{flex: 1, backgroundColor: COLORS.DashboardBackgroundColor}}>
        <OrganizationHeader
          title={Strings.EMPLOYEE_VIEW}
          showBackArrow={true}
        />
        <OrganizationSubHeader />
        {!loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <OrganizationEmployeeViewProfile
              gender={employeeGender}
              profile={employeeProfileUrl}
              branch={employeeBranch}
              employeeName={employeeFullName}
              designation={employeeDesignation}
            />
            {renderOverView()}
            <EmployeeAttendanceWeightageCard
              LastSixMonthsAttendance={attendanceData}
              attendancePercentage={
                attendanceDetails?.getLastSixMonthsAttendance
                  ?.attendancePercentageByUser
              }
            />
            <OrganizationPipeLineProcess data={employeePipelineProcessData} />
            <OrganizationDocumentSubmitted
              data={employeeDocuments}
              // onPressLoanCard={(fileName, fileUrl, nameWithExtention, type) => {
              //   setDownloadModal(true);
              //   setDownloadDocument({
              //     title: fileName,
              //     file: fileUrl,
              //     name: nameWithExtention,
              //     type: type,
              //   });

              // }}
            />
            {renderButtons()}
            <Modal
              loaderColor={true}
              title={Strings.ARE_YOU_SURE_WANT_TO_APPROVE_THIS}
              buttonText2={Strings.YES}
              buttonText1={Strings.NO}
              modalVisible={isApproveModal}
              // onBackDropPress={() => setIsApproveModal(false)}
              onPressModalCancel={() => setIsApproveModal(false)}
              loader={loanStatusLoader}
              onPressModalProceed={() => {
                handleApproveOrReject(true);
                // setTimeout(() => {
                //   setIsApproveModal(false);
                // }, 500);
              }}
            />
            <Modal
              title={Strings.ARE_YOU_SURE_WANT_TO_REJECT_THIS}
              buttonText2={Strings.YES}
              buttonText1={Strings.NO}
              loader={loanStatusLoader}
              modalVisible={isRejectModal}
              // onBackDropPress={() => setIsRejectModal(false)}
              onPressModalCancel={() => setIsRejectModal(false)}
              onPressModalProceed={() => {
                handleApproveOrReject(false);
                // setTimeout(() => {
                //   setIsRejectModal(false);
                // }, 500);
              }}
            />
            <Modal1
              image={Icons.download}
              title={`Are you sure want to download ${downloadDocuments.title} file?`}
              buttonText2={Strings.YES}
              buttonText1={Strings.NO}
              modalVisible={downloadModal}
              // onBackDropPress={() => setDownloadModal(false)}
              onPressModalCancel={() => setDownloadModal(false)}
              onPressModalProceed={() => {
                onClickDownload();
              }}
            />
          </ScrollView>
        ) : (
          <OrganiozationEmployeeViewPageLoader />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OrganizationEmployeeView;
