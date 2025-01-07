import {unitOfTime} from 'moment';
import {
  ImageResizeMode,
  KeyboardTypeOptions,
  PlatformOSType,
  ScrollViewProps,
} from 'react-native';
import {
  MessageOptions,
  MessageType,
  Position,
} from 'react-native-flash-message';

//IntroScreen
export const SKIP: string = 'Skip';
export const CONTROL: string =
  ' Control Your\n Finances Make\n Dreams Come True';
export const HEADING_2: string =
  'Control your finances, your wallet, make payments and receipts of finances \neasily and simply';
export const MY_DAY: string = 'Myday';
export const PAY_DAY: string = 'Payday';

// Symbols
export const DOT: string = '.';
export const FORWARD_SLASH_SYM: string = '/';
export const PERCENTAGE_SYM: string = '%';
export const START_SYM: string = '*';

// Moment
export const DD: string = 'DD';
export const DD_MMM: string = 'DD MMM';
export const DDMMYYYY: string = 'DD/MM/YYYY';
export const l_LT: string = 'l LT';
export const MM: string = 'MM';
export const MOM_MONTH: unitOfTime.DurationConstructor = 'month';
export const YYYY: string = 'YYYY';

//getStarted
export const TITLE_1: string = 'Organize Your Employees with Single Platform';
export const TITLE_2: string = 'Working with your\nteam easier than\never.';
export const REGISTER: string = 'Register';
export const CHOOSE_ORGANIZATION = 'Choose Organization';

// !Strings
export const CONTAIN: ImageResizeMode = 'contain';
export const COVER: ImageResizeMode = 'cover';
export const ANDROID: PlatformOSType = 'android';
export const IOS: PlatformOSType = 'ios';
export const TI_KT_DEFAULT: KeyboardTypeOptions = 'default';
export const TI_KT_EMAIL_ADDRESS: KeyboardTypeOptions = 'email-address';
export const TI_KT_NUMBER_PAD: KeyboardTypeOptions = 'number-pad';
export const FM_MI_AUTO: MessageOptions['icon'] = 'auto';
export const EXIT_APP_TOAST: string =
  'Press back again to exit from MyDay PayDay app!';
export const BOTTOM: Position = 'bottom';
export const FM_MT_DEFAULT: MessageType = 'default';
export const TOP: Position = 'top';
export const SCROLL_PERSIST_TAPS_HANDLED: ScrollViewProps['keyboardShouldPersistTaps'] =
  'handled';

//Strings
export const HELLO: string = 'Hello';
export const UPLOAD_LOAN_DOCUMENTS: string = 'Upload Documents';
export const CONGRATULATIONS: string = 'Congratulations';
export const TOTAL_ELIGIBILITY: string = 'Total Eligibility?';
export const ELIGIBLE_LOAN_AMOUNT: string =
  'You’re eligibility for Salary Advance';
export const RATE_OF_INTEREST: string = 'Rate of Interest';
export const ADVANCE_AMOUNT: string = 'Advance Amount';
export const PROCESSING_FEES: string = 'Processing Fees (Deduction)';
export const NEED_HIGHER_LOAN_AMOUNT: string = 'Need Higher Amount?';
export const EMPLOYEE_LOAN: string = 'Employee Salary Advance';
export const RESUME_YOUR_APPLICATION: string = 'Resume your application';
export const NEW_LOAN: string = 'New Advance Request';
export const WHY_CHOOSE_OUR_ONLINE_EMPLOYEE_LOANS =
  'Why choose our online employee salary advance benefits?';
export const NEXT_EMI: string = 'Next EMI';
export const E_MANDATE_SET_UP_FOR_AUTOMATIC_PAYMENT =
  'E-Mandate Setup for Automatic Payment';
