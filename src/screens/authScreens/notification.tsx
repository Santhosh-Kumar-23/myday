import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Pressable,
  StatusBar,
} from 'react-native';
import {styles, commonStyles} from '../../styles';
import * as NotificationImages from '../../constants/images';
import * as NotificationStrings from '../../constants/string';
import CommonButton from '../../components/commonButton';
import {COLORS} from '../../constants/theme';
import { requestNotificationPermission } from '../../utlis/pushNotification';

const Notification: React.FC<{}> = props => {
  const {navigation} = props;
  const RenderWelcome = (): React.JSX.Element => {
    return (
      <View style={styles.otpFirstContainer}>
        <View style={styles.otpSubContainer}>
          <Text style={[styles.otpHeaderText, styles.we_care_text]}>
            {NotificationStrings.NEW_NOTIFICATION}
          </Text>
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
        source={NotificationImages.privacyBgImage}
        style={styles.loginImgBg}
        resizeMode={NotificationStrings.COVER}>
        <View style={styles.termsContentContainer}>
          {RenderWelcome()}
          <Text style={styles.importantMessageText}>
            {NotificationStrings.IMPORTANT_MESSAGE}
          </Text>
        </View>
        <View style={styles.termsFooterContainer}>
          <CommonButton title={NotificationStrings.TURN_ON_NOTIFICATION}  onPress={requestNotificationPermission}/>
          <View style={styles.termsFooterBtn}>
            <Pressable
              style={styles.declineButtonStyle}
              onPress={() => navigation.goBack()}>
              <Text style={styles.declineBtnText}>
                {NotificationStrings.NOT_NOW}
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Notification;
