export const user = {
  id: 1,
  userName: '',
  isVerified: false,
  jwtToken: '',
  tokenExpiry: '',
  refreshToken: '',
  refreshTokenExpiry: '',
  UserDetails: {
    FirstName: "Ravi",
    LastName: "Soni",
    EmailAddress: "ravi.soni1@sutherlandglobal.com"
  },
  UserAccess: [
    {
      PortalKey: "AI",
      PortalName: "AccountInquiry",
      PortalRole: "Admin",
      IsProfileCompleted: 1,
      PortalAccess:
      {
        UnlockProfile: 1,
        ResetPassword: 1,
        DeleteProfile: 1,
        ForgotPassword: 1,
        AssignAgency: 1,
        UserRegistration: 1,
        ApproveProfileRegistration: 1,
        RejectProfileRegistration: 1,
        SearchbyAccountHolder: 1,
        WashingtonGasAccount: 1,
        TelephoneNumber: 1,
        ServiceAddress: 1,
        SearchResult: 1,
        ViewOrganizationProfiles: 1
      }
    },
    {
      PortalKey: "EA",
      PortalName: "EnergyAssistance",
      PortalRole: "Admin",
      IsProfileCompleted: 0,
      PortalAccess:
      {
        UnlockProfile: 1,
        ResetPassword: 1,
        DeleteProfile: 1,
        ForgotPassword: 1,
        AssignAgency: 1,
        UserRegistration: 1,
        ApproveProfileRegistration: 1,
        RejectProfileRegistration: 1,
        SearchbyAccountHolder: 1,
        WashingtonGasAccount: 1,
        TelephoneNumber: 1,
        ServiceAddress: 1,
        SearchResult: 1,
        ViewOrganizationProfiles: 1
      }
    },
    {
      PortalKey: "MC",
      PortalName: "MapCenter",
      PortalRole: "SecurityReviewer",
      IsProfileCompleted: 0,
      PortalAccess:
      {
        UnlockProfile: 0,
        ResetPassword: 0,
        DeleteProfile: 0,
        UpdateTaxID: 0,
        ApproveProfileRegistration: 1,
        RejectProfileRegistration: 1,
        VerifyProfileRegistration: 0,
        EmailMapRequest: 0,
        MapCenterAdminReport: 0,
        ProfileSearch: 0,
        MapRequestSearch: 0

      }
    },
    {
      PortalKey: "SD",
      PortalName: "Suplier Diversity",
      PortalRole: "Admin",
      IsProfileCompleted: 0,
      PortalAccess:
      {
        UnlockProfile: 0,
        ResetPassword: 0,
        DeleteProfile: 0,
        UpdateTaxID: 0,
        ApproveProfileRegistration: 1,
        RejectProfileRegistration: 1,
        VerifyProfileRegistration: 0,
        EmailMapRequest: 0,
        MapCenterAdminReport: 0,
        ProfileSearch: 0,
        MapRequestSearch: 0

      }
    },
    {
      PortalName: "usermanagement",
      PortalRole: "Admin",
      IsProfileCompleted: 1,
      PortalAccess:
      {
        UnlockProfile: 1,
        ResetPassword: 1,
        DeleteProfile: 1,
        UpdateTaxID: 1,
        ApproveProfileRegistration: 1,
        RejectProfileRegistration: 1,
        VerifyProfileRegistration: 1,
        EmailMapRequest: 1,
        MapCenterAdminReport: 1,
        ProfileSearch: 1,
        MapRequestSearch: 1
      }
    },

  ]
};

export const portalData = [
  {
    PortalID: "1",
    PortalKey: "AI",
    PortalName: "Account Inquiry",
    Description: "To Manage Account Inquiry Details"
  },
  {
    PortalID: "2",
    PortalKey: "EA",
    PortalName: "Energy Assistance",
    Description: "To Manage Energy Assistance Details"
  },
  {
    PortalID: "3",
    PortalKey: "MC",
    PortalName: "Map Center",
    Description: "To Manage Map Center Details"
  },
  {
    PortalID: "4",
    PortalKey: "MB",
    PortalName: "Marketer & BBS",
    Description: "To Manage Marketer & BBS Details"
  },
  {
    PortalID: "5",
    PortalKey: "SD",
    PortalName: "Supplier Diversity",
    Description: "To Manage Supplier Diversity Details"
  },
];

