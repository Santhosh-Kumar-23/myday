import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CommonButton from '../../components/commonButton';
import HeaderTitle from '../../components/headerTitle';
import * as ImageLink from '../../constants/images';
import * as localStorage from '../../constants/localStorage';
import * as String from '../../constants/string';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import {styles} from '../../styles/authStyles';
import * as Functions from '../../utlis/functions';

const GetStarted: React.FC<{}> = ({}) => {
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

  const {AuthStack} = useContext<AppContextType>(AppContext);
  useEffect(() => {
    localStorage.getIntroSlider().then(sliderData => {
      if (sliderData !== null) {
        AuthStack();
      }
    });
  });
  async function onClickGetStart(): Promise<void> {
    try {
      const getStart = await localStorage.setIntroSlider(true);
      (global as any).myGlobalVariable = true;
      console.log('Intro slider set successfully');
      AuthStack();
    } catch (error) {
      console.log('Error setting intro slider:', error);
    }
  }
  const renderButton = () => {
    return (
      <CommonButton
        title={String.GET_STARTED}
        containerStyle={styles.getStartedButtonContainer}
        onPress={() => onClickGetStart()}
      />
    );
  };

  const renderTitles = () => {
    return (
      <View style={{paddingHorizontal: RFPercentage(4)}}>
        <Text style={styles.title1}>{String.TITLE_1}</Text>
        <Text style={styles.title2}>{String.TITLE_2}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <HeaderTitle />
      </View>
    );
  };

  const renderImageBackground = () => {
    return (
      <ImageBackground
        source={ImageLink.getStarted}
        style={{flex: String.ONE}}
        resizeMode={String.COVER}>
        <View style={styles.headerMainContainer1}>{renderHeader()}</View>
        <View style={styles.headerMainContainer2}>
          {renderTitles()}
          {renderButton()}
        </View>
      </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={[styles.container, {paddingHorizontal: String.ZERO}]}>
      {renderImageBackground()}
    </SafeAreaView>
  );
};

export {GetStarted};
