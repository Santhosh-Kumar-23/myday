import {gql} from '@apollo/client';

export const GET_ORGANIZATION_DETAILS = gql`
  query GetOrganizationDetails($filter: orgFilter!) {
    getOrganizationDetails(filter: $filter) {
      data {
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
      }
      total
      statusCount {
        Accepted
        Draft
        Pending
        Invited
      }
      pagination {
        previous
        next
      }
    }
  }
`;

export const GET_ORGANIZATION_DETAILS_BY_ID = gql`
  query Query($getOrganizationByIdId: ID!) {
    getOrganizationById(id: $getOrganizationByIdId) {
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
      loanRequeststatusCounts
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
  }
`;

export const GET_ADMIN_USER_DETAILS = gql`
  query GetMobileUserLoginData {
    getMobileUserLoginData {
      user {
        ... on ownerUser {
          _id
          firstName
          lastName
          email
          password
          statusOwner: status

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
          country
          contactOwner: contact
          profile
          is_default
          reset_password_token
          type
        }
        ... on OrgDetails {
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
        }
      }
      deviceLogin {
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
export const getNotificationAndBioStatus = gql`
  query GetUserBioPointData($deviceType: DeviceType) {
    getUserBioPointData(deviceType: $deviceType) {
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
`;

export const CHOOSE_ORGANIZATION = gql`
  query GetAllOrganizationForList {
    getAllOrganizationForList {
      _id
      org_name
    }
  }
`;

export const GET_MOBILE_USER_DATA = gql`
  query GetMobileUserLoginData($deviceType: DeviceType) {
    getMobileUserLoginData(deviceType: $deviceType) {
      user {
        ... on Employee {
          emp_id: _id
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
          organization {
            _id
            org_name
            email
          }
          org_name
          exp_years
          resign_submitted_date
          probation_period
          contact_number
          joining_date
          employess_documents
          isNew
          type
        }
        ... on OrgDetails {
          _id
          org_name
          email
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
        ... on ownerUser {
          _id
          firstName
          lastName
          email
          password
          status
          country
          contact
          profile
          roleId
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
          is_default
          reset_password_token
          type
        }
      }
      deviceLogin {
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

export const GET_EMPLOYEE_DETAILS = gql`
  query GetEmployeeById($getEmployeeByIdId: ID!) {
    getEmployeeById(id: $getEmployeeByIdId) {
      _id
      employee_id
      first_name
      last_name
      email
      hashMail
      gender
      marital_status
      workAddress
      permanentAddress
      presentAddress
      dob
      job_title
      attanceRecordExists
      manager {
        id
        email
      }
      employmentType
      department
      profile
      organizationId
      organization {
        _id
        org_name
        email
      }
      org_name
      exp_years
      resign_submitted_date
      attendance_percentage
      probation_period
      contact_number
      joining_date
      employess_documents
      branch_location
      compensation
      bankAccounts
      employeeKYC
      type
      isNew
      isLoanRaised
      loans {
        _id
        employee {
          _id
          employee_id
          first_name
          last_name
          email
          hashMail
          gender
          marital_status
          workAddress
          permanentAddress
          presentAddress
          dob
          job_title
          employmentType
          department
          profile
          organizationId
          org_name
          exp_years
          resign_submitted_date
          attendance_percentage
          probation_period
          contact_number
          joining_date
          employess_documents
          branch_location
          compensation
          bankAccounts
          employeeKYC
          type
          isNew
          isLoanRaised
          status
          activeapplication
        }
        employeeId
        organizationId
        label
        applicationNo
        status
        stage
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
          status
          application
        }
        isMove
        organizationWorkflowId
        workflowId
        createdAt
        loanFlowLogs {
          _id
          application
          title
          description
          label
          createdAt
        }
        ownerApprovalStatus {
          _id
          application
          label
          verifiedBy {
            _id
            firstName
            lastName
            email
            password
            status
            roleId
            country
            contact
            profile
            is_default
            reset_password_token
            type
          }
          status
          comments
          enable
          createdAt
          applicationNo
          updatedAt
        }
        organizationApprovalStatus {
          _id
          application
          level
          verifiedBy
          name
          status
          comments
          enable
          label
          createdAt
          applicationNo
          updatedAt
        }
        OrganizationWorkflow {
          _id
          name
          branch
          organizationId
          status
          createdAt
        }
        organizationLoanFlowLogs {
          _id
          title
          description
          isCompleted
          label
          updatedAt
          createdAt
        }
        loansCount
        previousLoanDueStatus
      }
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
      status
      activeapplication
      advanceSalaryLimit
    }
  }
`;
export const GET_ORGANIZATION_BY_ID = gql`
  query Query($getOrganizationByIdId: ID!) {
    getOrganizationById(id: $getOrganizationByIdId) {
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
  }
`;

export const GET_EMPLOYEE_FAQ = gql`
  query GetAllFAQ {
    getAllFAQ {
      id
      question
      answer
      status
      isClick
    }
  }
`;

export const ADMIN_GET_ALL_LOAN_REQUEST = gql`
  query GetAllLoanRequest($filter: LoanReqFilter) {
    getAllLoanRequest(filter: $filter) {
      data {
        _id
        employee {
          _id
          employee_id
          first_name
          last_name
          email
          gender
          branch_location
          department
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
          workAddress
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
      total
      statusCount {
        Pending
        Cancelled
        Drafted
        Approved
        Rejected
      }
      pagination {
        previous
        next
      }
    }
  }
`;

export const GET_EMPLOYEE_LOAN_STATUS = gql`
  query GetAllLoanRequest($filter: LoanReqFilter) {
    getAllLoanRequest(filter: $filter) {
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
        creditAmount
        processingFee
        processingFeePercentage
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
      total
      statusCount {
        Pending
        Cancelled
        Drafted
        Approved
        Rejected
      }
      pagination {
        previous
        next
      }
    }
  }
`;

export const GET_LOAN_REQUEST_STATUS = gql`
  query GetLoanRequest($getLoanRequestId: ID!) {
    getLoanRequest(id: $getLoanRequestId) {
      _id
      employee {
        _id
        employee_id
        first_name
        workAddress
        last_name
        email
        gender
        marital_status
        dob
        job_title
        profile
        branch_location
        attendance_percentage
        organizationId
        org_name
        exp_years
        resign_submitted_date
        probation_period
        contact_number
        manager {
          id
          email
        }
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
        isNew
        loans {
          _id
          applicationNo
          status
          loanType
          loanAmount
          tenure
          isMove
        }
      }

      organization {
        _id
        email
        org_name
        sector
      }
      label
      applicationNo
      status
      stage
      loanType
      loanAmount
      tenure
      documents {
        _id
        name
        title
        file
        fileType
        size
        uploadedDate
      }
      isMove

      createdAt
      organizationLoanFlowLogs {
        _id
        title
        description
        label
        isCompleted
        updatedAt
      }
      loanFlowLogs {
        _id
        application
        title
        description
        createdAt
      }
      ownerApprovalStatus {
        _id
        application
        label
        verifiedBy {
          _id
          firstName
        }
        status
        comments
        enable
        updatedAt
      }
      organizationApprovalStatus {
        _id
        applicationNo
        application
        level
        verifiedBy
        createdAt
        name
        label
        status
        comments
        enable
      }
    }
  }
`;

export const GET_ORGANIZATION_LOAN_COUNT = gql`
  query GetLoansCountMobile($organizationId: ID!) {
    getLoansCountMobile(organizationId: $organizationId) {
      category
      count
      isCheck
      id
      status
    }
  }
`;

export const ORGANIZATION_GET_ALL_LOAN_REQUEST = gql`
  query getAllLoanRequestOrganizationMobile($filter: LoanReqFilterMobile) {
    getAllLoanRequestOrganizationMobile(filter: $filter) {
      data {
        _id
        employee {
          _id
          employee_id
          first_name
          workAddress
          last_name
          email
          job_title
          profile
          organizationId
          branch_location
          org_name
          gender
        }
        employeeId
        organizationId
        applicationNo
        status
        stage
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
        createdAt
        loanFlowLogs {
          _id
          application
          title
          description
          createdAt
        }
      }
      total
    }
  }
`;

export const GET_LOAN_LOG_HISTORY = gql`
  query GetLogsByDate($applicationId: ID!) {
    getLogsByDate(applicationId: $applicationId) {
      date
      data {
        time
        title
        description
      }
    }
  }
`;

export const ORGANIZATION_DASHBOARD = gql`
  query GetDashboardDataForOrganization(
    $getDashboardDataForOrganizationId: ID
  ) {
    getDashboardDataForOrganization(id: $getDashboardDataForOrganizationId) {
      Employee {
        totalEmployee
        totalActiveEmployee
        employeeIncreasePercentage
        employeeActivePercentage
      }
      Loan {
        stacks {
          value
          color
        }
        label
      }
      Application {
        received
        approved
        approvedPercentage
      }
    }
  }
`;

export const EMPLOYEE_SHOW_PIPELINE = gql`
  query GetLoanPipelineLogs($applicationId: ID!) {
    getLoanPipelineLogs(applicationId: $applicationId) {
      applicationNo
      applicationId
      status
      loanType
      org_name
      pipelineLogs {
        _id
        title
        subTitle
        step
        description
        isCompleted
        createdAt
        updatedAt
      }
    }
  }
`;

export const DASHBOARD_CARD_DATA = gql`
  query GetLoanRequest($getLoanRequestId: ID!) {
    getLoanRequest(id: $getLoanRequestId) {
      _id
      label
      applicationNo
      status
      stage
      loanType
      loanAmount
      tenure
      createdAt
      ownerApprovalStatus {
        _id
        application
        label
        verifiedBy {
          _id
          firstName
        }
        status
        comments
        enable
        updatedAt
      }
      organizationApprovalStatus {
        _id
        applicationNo
        application
        level
        verifiedBy
        createdAt
        name
        label
        status
        comments
        enable
      }
    }
  }
`;

export const NOTIFICATION_LIST = gql`
  query getAllNotificationsByUser {
    getAllNotificationsByUser {
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
      mobileRedirect {
        info
        id
      }
    }
  }
`;

//Subscriptions
export const NOTIFICATION_PUSHER = gql`
  subscription notificationCount($userId: ID!) {
    notificationCount(userId: $userId)
  }
`;

export const GET_NOTIFICATION_COUNT = gql`
  query getNotificationCountByUser {
    getNotificationCountByUser
  }
`;

export const GET_CARD_CONTENT_API = gql`
  query getMenuItems {
    getMenuItems
  }
`;

export const GET_PROOF_DETAILS = gql`
  query GetEmployeeKycDetails {
    getEmployeeKycDetails {
      id
      Document
      Notification
      Status
    }
  }
`;

export const GET_ADMIN_DASHBOARD_DETAILS = gql`
  query getAdminDataMobile {
    getAdminDataMobile
  }
`;

export const ATTENDANCE_DETAILS = gql`
  query getLastSixMonthsAttendance($userId: ID) {
    getLastSixMonthsAttendance(userId: $userId)
  }
`;

export const GET_EMPLOYEE_ID_CARD = gql`
  query getEmployeeIdCard($userId: ID) {
    getEmployeeIdCard(userId: $userId)
  }
`;
