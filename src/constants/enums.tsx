export enum StatusCodes {
  BAD_REQUEST = 400,
  ERROR = 500,
  INFO = 1,
  NEW = 201,
  NOT_FOUND = 404,
  SUCCESS = 200,
  UNAUTHORIZED = 401,
}
export enum LoanStatus {
  Draft = 'Draft',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Approved = 'Approved',
  Cancelled = 'Cancelled',
  NewApplication = 'New_Application',
  Final_Authorizer = 'Final_Authorizer',
  Preliminary_Review = 'Preliminary_Review',
  Document_Scrutiny = 'Document_Scrutiny',
  Risk_Assessment_Compliance = 'Risk_Assessment_Compliance',
  Credit_Evaluation = 'Credit_Evaluation',
  Loan_Documents = 'Loan_Documents',
  Management_Approval = 'Management_Approval',
  Disbursement = 'Disbursement',
  Level_1_Authorizer = 'Level_1_Authorizer',
  Level_2_Authorizer = 'Level_2_Authorizer',
  Level_3_Authorizer = 'Level_3_Authorizer',
  Level_4_Authorizer = 'Level_4_Authorizer',
  Level_5_Authorizer = 'Level_5_Authorizer',
}

export enum Elevation {
  inputElevation = 4,
  cardContainerElevation = 3,
}

export enum StatusColor {
  Pending = '#3B71CA',
  Approved = '#14A44D',
  Rejected = '#DC4C64',
  Cancelled = '#9E9E9E',
  Drafted = '#03A9F4',
  New_Application = '#2196F3',
  Preliminary_Review = '#E4A11B',
  Financial_Analysis = '#CDDC39',
  Document_Scrutiny = '#54B4D3',
  Risk_Assessment_Compliance = '#FFC107',
  Collateral_Evaluation = '#FF9800',
  Credit_Evaluation = '#FF5722',
  Loan_Documents = '#607D8B',
  Management_Approval = '#795548',
  Loan_Offer_and_Agreement = '#673AB7',
  Disbursement = '#3F51B5',
  Level_1_Authorizer = '#009688',
  Level_2_Authorizer = '#00796B',
  Level_3_Authorizer = '#004D40',
  Level_4_Authorizer = '#E91E63',
  Level_5_Authorizer = '#E91E63',
  Final_Authorizer = '#9FA6B2',
  waitingForApproval = '#AD6910',
}

export enum ModalErrorType {
  Warning = 'Warning',
  Error = 'Error',
  Info = 'Info',
  Success = 'Success',
}

export enum LoanRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  Drafted = 'Draft',
  New_Application = 'New_Application',
  Preliminary_Review = 'Preliminary_Review',
  Financial_Analysis = 'Financial_Analysis',
  Document_Scrutiny = 'Document_Scrutiny',
  Risk_Assessment_Compliance = 'Risk_Assessment_Compliance',
  Collateral_Evaluation = 'Collateral_Evaluation',
  Credit_Evaluation = 'Credit_Evaluation',
  Loan_Documents = 'Loan_Documents',
  Management_Approval = 'Management_Approval',
  Loan_Offer_and_Agreement = 'Loan_Offer_and_Agreement',
  Disbursement = 'Disbursement',
  Level_1_Authorizer = 'Level_1_Authorizer',
  Level_2_Authorizer = 'Level_2_Authorizer',
  Level_3_Authorizer = 'Level_3_Authorizer',
  Level_4_Authorizer = 'Level_4_Authorizer',
  Level_5_Authorizer = 'Level_5_Authorizer',
  Final_Authorizer = 'Final_Authorizer',
  waitingForApproval = 'Waiting For Approval',
  waitingForKreonApproval = 'Waiting For Kreon Approval',
  approvedByOrganization = 'Approved By Organization',
}

export enum Stage {
  Authorizer = 'Authorizer',
  Organization = 'Organization',
  Kreon = 'Kreon',
}

export enum AdminLoanRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  Drafted = 'Draft',
  New_Application = 'New_Application',
  Preliminary_Review = 'Preliminary_Review',
  Document_Scrutiny = 'Document_Scrutiny',
  Risk_Assessment_Compliance = 'Risk_Assessment_Compliance',
  Credit_Evaluation = 'Credit_Evaluation',
  Loan_Documents = 'Loan_Documents',
  Management_Approval = 'Management_Approval',
  Disbursement = 'Disbursement',
  Level_1_Authorizer = 'Level_1_Authorizer',
  Level_2_Authorizer = 'Level_2_Authorizer',
  Level_3_Authorizer = 'Level_3_Authorizer',
  Level_4_Authorizer = 'Level_4_Authorizer',
  Level_5_Authorizer = 'Level_5_Authorizer',
  Final_Authorizer = 'Final_Authorizer',
  // approvedByOrganization = 'Approved By Organization',
}
