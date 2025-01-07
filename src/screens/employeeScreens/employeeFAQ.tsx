import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {GET_EMPLOYEE_FAQ} from '../../api/query';
import {EmployeeLoanRequestSubHeader} from '../../components/employeeComponents/employeeLoanRequestSubHeader';
import {EmployeeFaqLoader} from '../../components/skeletonLoader/employeeFaqLoader';
import VectorIcons from '../../components/vectorIcons';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

interface Iprops {
  id: number;
  question: string;
  answer: string;
  isClick: boolean;
}

const EmployeeFAQ: React.FC<{}> = (props: any) => {
  const {navigation} = props;
  const [onCAll, {loading}] = useLazyQuery(GET_EMPLOYEE_FAQ);

  const [faqData, setFaqData] = useState<Iprops[]>([]);
  const checkEmptyFaqData: boolean = faqData.length !== 0;
  useEffect(() => {
    onCAll()
      .then(res => {
        const organizations = res?.data?.getAllFAQ ?? [];
        console.log(organizations, 'organizations');
        setFaqData(organizations);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const RenderItem = ({item}: any) => {
    function onClickFAQ(item: any) {
      let updateData = faqData.map(it => {
        if (item.id == it.id) {
          return {...it, isClick: !it.isClick};
        }
        return it;
      });
      setFaqData(updateData);
    }

    return (
      <>
        {checkEmptyFaqData ? (
          <Pressable style={styles.Button} onPress={() => onClickFAQ(item)}>
            <View style={styles.buttonView}>
              <View style={styles.questionView}>
                <Text style={styles.questions}>{item.question}</Text>
              </View>
              <View style={styles.iconView}>
                <VectorIcons
                  name={
                    !item.isClick
                      ? 'chevron-up-outline'
                      : 'chevron-down-outline'
                  }
                  type="ionicon"
                  color={COLORS.grey}
                  size={RFPercentage(3.0)}
                />
              </View>
            </View>
            {!item.isClick && <Text style={styles.answer}>{item.answer}</Text>}
          </Pressable>
        ) : (
          <View style={styles.faqFound}>
            <Text>{`No Faq(s) Found!`}</Text>
          </View>
        )}
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.secondaryColor}
        translucent={true}
      />
      <EmployeeLoanRequestSubHeader
        title={String.FAQ}
        onPress={() => navigation.goBack()}
      />
      {!loading ? (
        <View style={{paddingHorizontal: RFPercentage(2.8)}}>
          <Text style={styles.head1}>{String.FREQUENTLY_ASKED_QUESTIONS}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={faqData}
            renderItem={RenderItem}
            style={{
              marginTop: RFPercentage(2.0),
              marginBottom: RFPercentage(8.0),
            }}
            contentContainerStyle={{paddingBottom: RFPercentage(10)}}
          />
        </View>
      ) : (
        <EmployeeFaqLoader />
      )}
    </SafeAreaView>
  );
};

export default EmployeeFAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.DashboardBackgroundColor,
  },
  faqFound: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lime',
  },
  head1: {
    ...FONTS.h3,
    color: COLORS.secondaryColor,
    marginTop: RFPercentage(2),
  },
  questions: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
  },
  Button: {
    backgroundColor: COLORS.whiteColor,
    marginTop: RFPercentage(2),
    marginHorizontal: RFPercentage(0.5),
    padding: RFPercentage(1.5),
    elevation: 3,
    borderRadius: RFPercentage(1),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  answer: {
    ...FONTS.body3,
    color: COLORS.grey,
    marginTop: RFPercentage(1.0),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: RFPercentage(1),
  },
  questionView: {flex: 0.9},
  iconView: {flex: 0.1},
});
