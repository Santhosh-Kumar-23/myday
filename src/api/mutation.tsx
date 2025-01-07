import {gql} from '@apollo/client';

export const loginDetails = gql`
  mutation Mutation($input: login_input_mobile) {
    loginMobile(input: $input) {
      faceId
      message
      notification
      pointId
      status
      token
      refreshToken
      type
      userId
    }
  }
`;
export const biometricsAndNotification = gql`
  mutation UpdateProfile($input: update_profile_input) {
    updateProfile(input: $input) {
      status
      data {
        _id
        deviceId
        deviceType
        userId
        userType
        faceId
        pointId
        notification
      }
    }
  }
`;

export const ForgotPassword = gql`
  mutation Mutation($email: String!) {
    forgotPasswordMobile(email: $email) {
      status
      message
      otp
    }
  }
`;

export const otp = gql`
  mutation OtpValidation($otp: String!, $email: String!) {
    otpValidation(otp: $otp, email: $email) {
      status
      message
      data {
        userId
        type
        email
      }
    }
  }
`;

export const resetPassword = gql`
  mutation Mutation(
    $userId: String!
    $type: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    resetPasswordMobile(
      userId: $userId
      type: $type
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      status
      message
    }
  }
`;

export const adminChangePassword = gql`
  mutation Mutation($input: ChangePasswordInput) {
    changePassword(input: $input) {
      status
      message
    }
  }
`;

export const logOut = gql`
  mutation MobileLogout($deviceId: String) {
    mobileLogout(deviceId: $deviceId) {
      status
      message
    }
  }
`;

export const Notification_biomterics = gql`
  mutation Mutation($input: update_profile_input) {
    updateProfile(input: $input) {
      data {
        _id
        deviceId
        deviceType
        faceId
        notification
        pointId
        userId
        userType
      }
    }
  }
`;

export const ADMIN_UPDATE_USER_DETAILS = gql`
  mutation Mutation($input: UpdateAdminProfileInput) {
    updateAdminProfile(input: $input) {
      status
      message
    }
  }
`;

export const EMPLOYEE_SIGUP = gql`
  mutation RegisterEmployee($input: RegisterEmployee) {
    registerEmployee(input: $input) {
      status
      message
    }
  }
`;

export const EMPLOYEE_CREATE_LOAN_REQUEST = gql`
  mutation CreateLoanRequest($input: LoanRequestInput) {
    createLoanRequest(input: $input) {
      status
      message
      data {
        _id
        employee {
          _id
          employee_id
          first_name
          last_name
          email
          gender
          marital_status
          dob
          job_title
          profile
          org_name
          exp_years
          resign_submitted_date
          probation_period
          contact_number
          joining_date
          employess_documents
        }
        applicationNo
        status
        loanType
        loanAmount
        creditAmount
        processingFee
        processingFeePercentage
        tenure
        documents {
          _id
          name
          file
          fileType
          size
          uploadedDate
        }
        isMove
        workflow {
          _id
          name
          components {
            _id
            name
            description
            status
          }
        }
        createdAt
        organizationId
        organization {
          _id
          email
        }
        employeeId
        workflowId
      }
    }
  }
`;
export const UPDATE_LOAN_REQUEST = gql`
  mutation UpdateLoanRequest(
    $updateLoanRequestId: ID!
    $isSubmitted: Boolean!
  ) {
    updateLoanRequest(id: $updateLoanRequestId, isSubmitted: $isSubmitted) {
      status
      message
      data {
        _id
        employee {
          _id
          employee_id
          first_name
          last_name
          email
          gender
          marital_status
          dob
          job_title
          profile
          organizationId
          org_name
          exp_years
          resign_submitted_date
          probation_period
          contact_number
          joining_date
          loan_details {
            id
            orderId
            transactionId
            loan_type
            loan_amount
            interest_rate
            repayment_schedule
            repayment_method
          }
          repayment_details {
            orderId
            transactionId
            merchantId
            loan_type
            loan_amount
            interest_rate
            loan_process_date
          }
          employess_documents
          type
          isNew
          loans {
            _id
            employeeId
            organizationId
            applicationNo
            status
            loanType
            loanAmount
            tenure
            isMove
            workflowId
            createdAt
          }
        }
        organization {
          _id
          org_name
          email
          contact
          country
          address_1st_line
          address_2nd_line
          city
          post_code
          website
          founders_name
          directors_name
          sector
          legal_structure
          registration_info
          no_of_employees
          description
          company_logo {
            _id
            name
            file
            fileType
            size
            uploadedDate
          }
          account_holder_name
          account_number
          bank_name
          branch_location
          identifier_code
          tax_payerId
          tax_identification_number
          license_permits {
            _id
            name
            file
            fileType
            size
            uploadedDate
          }
          privacy_policy {
            _id
            name
            file
            fileType
            size
            uploadedDate
          }
          terms_conditions {
            _id
            name
            file
            fileType
            size
            uploadedDate
          }
          status
          type
          role {
            _id
            Role_Name
            panel_type
            Permissions {
              permission {
                _id
                label
                name
                panel_type
              }
              access_controll {
                create
                read
                edit
                delete
              }
            }
          }
          roleId
        }
        employeeId
        organizationId
        applicationNo
        status
        loanType
        loanAmount
        tenure
        documents {
          _id
          name
          file
          title
          fileType
          size
          uploadedDate
        }
        isMove
        workflow {
          _id
          name
          components {
            _id
            name
            label
            description
            status
          }
          organizations {
            _id
            org_name
            email
            contact
            country
            address_1st_line
            address_2nd_line
            city
            post_code
            website
            founders_name
            directors_name
            sector
            legal_structure
            registration_info
            no_of_employees
            description
            account_holder_name
            account_number
            bank_name
            branch_location
            identifier_code
            tax_payerId
            tax_identification_number
            status
            type
            roleId
          }
          status
        }
        workflowId
        createdAt
      }
    }
  }
`;

