import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {GetViewedUrl} from '../../api/mutation';
import * as Icons from '../../constants/icons';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {acronym} from '../../utlis/functions';

const EmployeeLoanRequestSubHeader: React.FC<
  Interfaces.EmployeeLoanRequestSubHeaderProps
> = ({onPress, title = '', imageUrl, showBackArrow = true}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [getImageUrls] = useMutation(GetViewedUrl);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const getEmployeeDetails = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.getEmployeeDetails,
  );

  const employeeFirstName: string = getEmployeeDetails?.first_name ?? '';
  const employeeLastName: string = getEmployeeDetails?.last_name ?? '';
  const employeeFullName: string = [employeeFirstName, employeeLastName].join(
    ' ',
  );

  const profile = useSelector(
    (state: Interfaces.RootReducersStateInterface) =>
      state.appReducer.ProfileUrl,
  );
  useEffect(() => {
    getImageUrls({
      variables: {
        image: getEmployeeDetails?.profile,
      },
      onCompleted: data => {
        console.log('profileImage', data?.getViewedUrl);
        dispatch(Actions.profileUrl(data?.getViewedUrl));
      },
      onError: error => {
        console.log('error', error);
      },
    });
  }, []);

  const renderProfile = (): React.JSX.Element => {
    return (
      <Pressable
        style={Styles.profileContainer}
        onPress={() => {
          navigation.navigate('ProfileStack' as never);
        }}>
        {imageLoading && (
          <ActivityIndicator
            size={'small'}
            style={{position: 'absolute'}}
            color={'white'}
          />
        )}
        {getEmployeeDetails?.profile ? (
          <FastImage
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            source={{
              uri: getEmployeeDetails?.profile,
              priority: FastImage.priority.high,
            }}
            style={Styles.imageStyle}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <Text
            style={{
              color: COLORS.whiteColor,
              fontFamily: Fonts.SemiBold,
              marginTop: 5,
              fontSize: 18,
            }}>
            {acronym(employeeFullName)}
          </Text>
        )}
      </Pressable>
    );
  };

  const renderBackArrow = (): React.JSX.Element => {
    return (
      <Pressable onPress={onPress} style={{padding: 10}}>
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
      {renderProfile()}
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
  heading: {
    ...FONTS.h3,
    color: COLORS.whiteColor,
  },
  profileContainer: {
    backgroundColor: COLORS.darkGrey,
    borderColor: COLORS.grey,
    borderWidth: 1,
    elevation: 2,
    borderRadius: RFPercentage(20),
    height: RFPercentage(6.0),
    width: RFPercentage(6.0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSubContainer: {
    height: RFPercentage(5.5),
    width: RFPercentage(5.5),
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
});

export {EmployeeLoanRequestSubHeader};