export const ATTENDANCE_WEIGHTAGE: string = 'Attendance weightage';
export const LAST_MONTHS: string = 'Last 6 months';
export const LOAN_AMOUNT: string = 'Advance';
export const ORGANIZATION_LOAN_AMOUNT: string = 'Advance Amount';
export const TENURE: string = 'Tenure';
export const UPLOAD_FILES: string = 'Upload Files';
export const LOAN_REQUEST: string = 'Request a Advance';
export const REVIEW_DETAILS: string = 'Review Details';
export const EMI_AMOUNT: string = 'EMI Amount (x 1 Installments)';
export const UPLOADED_FILES: string = 'Uploaded Files';
export const ACCOUNT_SETTINGS: string = 'Account Settings';
export const SECURITY: string = 'Security';
export const SESSIONS: string = 'Sessions';
export const SETTINGS: string = 'Settings';
export const BACK_ONLINE: string = 'Back online';
export const NO_CONNECTION: string = 'No connection';
export const PHOTO: string = 'Photo';
export const EDIT_PHOTO: string = 'Edit Photo';
export const ICP_MT_PHOTO: string = 'photo';
export const PNG: string = 'png';
export const VERIFY: string = 'Verify';
export const ENTER_AADHAAR_CARD_NUMBER: string = 'Enter Aadhaar Number';
export const ENTER_PAN_CARD_NUMBER: string = 'Enter PAN';
export const AADHAAR_PLACEHOLDER: string = 'xxxx-xxxx-xxxx';
export const PAN_PLACEHOLDER: string = 'AAAAA0000A';
export const SAVE: string = 'Save';
export const PIPELINE_PROCESS: string = 'Pipeline Process';
export const DOCUMENTS_SUBMITTED: string = 'Douments Submitted';
export const EMPLOYEE_VIEW: string = 'Employee View';
export const APPROVE: string = 'Approve';
export const REJECT: string = 'Reject';
export const YES: string = 'Yes';
export const NO: string = 'No';
export const CONNECTED_ORGANIZATIONS: string = 'Connected Organizations';
export const LOAN_RECOVERED: string = 'Payment Recovered';
export const LOAN_DISBRSED: string = 'Advance Disbursed';
export const MODE_OF_PAYMENTS: string = 'Mode of Payment';
export const BRANCH: string = 'Branch';
export const DEPARTMENT: string = 'Department';
export const CHOOSE_DATE: string = 'Choose Date';
export const TOTAL_AMOUNT_DISBURSED: string = 'Total amount Disbursed';
export const TOTAL_AMOUNT_RECOVERED: string = 'Total amount Recovered';
export const SELECT: string = 'Select';
export const CANCEL: string = 'Cancel';
export const DIDNT_RECEIVED_THE_CODE: string = 'Didn’t received the code?';
export const NO_DATA_FOUND: string = 'No data(s) found!';
export const WE_HAVE_NOT_FOUND: string = 'We have not found any data';
export const NO_DOCUMENTS_FOUND: string = 'No Document(s) found!';
export const EMAIL: string = 'Email';
export const EMPLOYEE_CONUT: string = 'Employee Count';
export const UNLOCK_THE_APP: string = 'Unlock the App';
export const BIOMETRICS_ANDROID_HEADING =
  'Authentication required. please enter your password to unlock the app.';
export const ALLOW_BIO_METERICS_FOR_VERIFICATION: string =
  'Allow Bio-Metric for verification';
export const UNLOCK_NOW: string = 'Unlock Now';
export const PLEASE_ALLOW_YOUR_FACE_ID_FOR_VERIFICATION: string =
  'Please allow your Face ID for verification';
export const IT: string = 'IT';
export const MANAGER: string = 'Manager';
export const NAME: string = 'Name';
export const REQUESTING_A_LOAN: string = 'Requesting a Advance';
export const PHONE: string = 'Phone';
export const DOB: string = 'DOB';
export const CEO: string = 'CEO';
export const LOAN_DISBURSED: string = 'Loan Disbursed';
export const DISBURSED_AMOUNT: string = 'Disbursed Amount';
export const PENDING_AMOUNT_FOR_DISBURSAL: string =
  'Pending Amount for Disbursal';
export const ACCOUNT_NUMBER: string = 'Account Number';
export const YOU_HAVE_AN_OPERATING_ADVANCE_DUE_IN_CURRENT: string =
  'You have an operating advance due in current';
export const APPLY_FOR_A_NEW_LOAN: string = 'Apply For a New Advance Request?';
export const TOTAL_LOANS: string = 'Total Application';
export const LOANS: string = 'Applications';

// Numerics
export const ZERO: number = 0;
export const FIVE: number = 5;
export const FOUR: number = 4;
export const TWO: number = 2;
export const SIX: number = 6;
export const THREE: number = 3;
export const ONE: number = 1;
export const TWENTY: number = 20;
export const FOURTEEN: number = 14;
export const SIXTEEN: number = 16;
export const TIMER_INTERVAL: number = 1000;
export const SKELETON_PLACEHOLDER_SPEED: number = 1500;
export const EIGHT: number = 8;
export const TEN: number = 10;
export const NINE: number = 9;
export const THOUSAND_TWENTY_FOUR: number = 1024;
export const ZERO_EIGHT: number = 0.8;
export const FLASH_MESSAGE_DURATION: number = 2500;
export const OTP_TIMER: number = 120;
export const SIXTY: number = 60;
export const TWO_ZERO: string = '00';

