import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import {Elevation} from '../../constants/enums';
import * as Strings from '../../constants/string';
import {COLORS, FONTS, Fonts, deviceWidth} from '../../constants/theme';
import {isIos} from '../../utlis/functions';

const {width} = Dimensions.get('window'); // Get the width of the screen
// const boxWidth = (width - moderateScale(80)) / 4; // Calculate the width of each box

interface DocumentsInterface {
  _id: string;
  name: string;
  title: string;
  file: string;
  fileType: string;
  size: string;
  uploadedDate: string;
}

export interface employeeLoanDocumentsList {
  data: DocumentsInterface[];
  onPressLoanCard?: (
    title: string,
    file: string,
    name: string,
    fileType: string,
  ) => void;
}

const OrganizationDocumentSubmitted: React.FC<employeeLoanDocumentsList> = ({
  data: loanData,
  onPressLoanCard,
}) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.pipeLine}>{Strings.DOCUMENTS_SUBMITTED}</Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: moderateScale(5),
        }}>
        {loanData?.length !== Strings.ZERO ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={loanData}
            numColumns={4}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[Styles.c1]}
                  // onPress={() => {
                  //   onPressLoanCard(
                  //     item.title,
                  //     item.file,
                  //     item.name,
                  //     item.fileType,
                  //   );
                  // }}
                >
                  <Text numberOfLines={2} style={Styles.text}>
                    {item.title}
                  </Text>
                  {/* <Image
                    source={Icons.download}
                    tintColor={COLORS.whiteColor}
                    style={{
                      height: moderateScale(14),
                      width: moderateScale(14),
                    }}
                  /> */}
                </View>
              );
            }}
          />
        ) : (
          <Text
            style={{
              color: COLORS.grey,
              fontSize: 13,
              fontWeight: '900',
              marginVertical: 10,
            }}>
            {Strings.NO_DOCUMENTS_FOUND}
          </Text>
        )}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    paddingVertical: 10,
    marginTop: moderateScale(20),
    elevation: Elevation.cardContainerElevation,
    borderRadius: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  c1: {
    width: deviceWidth / 5,
    height: 50,
    margin: moderateScale(3),
    borderRadius: moderateScale(8),
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    backgroundColor: COLORS.secondaryColor,
    elevation: Elevation.cardContainerElevation,
  },
  text: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.Regular,
    color: COLORS.whiteColor,
    textAlign: 'center',
  },
  pipeLine: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
    marginLeft: moderateScale(15),
    textAlign: 'left',
    // marginBottom: moderateScale(12),
  },
});

export default OrganizationDocumentSubmitted;
