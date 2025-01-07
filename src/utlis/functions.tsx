import {ApolloError} from '@apollo/client';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Button,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';
import * as AppConfigs from '../constants/appConfigs';
import * as Enums from '../constants/enums';
import * as Interfaces from '../constants/interfaces';
import {getUserInformation} from '../constants/localStorage';
import * as Strings from '../constants/string';
import * as HelperNavigation from '../utlis/helperNavigation';
import * as utilsInterface from '../utlis/utilsInterface';
export const isIos = Platform.OS == 'ios';
export const isAndroid = Platform.OS == 'android';

export const handlePasswordRegExp = (txt: string): boolean => {
  const reg: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return !reg.test(txt);
};
export const systemVersion = DeviceInfo.getSystemVersion();
export const handleMobileNumberRegExp = (txt: string): boolean => {
  const reg: RegExp = /^\d{10}$/;
  return !reg.test(txt);
};

export const handleStrongPassword = (txt: string): boolean => {
  const reg: RegExp =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+=\\|{};:/?.><])[A-Za-z\d!@#$%^&*()\-_+=\\|{};:/?.><]{8,}$/;
  return !reg.test(txt);
};

export const handleEmailRegExp = (txt: string): boolean => {
  const reg: RegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !reg.test(txt);
};
export const handleAadharCardValidation = (txt: string): boolean => {
  const reg: RegExp = /^(?:\d{12}|\d{4}-\d{4}-\d{4})$/;
  return reg.test(txt);
};

export const handlePanValidation = (txt: string): boolean => {
  const reg: RegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return !reg.test(txt);
};

export const handleDob = (
  text: string,
  isBackspace: boolean = false,
  separator: string = Strings.FORWARD_SLASH_SYM,
): string => {
  let dob: string = '',
    updatedText: string = '';

  if (isBackspace) {
    updatedText = text.replace(/[^\d]/g, '');

    if (
      updatedText.length >= Strings.THREE &&
      updatedText.length <= Strings.FOUR
    ) {
      updatedText = updatedText.slice(0, 2) + '/' + updatedText.slice(2);
    } else if (updatedText.length > Strings.FOUR) {
      updatedText =
        updatedText.slice(0, 2) +
        separator +
        updatedText.slice(2, 4) +
        separator +
        updatedText.slice(4, 8);
    } else {
    }

    dob = updatedText;
  } else {
    updatedText = text.replace(/\D/g, '').slice(0, 8);

    const reg: RegExp = /^(\d{2})?(\d{2})?(\d{0,4})?/;

    dob = updatedText.replace(reg, (_: string, dd: any, mm: any, yyyy: any) => {
      let dob = '';

      if (dd) dob += dd + separator;

      if (mm) dob += mm + separator;

      if (yyyy) dob += yyyy;

      return dob;
    });
  }

  return dob;
};

export const handleDobValidation = (
  dob: string,
  format: string = Strings.DDMMYYYY,
): boolean => {
  const checkForValidDob: boolean = Boolean(dob)
    ? moment(dob, format).isAfter(moment()) || !moment(dob, format).isValid()
    : false;

  return checkForValidDob;
};

export const acronym = (txt: string): string => {
  const matches: null | RegExpMatchArray = txt.match(/(?<=(\s|^))[a-z]/gi);

  const str: string = matches?.join('').toUpperCase() ?? '';

  const strLength: number = str.length;

  if (strLength > Strings.TWO) {
    return getFirstLastChars(str);
  } else {
    return str;
  }
};

export const getFirstLastChars = (txt: string): string => {
  const txtLength: number = txt.length;

  const checkForTxtLength: boolean = Boolean(txtLength);

  if (checkForTxtLength) {
    return (
      txt.substring(Strings.ZERO, Strings.ONE) +
      txt.substring(txtLength - Strings.ONE)
    );
  } else {
    return '';
  }
};

export const CustomHeader = ({navigation, route, options, back}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        height: 200,
        backgroundColor: '#f4511e',
        borderRadius: 30,
      }}>
      {back ? <Button title="Back" onPress={navigation.goBack} /> : null}
      <Text style={{fontWeight: 'bold', color: '#fff'}}>"ickgakhcggacajc"</Text>
    </View>
  );
};
export const handleExitApp = (): void => {
  switch (Platform.OS) {
    case Strings.ANDROID:
      BackHandler.exitApp();
      break;

    case Strings.IOS:
      RNExitApp.exitApp();
      break;

    default:
      break;
  }
};

