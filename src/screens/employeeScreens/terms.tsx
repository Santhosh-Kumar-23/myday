import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {WebView} from 'react-native-webview';
import {EmployeeSettingsSubHeader} from '../../components/employeeComponents/employeeSettingsSubHeader';
import {COLORS, Fonts} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const Terms: React.FC<{}> = (props: any) => {
  const [checkbox, setCheckbox] = useState(false);

  const {terms, hideHeader} = props?.route?.params;
  console.log(terms);

  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      {hideHeader && (
        <EmployeeSettingsSubHeader
          title={terms ? 'Terms & Conditions' : 'Privacy Policy'}
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={{flex: 1}}>
        <Text style={styles.heading}>
          {terms ? 'Terms & Conditions' : 'Privacy Policy'}
        </Text>
        <View style={styles.webViewCOntainer}>
          <WebView
            source={{uri: 'https://loremipsum.io/privacy-policy/'}}
            style={styles.webView}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
    paddingBottom: 50,
  },
  heading: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(14),
    color: COLORS.secondaryColor,
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
  },
  termsBtn: {
    marginHorizontal: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(8),
  },
  i_agree: {
    fontFamily: Fonts.Bold,
    fontSize: moderateScale(14),
    color: COLORS.secondaryColor,
  },
  webView: {
    flex: 1,
    marginHorizontal: moderateScale(20),
    elevation: 5,
    marginBottom: moderateScale(5),
    borderRadius: 10,
    padding: 20,
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  webViewCOntainer: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: 20,
  },
  commonButtonStyle: {
    marginHorizontal: moderateScale(20),
    height: moderateScale(40),
  },
  commonButtonText: {fontSize: moderateScale(15)},
});
