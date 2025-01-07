import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {scale, verticalScale} from 'react-native-size-matters';
import VectorIcons from '../../components/vectorIcons';
import * as ImageLink from '../../constants/images';
import * as localStorage from '../../constants/localStorage';
import * as String from '../../constants/string';
import {COLORS} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import {styles} from '../../styles/authStyles';
import * as CommonStyles from '../../styles/commonStyles';
import * as Functions from '../../utlis/functions';

const Intro: React.FC<{navigation: any}> = ({navigation}) => {
  const {AuthStack} = useContext<AppContextType>(AppContext);

  //useState variables
  const [exitCount, setExitCount] = useState<number>(0);

  // Hooks Functions
  useFocusEffect(
    useCallback(() => {
      let isFocus: boolean = true;

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return (): void => {
        isFocus = false;

        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [exitCount]),
  );

  // Functions
  const backAction = (): boolean => {
    switch (exitCount) {
      case 0:
        setExitCount(exitCount + 1);

        Functions.toastMessage(String.EXIT_APP_TOAST);
        break;

      case 1:
        setExitCount(0);

        Functions.handleExitApp();
        break;

      default:
        break;
    }

    return true;
  };
  useEffect(() => {
    introSliderStatus();
  }, []);
  function introSliderStatus() {
    localStorage.getIntroSlider().then(sliderData => {
      if (sliderData !== null) {
        AuthStack();
      }
    });
  }
  async function onClickSkip(): Promise<void> {
    try {
      const getStart = await localStorage.setIntroSlider(true);
      (global as any).myGlobalVariable = true;
      console.log('Intro slider set successfully');
      AuthStack();
    } catch (error) {
      console.log('Error setting intro slider:', error);
    }
  }
  return (
    <SafeAreaView
      style={[styles.container, CommonStyles.paddingHorizontal(16, 16)]}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 0.1}}>
          <Pressable style={styles.skipButton} onPress={() => onClickSkip()}>
            <Text style={styles.skip}>{String.SKIP}</Text>
          </Pressable>
        </View>
        <View
          style={[CommonStyles.flex(0.6), {justifyContent: 'space-evenly'}]}>
          <View
            style={{
              height: verticalScale(250),
              width: scale(250),
              alignSelf: 'center',
            }}>
            <Image
              source={ImageLink.arrowImage}
              style={styles.arrowImg}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.controlHeading}>{String.CONTROL}</Text>
            <Text style={styles.headingText}>{String.HEADING_2}</Text>
          </View>
        </View>
        <View style={[CommonStyles.flex(0.3)]}>
          <Pressable
            style={styles.roundButton}
            onPress={() => navigation.navigate('GetStarted')}>
            <VectorIcons
              name={Functions.isIos ? 'arrow-forward-outline' : 'arrowright'}
              type={Functions.isIos ? 'ionicon' : 'ant'}
              size={25}
              color={COLORS.whiteColor}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Intro;
