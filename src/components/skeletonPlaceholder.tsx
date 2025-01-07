import React, {FC} from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import SkeletonLoader from 'react-native-skeleton-placeholder';
import * as Interfaces from '../constants/interfaces';
import * as String from '../constants/string';
import {COLORS} from '../constants/theme';

const SkeletonPlaceholder: FC<Interfaces.SkeletonPlaceholderInterface> = (
  props: Interfaces.SkeletonPlaceholderInterface,
) => {
  // Props Variables
  const {children} = props;

  return (
    <SkeletonLoader
      backgroundColor={COLORS.deepLightGrey}
      borderRadius={RFPercentage(1)}
      highlightColor={'#888888'}
      speed={String.SKELETON_PLACEHOLDER_SPEED}>
      {children}
    </SkeletonLoader>
  );
};

export default SkeletonPlaceholder;
