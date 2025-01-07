import React, {useContext, useReducer} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {EmployeeChooseNonLoanCard} from '../../components/employeeComponents/employeeChooseLoanCard';
import {EmployeeDetailsSubHeader} from '../../components/employeeComponents/employeeDetailsSubHeader';
import {EmployeeNonLoanCard} from '../../components/employeeComponents/employeeNonLoanCard';
import * as Interfaces from '../../constants/interfaces';
import {COLORS} from '../../constants/theme';
import {AppContextType} from '../../constants/types';
import {AppContext} from '../../navigation/appContext/appContext';
import {
  InitialState,
  NavigationReducer,
} from '../../redux/reducers/navigationReducer';
import {employeeHomeStyles} from '../../styles';

const EmployeeHome: React.FC<{}> = ({}) => {
  const {Employee, Organization, Admin, AuthStack, clearUserInfo} =
    useContext<AppContextType>(AppContext);
  const [state, dispatch] = useReducer(NavigationReducer, InitialState);
  const styles = employeeHomeStyles;
  const userData = useSelector(
    (state: Interfaces.RootReducersStateInterface) => state.appReducer.userData,
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: COLORS.DashboardBackgroundColor}}>
        <EmployeeDetailsSubHeader name="Santhosh M" />
        <View style={{marginTop: RFPercentage(-5)}}>
          <EmployeeNonLoanCard
            name="Santhosh kumar moorthy M"
            amount="55,000"
            interest="7.87"
            onPress={() => {}}
            showDivider={true}
          />
        </View>

        <EmployeeChooseNonLoanCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export {EmployeeHome};
