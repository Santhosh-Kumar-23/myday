export interface getOrganizationDetails {
  _id: string;
  org_name: string;
  email: string;
  contact: string[];
  country: string;
  address_1st_line: string;
  address_2nd_line: string;
  city: string;
  post_code: string;
  website: string;
  founders_name: string[];
  directors_name: string[];
  sector: string;
  legal_structure: string;
  registration_info: string;
  no_of_employees: string;
  description: string;
  company_logo: CompanyLogo[];
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  branch_location: string;
  identifier_code: string;
  tax_payerId: string;
  tax_identification_number: string;
  loanRequeststatusCounts: {
    approvedCount: number;
    pendingCount: number;
    rejectedCount: number;
  };
  license_permits: LicensePermit[];
  privacy_policy: PrivacyPolicy[];
  terms_conditions: TermsCondition[];
  status: string;
}

export interface CompanyLogo {
  _id: string;
  name: string | null;
  file: string;
  fileType: string | null;
  size: string | null;
  uploadedDate: string;
}

export interface LicensePermit {
  _id: string;
  name: string | null;
  file: string;
  fileType: string | null;
  size: string | null;
  uploadedDate: string;
}

export interface PrivacyPolicy {
  _id: string;
  name: string | null;
  file: string;
  fileType: string | null;
  size: string | null;
  uploadedDate: string;
}

export interface TermsCondition {
  _id: string;
  name: string | null;
  file: string;
  fileType: string | null;
  size: string | null;
  uploadedDate: string;
}
// Define Permission and AccessControl interfaces
export interface AccessControl {
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
}

export interface Permission {
  _id: string;
  label: string;
  name: string;
  panel_type: string;
  access_controll: AccessControl;
}

// Define Role interface
export interface Role {
  _id: string;
  Role_Name: string;
  panel_type: string;
  Permissions: {
    permission: Permission;
  }[];
}

// Define OwnerUser interface
export interface OwnerUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ownerstatus: string;
  role: Role;
  country: string;
  ownercontact: string;
  profile: string;
  is_default: boolean;
  reset_password_token: string;
}

// Define File interface for company_logo, license_permits, etc.
export interface File {
  _id: string;
  name: string;
  file: string;
  fileType: string;
  size: number;
  uploadedDate: string;
}

// Define OrgDetails interface
export interface OrgDetails {
  _id: string;
  org_name: string;
  email: string;
  contact: string;
  country: string;
  address_1st_line: string;
  address_2nd_line: string;
  city: string;
  post_code: string;
  website: string;
  founders_name: string;
  directors_name: string;
  sector: string;
  legal_structure: string;
  registration_info: string;
  no_of_employees: number;
  description: string;
  company_logo: File[];
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  branch_location: string;
  identifier_code: string;
  tax_payerId: string;
  tax_identification_number: string;
  license_permits: File[];
  privacy_policy: File[];
  terms_conditions: File[];
  status: string;
}

// Define DeviceLogin interface
export interface DeviceLogin {
  _id: string;
  deviceId: string;
  deviceType: string;
  userId: string;
  userType: string;
  faceId: string;
  pointId: string;
  notification: boolean;
}

// Define the main interface for the query response
export interface GetMobileUserLoginData {
  getMobileUserLoginData: {
    user: OwnerUser | OrgDetails;
    deviceLogin: DeviceLogin[];
  };
}