//!Errors
export const EMAIL_IS_INVALID: string = 'Email is invalid';
export const MOBILE_NUMBER_IS_REQUIRED: string = 'Mobile number is required';
export const MOBILE_NUMBER_INVALID: string = 'Mobile number is invalid';
export const EMAIL_IS_REQUIRED: string = 'Email is required';
export const PASSSWORD_IS_REQUIRED: string = 'Password is required';
export const CURRENT_PASSSWORD_IS_REQUIRED: string =
  'Current Password is required';
export const NEW_PASSWORD_IS_REQUIRED: string = 'New password is required';
export const PASSWORD_MINIMUM: string =
  'Password must have minimum 8 characters';
export const STRONG_PASSWORD_ERROR: string =
  'Password must be 8+ characters, with a capital letter, number, and symbol';
export const CONFIRM_PASSWORD_IS_REQUIRED: string =
  'Confirm password is required';
export const CONFIRM_PASSWORD_INVALID_ERROR: string = `Confirm password didn't match with passowrd`;
export const ORGANIZATION_IS_REQUIRED: string = 'Organization is required';
export const EMAIL_ERROR =
  'Your Email ID is not registered, please enter the registered Email ID ';
export const FILE_SIZE_ERROR: string = 'File size should be less than 5 MB';
export const AADHAAR_IS_REQUIRED: string = 'AADHAAR is required';
export const AADHAAR_IS_INVALID: string = 'Invalid AADHAAR number';
export const PAN_IS_REQUIRED: string = 'PAN is required';
export const OTP_ERROR: string = 'Otp is required';
export const OTP_INVALID_ERROR: string = 'Please enter correct otp';
export const INVALID_PAN: string = 'Invalid PAN';
export const COMMON_ERROR: string =
  'Sorry! Something went wrong! Please, try again later!';

//Screens
export const GET_STARTED: string = 'Get Started';
export const SIGN_UP: string = 'Sign up';
export const lOG_IN = 'Login';
export const FORGOT_PASSWORD: string = 'ForgotPassword';
export const OTP: string = 'Otp';
export const RESET_PASSWORD: string = 'Reset Password';
export const NOTIFICATION: string = 'Notification';
export const TERMS_AND_CONDITION: string = 'Terms and Condition';
export const PASSWORD_SUCCESS_PAGE: string = 'Password Success';
export const EMPLOYEE_NON_LOAN_REQUEST: string = 'employeeNonLoanRequest';
export const EMPLOYEE_LOAN_REQUEST: string = 'employeeLoanRequest';
export const EMPLOYEE_LOAN_HOME: string = 'employeeLoanHome';
export const EMPLOYEE_HOME: string = 'employeeHome';
export const EMPLOYEE_VIEW_TOTAL_EMI: string = 'EmployeeViewTotalEmi';
export const EMPLOYEE_UPLOAD_DOCUMENTS: string = 'EmployeeUploadDocuments';
export const EMPLOYEE_NEW_LOAN: string = 'employeeNewLoan';
export const EMPLOYEE_LOAN_REQUEST_REVIEW_DETAILS: string =
  'EmployeeLoanRequestReviewDetails';
export const FAQ: string = 'FAQ';
export const ADMIN_LOAN_RECOVERED_AND_DISTURBUTED: string =
  'AdminLoanAmountDisturbutedandRecovered';

//Employee
export const EMPLOYEE_THANKYOU: string = 'employeeThankyou';
export const EMPLOYEE_TRACK_LOAN_REQUEST: string = 'employeeTrackLoanRequest';
export const EMPLOYEE_SETTINGS: string = 'employeeSettings';
export const EMPLOYEE_EDIT_PROFILE: string = 'employeeEditProfile';
export const EDIT_PROFILE: string = 'Edit Profile';
export const CONFIGURE_AUTOMATIC_PAYMENT: string =
  'Configure Automatic Payment';
