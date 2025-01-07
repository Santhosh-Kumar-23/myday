import {useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {GET_ORGANIZATION_DETAILS_BY_ID} from '../../api/query';
import * as QUERY_INTERFACES from '../../api/queryInterface';
import {AdminHeader, AdminMiddleHeader} from '../../components/adminComponents';
import {AdminConnectionOrganizationDetailsLoader} from '../../components/skeletonLoader/adminConnectionOrganizationDetailsLoader';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as INTERFACES from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {Styles} from '../../styles/connectionOrganizationDetailsStyles';
import {isIos} from '../../utlis/functions';

const ConnectionOrganizationDetails: React.FC<INTERFACES.Props> = (
  props: any,
) => {
  // Props Variables
  const {navigation} = props;
  const {OrganizationId} = props?.route?.params ?? '';
  //query
  const {data, loading, refetch} = useQuery(GET_ORGANIZATION_DETAILS_BY_ID, {
    variables: {
      getOrganizationByIdId: OrganizationId,
    },
  });

  //Other Variables
  const organizationDetails: QUERY_INTERFACES.getOrganizationDetails =
    data?.getOrganizationById ?? '';
  useEffect(() => {
    refetch();
  }, [organizationDetails?.company_logo?.[0]?.file]);

  // console.log('organizationDetails:::::::::::::', organizationDetails);

  const companyName: string = organizationDetails?.org_name ?? '';
  const companyLogo: string =
    organizationDetails?.company_logo?.length > 0
      ? organizationDetails?.company_logo?.[0]?.file ?? ''
      : '';

  const loanRequeststatusCountsApproved: number =
    organizationDetails?.loanRequeststatusCounts?.approvedCount ?? Strings.ZERO;

  const loanRequeststatusCountsRejected: number =
    organizationDetails?.loanRequeststatusCounts?.rejectedCount ?? Strings.ZERO;

  const loanRequeststatusCountsPending: number =
    organizationDetails?.loanRequeststatusCounts?.pendingCount ?? Strings.ZERO;

  const email: string = organizationDetails?.email ?? '';
  const department: string = organizationDetails?.sector ?? '';
  const phoneNumber: string[] = organizationDetails?.contact;
  const contact: string = phoneNumber?.join(', ');
  const city: string = organizationDetails?.city ?? '';
  const country: string = organizationDetails?.country ?? '';
  const post_code: string = organizationDetails?.post_code ?? '';
  const companyAddress1: string = organizationDetails?.address_1st_line ?? '';
  const companAddress2: string = organizationDetails?.address_2nd_line ?? '';
  const companyAddress: string = [
    companyAddress1,
    companAddress2,
    city,
    country,
    post_code,
  ]?.join(', ');
  const clientName: string[] = organizationDetails?.founders_name ?? '';
  const companyWebsite: string = organizationDetails?.website ?? '';
  const branch: string = organizationDetails.branch_location ?? '';
  const noOfEmployees: string = organizationDetails?.no_of_employees ?? '';

  //Functions
  const renderCompanyName = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{Strings.COMPANY_NAME}</Text>
        <Text style={Styles.text2}>{companyName}</Text>
      </View>
    );
  };

  const renderClientName = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{Strings.CLIENT_NAME}</Text>
        <Text style={Styles.text2}>{clientName}</Text>
      </View>
    );
  };

  const renderDepartment = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{Strings.DEPARTMENT}</Text>
        <Text style={Styles.text2}>{department}</Text>
      </View>
    );
  };

  const renderEmail = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>{Strings.EMAIL}</Text>
        <Text style={Styles.text2}>{email}</Text>
      </View>
    );
  };

  const renderPhone = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>Phone</Text>
        <Text style={Styles.text2}>{contact}</Text>
      </View>
    );
  };

  const renderCompanyWebsite = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>Company website  </Text>
        <Text style={Styles.text2}>{companyWebsite}</Text>
      </View>
    );
  };
  const renderCompanyAddress = (): React.JSX.Element => {
    return (
      <View style={Styles.textContainer}>
        <Text style={Styles.text1}>Company address </Text>
        <Text style={Styles.text2}>{companyAddress}</Text>
      </View>
    );
  };

  const renderBranch = (): React.JSX.Element => {
    return (
      <View style={[Styles.textContainer, {marginBottom: 30}]}>
        <Text style={Styles.text1}>Branch </Text>
        <Text style={Styles.text2}>{branch}</Text>
      </View>
    );
  };

  const renderInfo = (): React.JSX.Element => {
    const renderApproved = (): React.JSX.Element => {
      return (
        <View style={Styles.subContainer}>
          <Text style={Styles.t4}>{'Approved\t - '}</Text>
          <Text style={Styles.t3}>{loanRequeststatusCountsApproved}</Text>
        </View>
      );
    };

    const renderRejected = (): React.JSX.Element => {
      return (
        <View style={Styles.subContainer}>
          <Text style={Styles.t4}>{'Rejected\t - '}</Text>
          <Text style={Styles.t3}>{loanRequeststatusCountsRejected}</Text>
        </View>
      );
    };

    const renderPending = (): React.JSX.Element => {
      return (
        <View style={Styles.subContainer}>
          <Text style={Styles.t4}>{'Pending\t - '}</Text>
          <Text style={Styles.t3}>{loanRequeststatusCountsPending}</Text>
        </View>
      );
    };

    const renderRequesting = (): React.JSX.Element => {
      return (
        <View style={Styles.subContainer}>
          <Text style={Styles.t4}>{'Requesting - '}</Text>
          <Text style={Styles.t3}>111</Text>
        </View>
      );
    };
    const renderEmployeeCount = (): React.JSX.Element => {
      return (
        <View>
          <Text style={Styles.t2}>{companyName}</Text>
          <Text style={Styles.t1}>
            {Strings.EMPLOYEE_CONUT} : {noOfEmployees}
          </Text>
        </View>
      );
    };
    return (
      <Pressable style={[Styles.cardContainer]}>
        <View style={Styles.cardMainContainer1}>
          {renderEmployeeCount()}
          <View style={Styles.subContainerMain}>
            <View style={{flex: 0.5}}>
              {renderApproved()}
              {renderRejected()}
            </View>
            <View style={{flex: 0.5}}>
              {renderPending()}
              {/* {renderRequesting()} */}
            </View>
          </View>
        </View>
        <View style={Styles.cardMainContainer2}>
          <Pressable
            style={Styles.imageContainer}
            onPress={() => {
              navigation.navigate(Strings.ADMIN_LOAN_PROCESS_LIST, {
                companyLogo: companyLogo,
                companyName: companyName,
                email: email,
                organizationId: OrganizationId,
              });
            }}>
            <Image
              source={Icons.forwardArrow}
              style={Styles.imageStyle}
              resizeMode={Strings.CONTAIN}
            />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={Styles.container}>
      <AdminHeader back={true} />
      <View style={Styles.mainContainer}>
        <AdminMiddleHeader
          loader={loading}
          ImageUrl={companyLogo}
          companyName={companyName}
          email={email}
          emailColor={COLORS.darkGrey}
        />
        {!loading ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginHorizontal: RFPercentage(2),
                backgroundColor: COLORS.whiteColor,
                borderRadius: 10,
                paddingHorizontal: 20,
                elevation: Elevation.cardContainerElevation,
                marginVertical: 10,
              }}>
              {renderCompanyName()}
              {renderClientName()}
              {renderDepartment()}
              {renderEmail()}
              {renderPhone()}
              {renderCompanyAddress()}
              {renderCompanyWebsite()}
              {renderBranch()}
            </View>
            {renderInfo()}
          </ScrollView>
        ) : (
          <AdminConnectionOrganizationDetailsLoader />
        )}
      </View>
      {isIos && <View style={Styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default ConnectionOrganizationDetails;
