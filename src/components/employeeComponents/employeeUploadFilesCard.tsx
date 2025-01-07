import React, {useCallback, useState} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import LinearGradient from 'react-native-linear-gradient';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {moderateScale} from 'react-native-size-matters';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {Elevation, ModalErrorType} from '../../constants/enums';
import * as Icons from '../../constants/icons';
import * as String from '../../constants/string';
import {COLORS, FONTS, Fonts} from '../../constants/theme';
import * as Actions from '../../redux/actions/actions';
import {
  formatBytes,
  isImageType,
  isIos,
  truncateText,
} from '../../utlis/functions';
import CommonButton from '../commonButton';
import SkeletonPlaceholder from '../skeletonPlaceholder';

export type IemployeeUploadFilesCardProps = {
  selectedFiles: any[];
  idCardFiles: {};
  setSelectedFiles: (files: any[]) => void;
  onUploadProgress: (progress: number) => void;
  onPressCancel?:
    | null
    | ((item: any, event: GestureResponderEvent) => void)
    | undefined; // Assuming `any` as the type of your item, replace with actual type if known
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  direction?: boolean;
  buttonLoader?: boolean;
};

const EmployeeUploadFilesCard: React.FC<IemployeeUploadFilesCardProps> = ({
  selectedFiles,
  setSelectedFiles,
  onUploadProgress,
  onPressCancel,
  onPress,
  idCardFiles,
  setLoading,
  buttonLoader,
  direction = !false,
}) => {
  const [progressSate, setUploadProgress] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);
  const dispatch = useDispatch();

  const {file, fileType, name, size, title} =
    idCardFiles?.getEmployeeIdCard == null
      ? ''
      : idCardFiles?.getEmployeeIdCard;

  const Name = name ?? '';

  // console.log('idCardFiles?.getEmployeeIdCard', idCardFiles?.getEmployeeIdCard);

  const sampleArray = [
    {
      title: 'Income Tax Certificate',
      id: 1,
      mandatory: false,
      man: true,
      fileCopyUri: '',
      fileId: '',
      name: '',
      progress: '',
      size: '',
      type: '',
      uri: '',
    },
    {
      title: 'PaySlip',
      id: 2,
      man: true,
      mandatory: !true,
      fileCopyUri: '',
      fileId: '',
      name: '',
      progress: '',
      size: '',
      type: '',
      uri: '',
    },
    {
      title: 'Employment ID Card',
      id: 3,
      man: true,
      mandatory: true,
      fileCopyUri: '',
      fileId: '',
      name: name || '',
      // progress: 100 || 0,
      progress: idCardFiles?.getEmployeeIdCard == null ? 0 : 100,
      size: size || '',
      type: fileType || '',
      uri: file || '',
    },
    {
      title: 'Offer Letter',
      id: 4,
      man: true,
      mandatory: !true,
      fileCopyUri: '',
      fileId: '',
      name: '',
      progress: '',
      size: '',
      type: '',
      uri: '',
    },
    {
      title: 'Bank Statement - Last 3 Months',
      id: 5,
      man: true,
      mandatory: !true,
      fileCopyUri: '',
      fileId: '',
      name: '',
      progress: '',
      size: '',
      type: '',
      uri: '',
    },
  ];
  const mandatory = sampleArray.filter(item => item.mandatory).length;

  // const sizeWithUnit = size;
  // const sizeWithoutUnit = sizeWithUnit.replace(/[^\d.]/g, '');

  const handleDocumentSelection = useCallback(
    async (title, id, mandatory) => {
      const fileWithSameTitle = selectedFiles.find(
        file => file?.title == title,
      );
      // console.log("VAL::::::::::::::::",val);

      // console.log('SELECTED FILES:::::::::::::::', selectedFiles);

      // const fileWithSameName = selectedFiles.find(file => file.name);

      // console.log('api  repsose file nameLL:::', Name);
      // console.log('Local file name:::::::', fileWithSameName);

      // console.log(
      //   'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC::::::::::',
      //   fileWithSameName,
      // );

      if (fileWithSameTitle) {
        dispatch(
          Actions.errorMessage({
            errorMessage: `File "${title}" already exists. Please delete it and re-upload.`,
            status: true,
            errorType: ModalErrorType.Info,
          }),
        );
        return;
      }

      // if (fileWithSameName) {
      //   dispatch(
      //     Actions.errorMessage({
      //       errorMessage: `File "${title}" already exists. Please delete it and re-upload.`,
      //       status: true,
      //       errorType: ModalErrorType.Info,
      //     }),
      //   );
      //   return;
      // }

      try {
        setPageLoading(true);
        if (setLoading) setLoading(true);

        // Step 1: Select files
        const response = await DocumentPicker.pick({
          presentationStyle: 'fullScreen',
          type: [types.pdf, types.images],
          allowMultiSelection: false,
        });

        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
        const minFileSize = 10 * 1024; // 10KB in bytes
        let validFiles = [];

        // Step 2: Validate and prepare files
        response.forEach(file => {
          const fileWithSameName = selectedFiles.find(
            selectedFile => selectedFile.name === file.name,
          );

          if (fileWithSameName || file.name == Name) {
            dispatch(
              Actions.errorMessage({
                errorMessage: `File "${file.name}" already exists. Please rename it and re-upload`,
                status: true,
                errorType: ModalErrorType.Info,
              }),
            );
          } else if (file.size <= maxFileSize && file.size >= minFileSize) {
            validFiles.push({
              ...file,
              progress: 0, // Initialize progress here
              title: title,
              id: uuid.v4(),
              mandatory: mandatory,
              fileId: id,
            });
          } else if (file.size > maxFileSize) {
            dispatch(
              Actions.errorMessage({
                errorMessage: `File ${file.name} is larger than 5MB and will not be uploaded.`,
                status: true,
                errorType: ModalErrorType.Info,
              }),
            );
          } else if (file.size < minFileSize) {
            dispatch(
              Actions.errorMessage({
                errorMessage: `File ${file.name} is smaller than 10kb and will not be uploaded.`,
                status: true,
                errorType: ModalErrorType.Info,
              }),
            );
          }
        });

        // Combine existing files with new validFiles
        const updatedFiles = [...selectedFiles, ...validFiles];

        // Step 3: Update state with initial files including progress
        setSelectedFiles(updatedFiles);

        // Step 4: Simulate upload progress
        const totalSize = updatedFiles.reduce(
          (acc, file) => acc + file.size,
          0,
        );
        let uploadedSize = 0;

        // Function to simulate file upload with progress
        const simulateUpload = async file => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, Math.random() * 100); // Adjust upload simulation time
          });
        };

        // Step 5: Upload files sequentially with simulated progress
        for (let i = 0; i < updatedFiles.length; i++) {
          const file = updatedFiles[i];
          if (file.progress === 100) continue; // Skip files that are already fully uploaded

          while (file.progress < 100) {
            await simulateUpload(file); // Simulate upload delay for each file
            const uploadIncrement = (file.size / totalSize) * 100;
            file.progress = Math.min(file.progress + uploadIncrement, 100);

            // Update overall progress
            uploadedSize += uploadIncrement;

            // Batch update progress and selectedFiles state to avoid excessive re-renders
            if (i === updatedFiles.length - 1 || file.progress === 100) {
              // Only update state at the end of each file upload or when progress reaches 100%
              setUploadProgress((uploadedSize / totalSize) * 100);
              onUploadProgress((uploadedSize / totalSize) * 100);

              // Update state with the updated files once at the end of each file upload
              setSelectedFiles(prevFiles =>
                prevFiles.map(prevFile =>
                  prevFile.id === file.id ? {...file} : prevFile,
                ),
              );
            }
          }
        }

        setPageLoading(false);
        if (setLoading) setLoading(false);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // console.log('User canceled the picker');
        } else {
          console.warn(err);
        }
        setPageLoading(false);
        if (setLoading) setLoading(false);
      }
    },
    [selectedFiles, setSelectedFiles, onUploadProgress, setLoading],
  );

  // console.log('AAAAAAAAAAAAAA', selectedFiles);

  const mergedArray = sampleArray.map(item => {
    const matchedDoc = selectedFiles.find(doc => doc.title === item.title);
    return {...item, ...(matchedDoc || {})};
  });

  const filterProgress = mergedArray.filter(item => item?.progress !== '');

  // console.log('OOOOOOOOOOOOOOOO', filterProgress);

  const allProgressComplete = filterProgress.every(
    item => item.progress === 100,
  );

  // console.log('AAAAAAAAAAAAAA', allProgressComplete);

  // console.log('MERGER:::::::', mergedArray);

  const SkimmerLoader = () => {
    return (
      <SkeletonPlaceholder>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={Styles.c1}></View>
          <View style={Styles.c1}></View>
          <View style={Styles.c1}></View>
          <View style={Styles.c1}></View>
        </View>
      </SkeletonPlaceholder>
    );
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.uploadText}>{String.UPLOAD_FILES}</Text>
      {/* <Text style={Styles.uploadText}>{String.UPLOAD_FILES}</Text> */}
      <FlatList
        horizontal={direction ? false : true}
        showsHorizontalScrollIndicator={false}
        data={mergedArray}
        renderItem={({item}) => {
          // console.log('PROGRESS:::::::::::::', item.progress);
          return (
            <>
              <Pressable
                style={[Styles.uploadContainer]}
                onPress={
                  () => {
                    if (name == item?.name) {
                      // console.log('not allow onpress');
                    } else {
                      handleDocumentSelection(
                        item.title,
                        item.id,
                        item.mandatory,
                      );
                    }
                  }
                  // if(item?.type && item?.name && item?.size){

                  //   handleDocumentSelection(item.title, item.id, item.mandatory)
                  // }
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={Styles.text}>
                      {item.title}
                      {item.mandatory && <Text style={{color: 'red'}}>*</Text>}
                    </Text>
                  </View>
                  {name == item.name ? (
                    <></>
                  ) : (
                    <Pressable
                      onPress={() => {
                        // console.log(
                        //   'handleDocumentSelection:::::::::::::::::::',
                        //   item,
                        // );

                        item.progress == 100
                          ? onPressCancel(item)
                          : handleDocumentSelection(
                              item.title,
                              item.id,
                              item.mandatory,
                            );
                      }}
                      style={{
                        backgroundColor: COLORS.secondaryColor,
                        paddingHorizontal: moderateScale(10),
                        paddingVertical: moderateScale(1),
                        borderRadius: moderateScale(5),
                        elevation: Elevation.cardContainerElevation,
                      }}>
                      <Text
                        style={{
                          fontFamily: Fonts.SemiBold,
                          color: COLORS.whiteColor,
                          fontSize: 12,
                        }}>
                        {item.progress == 100 ? 'Remove' : 'Upload'}
                      </Text>
                    </Pressable>
                  )}
                </View>
                {item?.type && item?.name && item?.size && (
                  <>
                    <View style={Styles.formatContainer}>
                      <Image
                        source={
                          isImageType(
                            fileType == item.type ? fileType : item?.type,
                          )
                            ? Icons.imagePlaceHolder
                            : Icons.pdfFile
                        }
                        resizeMode={String.CONTAIN}
                        style={{
                          height: RFPercentage(4),
                          width: RFPercentage(4),
                        }}
                      />
                      <Text style={Styles.formatText}>
                        {name == item.name
                          ? name
                          : truncateText({text: item?.name, maxLength: 10})}
                      </Text>
                      <Text style={Styles.formatText}>
                        Size:{' '}
                        {size == item.size ? size : formatBytes(item?.size)}
                      </Text>
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
                          {
                            width: `${
                              mergedArray?.length == mandatory
                                ? 100
                                : item.progress
                            }%`,
                            height: 100,
                            borderRadius: 5,
                          },
                        ]}
                      />
                    </View>
                  </>
                )}
              </Pressable>
            </>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />

      <Text style={Styles.format}>
        Only PDF and image files between 10KB to 5MB in size are allowed.
      </Text>
      <View style={{marginTop: 10}}>
        {/* {!allProgressComplete ? (
          <></>
        ) : ( */}
        <CommonButton
          title={String.CONTINUE}
          onPress={onPress}
          textStyle={[{...FONTS.body4}]}
          loading={buttonLoader}
          disabled={buttonLoader ? true : false}
          containerStyle={{
            height: RFPercentage(6),
            // marginBottom: moderateScale(10),
          }}
        />
        {/* )} */}
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteColor,
    elevation: Elevation.cardContainerElevation,
    marginHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(2),
    padding: RFPercentage(1.5),
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
  progressBarContainer: {
    backgroundColor: '#E9E9E9',
    marginTop: RFPercentage(2),
  },
  containerr: {
    width: '100%',
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  formatContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: RFPercentage(1),
  },
  formatText: {
    ...FONTS.body5,
    color: COLORS.darkGrey,
  },

  uploadText: {
    ...FONTS.h3,
    color: COLORS.darkGrey,
  },
  des: {
    color: COLORS.lightGrey,
    ...FONTS.body4,
    marginTop: RFPercentage(1),
  },
  text: {
    color: COLORS.darkGrey,
    ...FONTS.body4,
  },
  UploadIconStyle: {
    height: RFPercentage(1.5),
    width: RFPercentage(1.8),
    marginLeft: RFPercentage(1),
  },
  uploadContainer: {
    backgroundColor: COLORS.lightBlue,
    elevation: Elevation.cardContainerElevation,
    width: '100%',

    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RFPercentage(1.5),
    marginRight: RFPercentage(1),
    marginVertical: RFPercentage(1),
  },
  format: {
    color: COLORS.darkGrey,
    ...FONTS.body3,
    marginTop: moderateScale(8),
  },
  c1: {
    height: 30,
    width: 120,
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export {EmployeeUploadFilesCard};
