import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import CommonButton from '../../components/commonButton';
import {EmployeeSettingsSubHeader} from '../../components/employeeComponents/employeeSettingsSubHeader';
import * as Icons from '../../constants/icons';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const EmployeeAutoPaymentSetup: React.FC<{}> = (props: any) => {
  // const {width} = deviceWidth
  const {navigation} = props;

  const [tabData, setTabData] = useState([
    {id: 1, title: 'Waiting', isCheck: true},
    {id: 2, title: 'Approve', isCheck: false},
    {id: 3, title: 'Reject', isCheck: false},
  ]);

  const [a, setA] = useState('Waiting');

  const [sampleArray, setsampleArray] = useState([
    {
      loanapplication: '1000254558645',
      amount: '9,687.00',
      isStatus: 'Waiting',
    },
    {
      loanapplication: '1000254558641',
      amount: '19,687.00',
      isStatus: 'Waiting',
    },
    {
      loanapplication: '1000254558642',
      amount: '29,687.00',
      isStatus: 'Waiting',
    },
    {
      loanapplication: '1000254558641',
      amount: '19,687.00',
      isStatus: 'Waiting',
    },
    {
      loanapplication: '1000254558642',
      amount: '29,687.00',
      isStatus: 'Waiting',
    },
  ]);
  const [sampleArray1, setsampleArray1] = useState([
    {
      loanapplication: '1000254558645',
      amount: '9,687.00',
      isStatus: 'Approve',
    },
    {
      loanapplication: '1000254558641',
      amount: '19,687.00',
      isStatus: 'Approve',
    },
    {
      loanapplication: '1000254558642',
      amount: '29,687.00',
      isStatus: 'Approve',
    },
    {
      loanapplication: '1000254558641',
      amount: '19,687.00',
      isStatus: 'Approve',
    },
    {
      loanapplication: '1000254558642',
      amount: '29,687.00',
      isStatus: 'Approve',
    },
  ]);
  const [sampleArray2, setsampleArray2] = useState([
    {
      loanapplication: '1000254558645',
      amount: '9,687.00',
      isStatus: 'Reject',
    },
    {
      loanapplication: '1000254558641',
      amount: '19,687.00',
      isStatus: 'Reject',
    },
    {
      loanapplication: '1000254558642',
      amount: '29,687.00',
      isStatus: 'Reject',
    },
    {
      loanapplication: '1000254558641',
      amount: '19,687.00',
      isStatus: 'Reject',
    },
    {
      loanapplication: '1000254558642',
      amount: '29,687.00',
      isStatus: 'Reject',
    },
  ]);

  const onClickTab = (item: any) => {
    let updateData = tabData.map(it => {
      if (item.id == it.id) {
        return {...it, isCheck: true};
      }
      return {...it, isCheck: false};
    });
    setTabData(updateData);
    setA(item.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <EmployeeSettingsSubHeader
        title={'Auto Payment Setup'}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.tabContainer}>
        <FlatList
          scrollEnabled={false}
          horizontal={true}
          data={tabData}
          contentContainerStyle={{
            justifyContent: 'space-around',
            width: '100%',
          }}
          renderItem={({item, index}) => {
            return (
              <Pressable
                style={[
                  styles.tabSelectButtonContainer,
                  {
                    backgroundColor: item.isCheck
                      ? COLORS.secondaryColor
                      : COLORS.whiteColor,
                  },
                ]}
                onPress={() => {
                  onClickTab(item);
                }}>
                <Text
                  style={[
                    {
                      color: item.isCheck ? COLORS.whiteColor : COLORS.darkGrey,
                      ...FONTS.body4,
                    },
                  ]}>
                  {item.title}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          a == 'Waiting'
            ? sampleArray
            : a == 'Approve'
            ? sampleArray1
            : a == 'Reject'
            ? sampleArray2
            : null
        }
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item, index}) => {
          const rendeIcon = (): React.JSX.Element => {
            return (
              <View style={styles.mainContainer1}>
                <Image
                  source={Icons.payment}
                  resizeMode={String.CONTAIN}
                  style={styles.iconStyle}
                />
              </View>
            );
          };

          const renderText = (): React.JSX.Element => {
            return (
              <View style={styles.mainContainer2}>
                <Text style={styles.text1}>
                  Automatic payment requested for your new application no{' '}
                  <Text style={styles.text2}>{item.loanapplication}</Text> and
                  the amount of <Text style={styles.text2}>{item.amount}</Text>.
                </Text>
              </View>
            );
          };

          const renderEnach = (): React.JSX.Element => {
            return (
              <View style={styles.btn}>
                <Text style={styles.enach}>E-NACH</Text>
              </View>
            );
          };
          const renderReject = (): React.JSX.Element => {
            return (
              <View style={styles.btn}>
                <Text style={[styles.enach, {color: '#E20F0F'}]}>Reject</Text>
              </View>
            );
          };
          const renderApprove = (): React.JSX.Element => {
            return (
              <View style={styles.btn}>
                <Text style={[styles.enach, {color: '#16F003'}]}>Approve</Text>
              </View>
            );
          };

          return (
            <>
              {a == 'Waiting' && (
                <View style={styles.cardContainer}>
                  <View style={styles.mainContainer}>
                    {rendeIcon()}
                    {renderText()}
                  </View>
                  <View style={styles.btnContainer}>
                    {renderEnach()}
                    {renderReject()}
                    {renderApprove()}
                  </View>
                </View>
              )}

              {a == 'Approve' && (
                <View style={styles.cardContainer}>
                  <View style={styles.mainContainer}>
                    {rendeIcon()}
                    {renderText()}
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <CommonButton
                      title="E-NACH - Approved for 9,687.00"
                      containerStyle={{
                        height: 35,
                        paddingHorizontal: 20,
                      }}
                      textStyle={{fontSize: 10}}
                    />
                  </View>
                </View>
              )}

              {a == 'Reject' && (
                <View style={styles.cardContainer}>
                  <View style={styles.mainContainer}>
                    {rendeIcon()}
                    {renderText()}
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 20,
                    }}>
                    <CommonButton
                      title="Rejected"
                      containerStyle={{
                        height: 35,

                        paddingHorizontal: 40,
                      }}
                      textStyle={{fontSize: 10}}
                    />
                  </View>
                </View>
              )}
            </>
          );
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  tabSelectButtonContainer: {
    alignItems: 'center',
    width: 100,

    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(5),
  },
  tabContainer: {
    backgroundColor: COLORS.whiteColor,
    elevation: 5,
    padding: moderateScale(8),
    marginVertical: moderateScale(20),
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(40),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },

  enach: {
    ...FONTS.body4,
    color: COLORS.darkGrey,
  },
  btn: {
    width: 110,
    backgroundColor: COLORS.whiteColor,
    elevation: 5,
    padding: moderateScale(6),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(2),
  },
  mainContainer1: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
  },
  mainContainer2: {
    flex: 0.8,
  },
  cardContainer: {
    backgroundColor: COLORS.whiteColor,
    elevation: 5,
    marginBottom: moderateScale(15),
    padding: moderateScale(10),
    borderRadius: moderateScale(15),
    marginHorizontal: moderateScale(15),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  text1: {
    color: COLORS.darkGrey,
    ...FONTS.body4,
  },
  text2: {
    color: COLORS.secondaryColor,
    ...FONTS.body4,
  },
  iconStyle: {
    height: RFPercentage(5),
    width: RFPercentage(5),
  },
});
export {EmployeeAutoPaymentSetup};
