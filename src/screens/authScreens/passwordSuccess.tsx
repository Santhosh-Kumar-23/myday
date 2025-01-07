import React from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';
import CommonButton from '../../components/commonButton';
import * as PasswordSuccessImages from '../../constants/images';
import * as PasswordSuccessStrings from '../../constants/string';
import {commonStyles, styles} from '../../styles';

const PasswordSuccess: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={PasswordSuccessImages.authBgImage}
        style={styles.loginImgBg}
        resizeMode={PasswordSuccessStrings.COVER}>
        <View
          style={[
            styles.termsContentContainer,
            commonStyles.ViewCenter('center', 'center'),
          ]}>
          <Text style={styles.passwordResetText}>
            {[PasswordSuccessStrings.PASSWORD_SUCCESS]}
          </Text>
        </View>
        <View style={[styles.termsFooterContainer, {justifyContent: 'center'}]}>
          <CommonButton
            title={PasswordSuccessStrings.CONTINUE}
            onPress={() => {
              navigation.navigate(PasswordSuccessStrings.lOG_IN);
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default PasswordSuccess;
