import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import * as Interfaces from '../constants/interfaces';
import * as String from '../constants/string';
import {COLORS, Fonts} from '../constants/theme';

const HeaderTitle: React.FC<Interfaces.HeaderTitleProps> = ({
  color1 = COLORS.primaryColor,
  color2 = COLORS.secondaryColor,
}) => {
  return (
    <View style={Styles.container}>
      <Text style={[Styles.title1, {color: color1}]}>{String.MY_DAY}</Text>
      <Text style={[Styles.title1, Styles.title2, {color: color2}]}>
        {String.PAY_DAY}
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title1: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.ExtraBold,
    color: COLORS.primaryColor,
     marginTop: 10,
  },
  title2: {
    color: COLORS.secondaryColor,
    marginHorizontal: 5,
    // marginTop: 10,
  },
});

export default HeaderTitle;
