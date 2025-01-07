import {NavigationProp} from '@react-navigation/native';
import {
  ColorValue,
  GestureResponderEvent,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {IconProps} from 'react-native-elements';
import {FlashMessageProps} from 'react-native-flash-message';
import {ModalProps} from 'react-native-modal';
import * as queryInterface from '../api/queryInterface';
import * as Types from './types';

export interface RouteParams {
  OrganizationId: string;
}

export interface Props {
  navigation: NavigationProp<any>;
  route: {
    params: RouteParams;
  };
}
export interface Action extends Types.KeyStrValAllType {
  type: string;
  payload: any;
}
export interface AuthTextInputProps extends Types.KeyStrValAllType {
  label: string;
  value: string | undefined;
  aadhar?: boolean;
  editable?: boolean | undefined;
  inputStyle?: StyleProp<TextStyle> | undefined;
  placeholder?: string | undefined;
  containerStyle?: ViewStyle;
  placeholderTextColor?: ColorValue | undefined;
  secureTextEntry?: boolean | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean | undefined;
  onChangeText: ((text: string) => void) | undefined;
  selectionColor?: ColorValue | undefined;
  error?: boolean | undefined;
  errorText?: string | undefined;
  maxLength?: number | undefined;
}
export interface ButtonProps extends Types.KeyStrValAllType {
  containerStyle?: null | StyleProp<ViewStyle>;
  disabled?: null | boolean | undefined;
  title: string;
  loading?: boolean;
  loaderColor?: boolean;
  textStyle?: null | StyleProp<TextStyle>;
  size?: string;
  icon?: boolean;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  linearBackground?: [string, string];
  disableButton?: boolean;
}
export interface Iconprops extends IconProps {
  type?: string;
}

export interface HeaderTitleProps extends Types.KeyStrValStrType {
  color1: string;
  color2: string;
}
export interface AppReducerStateInterface extends Types.KeyStrValAllType {
  userData: userData[];
  mobileUserData: queryInterface.GetMobileUserLoginData;
  getEmployeeById: queryInterface.getOrganizationDetails;
  getEmployeeDetails: queryInterface.EmployeeUserDetails;
  getOrganizationDetails: queryInterface.OrganizationUserDetails;
  employeeLoanDetails: EmployeeLoanDetails;
  errorMessage: errorDetailsInterface;
  ProfileUrl: string;
}

export interface userData extends Types.KeyStrValAllType {
  email: string;
  token?: string;
  notificationStatus?: boolean | string;
  role: string;
}

export interface errorDetailsInterface {
  errorMessage: string;
  status: boolean;
  errorType?: string;
}
export interface ActionsInterface extends Types.KeyStrValAllType {
  type: string;
  payload: any;
}
export interface RootReducersStateInterface extends Types.KeyStrValAllType {
  app: AppReducerStateInterface;
  other: OtherReducerStateInterface;
}

export interface OtherReducerStateInterface extends Types.KeyStrValAllType {
  backOnline: boolean;
  networkStatus: boolean;
}

export interface EmployeeDetailsSubHeaderProps extends Types.KeyStrValAllType {
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface EmployeeNonLoanCardProps extends Types.KeyStrValAllType {
  name: string;
  amount: string | number;
  interest: string | number;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  showDivider: boolean;
}

export interface EmployeeChooseNonLoanCardProps extends Types.KeyStrValAllType {
  hideButton?: boolean;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}

export interface EmployeeNonLoanRequestCard extends Types.KeyStrValAllType {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  onPressResumeApplication?:
    | null
    | ((event: GestureResponderEvent) => void)
    | undefined;
}

export interface EmployeeLoanRequestSubHeaderProps
  extends Types.KeyStrValAllType {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  imageUrl?: string;
  showBackArrow?: boolean;
}

export interface EmployeeSettingsSubHeaderProps extends Types.KeyStrValAllType {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  imageUrl?: string;
  showBackArrow?: boolean;
}

export interface EmployeeNextEmiCardProps extends Types.KeyStrValAllType {
  amount?: string;
  dueDate?: string;
}

export interface EmployeeViewTotalEmiCardProps extends Types.KeyStrValAllType {
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  name: string;
  lastName?: string;
  typeOfLoan?: string;
  imageUrl?: string;
}

export interface EmployeeUploadFilesDetailCard extends Types.KeyStrValAllType {
  progress: number;
  height: number;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  onPressCancel?:
    | null
    | ((item: any, event: GestureResponderEvent) => void)
    | undefined; // Assuming `any` as the type of your item, replace with actual type if known
  loading?: boolean;
  buttonLoader?: boolean;
}
export interface NetworkInterface extends Types.KeyStrValAllType {
  children: React.JSX.Element;
  position?: FlashMessageProps['position'];
}

export interface FileDataInterface extends Types.KeyStrValAllType {
  name: string;
  type: string;
  uri: string;
}

export interface ImageViewerDataInterface extends Types.KeyStrValStrType {
  type: string;
  uri: string;
}

export interface ImageViewerInterface extends ModalProps {
  data: ImageViewerDataInterface | null;
  headerLabel?: string;
}
export interface ModalInterface extends Types.KeyStrValAllType {
  modalVisible: Boolean;
  onPressModalProceed?: () => void;
  onPressModalCancel?: () => void;
  onBackDropPress?: () => void;
  title?: string;
  buttonText1?: string;
  buttonText2?: string;
  loaderColor?: boolean;
  errorType?: string;
  image?: string;
  onOkPress?: () => void;
  biometricsEnabled?: boolean;
  loading?: boolean;
}

export interface SkeletonPlaceholderInterface extends Types.KeyStrValAllType {
  children: React.JSX.Element;
}
export interface DotsInterface extends Types.KeyStrValAllType {
  borderColor?: null | string;
  currentIndex: number;
  dotColor?: string;
  customContainerStyle?: StyleProp<ViewStyle>;
  isCustom?: boolean;
  numberOfDots: number;
  onPress?: (index: number) => void;
  size: number;
}
//Organization

export interface OrganizationHeaderProps extends Types.KeyStrValAllType {
  title: string;
  showBackArrow?: boolean;
}

export interface OrganizationSubHeaderProps extends Types.KeyStrValAllType {
  companyName?: string;
  companyAddress?: string;
  loading?: boolean;
}

export interface OrganizationLoanListProps extends Types.KeyStrValAllType {
  LoanListData: LoanListItem[];
  onPressLoan?: (item: any) => any;
}
export interface LoanListItem extends Types.KeyStrValAllType {
  category: string;
  count: number;
  isCheck: false;
  id: number;
  status: string;
}
//For Graph
export interface LoanProcessStack extends Types.KeyStrValAllType {
  value: number;
  color: string;
  marginBottom?: number;
}

export interface LoanProcessGraph extends Types.KeyStrValAllType {
  stacks: LoanProcessStack[];
  label: string;
}
export interface OrganizationLoanProcessGraphProps
  extends Types.KeyStrValAllType {
  data?: LoanProcessGraph[];
}
//......For Graph
export interface LoanDetail extends Types.KeyStrValAllType {
  name: string;
  role: string;
  loanAmount: number;
  status: string;
  department: string;
  branch: string;
  manager: string;
  profileImg: string;
}
export interface LoanDetailObject extends Types.KeyStrValAllType {
  data: LoanDetail;
}
//Admin Interfaces

export interface AdminDashboardInterface extends Types.KeyStrValAllType {}

export interface AdminDashBoardDetails extends Types.KeyStrValAllType {
  title: string;
  value: string | number;
  aspectratio: number;
}
//adminMiddleHeader
export interface AdminMiddleCardProps extends Types.KeyStrValAllType {
  ImageUrl: string;
  companyName: string;
  email: string;
  emailColor?: string;
  loader?: boolean;
}

export interface AdminHeaderProps extends Types.KeyStrValAllType {
  notificationCount?: number | string;
  search?: boolean;
  back?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
  imageLoading?: boolean;
}

export interface EmployeeLoanDetails extends Types.KeyStrValAllType {
  loanAmount: [number | string];
  interest: number | string;
  tenure: number | string;
}
export interface LoanProcessItem {
  id: number;
  loanProcess: string;
  application: string | number;
  date: string;
  loanAmount: string;
  loanStatus: string;
  loanType: string;
  source: string;
}

export interface LoanProcessItemList {
  data: LoanProcessItem[];
}