export interface EmployeeUserDetails {
  _id: string;
  accountId: {
    _id: string;
    account_holder_name: string;
    account_number: string;
    bank_name: string;
    branch_location: string;
    identifier_code: string;
  };
  contact_number: string[];
  dob: string; // You may want to use a Date object here depending on your needs
  email: string;
  employee_id: string;
  employess_documents: any; // You can define a type for documents if needed
  exp_years: string;
  first_name: string;
  gender: string;
  job_title: string;
  joining_date: string; // Date object can be used here as well
  last_name: string;
  loan_details: any; // Define a type for loan details if needed
  marital_status: string;
  organizationId: string;
  org_id: any;
  org_name: string;
  probation_period: string;
  profile: any; // Define a type for profile if needed
  repayment_details: any; // Define a type for repayment details if needed
  resign_submitted_date: string; // Date object can be used here as well
  salaryId: {
    _id: string;
    HRA: number | null;
    HRA_arrears: number | null;
    basic: number;
    basic_arrears: number;
    conveyance: number;
    conveyance_arrears: number;
    employee_pf: number;
    medical_allowance: number;
    medical_allowance_arrears: number;
    professional_tax: number;
    special_allowance: number;
    total_salary: number;
  };
}

export interface OrganizationUserDetails {
  __typename: 'OrgDetails';
  _id: string;
  account_holder_name: string;
  account_number: string;
  address_1st_line: string;
  address_2nd_line: string;
  bank_name: string;
  branch_location: string;
  city: string;
  company_logo: any[];
  contact: string[];
  country: string;
  description: string;
  directors_name: string[];
  email: string;
  founders_name: string[];
  identifier_code: string;
  legal_structure: string;
  license_permits: any;
  no_of_employees: string;
  org_name: string;
  post_code: string;
  privacy_policy: any;
  registration_info: any;
  role: {
    Permissions: object[][]; // Adjust based on the actual structure of Permissions objects
    Role_Name: string;
    __typename: 'RoleDetails';
    _id: string;
    panel_type: string;
  };
  roleId: string;
  sector: string;
  status: string;
  tax_identification_number: string;
  tax_payerId: string;
  terms_conditions: any;
  type: string;
  website: string;
}

//GET_MOBILE_USER_DATA

export interface GetMobileUserDataResponse {
  getMobileUserLoginData: GetMobileUserData;
}
// Define the interface for the DeviceInfo type
export interface DeviceInfo {
  __typename: 'DeviceInfo';
  _id: string;
  deviceId: string;
  deviceType: string;
  faceId: boolean;
  notification: boolean;
  pointId: boolean;
  userId: string;
  userType: string;
}

// Define the interface for the EmployeeAccountDetails type
export interface EmployeeAccountDetails {
  __typename: 'EmployeeAccountDetails';
  _id: string;
  bank_name: string;
}

// Define the interface for the EmployeeSalaryDetails type
export interface EmployeeSalaryDetails {
  __typename: 'EmployeeSalaryDetails';
  _id: string;
  employee_pf: number;
}

// Define the interface for the Organization type
export interface Organization {
  __typename: 'OrgDetails';
  _id: string;
  email: string;
  org_name: string;
}

// Define the interface for the Employee type
export interface Employee {
  __typename: 'Employee';
  account: EmployeeAccountDetails[];
  accountId: string;
  contact_number: string[];
  dob: string;
  email: string;
  emp_id: string;
  employee_id: string;
  employess_documents: any; // Define the type if known
  exp_years: string;
  first_name: string;
  gender: string;
  isNew: boolean;
  job_title: string;
  joining_date: string;
  last_name: string;
  marital_status: string;
  org_name: string;
  organization: Organization[];
  organizationId: string;
  probation_period: string;
  profile: any; // Define the type if known
  resign_submitted_date: any; // Define the type if known
  salary: EmployeeSalaryDetails[];
  salaryId: string;
  type: any; // Define the type if known
}

// Define the interface for the GetMobileUserData query result
export interface GetMobileUserData {
  __typename: 'GetMobileUserData';
  deviceLogin: DeviceInfo;
  user: Employee;
}

export interface organizationLoanTypeCount {
  find(arg0: (item: any) => boolean): unknown;
  map(arg0: (item: any) => any): unknown;
  length: number | undefined;
  __typename: string;
  category: string;
  count: number;
  isCheck: boolean;
  id: number;
  status: string | null;
}
