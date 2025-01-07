import {useMutation, useQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import * as mutations from '../../api/mutation';
import * as Query from '../../api/query';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import {EmployeeUploadFilesCard} from '../../components/employeeComponents/employeeUploadFilesCard';
import DocumentsDeleteModal from '../../components/modal/documentDeleteModal';
import ErrorModal from '../../components/modal/errorModal';
import {EmployeeCommonLoader} from '../../components/skeletonLoader/employeeCommonLoader';
import {ModalErrorType} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as Strings from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {removeAlphapets} from '../../utlis/functions';

export type IemployeeUploadDocumentsProps = {};

const EmployeeUploadDocuments: React.FC<IemployeeUploadDocumentsProps> = (
  props: any,
) => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<boolean>(true);
  const [file, setFile] = useState<any>([]);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  const [documentsList, setDocumentsList] = useState<any>([]);
  const [documentLoading, setDocumentLoading] = useState<boolean>(false);
  const [delectedFileName, setDelectedFileName] = useState<string>('');
  const [buttonLoader, setButtonLoader] = useState<boolean>(false);
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [uploadDocuments] = useMutation(mutations.EMPLOYEE_CREATE_LOAN_REQUEST);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [SuccessMessage, setSucesssMesaage] = useState<string>('');
  const [NavigationDataId, setNavigationDataId] = useState<any>('');
  const [processingFees, setProcessingFees] = useState<any>('');
  const [processingFessPercentage, setProcessingFeesPercentage] =
    useState<any>('');
  const [creditAmount, setCreditAmount] = useState<any>('');
  const [userID, setUserId] = useState<string>('');
  const getEmployeeLoanDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.employeeLoanDetails,
  );

  const tenure = `${getEmployeeLoanDetails?.tenure} Month`;
  // console.log('PROCESSING:::::::::::::', processingFees);

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
  const {data: idCard, refetch} = useQuery(Query.GET_EMPLOYEE_ID_CARD, {
    variables: {
      userId: userID,
    },
  });
  useEffect(() => {
    refetch();
  }, [userID]);
  // console.log(
  //   'USERID::::::::::::::::::::::::::::::::::::::::::::::::::::::::',
  //   userID,
  // );

  // console.log('ID CARD::::::::::::::::::::::::::::', idCard?.getEmployeeIdCard);

  const docs = documentsList?.map(item => {
    return {
      name: item?.name,
      size: item?.size,
      title: item?.title,
      uri: item?.uri,
      type: item?.type,
    };
  });

  let docsssss = [];
  docsssss.push(idCard?.getEmployeeIdCard);
  const docs2 = docsssss?.map(item => {
    return {
      name: item?.name,
      size: removeAlphapets(item?.size),
      title: item?.title,
      uri: item?.file,
      type: item?.fileType,
      isExist: true,
    };
  });

  // console.log('DOCS:::::::::::::::::::', docs);
  // console.log('DOCS@::::::::::::::::::::::::::::::::::::', docs2);

  // console.log('documents::::::::::::::', file);
  // console.log('estimatedTime', estimatedTime);
  // console.log('documentLoading', documentLoading);
  // console.log('getEmployeeLoanDetails', getEmployeeLoanDetails);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  });
  useEffect(() => {
    uploadingDocumentList();
  }, [file]);

  const uploadingDocumentList = () => {
    setDocumentsList(file);
  };

  // console.log('documentsList', documentsList);
  // console.log('FILE:::::::::::', file);

  const ondeleteFile = (names: string) => {
    // console.log('NAMES:::::::::::::', names);
    setFile(file.filter((i: any) => i.title !== names));
  };

  const onClickSubmit = async () => {
    try {
      setButtonLoader(true);

      // console.log('[...docs, ...docs2]', [...docs, ...docs2]);

      // Resolve each document's base64 data
      const base64Files = await Promise.all(
        idCard?.getEmployeeIdCard == null
          ? docs?.map(async (item: any) => {
              const base64 = await RNFS.readFile(item?.uri, 'base64');
              let requestObject = {
                name: item?.name,
                type: item?.type,
                title: item?.title,
                size: item?.size,
                uri: base64,
                // isExist: item?.isExist || false,
              };
              return requestObject;
            })
          : [...docs, ...docs2]?.map(async item => {
              let requestObject = {
                name: item?.name,
                type: item?.type,
                title: item?.title,
                size: item?.size,
                isExist: item?.isExist || false,
              };
              if (item?.title == 'Employment ID Card') {
                requestObject = {...requestObject, uri: item?.uri};
              } else {
                const base64 = await RNFS.readFile(item?.uri, 'base64');
                requestObject = {...requestObject, uri: base64};
              }
              return requestObject;
            }),
      );

      // console.log('base64Files::::::::::::', base64Files);

      // Create the input object for the mutation
      const input = {
        documents: base64Files,
        loanAmount: getEmployeeLoanDetails?.loanAmount[0],
        loanType: 'Employee Loan',
        tenure: tenure,
      };

      // console.log(
      //   'REQUEST DATA:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: :',
      //   input,
      // );

      // Execute the mutation with the input
      const response = await uploadDocuments({
        variables: {
          input: {
            ...input,
          },
        },

        onCompleted: data => {
          const {status, message} = data.createLoanRequest;
          if (status === true) {
            console.log(
              'DocumentSuccess::::::::::::::',
              data.createLoanRequest,
            );
            setButtonLoader(false);
            setProcessingFees(
              data?.createLoanRequest?.data?.processingFee ?? '',
            );
            setCreditAmount(data?.createLoanRequest?.data?.creditAmount ?? '');
            setProcessingFeesPercentage(
              data?.createLoanRequest?.data?.processingFeePercentage ?? '',
            );
            setSuccessModal(true);
            setNavigationDataId(data?.createLoanRequest?.data?._id);
            setSucesssMesaage(message);
          } else {
            setButtonLoader(false);
            dispatch(
              Actions.errorMessage({
                errorMessage: message,
                status: true,
                errorType: ModalErrorType.Error,
              }),
            );
          }
        },
        onError: error => {
          setButtonLoader(false);
          dispatch(
            Actions.errorMessage({
              errorMessage: (global as any).ErrorMessage,
              status: true,
              errorType: ModalErrorType.Error,
            }),
          );
        },
      });
    } catch (error) {
      setButtonLoader(false);
      console.error('Error uploading documents:', error);
    }
  };

  const onPressOk = () => {
    // console.log('opk');
    setSuccessModal(false);
    navigation.navigate(Strings.EMPLOYEE_LOAN_REQUEST_REVIEW_DETAILS, {
      documentsList:
        idCard?.getEmployeeIdCard == null ? docs : docs?.concat(docs2),
      statusId: NavigationDataId,
      statusPage: false,
      processingFees: processingFees,
      processingFeePercentage: processingFessPercentage,
      creditAmount: creditAmount,
      // idCard: idCard?.getEmployeeIdCard,
    });
  };

  // console.log('file::::::::::::::', file);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.whiteColor}}>
      <DocumentsDeleteModal
        title={`Are you sure you want to delete ${delectedFileName}`}
        buttonText1="No"
        buttonText2="Yes"
        modalVisible={isLogoutModal}
        onBackDropPress={() => setIsLogoutModal(false)}
        onPressModalCancel={() => setIsLogoutModal(false)}
        onPressModalProceed={() => {
          ondeleteFile(delectedFileName);
          setIsLogoutModal(false);
        }}
      />
      <ErrorModal
        modalVisible={successModal}
        errorType={ModalErrorType.Success}
        title={SuccessMessage}
        onBackDropPress={onPressOk}
        onOkPress={onPressOk}
      />
      <EmployeeLoanRequestSubHeader
        title="Upload Documents"
        onPress={() => navigation.goBack()}
      />
      {!loader ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: COLORS.DashboardBackgroundColor,
          }}>
          <EmployeeUploadFilesCard
            idCardFiles={idCard}
            selectedFiles={file}
            buttonLoader={buttonLoader}
            onPress={() => {
              // console.log('documnet LIST::::::::', documentsList);

              const mandatoryDocuments = documentsList.filter(
                item => item?.mandatory,
              );

              const filterProgress = documentsList.filter(
                item => item?.progress !== '',
              );

              console.log('filterProgress:::::', filterProgress);

              // const check1=documentsList.filter(item=>item?.man)

              const allProgressComplete = filterProgress.every(
                item => item?.progress === 100,
              );

              console.log('ALL::::::::::', allProgressComplete);

              if (
                idCard?.getEmployeeIdCard == null
                  ? mandatoryDocuments.length == 1 && allProgressComplete
                  : idCard && allProgressComplete
              ) {
                onClickSubmit();
              } else {
                dispatch(
                  Actions.errorMessage({
                    errorMessage: allProgressComplete
                      ? 'Please upload mandatory documents'
                      : 'Please wait for all documents to be uploaded',
                    status: true,
                    errorType: ModalErrorType.Info,
                  }),
                );
              }
            }}
            setSelectedFiles={file => {
              setFile(file);
            }}
            onPressCancel={item => {
              setDelectedFileName(item?.title ?? '');
              setIsLogoutModal(true);
            }}
            onUploadProgress={time => setEstimatedTime(time)}
            setLoading={item => setDocumentLoading(item)}
          />
          {/* {documentLoading && (
            <View style={{marginHorizontal: RFPercentage(2)}}>
              <Text style={Styles.text}>
                {`${documentsList.length}`} file Uploading...
              </Text>
            </View>
          )} */}
          {/* {file.length !== 0 && (
            <EmployeeUploadFilesDetailCard
              data={documentsList}
              loading={documentLoading || buttonLoader}
              progress={estimatedTime}
              height={RFPercentage(1)}
              onPressCancel={item => {
                setDelectedFileName(item?.title ?? '');
                setIsLogoutModal(true);
              }}
              buttonLoader={buttonLoader}
              onPress={() => {
                console.log('documnet LIST::::::::', documentsList);

                const mandatoryDocuments = documentsList.filter(item => item.mandatory);
                console.log('mandatoryDocuments::::::::::::::::::', mandatoryDocuments);

                if (documentsList.length == 4) {
                  onClickSubmit();
                } else {
                  dispatch(
                    Actions.errorMessage({
                      errorMessage: 'Please upload mandatory documents',
                      status: true,
                      errorType: ModalErrorType.Info,
                    }),
                  );
                }
              }}
            />
          )} */}
        </ScrollView>
      ) : (
        <EmployeeCommonLoader />
      )}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  text: {
    ...FONTS.h3,
    color: COLORS.blackColor,
  },
});

export {EmployeeUploadDocuments};