export const userRegistrationVerified = {
    "Data": {
      "Id": 1001,
      "FirstName": "Ravi",
      "LastName": "Soni",
      "Email": "Ravi.Soni1@sutherlandglobal.com",
      "IsVerified": false,
      "PortalId": 3,
      "PortlaName": "Map Center",
      "PortalKey": "MC",
      "IsMandateDone": false,
    }
};

export const userDetails = {
  id: null,
  firstName: '',
  lastName: '',
  companyName: '',
  telephone: null,
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  securityQuestions: [],
  firstSecurityQuestion: '',
  firstSecurityAnswer: '',
  secondSecurityQuestion: '',
  secondSecurityAnswer: '',
  thirdSecurityQuestion: '',
  thirdSecurityAnswer: '',
  organizationList: [],
  assignToAgency: '',
  assignToJurisdiction: ''
}

export const portalAccessData = {
  "Succeeded": true,
  "Message": "UserPortalRoleMappingResult Recieved",
  "Errors": null,
  "Data": [
    {
      "PortalID": 1,
      "PortalName": "Account Inquiry",
      "UserDetails": null,
      "PortalRoleAccess": [
        {
          "RoleID": 2,
          "RoleName": "Admin",
          "FeatureAccess": [
            {
              "AccessID": 1,
              "AccessName": "Unlock Profile ",
              "RoleAccessMappingID": 1,
              "IsActive": true
            },
            {
              "AccessID": 2,
              "AccessName": "Reset Password",
              "RoleAccessMappingID": 2,
              "IsActive": true
            },
            {
              "AccessID": 3,
              "AccessName": "Delete Profile",
              "RoleAccessMappingID": 3,
              "IsActive": true
            },
            {
              "AccessID": 4,
              "AccessName": "Forgot Password",
              "RoleAccessMappingID": 4,
              "IsActive": true
            },
            {
              "AccessID": 5,
              "AccessName": "Assign Agency",
              "RoleAccessMappingID": 5,
              "IsActive": true
            },
            {
              "AccessID": 6,
              "AccessName": "User Registration",
              "RoleAccessMappingID": 6,
              "IsActive": true
            },
            {
              "AccessID": 7,
              "AccessName": "Approve Profile Registration",
              "RoleAccessMappingID": 7,
              "IsActive": true
            },
            {
              "AccessID": 8,
              "AccessName": "Reject Profile Registration",
              "RoleAccessMappingID": 8,
              "IsActive": true
            },
            {
              "AccessID": 9,
              "AccessName": "Search by Account Holder",
              "RoleAccessMappingID": 9,
              "IsActive": true
            },
            {
              "AccessID": 10,
              "AccessName": "Washington Gas Account",
              "RoleAccessMappingID": 10,
              "IsActive": true
            },
            {
              "AccessID": 11,
              "AccessName": "Telephone Number",
              "RoleAccessMappingID": 11,
              "IsActive": true
            },
            {
              "AccessID": 12,
              "AccessName": "Service Address",
              "RoleAccessMappingID": 12,
              "IsActive": true
            },
            {
              "AccessID": 13,
              "AccessName": "Search Result",
              "RoleAccessMappingID": 13,
              "IsActive": true
            },
            {
              "AccessID": 14,
              "AccessName": "View Organization Profiles",
              "RoleAccessMappingID": 14,
              "IsActive": true
            }
          ]
        },
        {
          "RoleID": 3,
          "RoleName": "Contributor",
          "FeatureAccess": [
            {
              "AccessID": 1,
              "AccessName": "Unlock Profile ",
              "RoleAccessMappingID": 15,
              "IsActive": false
            },
            {
              "AccessID": 2,
              "AccessName": "Reset Password",
              "RoleAccessMappingID": 16,
              "IsActive": true
            },
            {
              "AccessID": 3,
              "AccessName": "Delete Profile",
              "RoleAccessMappingID": 17,
              "IsActive": true
            },
            {
              "AccessID": 4,
              "AccessName": "Forgot Password",
              "RoleAccessMappingID": 18,
              "IsActive": true
            },
            {
              "AccessID": 5,
              "AccessName": "Assign Agency",
              "RoleAccessMappingID": 19,
              "IsActive": false
            },
            {
              "AccessID": 6,
              "AccessName": "User Registration",
              "RoleAccessMappingID": 20,
              "IsActive": true
            },
            {
              "AccessID": 7,
              "AccessName": "Approve Profile Registration",
              "RoleAccessMappingID": 21,
              "IsActive": false
            },
            {
              "AccessID": 8,
              "AccessName": "Reject Profile Registration",
              "RoleAccessMappingID": 22,
              "IsActive": false
            },
            {
              "AccessID": 9,
              "AccessName": "Search by Account Holder",
              "RoleAccessMappingID": 23,
              "IsActive": true
            },
            {
              "AccessID": 10,
              "AccessName": "Washington Gas Account",
              "RoleAccessMappingID": 24,
              "IsActive": true
            },
            {
              "AccessID": 11,
              "AccessName": "Telephone Number",
              "RoleAccessMappingID": 25,
              "IsActive": true
            },
            {
              "AccessID": 12,
              "AccessName": "Service Address",
              "RoleAccessMappingID": 26,
              "IsActive": true
            },
            {
              "AccessID": 13,
              "AccessName": "Search Result",
              "RoleAccessMappingID": 27,
              "IsActive": true
            },
            {
              "AccessID": 14,
              "AccessName": "View Organization Profiles",
              "RoleAccessMappingID": 28,
              "IsActive": false
            }
          ]
        },
        {
          "RoleID": 4,
          "RoleName": "Owner",
          "FeatureAccess": [
            {
              "AccessID": 1,
              "AccessName": "Unlock Profile ",
              "RoleAccessMappingID": 29,
              "IsActive": true
            },
            {
              "AccessID": 2,
              "AccessName": "Reset Password",
              "RoleAccessMappingID": 30,
              "IsActive": true
            },
            {
              "AccessID": 3,
              "AccessName": "Delete Profile",
              "RoleAccessMappingID": 31,
              "IsActive": true
            },
            {
              "AccessID": 4,
              "AccessName": "Forgot Password",
              "RoleAccessMappingID": 32,
              "IsActive": true
            },
            {
              "AccessID": 5,
              "AccessName": "Assign Agency",
              "RoleAccessMappingID": 33,
              "IsActive": true
            },
            {
              "AccessID": 6,
              "AccessName": "User Registration",
              "RoleAccessMappingID": 34,
              "IsActive": true
            },
            {
              "AccessID": 7,
              "AccessName": "Approve Profile Registration",
              "RoleAccessMappingID": 35,
              "IsActive": true
            },
            {
              "AccessID": 8,
              "AccessName": "Reject Profile Registration",
              "RoleAccessMappingID": 36,
              "IsActive": true
            },
            {
              "AccessID": 9,
              "AccessName": "Search by Account Holder",
              "RoleAccessMappingID": 37,
              "IsActive": true
            },
            {
              "AccessID": 10,
              "AccessName": "Washington Gas Account",
              "RoleAccessMappingID": 38,
              "IsActive": true
            },
            {
              "AccessID": 11,
              "AccessName": "Telephone Number",
              "RoleAccessMappingID": 39,
              "IsActive": true
            },
            {
              "AccessID": 12,
              "AccessName": "Service Address",
              "RoleAccessMappingID": 40,
              "IsActive": true
            }
          ]
        }
      ]
    }
  ]
}