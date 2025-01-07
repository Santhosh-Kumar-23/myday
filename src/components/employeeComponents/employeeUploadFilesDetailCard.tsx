import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Elevation} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as Interface from '../../constants/interfaces';
import * as String from '../../constants/string';
import {COLORS, FONTS} from '../../constants/theme';
import {commonStyles} from '../../styles';
import {
  formatBytes,
  isImageType,
  isIos,
  truncateText,
} from '../../utlis/functions';
import CommonButton from '../commonButton';
import VectorIcons from '../vectorIcons';

const EmployeeUploadFilesDetailCard: React.FC<
  Interface.EmployeeUploadFilesDetailCard
> = ({data, onPress, onPressCancel, loading, buttonLoader}) => {
  console.log('ReceivedData', data);
  console.log(buttonLoader, 'buttonLoader');
  const renderUploadCard = ({item}: {item: any}) => {
    console.log(item, 'progressSate');
    return (
      <View>
        <View style={commonStyles.flex(0.9)}>
          <View style={Styles.subContainer}>
            <View style={Styles.subMainContainer1}>
              <Image
                source={
                  isImageType(item.type)
                    ? Icons.imagePlaceHolder
                    : Icons.pdfFile
                }
                resizeMode={String.CONTAIN}
                style={{height: RFPercentage(4), width: RFPercentage(4)}}
              />
            </View>
            <View style={Styles.subMainConttainer2}>
              <View style={Styles.docsContainer}>
                <View style={Styles.docsSubContainer}>
                  <Text style={Styles.text}>{item.title}</Text>
                </View>

                <Pressable onPress={() => onPressCancel(item)}>
                  <VectorIcons
                    type="evil"
                    name="close"
                    size={RFPercentage(2.3)}
                    color={COLORS.blackColor}
                  />
                </Pressable>
              </View>
              <View style={Styles.formatContainer}>
                <Text style={Styles.formatText}>
                  {truncateText({text: item.name, maxLength: 10})}
                </Text>
                <Text style={Styles.formatText}>
                  Size: {formatBytes(item.size)}
                </Text>
                {item.progress == 100 ? (
                  <Image
                    source={Icons.complete}
                    style={{
                      height: RFPercentage(1.5),
                      width: RFPercentage(1.5),
                    }}
                    resizeMode={String.CONTAIN}
                  />
                ) : (
                  <Text style={Styles.formatText}>
                    {Math.round(item.progress)}%
                  </Text>
                )}
              </View>
              <View
                style={[
                  Styles.containerr,
                  {
                    height: 6, // Adjust as needed
                  },
                  Styles.progressBarContainer,
                ]}>
                <LinearGradient
                  colors={['#F87537', '#9180E9']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[
                    Styles.bar,
                    {width: `${item.progress}%`, height: 100},
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={Styles.container}>
      {/* <FlatList
        data={data}
        renderItem={renderUploadCard}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: moderateScale(10),
              }}>
              <Text>Upload your files here</Text>
            </View>
          );
        }}
      /> */}
      {/* <View style={Styles.buttonContainer}> */}
      <View>
        <CommonButton
          title={data?.length == 1 ? String.REVIEW : String.CONTINUE}
          onPress={onPress}
          textStyle={[{...FONTS.body4}]}
          loading={buttonLoader}
          disabled={buttonLoader ? true : false}
          containerStyle={{
            height: RFPercentage(6),
            // marginBottom: moderateScale(10),
          }}
        />
      </View>
      {/* </View> */}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    elevation: 5,
    padding: RFPercentage(2),
    marginBottom: RFPercentage(2.0),
    marginTop: RFPercentage(2.0),

    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  subContainer: {
    flexDirection: 'row',
    padding: RFPercentage(2),
    marginBottom: 12,
    marginTop: 1,
    marginHorizontal: 1,
    backgroundColor: COLORS.whiteColor,
    borderRadius: RFPercentage(1),
    elevation: Elevation.cardContainerElevation,
    shadowColor: isIos ? COLORS.lightGrey : '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: isIos ? 0.5 : 40,
    shadowRadius: isIos ? 5 : 50.65,
  },
  subMainContainer1: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subMainConttainer2: {
    flex: 0.8,
  },
  text: {
    ...FONTS.body4,
    color: COLORS.darkGrey,
    marginRight: RFPercentage(1),
  },
  formatText: {
    ...FONTS.body5,
    color: COLORS.lightGrey,
  },
  containerr: {
    width: '100%',
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  bar: {
    borderRadius: 5,
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  docsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formatContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: RFPercentage(1),
  },
  buttonContainer: {
    flex: 0.1,
  },
  progressBarContainer: {
    backgroundColor: '#E9E9E9',
    marginTop: RFPercentage(1),
  },
  docsSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {EmployeeUploadFilesDetailCard};