export const APPROVAL_LOAN_STATUS = gql`
  mutation ApproveLoanStatus(
    $applicationId: ID
    $statusId: ID
    $isAccept: Boolean
  ) {
    approveLoanStatus(
      applicationId: $applicationId
      statusId: $statusId
      isAccept: $isAccept
    ) {
      status
      message
    }
  }
`;
export const NotificationApi = gql`
  mutation UpdateFcmToken(
    $fcmToken: String
    $deviceId: String
    $deviceType: String
  ) {
    updateFcmToken(
      fcmToken: $fcmToken
      deviceId: $deviceId
      deviceType: $deviceType
    ) {
      status
      message
    }
  }
`;

export const GenerateAadharOtp = gql`
  mutation GenerateAadharOtp($aadharNo: String, $docType: Int) {
    generateAadharOtp(aadharNo: $aadharNo, docType: $docType)
  }
`;

export const VerifyAadharOtp = gql`
  mutation VerifyAadharOtp($transId: String, $otp: Int) {
    verifyAadharOtp(transId: $transId, otp: $otp)
  }
`;

export const VerifyPan = gql`
  mutation VerifyPan($docType: Int, $panNumber: String) {
    verifyPan(docType: $docType, PanNumber: $panNumber)
  }
`;

export const NotificationRead = gql`
  mutation MarkNotificationAsRead($markNotificationAsReadId: ID) {
    markNotificationAsRead(id: $markNotificationAsReadId) {
      _id
      title
      description
      from {
        ... on Employee {
          sender: _id
          employee_id
          first_name
          last_name
          email
          profile
        }
        ... on OrgDetails {
          _id
          org_name
          email

          company_logo {
            _id
            name
            file
          }
        }
        ... on ownerUser {
          _id
          firstName
          lastName
          email
          profile
        }
      }
      to {
        ... on Employee {
          receiver: _id
          employee_id
          first_name
          last_name
          email
          profile
        }
        ... on OrgDetails {
          _id
          org_name
          email

          company_logo {
            _id
            name
            file
            fileType
            size
            uploadedDate
          }
        }
        ... on ownerUser {
          _id
          firstName
          lastName
          email
          profile
        }
      }
      createdAt
      isRead
    }
  }
`;

export const DeleteNotification = gql`
  mutation Mutation($deleteNotificationId: ID) {
    deleteNotification(id: $deleteNotificationId) {
      status
      message
    }
  }
`;

export const DeleteAllNotification = gql`
  mutation Mutation($deleteAllNotificationId: [ID]) {
    deleteAllNotification(id: $deleteAllNotificationId) {
      status
      message
    }
  }
`;
export const ReadAllNotification = gql`
  mutation MarkAllNotification($markAllNotificationId: [ID]) {
    markAllNotification(id: $markAllNotificationId) {
      status
      message
    }
  }
`;
export const GetViewedUrl = gql`
  mutation GetViewedUrl($image: String) {
    getViewedUrl(image: $image)
  }
`;
export const DeleteAccountApi = gql`
  mutation EmployeeDeleteOtp {
    employeeDeleteOtp {
      status
      message
    }
  }
`;

export const DeleteAccountOtpApi = gql`
  mutation EmployeeDeleteAccount($otp: String) {
    employeeDeleteAccount(otp: $otp) {
      status
      message
    }
  }
`;

export const reFreshTokeApi = gql`
  mutation RefreshTokenGenerate($refreshToken: String) {
    refreshTokenGenerate(refreshToken: $refreshToken)
  }
`;
