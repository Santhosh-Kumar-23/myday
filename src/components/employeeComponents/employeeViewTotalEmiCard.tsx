import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Elevation} from '../../constants/enums';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Functions from '../../utlis/functions';

const EmployeeViewTotalEmiCard: React.FC<
  Interfaces.EmployeeViewTotalEmiCardProps
> = ({onPress, name, profile, typeOfLoan, lastName}) => {
  const employeeFullName: string = [name, lastName].join(' ');
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const renderProfile = (): React.JSX.Element => {
    return (
      <View style={Styles.profileContainer}>
        <View style={Styles.profileSubContainer}>
          {imageLoading && (
            <ActivityIndicator
              size={'small'}
              style={{position: 'absolute'}}
              color={'white'}
            />
          )}
          {profile ? (
            <FastImage
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              source={{
                uri: profile,
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
                paddingTop: 5,
                fontSize: 18,
              }}>
              {Functions.acronym(employeeFullName)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={Styles.mainContainer1}>{renderProfile()}</View>
        <View style={Styles.mainContainer2}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={Styles.name}>{name}</Text>
              <Text style={Styles.des}>{typeOfLoan}</Text>
            </View>
            {/* <Pressable onPress={Functions.downloadImage}>
              <Image
                resizeMode={String.CONTAIN}
                source={Icons.download}
                style={{height: RFPercentage(3.0), width: RFPercentage(3.0)}}
              />
            </Pressable> */}
          </View>
        </View>
      </View>
      <Text style={Styles.content}>
        {`Congratulations, ${name}! Your sanction letter for Application yet to ready, you can download once it’s been available.`}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    padding: RFPercentage(2),
    elevation: Elevation.cardContainerElevation,
    marginHorizontal: RFPercentage(2),
    marginBottom: RFPercentage(2.0),
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
    shadowColor: Functions.isIos ? COLORS.lightGrey : COLORS.blackColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: Functions.isIos ? 0.5 : 40,
    shadowRadius: Functions.isIos ? 5 : 50.65,
  },
  mainContainer1: {
    flex: 0.2,
    justifyContent: 'center',
  },
  mainContainer2: {
    flex: 0.8,
  },
  profileContainer: {
    backgroundColor: COLORS.darkGrey,
    borderRadius: RFPercentage(20),
    height: RFPercentage(6.0),
    width: RFPercentage(6.0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSubContainer: {
    height: RFPercentage(6.0),
    // borderWidth: 1,
    // borderColor: COLORS.whiteColor,
    width: RFPercentage(6.0),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFPercentage(20),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(20),
  },
  name: {
    ...FONTS.h3,
    color: COLORS.blackColor,
  },
  des: {
    ...FONTS.body4,
    color: COLORS.blackColor,
  },
  content: {
    ...FONTS.body3,
    color: COLORS.lightGrey,
    marginTop: RFPercentage(1),
  },
});

export {EmployeeViewTotalEmiCard};
