import React, {FC} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import AnimatedDotsCarousel, {
  DecreasingDot,
  DotConfig,
} from 'react-native-animated-dots-carousel';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import * as Interfaces from '../constants/interfaces';
import * as String from '../constants/string';
import {COLORS} from '../constants/theme';
import * as Styles from '../styles/commonStyles';

const Dots: FC<Interfaces.DotsInterface> = (
  props: Interfaces.DotsInterface,
) => {
  // Props Variables
  const {
    borderColor = null,
    currentIndex,
    dotColor,
    customContainerStyle,
    isCustom = false,
    numberOfDots,
    onPress = (index: number) => {},
    size = String.ZERO_EIGHT,
  } = props;

  // Other Variables

  const activeDotConfig: DotConfig = {
    color: dotColor ? dotColor : COLORS.primaryColor,
    margin: moderateScale(2),
    opacity: moderateScale(1),
    size: moderateScale(8),
  };

  const decreasingDots: DecreasingDot[] = [
    {
      config: {
        color: COLORS.darkGrey,
        margin: moderateScale(2),
        opacity: moderateScale(0.5),
        size: moderateScale(5),
      },
      quantity: moderateScale(1),
    },
    {
      config: {
        color: COLORS.darkGrey,
        margin: moderateScale(2),
        opacity: moderateScale(0.5),
        size: moderateScale(5),
      },
      quantity: moderateScale(1),
    },
  ];
  const inactiveDotConfig: DotConfig = {
    color: COLORS.darkGrey,
    margin: moderateScale(2),
    opacity: moderateScale(0.5),
    size: moderateScale(8),
  };

  return (
    <View style={[DotsStyles.container, customContainerStyle]}>
      {!isCustom ? (
        Array.from(Array(numberOfDots).keys()).flatMap(
          (_: number, index: number): React.JSX.Element => (
            <Pressable
              onPress={(): void => {
                onPress(index);
              }}
              style={[
                DotsStyles.individualContainer,
                Styles.backgroundColor(COLORS.secondaryColor),
                Styles.borderColor(
                  currentIndex == index
                    ? 'transparent'
                    : borderColor ?? COLORS.blackColor,
                ),
                Styles.imageView(
                  RFPercentage(size),
                  RFPercentage(currentIndex == index ? 0.8 : size),
                ),
                {
                  borderRadius: RFPercentage(size) / 2,
                  marginLeft: index != String.ZERO ? RFPercentage(0.4) : 0,
                  opacity: currentIndex >= index ? 1 : 0.3,
                },
              ]}
              key={index}
            />
          ),
        )
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedDotsCarousel
            activeIndicatorConfig={activeDotConfig}
            currentIndex={currentIndex}
            decreasingDots={decreasingDots}
            inactiveIndicatorConfig={inactiveDotConfig}
            interpolateOpacityAndColor={true}
            length={numberOfDots}
            maxIndicators={String.THREE}
          />
        </View>
      )}
    </View>
  );
};

const DotsStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: RFPercentage(3.6),
  },
  individualContainer: {
    borderWidth: RFPercentage(0.14),
  },
  activeDotConfig: {},
});

export default Dots;
