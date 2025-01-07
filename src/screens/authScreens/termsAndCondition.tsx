import React from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import CommonButton from '../../components/commonButton';
import * as TermsImages from '../../constants/images';
import * as TermsStrings from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {styles} from '../../styles/authStyles';

const TermsAndCondition: React.FC<{}> = (props: any) => {
  // Props Variables
  const {navigation} = props;
  const RenderWelcome = (): React.JSX.Element => {
    return (
      <View style={styles.otpFirstContainer}>
        <View style={styles.otpSubContainer}>
          <Text style={[styles.we_care_text]}>{TermsStrings.WE_CARE}</Text>
        </View>
      </View>
    );
  };
  const RenderContent = (): React.JSX.Element => {
    return (
      <View style={styles.changesContent}>
        <Text style={styles.privacyContentText}>
          {TermsStrings.PRIVACY_CONTENT}
        </Text>
        <View style={styles.privacyButtonView}>
          <Pressable>
            <Text style={styles.termsText}>
              {TermsStrings.PRIVACY_BUTTON_TEXT}
            </Text>
          </Pressable>
          <Text style={{...FONTS.body2}}>{TermsStrings.AND}</Text>
          <Pressable>
            <Text style={styles.termsText}>
              {TermsStrings.PRIVACY_BUTTON_TEXT2}
            </Text>
          </Pressable>
          <Text style={{...FONTS.body2}}>{TermsStrings.WHICH_ALSO}</Text>
        </View>
        <Text style={styles.tells_you_text}>{TermsStrings.TELLS_YOU}</Text>
        <Text style={[styles.privacyContentText, styles.changesContent]}>
          {TermsStrings.CHANGES_CONTENT}
        </Text>
      </View>
    );
  };

  const FooterButton = (): React.JSX.Element => {
    return (
      <View>
        <CommonButton
          title={TermsStrings.ACCEPT_BUTTON}
          onPress={() => {
            navigation.navigate(TermsStrings.NOTIFICATION);
          }}
        />
        <View style={styles.termsFooterBtn}>
          <Pressable style={styles.declineButtonStyle}>
            <Text style={styles.declineBtnText}>
              {TermsStrings.DECLINE_BUTTON}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.termsAndConditioncontainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.secondaryBackgroundColor}
        translucent={true}
      />
      <ImageBackground
        style={styles.loginImgBg}
        source={TermsImages.privacyBgImage}>
        <View style={styles.termsContentContainer}>
          {RenderWelcome()}
          {RenderContent()}
        </View>
        <View style={styles.termsFooterContainer}>{FooterButton()}</View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TermsAndCondition;
