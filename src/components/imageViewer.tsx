import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import React, {FC} from 'react';
import {Platform, Pressable, StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import * as Interfaces from '../constants/interfaces';
import * as String from '../constants/string';
import {COLORS, deviceScreenHeight} from '../constants/theme';
import * as Styles from '../styles';
import VectorIcons from './vectorIcons';

const ImageViewer: FC<Interfaces.ImageViewerInterface> = (
  props: Interfaces.ImageViewerInterface,
) => {
  // Props Variables
  const {data, headerLabel = String.PHOTO, onBackdropPress, isVisible} = props;

  // Other Variables
  const insets: EdgeInsets = useSafeAreaInsets();

  const statusBarHeight: number =
    Platform.OS == String.IOS
      ? StatusBar.currentHeight || insets.top
      : String.ZERO;
  const type: string = data?.type ?? String.PNG;
  const uri: string = data?.uri ?? '';

  // Functions

  return (
    <ReactNativeModal
      isVisible={isVisible}
      deviceHeight={deviceScreenHeight}
      statusBarTranslucent
      // onBackdropPress={() => {
      //   onBackdropPress();
      // }}
      animationOut="fadeOut">
      <Pressable
        style={{alignSelf: 'flex-end', top: moderateScale(80)}}
        onPress={() => {
          onBackdropPress();
        }}>
        <View style={ImageViewerStyles.iconsContainer}>
          <VectorIcons
            type="evil"
            name="close"
            size={RFPercentage(3)}
            color={COLORS.whiteColor}
          />
        </View>
      </Pressable>
      <View style={[ImageViewerStyles.container, {marginTop: statusBarHeight}]}>
        <View
          style={[
            Styles.commonStyles.flex(1),
            Styles.commonStyles.ViewCenter('center', 'center'),
          ]}>
          <GestureHandlerRootView
            style={[
              ImageViewerStyles.imageContainer,
              {marginBottom: statusBarHeight},
            ]}>
            <ImageZoom
              resizeMode={String.COVER}
              style={Styles.commonStyles.imageView('100%', '100%')}
              // uri={`data:text/${type};base64,${uri}`}
              source={{uri: uri}}
            />
          </GestureHandlerRootView>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const ImageViewerStyles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 1,
    flex: 1 / 2,
  },
  iconsContainer: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: 50,
    borderWidth: moderateScale(2),
    borderColor: COLORS.whiteColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageViewer;
