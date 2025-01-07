import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {moderateScale, scale} from 'react-native-size-matters';
import * as Interfaces from '../../constants/interfaces';
import {COLORS, Fonts} from '../../constants/theme';
import {acronym, isIos, truncateText} from '../../utlis/functions';
import SkeletonPlaceholder from '../skeletonPlaceholder';

const AdminMiddleHeader: React.FC<Interfaces.AdminMiddleCardProps> = ({
  ImageUrl,
  companyName,
  email,
  loader,
  emailColor,
}) => {
  const [loading, setLoading] = useState(true); // State to track loading
  return (
    <>
      {!loader ? (
        <View style={styles.cardContainer}>
          <View style={styles.imgView}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: COLORS.secondaryColor,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {loader ? (
                <ActivityIndicator
                  color={'white'}
                  size={'small'}
                  style={{position: 'absolute'}}
                />
              ) : (
                <>
                  {ImageUrl ? (
                    <>
                      <FastImage
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                        source={{
                          uri: ImageUrl,
                          priority: FastImage.priority.high,
                          cache: 'immutable',
                        }}
                        style={styles.img}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      {loading && (
                        <ActivityIndicator
                          color={'white'}
                          size={'small'}
                          style={{position: 'absolute'}}
                        />
                      )}
                    </>
                  ) : (
                    <Text
                      style={{
                        color: COLORS.whiteColor,
                        fontWeight: 'bold',
                        fontSize: 22,
                      }}>
                      {acronym(companyName)}
                    </Text>
                  )}
                </>
              )}
            </View>
          </View>

          <View style={styles.detailsView}>
            <Text style={styles.companyname}>
              {truncateText({text: companyName, maxLength: 35})}
            </Text>
            <Text style={[styles.email]}>{email}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <View style={styles.imgView}>
            <SkeletonPlaceholder>
              <View
                style={{
                  height: scale(30),
                  width: scale(30),
                  borderRadius: 50,
                }}></View>
            </SkeletonPlaceholder>
          </View>

          <View
            style={{
              flex: 0.8,
              justifyContent: 'center',
            }}>
            <SkeletonPlaceholder>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{height: 10, width: '85%'}}></View>
                <View style={{height: 10, width: '65%', marginTop: 10}}></View>
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      )}
    </>
  );
};

export default AdminMiddleHeader;
const styles = StyleSheet.create({
  cardContainer: {
    elevation: 5,
    height: 70,
    backgroundColor: COLORS.DashboardBackgroundColor,
    flexDirection: 'row',
    marginHorizontal: moderateScale(30),
    marginTop: isIos ? -20 : -30,
    borderRadius: moderateScale(10),
    marginBottom: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  imgView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  detailsView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyname: {
    fontSize: moderateScale(12.5),
    fontFamily: Fonts.Bold,
    color: COLORS.secondaryColor,
  },
  email: {
    fontSize: moderateScale(10),
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
  },
});
