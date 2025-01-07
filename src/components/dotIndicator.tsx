import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/theme';

const DotIndicator = ({data, scrollX}) => {
  return (
    <View style={styles.dotContainer}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * (Dimensions.get('window').width + 5),
          index * (Dimensions.get('window').width + 5),
          (index + 1) * (Dimensions.get('window').width + 5),
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [15, 10, 15],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index.toString()}
            style={[styles.dot, {width: dotWidth, opacity}]}
          />
        );
      })}
    </View>
  );
};

export default DotIndicator;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    bottom: 10,

    // width: '100%',
  },
  dot: {
    height: 10,

    borderRadius: 5,
    backgroundColor: COLORS.secondaryColor,
    marginHorizontal: 5,
  },
});
