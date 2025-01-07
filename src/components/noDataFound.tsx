import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import * as Images from '../constants/images';
import * as Strings from '../constants/string';
import {COLORS, FONTS, Fonts, deviceHeight} from '../constants/theme';

const NoDataFound: React.FC<{}> = ({}) => {
  return (
    <View style={styles.noDataFoundContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={Images.noDataFound}
          style={styles.imageStyle}
          resizeMode={Strings.CONTAIN}
        />
      </View>
      <Text style={styles.text}>{Strings.WE_HAVE_NOT_FOUND}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: deviceHeight / 1.5,
    flex: 1,
  },
  text: {
    color: COLORS.darkGrey,
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 300,
    width: 300,
  },
  noDataFound: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
  },
});

export default NoDataFound;