export const PUSH_NOTIFICATION: string = 'Push Notification';
export const VERIFICATION: string = 'Verification (ID Proof’s)';
export const PRIVACY_AND_POLICY: string = 'Privacy Policy';
export const TERMS_AND_CONDTIONS: string = 'Terms & Conditions';
export const SMART_LOCK: string = 'Smart Lock';
export const LOG_OUT: string = 'Logout';
export const DELETE_ACCOUNT: string = 'Delete Account';
export const CHANGE_PROFILE_IMAGE: string = 'Change Profile Image';
export const EMPLOYEE_LOAN_STATUS: string = 'employeeLoanStatus';
export const EMPLOYEE_TRACK_LOAN_PROCESS_PIPELINE: string =
  'employeetrackLoanProcessPipeline';
export const EMPLOYEE_AUTO_PAYMENT_SETUP: string = 'EmployeeAutoPaymentSetup';
export const EMPLOYEE_PROOF_VERIFICATION: string = 'EmployeeProofVerification';
export const EMPLOYEE_PAYMENT_HISTORY: string = 'employeePaymentHistory';
export const EMPLOYEE_NOTIFICATION: string = 'employeeNotification';
export const EMPLOYEE_TERMS_AND_CONDITION: string = 'employeeTermsAndCondition';
export const EMPLOYEE_VERIFICATION: string = 'employeeVerification';
export const EMPLOYEE_DELETE_ACCOUNT: string = 'employeeDeleteAccount';
export const EMPLOYEE_VERIFICATION_OTP: string = 'employeeVerificationOtp';
export const EMPLOYEE_lOCK_SCREEN: string = 'employeeLockScreen';
export const EMPLOYEE_CHANGE_PASSWORD: string = 'employeeChangePassword';

//organization
export const ORGANIZATION_HOME: string = 'OrganizationHome';
export const ORGANIZATION_SETTINGS: string = 'OrganizationSettings';
export const ORGANIZATION_EDIT_PROFILE: string = 'OrganizationEditProfile';
export const ORGANIZATION_TERMS: string = 'OrganizationTerms';
export const ORGANIZATION_CHANGE_PASSOWRD: string =
  'OrganizationChangePassword';
export const ORGANIZATION_LOAN_PROCESS_LIST: string =
  'OrganizationLoanProcessList';
export const ORGANIZATION_EMPLOYEE_VIEW: string = 'OrganizationEmployeeView';

export const ORGANIZATION_NOTIFICATION: string = 'OrganizationNotification';
//Admin
export const ADMIN_CONNECTION_ORGANIZATION: string =
  'AdminConnectionOrganization';
export const ADMIN_CONNECTION_ORGANIZATION_DETAILS: string =
  'ConnectionOrganizationDetails';
export const ADMIN_LOAN_PROCESS_LIST: string = 'AdminLoanProcessList';
export const ADMIN_EMPLOYEE_DETAILS: string = 'AdminEmployeeDetails';
export const ADMIN_LOAN_RECOVERED_COMPANY: string = 'AdminLoanRecoveredCompany';

//Admin
export const ADMIN_SETTINGS: string = 'AdminSetings';
export const ADMIN_EDIT_PROFILE: string = 'AdminEditProfile';
export const ADMIN_CHANGE_PASSWORD: string = 'AdminChangePassword';
export const ADMIN_NOTIFICATION: string = 'AdminNotification';

//LoginScreen
export const WELCOME_BACK: string = 'Welcome Back';
export const LOGIN_TO_CONTINUE: string = 'Login To continue';
export const OFFICIAL_EMAIL: string = 'Official Email';
export const PASSWORD: string = 'Password';
export const FORGOT_PASSWORD_: string = 'Forgot Password?';
export const CREATE_ACCOUNT: string = 'Create Account';

export const DIDNT_HAVE_ANY_ACCOUNT: string = 'Didn’t have any account?';
export const I_ACCEPT: string = 'I Accept ';
//Signup
export const REGISTER_TO_CONTINUE: string = 'Register To continue';
export const NEW_PASSWORD: string = 'New Password';
export const CURRENT_PASSWORD: string = 'Current Password';
export const ENTER_CURRENT_PASSWORD: string = 'Enter Current Password';
export const CONFIRM_PASSWORD: string = 'Confirm Password';
export const ENTER_YOUR_EMAIL: string = 'Enter Your Email';
export const ENTER_YOUR_PASSWORD: string = 'Enter your Password';
export const ENTER_CONFIRM_PASSWORD: string = 'Enter Confirm Password';
export const ALREADY_HAVE_AN_ACCOUNT: string = 'Already have an account?';
export const ENTER_NEW_PASSWORD: string = 'Enter New password';
//Forgot Password
export const HEADING_FORGOT_PASSWORD: string = 'Forgot Password';
export const ENTER_EMAIL: string = 'Enter Your Email';
export const LOGIN_FORGOT_PAGE: string = 'Login!';
export const SEND_VERIFICATION_CODE: string = 'Send Verification Code';
export const VERIFY_EMAIL: string = 'Verify Email';

