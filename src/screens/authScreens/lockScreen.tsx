import React from 'react';
import {View, SafeAreaView, StyleSheet, Text, Pressable} from 'react-native';
import {FONTS, Fonts, COLORS} from '../../constants/theme';
import VectorIcons from '../../components/vectorIcons'; // Assuming this is your custom icon component
import {moderateScale} from 'react-native-size-matters';
import * as String from '../../constants/string'; // Assuming this is where your strings are defined

interface LockScreenProps {
  retry: () => void; // Define retry prop as a function that returns void
}

const LockScreen: React.FC<LockScreenProps> = ({retry}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 0.4}}>
        <Text style={styles.heading}>{'My day pay day Locked'}</Text>
        <VectorIcons
          name="lock"
          type="feather"
          size={20}
          color={COLORS.secondaryColor}
        />
      </View>
      <View style={{flex: 0.6, alignItems: 'center'}}>
        <Pressable onPress={retry}>
          <Text style={{...FONTS.body2, color: COLORS.secondaryColor}}>
            {'Unlock'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: 25,
    color: COLORS.secondaryColor,
  },
});

export default LockScreen;
