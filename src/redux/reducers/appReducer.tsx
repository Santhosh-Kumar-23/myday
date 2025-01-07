import * as Interfaces from '../../constants/interfaces';
import * as ReduxTypes from '../types/reduxtypes';
const initialState: Interfaces.AppReducerStateInterface = {
  userData: [],
  errorMessage: {
    errorMessage: '',
    status: false,
    errorType: '',
  },
  mobileUserData: {
    getMobileUserLoginData: {
      user: null,
      deviceLogin: [],
    },
  },
  getEmployeeDetails: {
    _id: '',
    accountId: {
      _id: '',
      account_holder_name: '',
      account_number: '',
      bank_name: '',
      branch_location: '',
      identifier_code: '',
    },
    contact_number: [],
    dob: '',
    email: '',
    employee_id: '',
    employess_documents: undefined,
    exp_years: '',
    first_name: '',
    gender: '',
    job_title: '',
    joining_date: '',
    last_name: '',
    loan_details: undefined,
    marital_status: '',
    organizationId: '',
    org_id: undefined,
    org_name: '',
    probation_period: '',
    profile: undefined,
    repayment_details: undefined,
    resign_submitted_date: '',
    salaryId: {
      _id: '',
      HRA: null,
      HRA_arrears: null,
      basic: 0,
      basic_arrears: 0,
      conveyance: 0,
      conveyance_arrears: 0,
      employee_pf: 0,
      medical_allowance: 0,
      medical_allowance_arrears: 0,
      professional_tax: 0,
      special_allowance: 0,
      total_salary: 0,
    },
  },
  getOrganizationDetails: {
    __typename: 'OrgDetails',
    _id: '',
    account_holder_name: '',
    account_number: '',
    address_1st_line: '',
    address_2nd_line: '',
    bank_name: '',
    branch_location: '',
    city: '',
    company_logo: [],
    contact: [],
    country: '',
    description: '',
    directors_name: [],
    email: '',
    founders_name: [],
    identifier_code: '',
    legal_structure: '',
    license_permits: undefined,
    no_of_employees: '',
    org_name: '',
    post_code: '',
    privacy_policy: undefined,
    registration_info: undefined,
    role: {
      Permissions: [],
      Role_Name: '',
      __typename: 'RoleDetails',
      _id: '',
      panel_type: '',
    },
    roleId: '',
    sector: '',
    status: '',
    tax_identification_number: '',
    tax_payerId: '',
    terms_conditions: undefined,
    type: '',
    website: '',
  },
  backOnline: false,
  networkStatus: true,
  pushNotificationToggleButton: false,
  employeeLoanDetails: {
    loanAmount: [0],
    interest: 0,
    tenure: 0,
  },
  enableBiometrics: false,
  ProfileUrl: '',
};

const AppReducer = (
  state = initialState,
  action: Interfaces.Action,
): Interfaces.AppReducerStateInterface => {
  switch (action.type) {
    case ReduxTypes.BACK_ONLINE:
      return {...state, backOnline: action.payload};
    case ReduxTypes.NETWORK_STATUS:
      return {...state, networkStatus: action.payload};
    case ReduxTypes.UserData:
      return {
        ...state,
        userData: action.payload,
      };
    case ReduxTypes.PUSH_NOTIFICATION_TOGGLE:
      return {
        ...state,
        pushNotificationToggleButton: action.payload,
      };
    case ReduxTypes.GET_USER_MOBILE_DATA:
      return {
        ...state,
        mobileUserData: action.payload,
      };
    case ReduxTypes.GET_EMPLOYEE_DETAILS:
      return {
        ...state,
        getEmployeeDetails: action.payload,
      };
    case ReduxTypes.GET_ORGANIZATION_DETAILS:
      return {
        ...state,
        getOrganizationDetails: action.payload,
      };

    case ReduxTypes.ERROR_DETAIS:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case ReduxTypes.EMPLOYEE_LOAN_DETAILS: {
      return {
        ...state,
        employeeLoanDetails: action.payload,
      };
    }
    case ReduxTypes.ENABLE_BIOMETRICS:
      return {...state, enableBiometrics: action.payload};
    case ReduxTypes.PROFILE_URL:
      return {...state, ProfileUrl: action.payload};
    default:
      return state;
  }
};

export default AppReducer;