//Otp
export const ENTER_VERIFICATION_CODE: string = 'Enter Verification Code';
export const SEND_YOUR_EMAIL: string = 'Send to your Aadhar - ';
export const ENTER_CODE: string = 'Enter the Code';
export const WRONG_OTP: string = 'Wrong OTP entered ! ';
export const YOUR_CODE_WILL_EXPIRES_IN: string = 'Your code will expires in';
export const RESEND_CODE: string = 'Resend Code';
//Reset Password
export const SET_UP_NEW_PASSWORD: string = 'Setup a New Password';
export const CHANGE_PASSWORD = 'Change Password';
//Terms and Condition
export const WE_CARE: string = 'We care about Your Privacy';
export const PRIVACY_CONTENT: string =
  'By continuing, I consent to Kreon Financial\nProcessing all data I provide throught the app,\nincluding sensitive data such as finance information\nIn addition,by signing up and agree to our';
export const PRIVACY_BUTTON_TEXT: string = 'Terms and Conditions ';
export const AND: string = 'and ';
export const PRIVACY_BUTTON_TEXT2: string = 'Privacy Policy';
export const WHICH_ALSO: string = ' which also';
export const TELLS_YOU: string = 'tells you how we use our data';
export const CHANGES_CONTENT: string =
  'You can always make changes in your privacy\nsetting. Find out more our in privacy policy';
export const ACCEPT_BUTTON: string = 'Accept';
export const DECLINE_BUTTON: string = 'Decline';
//Notification
export const NEW_NOTIFICATION: string = 'Turn on push\nNotification';
export const IMPORTANT_MESSAGE: string =
  'Don’t miss an important messages like account activity and details';
export const TURN_ON_NOTIFICATION: string = 'Turn on Notification';
export const NOT_NOW: string = 'Not Now';
//Password Success
export const PASSWORD_SUCCESS: string = 'Password Resets\nsuccessfully';
export const REGISTER_SUCCESS: string = 'Registered\nsuccessfully';
export const CONTINUE: string = 'Continue';
export const REVIEW: string = 'Review';
//employeeLoanCard
export const BALANCE: string = 'Balance';
export const MONTHLY: string = 'Monthly Payment';
export const INR: string = 'INR ';
export const LOAN_PACKAGE: string =
  'Choose from our packages, start with the lower-value, and progressively grow.';
export const TELL_ME: string = 'Tell me more';
//employeeLoanHome
export const QUICK_LINKS: string = 'Quick Links';
export const TRACK_LOAN_STATUS: string = 'Track Application Status';
export const CHECK_REPAYMENTS: string = 'Check Repayments';
export const APPLY_FOR_A_LOAN: string = 'Apply for a Salary Advance';
export const APPROVE_AUTOPAY: string = 'Approve Autopay';
//employeePrincipleBalanceCard
export const PRINCIPLE_BALANCE: string = 'Principle balance';
export const UPCOMING_EVENT: string = 'Upcoming\nPayment';
export const AVERAGE_INTEREST: string = 'Average interest\nrate ';
export const LOAN_DATE: string = 'Advance\nDate';
//employeeRequiredLoanAmountCard
export const REQUIRED_LOAN_AMOUNT: string = 'Required Advance Amount';
export const TENOR_IN_MONTHS: string = 'Tenor(In Months)';
export const DOLLAR: string = '$';
export const RUPEES: string = '₹';
//employeeFAQ
export const FREQUENTLY_ASKED_QUESTIONS: string = 'Frequently Asked Questions';
//employeeThankyou
export const THANK_YOU: string =
  'Thank you!\nWe’re reviewing your\napplication';
export const WHATHAPPEN_NEXT: string = 'What happens next?';
export const MYDAY_EMAIL: string =
  'Myday payday will aim to email you with\na decision within 24 hours.';
