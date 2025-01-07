import {useQuery, useSubscription} from '@apollo/client';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Badge} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, scale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import * as Query from '../../api/query';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import useCountryCode from '../../utlis/functions';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const OrganizationSubHeader: React.FC<
  Interfaces.OrganizationSubHeaderProps
> = ({companyName = '', companyAddress = '', loading}) => {
  const navigation = useNavigation();

  const {getCountryName} = useCountryCode();

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );
  const USER_ID = mobileUserData?.deviceLogin?.userId;

  const {data} = useSubscription(Query.NOTIFICATION_PUSHER, {
    variables: {userId: USER_ID},
    onSubscriptionData(options) {
      // console.log('showSubscriptionData', options);
    },
    onError: error => {
      console.log('showSubscriptionError', error);
    },
  });
  const {data: countData, refetch} = useQuery(Query.GET_NOTIFICATION_COUNT);
  // console.log(countData, data, 'countData');
  const realCount = data?.notificationCount;
  useFocusEffect(
    useCallback(() => {
      refetch();
      if (data) {
      }
    }, [data]),
  );

  // console.log(realCount);

  const count = countData?.getNotificationCountByUser;
  console.log(count);

  //get Organization userdata from store
  const getOrganizationDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getOrganizationDetails,
  );

  const organizationName: string = getOrganizationDetails?.org_name ?? '';
  const organizationCountry: string = getCountryName(
    getOrganizationDetails?.country ?? '',
  );
  const organizationCity: string = getOrganizationDetails?.city ?? '';
  const organizationAddress: string =
    organizationCity && organizationCountry
      ? [organizationCity, organizationCountry]?.join(', ')
      : organizationCity || organizationCountry;

  const renderNotification = (): React.JSX.Element => {
    return (
      <View style={[Styles.center]}>
        <Pressable
          style={{marginRight: 10}}
          onPress={() => {
            navigation.navigate('OrganizationProfileStack', {
              screen: Strings.ORGANIZATION_NOTIFICATION,
              initial: false,
            });
          }}>
          {!false && (
            <Image
              tintColor={COLORS.whiteColor}
              resizeMode="contain"
              source={Icons.notify}
              style={{height: RFPercentage(3), width: RFPercentage(3)}}
            />
          )}
          {count == '0' ? null : (
            <Badge
              value={realCount ? realCount : count > 9 ? '9+' : count}
              status="error"
              containerStyle={Styles.badgeContainer}
              textStyle={Styles.badgeText}
            />
          )}
        </Pressable>
      </View>
    );
  };

  const renderLogo = (): React.JSX.Element => {
    return (
      <View style={[Styles.center]}>
        <Image
          tintColor={COLORS.whiteColor}
          source={Icons.organization}
          style={{height: RFPercentage(3.5), width: RFPercentage(3.5)}}
        />
      </View>
    );
  };

  const renderText = (): React.JSX.Element => {
    return (
      <>
        <View style={Styles.center}>
          <Text style={Styles.t1}>{organizationName}</Text>
          <Text style={Styles.t2}>{organizationAddress}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={Styles.container}>
      {renderLogo()}

      {loading ? (
        <SkeletonPlaceholder>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: 220, height: 10, borderRadius: 10}}></View>
            <View style={{width: 150, height: 10, marginTop: 10}}></View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        renderText()
      )}
      {renderNotification()}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: moderateScale(60),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryColor,
    borderBottomRightRadius: RFPercentage(5),
    borderBottomLeftRadius: RFPercentage(5),
    paddingHorizontal: RFPercentage(3),
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -3,
  },
  badgeText: {
    fontSize: moderateScale(8),
    fontWeight: 'bold',
  },
  t1: {
    ...FONTS.h3,
    color: COLORS.whiteColor,
  },
  t2: {
    ...FONTS.body4,
    color: COLORS.lightGrey,
  },
  badge: {
    backgroundColor: COLORS.errorRed,
    height: scale(20),
    width: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrganizationSubHeader;
