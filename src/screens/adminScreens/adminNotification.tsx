import {useMutation, useQuery} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale, scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import * as Mutation from '../../api/mutation';
import * as Query from '../../api/query';
import {AdminHeader} from '../../components/adminComponents';
import NotificationDelete from '../../components/modal/documentDeleteModal';
import NoDataFound from '../../components/noDataFound';
import {NotificationCommonLoader} from '../../components/skeletonLoader/notificationCommonLoader';
import VectorIcons from '../../components/vectorIcons';
import {ModalErrorType} from '../../constants/enums';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {handleNotificationRedirection, isIos} from '../../utlis/functions';
// Define the types for notifications and props
interface Notification {
  id: string;
  title: string;
  description: string;
  profileImg: string;
  isRead: boolean;
}

interface EmployeeNotificationProps {
  navigation: any;
}

const AdminNotification: React.FC<EmployeeNotificationProps> = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isNotificationDeleteModal, setIsNotificationDeleteModal] =
    useState<boolean>(false);
  const [allNotificationDeleteId, setAllNotificationDeleteId] = useState<
    string[]
  >([]);
  const [allNotificationReadId, setAllNotificationRead] = useState<string[]>(
    [],
  );
  const [deleteNotificationLoader, setDeleteNotificationLoader] =
    useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');
  const [clearAll, setClearAll] = useState<boolean>(false);
  const [deleteNotificationTitle, setDeleteNotificationTitle] =
    useState<string>('');

  const {data, loading, refetch} = useQuery(Query.NOTIFICATION_LIST);
  const {refetch: countRefetch} = useQuery(Query.GET_NOTIFICATION_COUNT);
  const [notificationRead] = useMutation(Mutation.NotificationRead);
  const [deleteNotification] = useMutation(Mutation.DeleteNotification);
  const [deleteAllNotification] = useMutation(Mutation.DeleteAllNotification);
  const [readAllNotification] = useMutation(Mutation.ReadAllNotification);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const dataList: Notification[] =
    data?.getAllNotificationsByUser?.map((item: any) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      profileImg: item.to.profile,
      isRead: item.isRead,
    })) ?? [];

  const read = dataList.filter(item => item.isRead);
  const unread = dataList.filter(item => !item.isRead);

  const renderAllNotificationCard = ({item}: {item: Notification}) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        notificationRead({
          variables: {
            markNotificationAsReadId: item.id,
          },
          onCompleted: async data => {
            countRefetch();
            handleNotificationRedirection(data);
          },
          onError: error => {
            dispatch(
              Actions.errorMessage({
                errorMessage: error.message,
                status: true,
                errorType: ModalErrorType.Error,
              }),
            );
          },
        });
      }}>
      <View style={styles.cardMainContainer}>
        <Text style={styles.notificationText}>{item.title}</Text>
        <View style={styles.dotsMainContainer}>
          <View style={styles.dotsContainer}></View>
          <Pressable
            onPress={() => {
              setIsNotificationDeleteModal(true);
              setDeleteNotificationTitle(
                'Are you sure you want to delete notification',
              );
              setDeleteId(item.id);
            }}
            style={styles.iconContainer}>
            <VectorIcons
              type={isIos ? 'ionicon' : 'evil'}
              name="close"
              size={RFPercentage(2)}
              color={COLORS.blackColor}
            />
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </Pressable>
  );

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleDeleteNotification = (deleteId: string) => {
    setDeleteNotificationLoader(true);
    deleteNotification({
      variables: {
        deleteNotificationId: deleteId,
      },
      onCompleted: async data => {
        const {status, message} = data?.deleteNotification ?? {};
        if (status) {
          setDeleteNotificationLoader(false);
          setIsNotificationDeleteModal(false);
          refetch();
          dispatch(
            Actions.errorMessage({
              errorMessage: message,
              status: true,
              errorType: ModalErrorType.Success,
            }),
          );
        } else {
          setDeleteNotificationLoader(false);
        }
      },
      onError: error => {
        setDeleteNotificationLoader(false);
        dispatch(
          Actions.errorMessage({
            errorMessage: error.message,
            status: true,
            errorType: ModalErrorType.Error,
          }),
        );
      },
    });
  };

  const handleDeleteAllNotification = (ids: string[]) => {
    setDeleteNotificationLoader(true);
    deleteAllNotification({
      variables: {
        deleteAllNotificationId: ids,
      },
      onCompleted: async data => {
        const {status, message} = data?.deleteAllNotification ?? {};
        if (status) {
          setDeleteNotificationLoader(false);
          setIsNotificationDeleteModal(false);
          refetch();
          dispatch(
            Actions.errorMessage({
              errorMessage: message,
              status: true,
              errorType: ModalErrorType.Success,
            }),
          );
        } else {
          setDeleteNotificationLoader(false);
        }
      },
      onError: error => {
        setDeleteNotificationLoader(false);
        dispatch(
          Actions.errorMessage({
            errorMessage: error.message,
            status: true,
            errorType: ModalErrorType.Error,
          }),
        );
      },
    });
  };

  const handleReadAllNotification = (ids: string[]) => {
    readAllNotification({
      variables: {
        markAllNotificationId: ids,
      },
      onCompleted: async data => {
        const {status, message} = data?.markAllNotification ?? {};
        if (status) {
          refetch();
        }
      },
      onError: error => {
        dispatch(
          Actions.errorMessage({
            errorMessage: error.message,
            status: true,
            errorType: ModalErrorType.Error,
          }),
        );
      },
    });
  };

  const filterReadAllNotificationIds = read.map(item => item.id);
  const filterUnReadAllNotificationIds = unread.map(item => item.id);

  const renderDeleteModal = (): React.JSX.Element => (
    <NotificationDelete
      title={deleteNotificationTitle}
      buttonText1="No"
      buttonText2="Yes"
      loading={deleteNotificationLoader}
      modalVisible={isNotificationDeleteModal}
      onBackDropPress={() => setIsNotificationDeleteModal(false)}
      onPressModalCancel={() => setIsNotificationDeleteModal(false)}
      onPressModalProceed={() => {
        if (deleteId === '') {
          handleDeleteAllNotification(allNotificationDeleteId);
        } else {
          handleDeleteNotification(deleteId);
        }
      }}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {renderDeleteModal()}
      <AdminHeader back={true} notificationCount={1} />
      <View style={styles.mainContainer}>
        <View>
          {!loading ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={[COLORS.secondaryColor, COLORS.primaryColor]}
                />
              }>
              {dataList.length > 0 ? (
                <>
                  {unread.length > 0 && (
                    <>
                      <View style={styles.t1Container}>
                        <Text style={styles.unread}>{'Unread'}</Text>
                        <Pressable
                          onPress={() => {
                            handleReadAllNotification(
                              filterUnReadAllNotificationIds,
                            );
                          }}>
                          <Text
                            style={[
                              styles.unread,
                              {color: COLORS.primaryColor},
                            ]}>
                            Read all
                          </Text>
                        </Pressable>
                      </View>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          flexGrow: 1,
                          marginBottom: read.length > 0 ? 0 : 120,
                        }}
                        ListEmptyComponent={() => <NoDataFound />}
                        data={unread}
                        scrollEnabled={false}
                        renderItem={renderAllNotificationCard}
                        keyExtractor={item => item.id}
                      />
                    </>
                  )}
                  {read.length > 0 && (
                    <View>
                      <View style={styles.t1Container}>
                        <Text style={styles.unread}>{'Read'}</Text>
                        <Pressable
                          onPress={() => {
                            setIsNotificationDeleteModal(true);
                            setDeleteNotificationTitle(
                              'Are you sure you want to delete all notifications',
                            );
                            setDeleteId('');
                            setAllNotificationDeleteId(
                              filterReadAllNotificationIds,
                            );
                          }}>
                          <Text
                            style={[
                              styles.unread,
                              {color: COLORS.primaryColor},
                            ]}>
                            Clear all
                          </Text>
                        </Pressable>
                      </View>
                      <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{flexGrow: 1, marginBottom: 120}}
                        ListEmptyComponent={() => <NoDataFound />}
                        data={read}
                        renderItem={renderAllNotificationCard}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  )}
                </>
              ) : (
                <NoDataFound />
              )}
            </ScrollView>
          ) : (
            <NotificationCommonLoader />
          )}
        </View>
      </View>
      {isIos && <View style={styles.fixBackground} />}
    </SafeAreaView>
  );
};

