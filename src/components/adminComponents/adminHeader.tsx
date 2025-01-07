import {useQuery, useSubscription} from '@apollo/client';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Badge} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import * as Query from '../../api/query';
import * as Interfaces from '../../constants/interfaces';
import * as Strings from '../../constants/string';
import {COLORS, Fonts} from '../../constants/theme';
import {acronym, isIos} from '../../utlis/functions';
import VectorIcons from '../vectorIcons';

const AdminHeader: React.FC<Interfaces.AdminHeaderProps> = ({
  notificationCount,
  search = false,
  back,
  onChangeText,
  imageLoading,
  value,
}) => {
  const [searchTextInput, setSearchTextInput] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      setSearchTextInput(false);
    }
  }, [isFocused]);

  const mobileUserData = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.mobileUserData,
  );

  // console.log('mobileUserData:::::::::::::::::::', mobileUserData);

  const firstName = mobileUserData?.user?.firstName ?? '';
  const LastName = mobileUserData?.user?.lastName ?? '';
  const fullName = [firstName, LastName].join(' ');
  const profileImage = mobileUserData?.user?.profile ?? '';

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

  const count = countData?.getNotificationCountByUser;
  // console.log(count);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardRow}>
        {searchTextInput ? (
          <View
            style={{
              height: 50,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Search"
              onChangeText={onChangeText}
              value={value}
              style={{
                width: '90%',
                backgroundColor: COLORS.DashboardBackgroundColor,
                borderRadius: moderateScale(15),
                fontSize: 12,
                fontFamily: Fonts.SemiBold,
                color: COLORS.secondaryTextColor,
                paddingLeft: moderateScale(10),
              }}
            />
            <Pressable onPress={() => setSearchTextInput(false)}>
              <VectorIcons
                name="close"
                type="ionicon"
                size={25}
                color={COLORS.DashboardBackgroundColor}
                style={{
                  marginLeft: moderateScale(10),
                }}
              />
            </Pressable>
          </View>
        ) : (
          <>
            {back ? (
              <Pressable onPress={() => navigation.goBack()}>
                <VectorIcons
                  name="arrow-back"
                  type="ionicon"
                  size={22}
                  color={COLORS.DashboardBackgroundColor}
                  style={{
                    marginTop: isIos ? moderateScale(6) : moderateScale(10),
                  }}
                />
              </Pressable>
            ) : (
              <View
                style={{
                  height: moderateScale(50),
                  width: moderateScale(50),
                  padding: profileImage ? 0 : 2,
                  borderRadius: 50,
                  backgroundColor: COLORS.secondaryColor,
                  borderWidth: 2,
                  borderColor: COLORS.darkGrey,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {false ? (
                  <ActivityIndicator
                    color={'white'}
                    size={'small'}
                    style={{position: 'absolute'}}
                  />
                ) : (
                  <>
                    {profileImage ? (
                      <>
                        <FastImage
                          onLoadStart={() => setLoading(true)}
                          onLoadEnd={() => setLoading(false)}
                          source={{
                            uri: profileImage,
                            priority: FastImage.priority.normal,
                            cache: 'immutable',
                          }}
                          style={styles.imageCard}
                          resizeMode={FastImage.resizeMode.cover}
                        />

                        {loading && (
                          <ActivityIndicator
                            color={'white'}
                            size={'small'}
                            style={{position: 'absolute'}}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <Text
                          style={{
                            color: COLORS.whiteColor,
                            fontWeight: 'bold',
                            fontSize: 22,
                          }}>
                          {acronym(fullName)}
                        </Text>
                      </>
                    )}
                  </>
                )}
              </View>
            )}
            <Text style={styles.heading}>{`Hi, ${firstName} `}</Text>
          </>
        )}
      </View>
      {searchTextInput ? null : (
        <>
          {search && (
            <Pressable
              onPress={() => {
                setSearchTextInput(!searchTextInput);
              }}>
              <VectorIcons
                name="search"
                type="fa"
                size={25}
                color={COLORS.DashboardBackgroundColor}
                style={{
                  marginTop: moderateScale(35),
                  marginLeft: moderateScale(100),
                }}
              />
            </Pressable>
          )}
          <Pressable
            onPress={() =>
              navigation.navigate('AdminProfileStack', {
                screen: Strings.ADMIN_NOTIFICATION,
                initial: !false,
              } as never)
            }>
            <VectorIcons
              name="notifications"
              type="ionicon"
              size={25}
              color={COLORS.DashboardBackgroundColor}
              style={{marginTop: moderateScale(35)}}
            />
            {count == '0' ? null : (
              <Badge
                value={realCount ? realCount : count > 9 ? '9+' : count}
                status="error"
                containerStyle={styles.badgeContainer}
                textStyle={styles.badgeText}
              />
            )}
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AdminHeader;
const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.18,
    backgroundColor: COLORS.secondaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingHorizontal: moderateScale(15),
  },
  badgeContainer: {
    position: 'absolute',
    top: 30,
    right: -2,
  },
  badgeText: {
    fontSize: moderateScale(8),
    fontWeight: 'bold',
  },
  cardRow: {flexDirection: 'row', marginTop: moderateScale(20)},
  imageCard: {height: '100%', width: '100%', borderRadius: 50},
  heading: {
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
  },
});