export const openGallery = (
  imagePickerConfigs: any,
  onUpload: (files: any) => void,
): void => {
  const {StatusCodes} = Enums;

  const handleMultipleFiles = (response: ImageOrVideo[]): void => {
    const files: ImageOrVideo[] = response;

    const checkForFileSizes: boolean = files.every(
      (fileData: ImageOrVideo): boolean => {
        const fileSize: number = fileData.size;

        const fileSizeInMB: number =
          fileSize /
          Strings.THOUSAND_TWENTY_FOUR /
          Strings.THOUSAND_TWENTY_FOUR;

        const checkForFileSize: boolean = fileSizeInMB < Strings.FIVE;

        return checkForFileSize;
      },
    );

    if (checkForFileSizes) {
      let customFiles: Interfaces.FileDataInterface[] = [];

      files.flatMap((fileData: ImageOrVideo): void => {
        const fileName: string =
          fileData.filename || fileData.path.split('/').pop() || Strings.PHOTO;

        const fileSize: number = fileData.size;

        const customFileData: Interfaces.FileDataInterface = {
          name: fileName,
          type: fileData.mime,
          uri: fileData.path,
          file: fileData,
        };

        customFiles.push(customFileData);
      });

      // console.log('CUSTOM FILES::: ', JSON.stringify(customFiles));

      onUpload(customFiles);
    } else {
      Snackbar.show({
        text: Strings.FILE_SIZE_ERROR,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  const handleSingleFile = (response: ImageOrVideo): void => {
    const fileData: ImageOrVideo = response;

    // console.log(fileData);

    const fileName: string =
      fileData.filename || fileData.path.split('/').pop() || Strings.PHOTO;

    const fileSize: number = fileData.size;

    const fileSizeInMB: number =
      fileSize / Strings.THOUSAND_TWENTY_FOUR / Strings.THOUSAND_TWENTY_FOUR;

    const checkForFileSize: boolean = fileSizeInMB < Strings.FIVE;

    if (checkForFileSize) {
      const customFileData: Interfaces.FileDataInterface = {
        name: fileName,
        type: fileData.mime,
        uri: fileData.path,
        file: fileData,
      };

      // console.log('CUSTOM FILE DATA::: ', customFileData);

      onUpload(customFileData);
      // Snackbar.show({
      //   text: 'Image upload successfully!',
      //   duration: Snackbar.LENGTH_LONG,
      // });
    } else {
      Snackbar.show({
        text: Strings.FILE_SIZE_ERROR,
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };

  ImageCropPicker.openPicker({
    ...AppConfigs.imagePickerConfigs,
    ...imagePickerConfigs,
  })
    .then((response: any): void | PromiseLike<void> => {
      // console.log('GALLERY RESPONSE::: ', response);

      const checkForMultiple: boolean = imagePickerConfigs?.multiple ?? false;

      if (checkForMultiple) {
        handleMultipleFiles(response);
      } else {
        handleSingleFile(response);
      }
    })
    .catch((error: any) => {
      const errorCode: string = error?.code ?? '';

      switch (errorCode) {
        case 'E_PICKER_CANCELLED':
          break;

        default:
          const checkForErrorCode: boolean = Boolean(errorCode);
          console.log('ERROR CODE::: ', errorCode);

          break;
      }
    });
};
export const getFcmToken = async function getFcmToken() {
  const token = await messaging().getToken();
  if (token) {
    return token;
  } else {
    return null;
  }
};

export const toastMessage = (title: string) => {
  Snackbar.show({
    text: title,
    duration: Snackbar.LENGTH_LONG,
  });
};

//AdminLoanProcessList

export const backgroundColored = (title: string) => {
  if (title == 'Approved') {
    return '#209620';
  } else if (title == 'Rejected') {
    return '#9D1E0E';
  } else if (title == 'Pending') {
    return '#AD6910';
  } else {
    return '#F8A435';
  }
};

export const cleanFileName = (fileName: string): string => {
  // Remove any whitespaces
  let cleanedName = fileName.replace(/\s+/g, '');
  // Remove the (1) suffix
  cleanedName = cleanedName.replace(/\(1\)$/, '');
  return cleanedName;
};

// Usage example

export const downloadImage = async (
  url: string,
  fileName: string,
  name: string,
  filetype: string,
) => {
  const originalFileName = name;
  const cleanedFileName = cleanFileName(originalFileName);
  console.log(fileName, filetype, url, name, 'fileDetails');

  const imageUrl = url; // Replace with your image URL
  const {config, fs} = RNFetchBlob;
  const downloadDest = `${fs.dirs.DownloadDir}/MDPD/${cleanedFileName}`; // Save to a specific path in the Download directory

  const options = {
    path: downloadDest,
    addAndroidDownloads: {
      notification: true,
      useDownloadManager: true,
      title: fileName,
      description: 'File downloaded by download manager',
      mime: filetype,
      mediaScannable: true,
    },
  };
  if (systemVersion == '14') {
    return config(options)
      .fetch('GET', imageUrl)
      .then(res => {
        console.log('Success', `Image downloaded to ${res.path()}`);
        return true;
      })
      .catch((errorMessage): void => {
        Alert.alert('Error', 'Failed to download image');
        console.error(errorMessage);
      });
  } else {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Needed',
            message: 'App needs access to your storage to download the image',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted) {
          return config(options)
            .fetch('GET', imageUrl)
            .then(res => {
              console.log('Success', `Image downloaded to ${res.path()}`);
              return true;
            })
            .catch((errorMessage): void => {
              Alert.alert('Error', 'Failed to download image');
              console.error(errorMessage);
            });
        }
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Storage permission is required to download the image',
          );
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  }
  // Check for Android permissions
};

export const deviceType = async () => {
  if (Platform.OS == 'android') return 'android';
  else if (Platform.OS == 'ios') {
    return 'ios';
  }
};
export const deviceId = async () => {
  const type = await DeviceInfo.getUniqueId();
  return String(type);
};

export const maskString = (
  value: string,
  maskCharacter: string = Strings.START_SYM,
): string => {
  const [localPart, domain] = value.split('@');
  const maskedLocalPart =
    localPart[0] + '*****' + localPart[localPart.length - 1];
  return maskedLocalPart + '@' + domain;
};

export const CountReduce = ({
  num,
  increaseval,
}: utilsInterface.ReduceNumInterface) => {
  if (num >= increaseval) {
    return `${increaseval}+`;
  } else {
    return num;
  }
};

export const truncateText = ({
  text,
  maxLength,
}: utilsInterface.truncateTextInterface) => {
  if (text?.length > maxLength) {
    return text?.substring(0, maxLength) + '...';
  }
  return text;
};

export const handleGraphQLError = (
  error: ApolloError,
  setLoader: (value: boolean) => void,
  pageName: string,
) => {
  setLoader(false);
  toastMessage('Oops! Something went wrong');
  console.log('PAGENAME:::', pageName);
  if (error.graphQLErrors.length > 0) {
    toastMessage(error.graphQLErrors[0].message);
  } else if (error.networkError) {
    toastMessage('Network error. Please try again.');
  } else {
    toastMessage('An unexpected error occurred.');
  }
};
export const generateUniqueFileName = (name, existingFiles) => {
  let uniqueName = name;
  let counter = 1;

  while (existingFiles.some(file => file.name === uniqueName)) {
    uniqueName = `${name} (${counter})`;
    counter++;
  }

  return uniqueName;
};

export function kbToMb(kb) {
  const mb = kb / 1024;
  return Math.ceil(mb); // Round up to the nearest whole number
}
export function formatBytes(bytes) {
  if (Number(bytes) === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((Number(bytes) / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  );
}

export function isImageType(fileType) {
  const imageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff',
    'image/svg+xml',
    'image/x-icon',
    'image/heif',
    'image/heic',
    'image/vnd.adobe.photoshop',
  ];

  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.webp',
    '.tiff',
    '.tif',
    '.svg',
    '.ico',
    '.heif',
    '.heic',
    '.psd',
  ];

  return (
    imageTypes.includes(fileType) ||
    imageExtensions.some(ext => fileType.endsWith(ext))
  );
}

export const convertDatetoApi = (item: any) => {
  const isoDate = moment(
    item,
    'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ',
  ).toISOString();
  return isoDate;
};

export function removeUnderScore(input) {
  if (input == null) {
    return ''; // or any default value you want to return when loanId is null/undefined
  }

  return input
    .split('_') // Split the string by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the words back together without spaces
}

export const profileDateConverter = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getUTCDate().toString().padStart(2, '0');
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
export const convertDateToWord = (
  isoDateStr: string | null | undefined,
): string => {
  if (!isoDateStr) {
    return '';
  }

  const date = new Date(isoDateStr);
  if (isNaN(date.getTime())) {
    return '';
  }

  // Define the month names array
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getUTCDate();
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day} ${year}`;
};

export const minusoneDay = (date: string) => {
  const newDate = new Date(date);
  return newDate.setDate(newDate.getDate() - 1);
};

export const countReducer = (data: number) => {
  if (data > 500) {
    return '500+';
  } else {
    return data;
  }
};

export const shortenApplicationNo = (loanId: number | string | null) => {
  if (loanId == null) {
    return ''; // or any default value you want to return when loanId is null/undefined
  }

  const loanIdStr = loanId.toString();
  const parts = loanIdStr.split('-');
  const result = parts[0] + '-' + (parts[3] ?? '');

  return result;
};
export function getDataValue(data: string | null | undefined): string {
  return data ?? '';
}

export const maskAaadharNumber = (aadharNumber: string) => {
  let aadharStr = aadharNumber.toString().replace(/-/g, '');

  // Replace the first 8 digits with asterisks
  let masked = aadharStr.slice(0, -4).replace(/\d/g, '*') + aadharStr.slice(-4);

  return masked;
};
export const checkAndroidVersion = () => {
  if (Platform.OS === 'android') {
    const systemVersion = parseInt(DeviceInfo.getSystemVersion(), 10); // Get the Android version as an integer

    if (systemVersion <= 12) {
      console.log('Android version is 12 or below');
      return true;
    } else {
      console.log('Android version is above 12');
      return false;
    }
  } else {
    console.log('Not an Android device');
    return false;
  }
};

export const moreThanNine = (value: number | string): string | number => {
  // Convert value to number for comparison
  const numericValue = Number(value);

  // Check if the numeric value is greater than 9
  if (numericValue > 9) {
    return '9+';
  } else {
    return value;
  }
};

export const handleNotificationRedirection = (notificationData: any) => {
  // console.log(
  //   'NOTIFICATIONDATA::::::::::::::::::::::::::::::::::::',
  //   notificationData,
  // );

  getUserInformation().then(res => {
    switch (res?.role) {
      case 'Employee':
        HelperNavigation.navigate('TrackLoanStack');
        break;
      case 'Organization':
        const actionDataString = notificationData?.data?.actionData || null;

        const parsedActionData = actionDataString
          ? JSON.parse(actionDataString)
          : notificationData;
        const loanRequestId = parsedActionData
          ? parsedActionData?.redirectId ||
            parsedActionData?.mobileRedirect ||
            null
          : null;
        loanRequestId &&
          HelperNavigation.navigate('OrganizationLoanRequestStack', {
            screen: Strings.ORGANIZATION_EMPLOYEE_VIEW,
            loanRequestId: loanRequestId,
          });
        break;
      case 'Admin':
        HelperNavigation.navigate('AdminConnectedOrganization');
        break;

      default:
        break;
    }
  });
};

export const useRefetchOnFocus = (refetch = () => {}, canRefetch = true) => {
  const [isScreenFocused, setIsScreenFocused] = useState(false);
  useFocusEffect(() => {
    setIsScreenFocused(true); // when i focus the screen
    return () => setIsScreenFocused(false); // when i quit the screen
  });

  /* the screen still always active in cache so we need to check that the screen is focused in a use effect
  to dispatch the refetch only one time to avoid the infinity loop*/
  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      refetch();
    }
  }, [canRefetch, isScreenFocused, refetch]);
};
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const countryList = [
  {label: 'India', value: 'IN'},
  {label: 'United States', value: 'US'},
  {label: 'United Kingdom', value: 'UK'},
  {label: 'Germany', value: 'DE'},
  {label: 'France', value: 'FR'},
  {label: 'Canada', value: 'CA'},
  {label: 'Australia', value: 'AU'},
  {label: 'Japan', value: 'JP'},
  {label: 'South Korea', value: 'KR'},
  {label: 'China', value: 'CN'},
  {label: 'Brazil', value: 'BR'},
  {label: 'Netherlands', value: 'NL'},
  {label: 'Spain', value: 'ES'},
  {label: 'Italy', value: 'IT'},
  {label: 'Russia', value: 'RU'},
  {label: 'South Africa', value: 'ZA'},
  {label: 'Singapore', value: 'SG'},
  {label: 'Malaysia', value: 'MY'},
  {label: 'Philippines', value: 'PH'},
  {label: 'Nepal', value: 'NP'},
  {label: 'Bangladesh', value: 'BD'},
];

export default function useCountryCode() {
  const getCountryName = useCallback((code: string) => {
    return countryList.find((f: any) => f?.value === code)?.label as string;
  }, []);

  return {getCountryName};
}

export function getEmailName(email: string) {
  const emailName = email?.split('@')[0];
  return emailName;
}

export function removeAlphapets(item: string) {
  const numericValue = parseFloat(item?.replace(/[^\d.]/g, '')) * 1000;
  return numericValue;
}

export function checkNullOrUndefined(item: any) {
  if (item == null || item == undefined) {
    return 0;
  } else {
    return item;
  }
}
