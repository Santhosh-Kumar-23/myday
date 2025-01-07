import {useMutation, useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Circle, Text as SVGText, Svg} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import * as mutation from '../../api/mutation';
import * as query from '../../api/query';
import {AdminHeader, AdminHomeGraph} from '../../components/adminComponents';
import {AdminHomeLoader} from '../../components/skeletonLoader/adminHomeLoader';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import {getUserInformation} from '../../constants/localStorage';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {deviceId, deviceType, getFcmToken, isIos} from '../../utlis/functions';

const width = Dimensions.get('window').width / 2.5;

const AdminHome: React.FC<{}> = (props: any) => {
  const {data: DashboardDetails} = useQuery(query.GET_ADMIN_DASHBOARD_DETAILS);

  const totalOrganizationsCount: number =
    DashboardDetails?.getAdminDataMobile?.totalOrganizationsCount ??
    Strings.ZERO;

  const totalLoanRecoverCount: number =
    DashboardDetails?.getAdminDataMobile?.totalRecoveringAmount ?? Strings.ZERO;

  const amountDisbursed: number =
    DashboardDetails?.getAdminDataMobile?.totalLoanAmount ?? Strings.ZERO;

  const connecetedEmployees: number =
    DashboardDetails?.getAdminDataMobile?.totalEmployeesCount ?? Strings.ZERO;

  const ChartData = DashboardDetails?.getAdminDataMobile?.last7Days ?? [];

  console.log('AAAAAAAAAAAAAAAAAA', ChartData);

  const profitPercentage: number =
    DashboardDetails?.getAdminDataMobile?.revenueDataPercentage
      ?.profitPercentage ?? Strings.ZERO;

  //Others variables

  const responseData = {
    connected_Organization: totalOrganizationsCount,
    amount_Disbursed: amountDisbursed,
    loan_Recovered: totalLoanRecoverCount,
    interest_Rate_Analytics: '0%',
    profit_Earn: '0',
    connected_Employees: connecetedEmployees,
  };
  const Dashboarddata: Interfaces.AdminDashBoardDetails[] = [
    {
      title: 'Connected Organization',
      value: responseData.connected_Organization,
      aspectratio: 1.0,
      img: Icons.teamwork,
    },
    {
      title: 'Amount Disbursed',
      value: responseData.amount_Disbursed,
      aspectratio: 1.0,
      img: Icons.adminTabActive,
    },
    {
      title: 'Loan Recovered',
      value: responseData.loan_Recovered,
      aspectratio: 90 / 100,
      img: Icons.moneybag,
    },
    {
      title: 'Interest Rate',
      value: responseData.interest_Rate_Analytics,
      aspectratio: 190 / 200,
      img: Icons.percentage,
    },
    {
      title: 'Analytics',
      value: responseData.profit_Earn,
      aspectratio: 1.5,
      img: null,
    },
    {
      title: 'Connected Employees',
      value: responseData.connected_Employees,
      aspectratio: 1.3,
      img: Icons.male,
    },
  ];

  const dispatch = useDispatch();

  const [onCallNotificationApi] = useMutation(mutation.NotificationApi);
  useEffect(() => {
    notification();
  }, []);

  const notification = async () => {
    const fcmToken = await getFcmToken();
    const deviceID = await deviceId();
    const deviceTypee = await deviceType();
    console.log('fcmToken', fcmToken);
    console.log('deviceId', deviceId);
    onCallNotificationApi({
      variables: {
        fcmToken: fcmToken,
        deviceId: deviceID,
        deviceType: deviceTypee,
      },
      onCompleted: data => {
        // console.log('notificationData', data);
      },
      onError: error => {
        // console.log('notificationError', error);
      },
    });
  };
  useEffect(() => {
    getUserInformation().then(res => {
      // console.log(res, 'userInformation');
      dispatch(Actions.gettingUserData(res));
    });
  }, []);
  //Api Calls

  const {
    data: data2,
    loading: userDataLoading,
    refetch: mobileUserDataRefetch,
  } = useQuery(query.GET_MOBILE_USER_DATA, {
    variables: {
      deviceType: isIos ? 'ios' : 'android',
    },
  });

  //dispacters
  dispatch(Actions.gettingMobileUserData(data2?.getMobileUserLoginData));

  useFocusEffect(
    useCallback(() => {
      mobileUserDataRefetch();
    }, []),
  );

  //console
  // console.log('adminBiometricResponse', data2?.getMobileUserLoginData);
  // console.log('adminNotificationResponse', data);
  // console.log(userData, 'AdminUserData');
  // console.log(mobileUserData, 'AdminMobileUserData');
  const {navigation} = props;
  const CircularProgress = (props: any) => {
    const {size, strokeWidth, text} = props;
    const radius = (size - strokeWidth) / 2;
    const circum = radius * 2 * Math.PI;
    const svgProgress = 100 - props.progressPercent;
    const dotRadius = strokeWidth / 2; // Radius of the dot
    const dotColor = props.dotColor ? props.dotColor : '#ff0000'; // Color of the dot

    // Calculate the ending point position of the progress circle
    const progressAngle =
      (props.progressPercent / 100) * 2 * Math.PI - Math.PI / 2;
    const dotX = size / 2 + radius * Math.cos(progressAngle);
    const dotY = size / 2 + radius * Math.sin(progressAngle);

    return (
      <View style={{margin: 10}}>
        <Svg width={size} height={size}>
          {/* Background Circle */}
          <Circle
            stroke={props.bgColor ? props.bgColor : '#f2f2f2'}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{strokeWidth}}
          />

          {/* Progress Circle */}
          <Circle
            stroke={props.pgColor ? props.pgColor : '#3b5998'}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            strokeLinecap="round"
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            {...{strokeWidth}}
          />

          {/* Dot at the ending point */}
          <Circle fill={dotColor} cx={dotX} cy={dotY} r={dotRadius} />

          {/* Text */}
          <SVGText
            fontFamily={Fonts.SemiBold}
            fontSize={props.textSize ? props.textSize : '10'}
            x={size / 2}
            y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
            textAnchor="middle"
            fill={props.textColor ? props.textColor : '#333333'}>
            {text}
          </SVGText>
        </Svg>
      </View>
    );
  };

  const Card = ({width, color, aspectratio, img, title, value}) => {
    return (
      <Pressable
        onPress={() => {
          if (title == 'Connected Organization') {
            navigation.navigate('AdminConnectedOrganization', {
              initial: false,
            });
          } else if (title == 'Loan Recovered') {
            navigation.navigate('AdminLoanRecoveredStack', {
              initial: false,
            });
          }
        }}
        style={[
          {
            width: width,
            height: width * aspectratio,
          },
          styles.masonryCard,
        ]}>
        {title === 'Analytics' ? (
          <View>
            <Text style={styles.masonrtList_title}>{title}</Text>
            <View style={styles.analyticsView}>
              <View style={styles.profitView} />
              <Text style={styles.loss}>{'Profit Loss'}</Text>
            </View>
            <View style={styles.earnView}>
              <View style={styles.earn} />
              <Text style={styles.earnText}>{'Profit Earn'}</Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <CircularProgress
                size={90}
                strokeWidth={10}
                progressPercent={profitPercentage}
                bgColor={COLORS.deepLightGrey}
                pgColor={COLORS.secondaryColor}
                text=""
                textSize={12}
                textColor={COLORS.secondaryColor}
                dotColor={COLORS.whiteColor}
              />
            </View>
          </View>
        ) : (
          <>
            <View style={styles.imgView}>
              <Image
                source={img}
                tintColor={COLORS.secondaryColor}
                style={styles.masonryCardImg}
                resizeMode={'contain'}
              />
            </View>
            <Text style={styles.masonrtList_title}>{title}</Text>
            <Text style={styles.masonrtList_Value}>{value}</Text>
          </>
        )}
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <AdminHeader imageLoading={userDataLoading} />
      <View style={styles.mainContainer}>
        <View style={{bottom: isIos ? 35 : 50}}>
          {userDataLoading ? (
            <AdminHomeLoader />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.masronycontentContainerStyle}>
              <View style={styles.masronyCardView}>
                <View style={styles.leftCard}>
                  {Dashboarddata.filter((_, i) => i % 2 === 0).map(item => (
                    <Card
                      key={item.id}
                      width={width}
                      aspectratio={item.aspectratio}
                      color={item.color}
                      img={item.img}
                      title={item.title}
                      value={item.value}
                    />
                  ))}
                </View>
                <View style={styles.rightCard}>
                  {Dashboarddata.filter((_, i) => i % 2 !== 0).map(item => (
                    <Card
                      key={item.id}
                      width={width}
                      aspectratio={item.aspectratio}
                      color={item.color}
                      img={item.img}
                      title={item.title}
                      value={item.value}
                    />
                  ))}
                </View>
              </View>
              <AdminHomeGraph last7Days={ChartData} />
            </ScrollView>
          )}
        </View>
      </View>
      {isIos && <View style={styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  mainContainer: {
    flex: 0.82,
    backgroundColor: COLORS.DashboardBackgroundColor,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 50,
  },
  masronycontentContainerStyle: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  masronyCardView: {flexDirection: 'row', justifyContent: 'space-between'},
  leftCard: {flex: 1, marginRight: moderateScale(8), gap: 12},
  rightCard: {
    flex: 1,
    marginLeft: moderateScale(5),
    marginTop: moderateScale(40),
    gap: 12,
  },
  masonryCard: {
    backgroundColor: COLORS.whiteColor,
    marginBottom: 10,
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(15),
    paddingTop: moderateScale(10),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,

    elevation: isIos ? 10 : Elevation.cardContainerElevation,
  },
  masonryCardImg: {
    height: verticalScale(20),
    width: scale(20),
  },
  masonrtList_title: {
    marginTop: moderateScale(10),
    ...FONTS.body2,
    color: COLORS.darkGrey,
  },
  masonrtList_Value: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(18),
    color: COLORS.secondaryTextColor,
  },
  analyticsView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  profitView: {
    height: scale(12),
    width: scale(12),
    borderRadius: 50,
    backgroundColor: COLORS.deepLightGrey,
    marginVertical: moderateScale(5),
  },
  loss: {
    ...FONTS.body4,
    color: COLORS.grey,
    marginLeft: moderateScale(4),
  },
  earnView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  earn: {
    height: scale(12),
    width: scale(12),
    borderRadius: 50,
    backgroundColor: COLORS.secondaryColor,
    marginVertical: moderateScale(5),
  },
  earnText: {
    ...FONTS.body4,
    color: COLORS.grey,
    marginLeft: moderateScale(4),
  },
  imgView: {
    height: scale(40),
    width: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#8094a5',
    padding: 25,
    elevation: moderateScale(3),
  },
  fixBackground: {
    backgroundColor: COLORS.DashboardBackgroundColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    zIndex: -1000,
  },
});