export const GET_IN_TOUCH: string = 'Get in touch with mydaypayday';
export const CALL_US: string =
  'Call us on 020 3778 0274\n(Monday to Friday 9am - 6pm)';
export const EMAIL_US: string = 'Email us at';
export const STILL_NEED: string = 'Still need help?';
export const FIND_ANSWER: string = 'Find answer in';
//employeeLoanPaymentHistoryCard
export const PAYMENT_HISTORY: string = 'Repayment History';
export const VIEW_ALL: string = 'View All';

//Edit profile (Employee)
export const FIRST_NAME: string = 'First Name';
export const ENTER_FIRST_NAME: string = 'Enter First Name';
export const LAST_NAME: string = 'Last Name';
export const ENTER_LAST_NAME: string = 'Enter Last Name';
export const DATE_OF_BIRTH: string = 'Date of Birth';
export const ENTER_DOB: string = 'Enter DOB';
export const EMAIL_ID: string = 'Email ID';
export const ENTER_EMAIL_ID: string = 'Enter Email Id';
export const MOBILE_NUMBER: string = 'Mobile Number';
export const ENTER_MOBILE_NUMBER: string = 'Enter Mobile Number';
export const DESIGNATION: string = 'Designation';
export const ENTER_DESIGNATION: string = ' Enter Designation';
export const ORGANIZATION_NAME: string = 'Organization Name';
export const AADHAAR_NUMBER: string = 'Aadhaar number';
export const PAN_NUMBER: string = 'PAN';
export const ENTER_ORGANIZATION_NAME: string = 'Enter Organization Name';
export const ENTER_AADHAAR_NAME: string = 'Enter Aadhaar Name';
export const ENTER_PAN: string = 'Enter PAN';

//Edit profile (Organization)
export const COMPANY_NAME: string = 'Company Name';
export const ENTER_COMPANY_NAME: string = 'Enter Company Name';
export const CLIENT_NAME: string = 'Client Name';
export const ENTER_CLIENT_NAME: string = 'Enter Client Name';
export const COMPANY_ADDRESS: string = 'Company Address';
export const ENTER_COMPANY_ADDRESS: string = 'Enter Company Address';
export const COMPANY_WEBSITE: string = 'Company Website';
export const ENTER_COMPANY_WEBSITE: string = 'Enter Company Website';
export const NO_OF_EMPLOYEES: string = 'No.of Employees';
export const ENTER_NO_OF_EMPLOYEES: string = 'Enter No.of Employees';
export const WORKING_HOURS: string = 'Working Hours';
export const ENTER_WORKING_HOURS: string = 'Enter Working Hours';
export const WORKING_DAYS: string = 'Working Days';
export const ENTER_WORKING_DAYS: string = 'Enter Working Days';
export const DATE_OF_INCORPORATION: string = 'Date of Incorporation';
export const ENTER_DATE_OF_INCORPORATION: string =
  'Enter Date of Incorporation';

//Empooyee delete Account
export const INFO: string = 'Info';
export const SEND_EMAIL: string = 'We have send a email to your';
export const FOR_ACCOUNT_CLOSE: string = 'for account close.';
//deleteModal
export const ARE_YOU_SURE_DELETE: string =
  'Are you sure you want to delete account';
//logoutModal
export const ARE_YOU_SURE_LOGOUT: string =
  'Are you sure you want to log out Account';
export const ARE_YOU_SURE_WANT_TO_PROCESS_THIS: string =
  'Are you sure want to process?';
export const ARE_YOU_SURE_WANT_TO_APPROVE_THIS: string =
  'Are you sure want to approve?';
export const ARE_YOU_SURE_WANT_TO_REJECT_THIS: string =
  'Are you sure want to reject?';
//Organization Home
export const DASHBOARD: string = 'Dashboard';
export const OVERVIEW: string = 'Overview';

export const TOTAL_EMPLOYEE_COUNT: string = 'Total Employee Count';
export const LOAN_PROCESS_STATISTICS: string =
  'Application process Statistics in Last 7 Days';
export const LOAN_REQUEST_RECEIVED: string = 'Request a Advance Received';
export const LOAN_APPROVED: string = 'Advance Approved';
export const LAST_SEVEN_DAYS: string = 'Last 7 Days';
export const TOTAL_COUNT: string = 'Total Count';
export const ACTIVE_IN_APP: string = 'Active in App';
