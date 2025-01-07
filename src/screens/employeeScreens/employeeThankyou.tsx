import React, {useEffect, useRef} from 'react';
import {
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Share from 'react-native-share';
import {moderateScale} from 'react-native-size-matters';
import ViewShot, {captureRef} from 'react-native-view-shot';
import CommonButton from '../../components/commonButton';
import VectorIcons from '../../components/vectorIcons';
import * as employeeImg from '../../constants/icons';
import * as strings from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import {shortenApplicationNo} from '../../utlis/functions';

const EmployeeThankyou: React.FC<{}> = (props: any) => {
  const {navigation} = props;

  const {application} = props?.route?.params;
  console.log(application, 'application');
  const screenshotRef = useRef<any>(null);

  // Functions
  const backHandle = (): void => {
    navigation.navigate('EmployeeHomeStack');
    return true;
  };

  // Hooks Functions

  useEffect(() => {
    const backAction = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandle,
    );
    return () => {
      backAction.remove();
    };
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          paddingHorizontal: 30,
          height: 70,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: COLORS.DashboardBackgroundColor,
        },
      });
    };
  }, []);

  const handleCapture = async () => {
    try {
      const uri = await captureRef(screenshotRef, {
        format: 'png',
        quality: 0.7,
      });
      console.log('uri', uri);
      await Share.open({
        url: uri,
        message: 'Check out this message!MydayPayDay',
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.DashboardBackgroundColor}
          translucent={true}
        />
        <ViewShot
          ref={screenshotRef}
          style={styles.container}
          options={{fileName: application, format: 'jpg', quality: 0.9}}
          captureMode="mount">
          <View style={[styles.mainContainer, {marginTop: 20}]}>
            <Text style={styles.thankyou}>
              {strings.THANK_YOU}
              {`(${'ID:'}${shortenApplicationNo(application)})`}
            </Text>
            <Image source={employeeImg.RocketIcon} style={styles.rocketIcon} />
            <Text style={[styles.whatsapp_next]}>
              {strings.WHATHAPPEN_NEXT}
            </Text>
            <Text style={styles.MydayEmail}>{strings.MYDAY_EMAIL}</Text>
          </View>
          <View
            style={[
              styles.mainContainer,
              {
                justifyContent: 'space-between',
                paddingBottom: 20,
              },
            ]}>
            <Text style={styles.whatsapp_next}>{strings.GET_IN_TOUCH}</Text>
            <Text style={styles.MydayEmail}>{strings.CALL_US}</Text>
            <View style={[styles.callusContainer, {marginBottom: 30}]}>
              <Text style={styles.callUs}>{strings.EMAIL_US}</Text>
              <Pressable>
                <Text style={styles.mailId}>{'contact@wacoso.co.uk'}</Text>
              </Pressable>
            </View>
            <Pressable style={styles.screenShot} onPress={handleCapture}>
              <VectorIcons
                name="share"
                type="entypo"
                size={20}
                color={COLORS.secondaryColor}
              />
              <Text style={styles.mailId}>{'share a screenshot'}</Text>
            </Pressable>
            <View style={styles.line} />
            <Pressable>
              <Text style={styles.stillNeed}>{strings.STILL_NEED}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate(strings.FAQ);
              }}
              style={styles.callusContainer}>
              <VectorIcons
                name="help-with-circle"
                type="entypo"
                size={20}
                color={COLORS.secondaryColor}
              />
              <Text style={styles.findanswer}>{strings.FIND_ANSWER} </Text>
              <Text style={styles.faq}>{'FAQ'}</Text>
            </Pressable>

            <CommonButton
              title="Go To DashBoard"
              containerStyle={styles.dashboardButtonStyle}
              textStyle={styles.dashboardText}
              onPress={() => navigation.navigate('EmployeeHomeStack')}
            />
          </View>
        </ViewShot>
      </SafeAreaView>
    </>
  );
};

export default EmployeeThankyou;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  contentView: {
    alignItems: 'center',
  },
  callusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thankyou: {
    textAlign: 'center',
    color: COLORS.blackColor,
    fontSize: moderateScale(18),
    fontFamily: Fonts.SemiBold,
    alignSelf: 'center',
  },
  mainContainer: {
    // height: '50%',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  rocketIcon: {
    height: RFPercentage(5),
    width: RFPercentage(5),
    resizeMode: 'contain',
  },
  whatsapp_next: {
    textAlign: 'center',
    color: COLORS.blackColor,
    ...FONTS.t2,
    fontFamily: Fonts.Bold,
    alignSelf: 'center',
  },
  MydayEmail: {
    textAlign: 'center',
    color: COLORS.blackColor,
    fontFamily: Fonts.Medium,
    fontSize: 16,
    alignSelf: 'center',
  },
  callUs: {
    textAlign: 'center',
    color: COLORS.blackColor,
    fontFamily: Fonts.Medium,
    fontSize: 16,
    alignSelf: 'center',
  },
  mailId: {
    textAlign: 'center',
    color: COLORS.secondaryColor,
    fontFamily: Fonts.Medium,
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: RFPercentage(0.5),
  },
  line: {
    height: RFPercentage(0.5),
    width: RFPercentage(13.0),
    backgroundColor: COLORS.secondaryColor,
    borderRadius: RFPercentage(0.5),
  },
  stillNeed: {
    textAlign: 'center',
    color: COLORS.secondaryColor,
    ...FONTS.t2,
    fontFamily: Fonts.Bold,
    alignSelf: 'center',
  },
  findanswer: {
    textAlign: 'center',
    ...FONTS.body2,
    fontFamily: Fonts.Medium,
    color: COLORS.secondaryColor,
    alignSelf: 'center',
    marginLeft: RFPercentage(1),
  },
  faq: {
    textAlign: 'center',
    color: COLORS.secondaryColor,
    ...FONTS.body1,
    alignSelf: 'center',
  },
  dashboardButtonStyle: {
    width: 150,
    height: 40,
    alignSelf: 'center',
  },
  dashboardText: {...FONTS.body4},
  screenShot: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginBottom: 1,
    borderColor: COLORS.secondaryColor,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: -30,
  },
});
