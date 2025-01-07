import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import {COLORS, Fonts} from '../../constants/theme';
import {isIos, removeUnderScore} from '../../utlis/functions';

export interface LoanRequestStep {
  id: number;
  title: string;
  subTitle: string;
  time: string;
  img: string; // Assuming Icons.* are strings representing the icon paths or names
  isCompleted: boolean;
}
export interface IEmployeeStepIndicatorProps {
  data: LoanRequestStep[];
  mainStatus: string;
}

const EmployeeStepIndicator: React.FC<IEmployeeStepIndicatorProps> = ({
  data,
  mainStatus,
}) => {
  const [current, setCurrent] = useState(0);
  const {height: deviceHeight} = useWindowDimensions();

  // console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB', mainStatus);

  const mappedData = data.map((item, index) => {
    let img;
    switch (index) {
      case 0:
        img = Icons.jet;
        break;
      case 1:
        img = Icons.person;
        break;
      case 2:
        img = Icons.whiteBuilding;
        break;
      case 3:
        img = Icons.suitcase;
        break;
      case 4:
        img = Icons.pillar;
        break;
      case 5:
        img = Icons.money;
        break;
      case 6:
        img = Icons.password;
        break;
      case 7:
        img = Icons.deleteAccount;
        break;
      case 8:
        img = Icons.timePlus;
        break;
      case 9:
        img = Icons.verification;
        break;
      case 10:
        img = Icons.money;
        break;

      default:
        img = Icons.money; // Add a default icon in case none match
        break;
    }

    return {
      ...item,
      img, // Assign the icon to the item
    };
  });

  const lastIndex = mappedData
    .slice() // Create a shallow copy of the array to avoid modifying the original array
    .reverse() // Reverse the array
    .findIndex(item => item.isCompleted === true); // Find the first object with isCompleted: true

  // Adjust the index back to the original array's index
  const originalIndex =
    lastIndex === -1 ? -1 : mappedData.length - 1 - lastIndex;

  // console.log('LAST INDEX::::::::::::::', lastIndex);
  // console.log('AAAAAAAAAAAAAAAAAAA', originalIndex);
  // console.log('MAPPED:::::::::', mappedData);

  const trueCount = mappedData?.filter(item => item?.isCompleted).length;

  const RenderItem = ({item, index}: any) => {
    return (
      <View style={styles.renderView}>
        <View style={styles.stepIndicator}>
          <View style={{flex: 0.2}}>
            <View
              style={[
                styles.stepIndicatorImageView,
                {
                  backgroundColor:
                    mainStatus === 'Rejected' &&
                    mappedData[originalIndex]?.isCompleted === true &&
                    originalIndex == index &&
                    index !== 0
                      ? '#FF474D' // If mainStatus is 'Rejected' and mappedData[originalIndex] is completed, use secondary color
                      : item?.isCompleted === true
                      ? COLORS.primaryColor // If item.isCompleted is true, use primary color
                      : COLORS.lightGrey, // If none of the above, use light grey color
                  elevation: Elevation.cardContainerElevation,
                },
              ]}>
              <Image
                source={item.img}
                style={styles.stepIndiatorImage}
                resizeMode="contain"
                tintColor={COLORS.whiteColor}
              />
            </View>
            {index === data?.length - 1 ? null : (
              <View style={[styles.dotLine]}>
                <View
                  style={[
                    styles.borderLine,
                    {
                      borderColor:
                        mainStatus === 'Rejected' &&
                        mappedData[originalIndex]?.isCompleted === true &&
                        originalIndex == index
                          ? COLORS.grey // If mainStatus is 'Rejected' and mappedData[originalIndex] is completed, use secondary color
                          : item?.isCompleted === true
                          ? COLORS.primaryColor // If item.isCompleted is true, use primary color
                          : COLORS.lightGrey, // If none of the above, use light grey color
                    },
                  ]}></View>
              </View>
            )}
          </View>
          <View style={{flex: 0.8}}>
            <View style={styles.titleView}>
              <Text style={styles.title_Text} numberOfLines={2}>
                {removeUnderScore(item?.title)}
              </Text>
              <Text style={styles.subTitle} numberOfLines={3}>
                {removeUnderScore(item?.subTitle ?? '')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // console.log('MAPPED DATA::::::::::', mappedData);

  return (
    <View style={[styles.container, {height: deviceHeight / 1.9}]}>
      <Text
        style={styles.loantype}>{`Step ${trueCount} of ${data?.length}`}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        data={mappedData ? mappedData : []}
        renderItem={RenderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: Elevation.cardContainerElevation,
    backgroundColor: COLORS.whiteColor,
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  loantype: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.darkGrey,
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginVertical: verticalScale(5),
  },
  renderView: {
    flexDirection: 'row',
    justifyContent: 'center',
    // justifyContent: 'space-between',
    height: verticalScale(70),
  },
  stepIndicator: {flexDirection: 'row', flex: 0.85},
  stepIndicatorImageView: {
    height: verticalScale(35),
    width: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(50),
  },
  stepIndiatorImage: {height: 20, width: 20},
  dotLine: {
    width: moderateScale(16),
    alignSelf: 'center',
    // marginLeft: 5,
  },
  borderLine: {
    width: 2,
    height: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  titleView: {marginHorizontal: 0},
  title_Text: {
    color: COLORS.blackColor,
    fontFamily: Fonts.SemiBold,
    fontSize: moderateScale(12),
  },
  subTitle: {
    color: COLORS.grey,
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(10),
  },
  time: {
    color: COLORS.grey,
    fontFamily: Fonts.Medium,
    fontSize: moderateScale(10),
  },
  time_View: {
    // marginHorizontal: moderateScale(15),
    flex: 0.15,
    alignItems: 'flex-end',
  },
});

export default EmployeeStepIndicator;
