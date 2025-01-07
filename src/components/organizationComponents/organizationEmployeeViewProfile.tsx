import React, {useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {acronym} from '../../utlis/functions';

export type IorganizationEmployeeViewProfileProps = {
  employeeName: string;
  designation: string;
  branch: string;
  profile: string;
  gender: string;
};

const OrganizationEmployeeViewProfile: React.FC<
  IorganizationEmployeeViewProfileProps
> = ({employeeName = '', designation = '', branch = '', profile, gender}) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  return (
    <View style={Styles.container}>
      <View style={Styles.subContainer1}>
        <View style={Styles.profileMainImageStyle}>
          {/* <ImageBackground
            resizeMode={Strings.COVER}
            source={Images.rounded}
            style={Styles.profileContainer}> */}
          <View style={Styles.profileContainer}>
            {profile ? (
              <>
                <Image
                  onLoadStart={() => setImageLoading(true)}
                  onLoadEnd={() => setImageLoading(false)}
                  source={{
                    uri: profile,
                  }}
                  style={Styles.imageStyle}
                  resizeMode="cover"
                />
                {imageLoading && (
                  <ActivityIndicator
                    size={'small'}
                    color={COLORS.primaryColor}
                    style={{position: 'absolute'}}
                  />
                )}
              </>
            ) : (
              <Text
                style={{
                  color: COLORS.whiteColor,
                  fontFamily: Fonts.SemiBold,
                  paddingTop: 5,
                  fontSize: 15,
                }}>
                {acronym(employeeName)}
              </Text>
            )}
          </View>
          {/* </ImageBackground> */}
        </View>
      </View>
      <View style={Styles.subContainer2}>
        <Text style={Styles.t1}>{employeeName}</Text>
        <Text style={Styles.t2}>
          {designation}, {branch}
        </Text>
      </View>
      <View style={Styles.subContainer3}>
        {/* <View style={Styles.activeContainer}>
          <Text style={Styles.active}>Active</Text>
        </View> */}
      </View>
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    marginTop: moderateScale(10),
    marginHorizontal: RFPercentage(2),
  },
  subContainer1: {
    flex: 0.2,
  },
  subContainer2: {
    flex: 0.6,
    justifyContent: 'center',
    paddingLeft: moderateScale(10),
  },
  subContainer3: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  t1: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
  },
  t2: {
    ...FONTS.body4,
    color: COLORS.blackColor,
  },
  active: {
    fontSize: 10,
    fontFamily: Fonts.SemiBold,
    color: COLORS.whiteColor,
  },
  activeContainer: {
    backgroundColor: '#14A44D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: 1,
    borderRadius: moderateScale(15),
  },
  profileContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: 50,
  },
  profileMainImageStyle: {
    height: moderateScale(50),
    width: moderateScale(50),
    elevation: Elevation.cardContainerElevation,
    backgroundColor: COLORS.darkGrey,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
});
export default OrganizationEmployeeViewProfile;
