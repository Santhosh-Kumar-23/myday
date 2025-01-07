import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {AdminHeader, AdminMiddleHeader} from '../../components/adminComponents';
import {AdminCommonLoader} from '../../components/skeletonLoader/adminCommonLoader';
import * as Icons from '../../constants/icons';
import * as Images from '../../constants/images';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as Strings from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {commonStyles} from '../../styles';
import {styles} from '../../styles/adminLoanRecoveredCompanyStyles';
import * as UtilsFunction from '../../utlis/functions';
import {isIos} from '../../utlis/functions';

const AdminLoanRecoveredCompany: React.FC<{}> = (props: any) => {
  const {navigation} = props;

  const [loader, setLoader] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  console.log('mobileUserData', mobileUserData);

  const firstName = mobileUserData?.user?.firstName ?? '';
  const LastName = mobileUserData?.user?.lastName ?? '';
  const fullName = [firstName, LastName].join(' ');
  const profileImage = mobileUserData?.user?.profile ?? '';

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  });

  const sampleArray = [
    {
      CompanyName: 'Colan Infotech Pvt Ltd',
      CompanyMail: 'Colan1234@gmail.com',
      Department: 'IT',
      Employees: 700,
      Branch: 'Chennai',
      CEO: 'kumar',
    },
    {
      CompanyName: 'Infosys',
      CompanyMail: 'Infosys1234@gmail.com',
      Department: 'IT',
      Employees: 600,
      Branch: 'Chennai',
      CEO: 'Ruban',
    },
    {
      CompanyName: 'Apollo Hospitals',
      CompanyMail: 'apolloh@gmail.com',
      Department: 'IT',
      Employees: 500,
      Branch: 'Chennai',
      CEO: 'Santhosh',
    },
    {
      CompanyName: 'Dmart',
      CompanyMail: 'dmart65mall@gmail.com',
      Department: 'IT',
      Employees: 9000,
      Branch: 'Chennai',
      CEO: 'Ruban',
    },
    {
      CompanyName: 'Dmart',
      CompanyMail: 'dmart65mall@gmail.com',
      Department: 'IT',
      Employees: 7000,
      Branch: 'Chennai',
      CEO: 'Ruban',
    },
  ];

  useEffect(() => {
    getUserInformation().then(res => {
      setEmail(res?.email);

      console.log('userInformation::::::::::::', res);
    });
  }, []);

  const renterItem = (item: any, index: number): React.JSX.Element => {
    const renderLogo = (): React.JSX.Element => {
      const renderCompanyLogo = (): React.JSX.Element => {
        return (
          <View style={commonStyles.flex(0.15)}>
            <View style={styles.logoConatiner}>
              <Image
                source={Images.colan}
                style={styles.imageStyle}
                resizeMode={Strings.CONTAIN}
              />
            </View>
          </View>
        );
      };
      const renderCompanyName = (): React.JSX.Element => {
        return (
          <View style={styles.companyNameContainer}>
            <Text style={styles.t1}>{item.CompanyName}</Text>
          </View>
        );
      };
      return (
        <View style={{flexDirection: 'row'}}>
          {renderCompanyLogo()}
          {renderCompanyName()}
        </View>
      );
    };
    const renderLoanDisbursed = (): React.JSX.Element => {
      return (
        <Pressable
          style={styles.loanDisbursedContainer}
          onPress={() => {
            navigation.navigate(Strings.ADMIN_LOAN_RECOVERED_AND_DISTURBUTED, {
              loanDisbursed: true,
            });
          }}>
          <Text style={styles.loanDisbursed}>{Strings.LOAN_DISBRSED}</Text>
        </Pressable>
      );
    };

    const renderLoanRecovered = (): React.JSX.Element => {
      return (
        <Pressable
          onPress={() => {
            navigation.navigate(Strings.ADMIN_LOAN_RECOVERED_AND_DISTURBUTED, {
              loanDisbursed: !true,
            });
          }}
          style={[
            styles.loanDisbursedContainer,
            {
              marginHorizontal: moderateScale(10),
              backgroundColor: COLORS.primaryColor,
            },
          ]}>
          <Text style={styles.loanDisbursed}>{Strings.LOAN_RECOVERED}</Text>
        </Pressable>
      );
    };

    const renderOtherDetails = (): React.JSX.Element => {
      const renderDepartment = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'Department\t\t: '}</Text>
            <Text style={styles.t3}> {item.Department}</Text>
          </View>
        );
      };

      const renderEmployees = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'Employees : '}</Text>
            <Text style={styles.t3} numberOfLines={1}>
              {' '}
              {UtilsFunction.CountReduce({
                num: item.Employees,
                increaseval: 50000,
              })}
            </Text>
          </View>
        );
      };

      const renderBranch = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'Branch : '}</Text>
            <Text style={styles.t3}> {item.Branch}</Text>
          </View>
        );
      };

      const renderCEO = (): React.JSX.Element => {
        return (
          <View style={styles.subContainer}>
            <Text style={styles.t4}>{'CEO : '}</Text>
            <Text style={styles.t3} numberOfLines={1}>
              {' '}
              {item.CEO}
            </Text>
          </View>
        );
      };
      return (
        <View style={[styles.otherDetailsContainer, {flexDirection: 'column'}]}>
          {renderEmployees()}
          {renderCEO()}
          {/* <View style={commonStyles.flex(0.5)}>
            {renderDepartment()}
            {renderEmployees()}
          </View>
          <View style={commonStyles.flex(0.5)}>
            {renderBranch()}
            {renderCEO()}
          </View> */}
        </View>
      );
    };

    const renderGroupImage = (): React.JSX.Element => {
      return (
        <View style={styles.cardMainContainer2}>
          <View style={styles.imageContainer}>
            <Image
              source={Icons.groups}
              style={styles.imageStyle}
              resizeMode={Strings.CONTAIN}
            />
          </View>
        </View>
      );
    };

    return (
      <Pressable
        style={[
          styles.cardContainer,
          {
            marginBottom: index + 1 == sampleArray.length ? 20 : Strings.ZERO,
          },
        ]}>
        <View style={styles.cardMainContainer1}>
          <View style={{backgroundColor: COLORS.whiteColor}}>
            {renderLogo()}
            <View style={styles.loanDisbursedContainerMain}>
              {renderLoanDisbursed()}
              {renderLoanRecovered()}
            </View>
          </View>
          {renderOtherDetails()}
        </View>
        {renderGroupImage()}
      </Pressable>
    );
  };

  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );

  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader />
      <View style={styles.mainContainer}>
        <AdminMiddleHeader
          ImageUrl={profileImage}
          email={email}
          companyName={fullName}
          loader={loader}
        />
        {!loader ? (
          <View style={{paddingBottom: moderateScale(100)}}>
            <Text style={styles.heading}>{Strings.LOAN_RECOVERED}</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={sampleArray}
              renderItem={({item, index}): any => renterItem(item, index)}
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

export default AdminLoanRecoveredCompany;
