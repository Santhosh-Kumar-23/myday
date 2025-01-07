import {useQuery, useSubscription} from '@apollo/client';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Badge} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import * as Query from '../../api/query';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';

const EmployeeSettingsSubHeader: React.FC<
  Interfaces.EmployeeSettingsSubHeaderProps
> = ({onPress, title = '', imageUrl, showBackArrow = true}) => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState('');
  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );
  console.log(mobileUserData?.deviceLogin?.userId, 'mobileUserData');
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
  const {data: countData, refetch} = useQuery(Query.GET_NOTIFICATION_COUNT, {});
  console.log(data, 'instant Message');
  //  console.log(USER_ID,"instant Message")
  const realCount = data?.notificationCount;

  const count = countData?.getNotificationCountByUser;
  // const dotsCount = ((global as any).notificationCount =
  //   countData?.getNotificationCountByUser) || realCount
  // console.log('BBBBBBBBBBBBBBBBBBBBBBB', dotsCount);

  console.log('realCount', realCount);

  useFocusEffect(
    useCallback(() => {
      refetch();
      if (data) {
      }
    }, [data]),
  );

  // console.log(realCount);

  const renderNotification = (): React.JSX.Element => {
    return (
      <Pressable
        style={{marginRight: 10}}
        onPress={() =>
          navigation.navigate(Strings.EMPLOYEE_NOTIFICATION as never)
        }>
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
            value={realCount ? realCount : Number(count) > 9 ? '9+' : count}
            status="error"
            containerStyle={Styles.badgeContainer}
            textStyle={Styles.badgeText}
          />
        )}
      </Pressable>
    );
  };

  const renderBackArrow = (): React.JSX.Element => {
    return (
      <Pressable onPress={onPress} style={{padding: moderateScale(10)}}>
        {showBackArrow && (
          <Image
            tintColor={COLORS.whiteColor}
            source={Icons.backArrow}
            style={Styles.iconStyle}
          />
        )}
      </Pressable>
    );
  };

  const renderTitle = (): React.JSX.Element => {
    return (
      <View>
        <Text style={Styles.heading}>{title}</Text>
      </View>
    );
  };
  return (
    <View style={Styles.container}>
      {renderBackArrow()}
      {renderTitle()}
      {renderNotification()}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.secondaryColor,
    alignItems: 'center',
    borderBottomRightRadius: RFPercentage(5),
    borderBottomLeftRadius: RFPercentage(5),
    paddingHorizontal: RFPercentage(3),
    height: RFPercentage(8),
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -3,
  },
  heading: {
    ...FONTS.h3,
    color: COLORS.whiteColor,
  },
  profileContainer: {
    backgroundColor: COLORS.lightYellow,
    borderRadius: RFPercentage(20),
    height: RFPercentage(6.0),
    width: RFPercentage(6.0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSubContainer: {
    height: RFPercentage(4.5),
    width: RFPercentage(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(20),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(20),
  },
  iconStyle: {
    height: verticalScale(9),
    width: scale(14),
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
  badgeText: {
    color: COLORS.whiteColor,
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(8),
  },
});

export {EmployeeSettingsSubHeader};
