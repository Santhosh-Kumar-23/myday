import {useApolloClient, useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {GET_ORGANIZATION_DETAILS} from '../../api/query';
import {AdminHeader, AdminMiddleHeader} from '../../components/adminComponents';
import NoDataFound from '../../components/noDataFound';
import {AdminCommonLoader} from '../../components/skeletonLoader/adminCommonLoader';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as Strings from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import {commonStyles} from '../../styles';
import {styles} from '../../styles/adminOrganizationStyles';
import {acronym, isIos} from '../../utlis/functions';

interface ConnectedOrganizationInterface {
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
  role: Role;
  roleId: string;
  workflow: Workflow;
  workflowId: string;
  organizationWorkflow: OrganizationWorkflow;
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

interface Role {
  _id: string;
  Role_Name: string;
  panel_type: string;
  Permissions: Permission[];
}

interface Permission {
  permission: PermissionDetail;
  access_controll: AccessControl;
}

interface PermissionDetail {
  _id: string;
  label: string;
  name: string;
  panel_type: string;
}

interface AccessControl {
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
}

interface Workflow {
  _id: string;
  name: string;
  components: string;
  organizations: string;
  status: string;
}

interface OrganizationWorkflow {
  _id: string;
  name: string;
  branch: string;
  organization: string;
  organizationId: string;
  approvalFlow: string;
  status: string;
  createdAt: string;
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

const AdminConnectionOrganization: React.FC<{}> = (props: any) => {
  //props variables
  const {navigation} = props;

  //useState Variables
  const [organizationDetails, setOrganizationDetails] = useState<
    ConnectedOrganizationInterface[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [footerloader, setFooterLoader] = useState<boolean>(false);
  const [vaildImageUrl, setVaildImageUrl] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [email, setEmail] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const client = useApolloClient();

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  // console.log('mobileUserData', mobileUserData);

  const firstName = mobileUserData?.user?.firstName ?? '';
  const LastName = mobileUserData?.user?.lastName ?? '';
  const fullName = [firstName, LastName].join(' ');
  const profileImage = mobileUserData?.user?.profile ?? '';

  //query
  const {data, loading, refetch} = useQuery(GET_ORGANIZATION_DETAILS, {
    variables: {
      filter: {
        page: page,
        limit: 105,
        search: searchText,
      },
    },
    onCompleted: () => {
      setRefreshing(false);
    },
    notifyOnNetworkStatusChange: true,
  });

  //Others variables
  const nextPage = data?.getOrganizationDetails?.pagination?.next;

  // hook functions
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setOrganizationDetails(data?.getOrganizationDetails?.data ?? []);
      } else {
        setOrganizationDetails(prevDetails => [
          ...prevDetails,
          ...(data?.getOrganizationDetails?.data ?? []),
        ]);
      }
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
      setPage(1);
      refetch({
        filter: {
          page: 1,
          limit: 105,
          search: '',
        },
      });
    }, [refetch]),
  );

  //Functions
  const handleSearch = async (text: string) => {
    if (text == '') {
      refetch();
    }
    setSearchText(text);
    setPage(1);
    try {
      const {data} = await client.query({
        query: GET_ORGANIZATION_DETAILS,
        variables: {
          filter: {
            page: 1,
            limit: 5,
            search: text,
          },
        },
      });
      setOrganizationDetails(data?.getOrganizationDetails?.data);
    } catch (err) {
      console.log(err);
    }
  };

  //UI functions
  const renterItem = (item: any, index: number): React.JSX.Element => {
    const companyProfile: string = item?.company_logo?.[0]?.file;

    // console.log('dev:::::::::', companyProfile);

    const renderCompanyNameAndEmail = (): React.JSX.Element => {
      const renderCompanyName = (): React.JSX.Element => {
        return <Text style={styles.t1}>{item?.org_name ?? ''}</Text>;
      };
      const renderCompanyEmail = (): React.JSX.Element => {
        return <Text style={styles.t2}>{item?.email ?? ''}</Text>;
      };

      return (
        <View>
          {renderCompanyName()}
          {renderCompanyEmail()}
        </View>
      );
    };

    const renderOtherDetails = (): React.JSX.Element => {
      const renderDepartment = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'Department : '}</Text>
            <Text style={styles.t3}> {item?.sector}</Text>
          </View>
        );
      };

      const renderEmployees = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'Employees : '}</Text>
            <Text style={styles.t3}>{item?.no_of_employees ?? ''}</Text>
          </View>
        );
      };

      const renderBranch = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'Branch : '}</Text>
            <Text style={styles.t3}>{item.bank_name}</Text>
          </View>
        );
      };

      const renderCEO = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'CEO : '}</Text>
            <Text style={styles.t3}>{item?.founders_name[0] ?? '-'}</Text>
          </View>
        );
      };

      return (
        <View style={styles.otherDetailsContainer}>
          <View style={commonStyles.flex(0.5)}>{renderEmployees()}</View>
          <View style={commonStyles.flex(0.5)}>{renderCEO()}</View>
        </View>
      );
    };

    return (
      <Pressable
        onPress={() => {
          navigation.navigate(Strings.ADMIN_CONNECTION_ORGANIZATION_DETAILS, {
            OrganizationId: item?._id ?? '',
          });
        }}
        style={[
          styles.cardContainer,
          {
            marginBottom: index + 1 == organizationDetails?.length ? 20 : 0,
          },
        ]}>
        <View style={styles.cardMainContainer1}>
          {renderCompanyNameAndEmail()}
          {renderOtherDetails()}
        </View>
        <View style={styles.cardMainContainer2}>
          <View style={styles.imageContainer}>
            {companyProfile ? (
              <>
                {imageLoading && !companyProfile && (
                  <ActivityIndicator
                    size={'small'}
                    color={COLORS.primaryColor}
                    style={{position: 'absolute'}}
                  />
                )}
                <Image
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  source={{uri: companyProfile ?? ''}}
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
                {acronym(item?.org_name)}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  const EmptyListMessage = () => {
    return <NoDataFound />;
  };

  useEffect(() => {
    getUserInformation().then(res => {
      setEmail(res?.email);

      // console.log('userInformation::::::::::::', res);
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader
        search={true}
        notificationCount={1}
        onChangeText={handleSearch}
        value={searchText}
        onPress={() => {
          refetch;
          console.log('chekl');
        }}
      />
      <View style={styles.mainContainer}>
        <AdminMiddleHeader
          loader={loading}
          ImageUrl={profileImage}
          companyName={fullName}
          email={email}
        />
        {!loading ? (
          <View style={{paddingBottom: moderateScale(80)}}>
            <Text style={styles.heading}>
              {Strings.CONNECTED_ORGANIZATIONS}
            </Text>

            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.secondaryColor, COLORS.primaryColor]}
                />
              }
              showsVerticalScrollIndicator={false}
              scrollEnabled={organizationDetails.length == 0 ? false : true}
              data={organizationDetails}
              renderItem={({item, index}): any => renterItem(item, index)}
              onEndReachedThreshold={0.9}
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
            />
          </View>
        ) : (
          <AdminCommonLoader />
        )}
      </View>
      {isIos && <View style={styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminConnectionOrganization;
