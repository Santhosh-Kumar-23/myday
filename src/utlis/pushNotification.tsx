import PushNotificationIOS, {
  PushNotificationIOSObject,
  PushNotificationPermissions,
} from '@react-native-community/push-notification-ios';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import PushNotification, {
  PushNotificationObject,
} from 'react-native-push-notification';
import {handleNotificationRedirection} from './functions';

// Function to get FCM token
const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);
    return fcmToken;
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

// Request notification permissions and handle FCM token
const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android notification permission granted');
        console.log('FCM Token:', await getFcmToken());
        return true;
      } else {
        console.log('Android notification permission denied');
        return false;
      }
    } else if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('iOS notification permission granted');
        console.log('FCM Token:', await getFcmToken());
        return true;
      } else {
        console.log('iOS notification permission denied');
        return false;
      }
    }
  } catch (error) {
    console.error('Error checking notification permission:', error);
    return false;
  }
};

// Foreground message receiving function
const foregroundMessage = async (): Promise<void> => {
  if (Platform.OS === 'android') {
    const listener = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const {title, body} = remoteMessage.notification!;
        PushNotification.localNotification({
          channelId: 'default-channel-id', // Add the channelId here
          title: title || '',
          message: body || '',
          data: remoteMessage.data,
        } as PushNotificationObject);
      },
    );
    configureForegroundNotification();
    return listener;
  } else {
    const listener = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        const {title, body} = remoteMessage.notification!;
        PushNotificationIOS.addNotificationRequest({
          id: 'notificationWithSound',
          title: title || '',
          body: body || '',
          userInfo: remoteMessage.data,
        } as PushNotificationIOSObject);
      },
    );
    configureForegroundNotification();
    return listener;
  }
};

// Configure foreground notification
const configureForegroundNotification = (): void => {
  PushNotification.configure({
    smallIcon: 'ic_notification',
    onRegister: function (token: string) {
      console.log('Push Notification Token:', token);
    },
    onNotification: function (notification: any) {
      console.log('Notification data:', notification);
      if (notification.userInteraction) {
        handleNotificationRedirection(notification);
        console.log('User clicked notification');
      } else {
        console.log('User did not click notification');
      }
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};

// Background message receiving function
const backgroundMessage = async (): Promise<void> => {
  messaging().onNotificationOpenedApp(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      console.log(
        'Background notification opened:',
        JSON.stringify(remoteMessage),
      );
      handleNotificationRedirection(remoteMessage);
    },
  );
};

// Create notification channel (Android)
const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'default-channel-id',
      channelName: 'Default Channel',
      channelDescription: 'A default channel',
      playSound: true,
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

// Configure badge for iOS
const configureBadge = (): void => {
  if (Platform.OS === 'ios') {
    PushNotificationIOS.requestPermissions().then(
      (data: PushNotificationPermissions) => {
        PushNotificationIOS.addEventListener('register', onRegistered);
        console.log('iOS PushNotification permissions:', data);
      },
      error => {
        console.log('iOS PushNotification request permissions failed:', error);
      },
    );
    PushNotificationIOS.getApplicationIconBadgeNumber((num: number) => {
      if (num >= 1) {
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      }
    });
  }
};

const onRegistered = (deviceToken: string): void => {
  console.log('iOS Device Token:', deviceToken);
};

export {
  backgroundMessage,
  configureBadge,
  createNotificationChannel,
  foregroundMessage,
  requestNotificationPermission,
};