export default AdminNotification;
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
    paddingBottom: 100,
  },
  dotsMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  cardMainContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  dotsContainer: {
    height: 5,
    width: 5,
    borderRadius: 30,
    backgroundColor: 'white',
    marginLeft: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  t1Container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 22,
    marginVertical: moderateScale(10),
  },
  profileImg: {
    height: scale(50),
    width: scale(50),
    borderRadius: moderateScale(50),
    backgroundColor: COLORS.lightGrey,
  },
  unread: {
    fontFamily: Fonts.Bold,
    color: COLORS.grey,
    fontSize: moderateScale(13),
    margin: moderateScale(10),
    marginLeft: moderateScale(20),
  },
  descriptionText: {
    ...FONTS.body5,
    color: COLORS.grey,
    marginLeft: moderateScale(5),
  },
  card: {
    margin: moderateScale(5),
    marginHorizontal: moderateScale(20),
    padding: moderateScale(5),
    elevation: 5,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    backgroundColor: COLORS.backgroundColour,
    borderRadius: moderateScale(10),
    // flexDirection: 'row',
  },
  notificationView: {flex: 0.9, paddingVertical: moderateScale(10)},
  notificationText: {
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(12),
    color: COLORS.secondaryTextColor,
    marginLeft: moderateScale(5),
  },
  dotView: {flex: 0.1, alignItems: 'flex-end', marginTop: 2, marginRight: 5},
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
