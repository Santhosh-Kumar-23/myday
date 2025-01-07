import {useQuery} from '@apollo/client';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import * as query from '../../api/query';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as InterFaces from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';
import CommonButton from '../commonButton';
const screenWidth = Dimensions.get('window').width;

const EmployeeChooseNonLoanCard: React.FC<
  InterFaces.EmployeeChooseNonLoanCardProps
> = ({hideButton = true, onPress}) => {
  const {data, refetch} = useQuery(query.GET_CARD_CONTENT_API);
  const IconsAdd = [Icons.flash, Icons.circleArrow, Icons.timePlus];
  useEffect(() => {
    refetch();
  }, []);
  const datas = data?.getMenuItems.map((item: any, index: number) => {
    return {
      des1: item.des1,
      des2: item.des2,
      icons: IconsAdd[index % IconsAdd.length],
    };
  });

  const renterItem = (item: any, index: number): React.JSX.Element => {
    return (
      <View style={Styles.subCardContainer}>
        <View
          style={{
            flex: 0.2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={item.icons}
            tintColor={COLORS.secondaryColor}
            style={{height: RFPercentage(3.0), width: RFPercentage(3.0)}}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 0.8}}>
          <Text
            style={{
              // ...FONTS.body2,
              fontSize: moderateScale(14),
              fontFamily: Fonts.SemiBold,
              color: COLORS.secondaryColor,
            }}>
            {item.des1}
          </Text>
          <Text
            style={{
              fontSize: moderateScale(12),
              fontFamily: Fonts.Medium,
              color: COLORS.blackColor,
            }}>
            {item.des2}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Pressable style={Styles.container}>
      <Text style={Styles.text}>
        {String.WHY_CHOOSE_OUR_ONLINE_EMPLOYEE_LOANS}
      </Text>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={datas}
        renderItem={({item, index}): any => renterItem(item, index)}
      />
      {hideButton && (
        <View style={{marginTop: RFPercentage(2)}}>
          <CommonButton title="Proceed" onPress={onPress} />
        </View>
      )}
    </Pressable>
  );
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    width: screenWidth - 30,
    borderRadius: RFPercentage(2),
    padding: RFPercentage(2.5),
    marginHorizontal: RFPercentage(2),
    marginVertical: RFPercentage(3),
    shadowColor: isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,

    // height: RFPercentage(60.0),
  },
  text: {
    color: COLORS.blackColor,
    ...FONTS.h3,
    // marginBottom: RFPercentage(2),
  },
  subCardContainer: {
    flexDirection: 'row',
    marginVertical: RFPercentage(1.2),
    paddingVertical: RFPercentage(1),
    marginHorizontal: RFPercentage(0.3),
    borderRadius: RFPercentage(1.2),
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.inputElevation,
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
});

export {EmployeeChooseNonLoanCard};
