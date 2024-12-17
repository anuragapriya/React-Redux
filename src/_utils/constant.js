// export const user = {
//   id: 1,
//   userName: '',
//   isVerified: false,
//   jwtToken: '',
//   tokenExpiry: '',
//   refreshToken: '',
//   refreshTokenExpiry: '',
//   UserDetails: {
//     FirstName: "Ravi",
//     LastName: "Soni",
//     EmailAddress: "ravi.soni1@sutherlandglobal.com"
//   },
//   UserAccess: [
//     {
//       PortalKey: "AI",
//       PortalName: "AccountInquiry",
//       PortalRole: "Admin",
//       IsProfileCompleted: 1,
//       PortalAccess:
//       {
//         UnlockProfile: 1,
//         ResetPassword: 1,
//         DeleteProfile: 1,
//         ForgotPassword: 1,
//         AssignAgency: 1,
//         UserRegistration: 1,
//         ApproveProfileRegistration: 1,
//         RejectProfileRegistration: 1,
//         SearchbyAccountHolder: 1,
//         WashingtonGasAccount: 1,
//         TelephoneNumber: 1,
//         ServiceAddress: 1,
//         SearchResult: 1,
//         ViewOrganizationProfiles: 1
//       }
//     },
//     {
//       PortalKey: "EA",
//       PortalName: "EnergyAssistance",
//       PortalRole: "Admin",
//       IsProfileCompleted: 0,
//       PortalAccess:
//       {
//         UnlockProfile: 1,
//         ResetPassword: 1,
//         DeleteProfile: 1,
//         ForgotPassword: 1,
//         AssignAgency: 1,
//         UserRegistration: 1,
//         ApproveProfileRegistration: 1,
//         RejectProfileRegistration: 1,
//         SearchbyAccountHolder: 1,
//         WashingtonGasAccount: 1,
//         TelephoneNumber: 1,
//         ServiceAddress: 1,
//         SearchResult: 1,
//         ViewOrganizationProfiles: 1
//       }
//     },
//     {
//       PortalKey: "MC",
//       PortalName: "MapCenter",
//       PortalRole: "SecurityReviewer",
//       IsProfileCompleted: 0,
//       PortalAccess:
//       {
//         UnlockProfile: 0,
//         ResetPassword: 0,
//         DeleteProfile: 0,
//         UpdateTaxID: 0,
//         ApproveProfileRegistration: 1,
//         RejectProfileRegistration: 1,
//         VerifyProfileRegistration: 0,
//         EmailMapRequest: 0,
//         MapCenterAdminReport: 0,
//         ProfileSearch: 0,
//         MapRequestSearch: 0

//       }
//     },
//     {
//       PortalKey: "SD",
//       PortalName: "Suplier Diversity",
//       PortalRole: "Admin",
//       IsProfileCompleted: 0,
//       PortalAccess:
//       {
//         UnlockProfile: 0,
//         ResetPassword: 0,
//         DeleteProfile: 0,
//         UpdateTaxID: 0,
//         ApproveProfileRegistration: 1,
//         RejectProfileRegistration: 1,
//         VerifyProfileRegistration: 0,
//         EmailMapRequest: 0,
//         MapCenterAdminReport: 0,
//         ProfileSearch: 0,
//         MapRequestSearch: 0

//       }
//     },
//     {
//       PortalName: "usermanagement",
//       PortalRole: "Admin",
//       IsProfileCompleted: 1,
//       PortalAccess:
//       {
//         UnlockProfile: 1,
//         ResetPassword: 1,
//         DeleteProfile: 1,
//         UpdateTaxID: 1,
//         ApproveProfileRegistration: 1,
//         RejectProfileRegistration: 1,
//         VerifyProfileRegistration: 1,
//         EmailMapRequest: 1,
//         MapCenterAdminReport: 1,
//         ProfileSearch: 1,
//         MapRequestSearch: 1
//       }
//     },

//   ]
// };

export const user ={
  "Succeeded": true,
  "Message": null,
  "Errors": null,
  "Data": {
    "UserDetails": {
      "id": 1001,
      "FirstName": "Ravi",
      "LastName": "Soni",
      "email": "Ravi.Soni1@sutherlandglobal.com",
      "isVerified": true,
      "jwToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSYXZpLlNvbmkxQHN1dGhlcmxhbmRnbG9iYWwuY29tIiwianRpIjoiNDlhMWMwZjYtMGVlMy00ZjYxLTk4OTMtNWRiNGJmZWVhOTFjIiwiZW1haWwiOiJSYXZpLlNvbmkxQHN1dGhlcmxhbmRnbG9iYWwuY29tIiwidWlkIjoiUmF2aS5Tb25pMUBzdXRoZXJsYW5kZ2xvYmFsLmNvbSIsImlwIjoiMTkyLjE2OC4xLjUiLCJleHAiOjE3MzQwMTc4MzgsImlzcyI6Ildhc2hnYXMtZVNlcnZpY2UiLCJhdWQiOiJXYXNoZ2FzLWVTZXJ2aWNlIn0.gWctwIu5Uu-CbgbIi05dBAog9TP7C7Adxwvf07B_2xE",
      "Status": "Approved",
      "tokenExpiry": "2024-12-12T21:07:19.0712093+05:30",
      "isAdmin":true
    },
    "UserAccess": [
      {
        "PortalId": 1,
        "PortalName": "Account Inquiry",
        "PortalKey": "AI",
        "IsMandateDone": true,
        "RoleId": 3,
        "Role": "Contributor",
        "RoleAccess": [
          {
            "AccessName": "Unlock Profile ",
            "AccessKey": "UnlockProfile",
            "IsActive": true
          },
          {
            "AccessName": "Reset Password",
            "AccessKey": "ResetPassword",
            "IsActive": true
          },
          {
            "AccessName": "Delete Profile",
            "AccessKey": "DeleteProfile",
            "IsActive": true
          },
          {
            "AccessName": "Forgot Password",
            "AccessKey": "ForgotPassword",
            "IsActive": true
          },
          {
            "AccessName": "Assign Agency",
            "AccessKey": "AssignAgency",
            "IsActive": true
          },
          {
            "AccessName": "User Registration",
            "AccessKey": "UserRegistration",
            "IsActive": true
          },
          {
            "AccessName": "Approve Profile Registration",
            "AccessKey": "ApproveProfileRegistration",
            "IsActive": false
          },
          {
            "AccessName": "Reject Profile Registration",
            "AccessKey": "RejectProfileRegistration",
            "IsActive": false
          },
          {
            "AccessName": "Search by Account Holder",
            "AccessKey": "SearchbyAccountHolder",
            "IsActive": true
          },
          {
            "AccessName": "Washington Gas Account",
            "AccessKey": "WashingtonGasAccount",
            "IsActive": true
          },
          {
            "AccessName": "Telephone Number",
            "AccessKey": "TelephoneNumber",
            "IsActive": true
          },
          {
            "AccessName": "Service Address",
            "AccessKey": "ServiceAddress",
            "IsActive": true
          },
          {
            "AccessName": "Search Result",
            "AccessKey": "SearchResult",
            "IsActive": true
          },
          {
            "AccessName": "View Organization Profiles",
            "AccessKey": "ViewOrganizationProfiles",
            "IsActive": true
          }
        ]
      },
      {
        "PortalId": 2,
        "PortalName": "Energy Assistance",
        "PortalKey": "EA",
        "IsMandateDone": true,
        "RoleId": 4,
        "Role": "Owner",
        "RoleAccess": [
          {
            "AccessName": "Assign Jurisdisction",
            "AccessKey": "AssignJurisdisction",
            "IsActive": true
          },
          {
            "AccessName": "Search Account",
            "AccessKey": "SearchAccount",
            "IsActive": true
          },
          {
            "AccessName": "Energy Usage",
            "AccessKey": "EnergyUsage",
            "IsActive": true
          },
          {
            "AccessName": "Request Emergency Hold",
            "AccessKey": "RequestEmergencyHold",
            "IsActive": false
          },
          {
            "AccessName": "Reconnect Service",
            "AccessKey": "ReconnectService",
            "IsActive": true
          },
          {
            "AccessName": "View Printable Bill",
            "AccessKey": "ViewPrintableBill",
            "IsActive": true
          },
          {
            "AccessName": "View Payment  Transaction History",
            "AccessKey": "ViewPaymentTransactionHistory",
            "IsActive": true
          },
          {
            "AccessName": "Multiple Account Balance",
            "AccessKey": "MultipleAccountBalance",
            "IsActive": true
          },
          {
            "AccessName": "Multiple Energy Usage Report",
            "AccessKey": "MultipleEnergyUsageReport",
            "IsActive": true
          },
          {
            "AccessName": "Single Energy Usage Report",
            "AccessKey": "SingleEnergyUsageReport",
            "IsActive": true
          },
          {
            "AccessName": "Update Jurisdiction Season",
            "AccessKey": "UpdateJurisdictionSeason",
            "IsActive": true
          },
          {
            "AccessName": "Unlock Profile",
            "AccessKey": "UnlockProfile",
            "IsActive": true
          },
          {
            "AccessName": "Reset Password",
            "AccessKey": "ResetPassword",
            "IsActive": true
          },
          {
            "AccessName": "Delete Profile",
            "AccessKey": "DeleteProfile",
            "IsActive": true
          },
          {
            "AccessName": "Forgot Password",
            "AccessKey": "ForgotPassword",
            "IsActive": true
          }
        ]
      },
      {
        "PortalId": 3,
        "PortalName": "Map Center",
        "PortalKey": "MC",
        "IsMandateDone": true,
        "RoleId": 2,
        "Role": "Admin",
        "RoleAccess": [
          {
            "AccessName": "Unlock Profile",
            "AccessKey": "UnlockProfile",
            "IsActive": true
          },
          {
            "AccessName": "Reset Password",
            "AccessKey": "ResetPassword",
            "IsActive": true
          },
          {
            "AccessName": "Delete Profile",
            "AccessKey": "DeleteProfile",
            "IsActive": true
          },
          {
            "AccessName": "Update Tax Id",
            "AccessKey": "UpdateTaxId",
            "IsActive": true
          },
          {
            "AccessName": "Approve Profile Registration",
            "AccessKey": "ApproveProfileRegistration",
            "IsActive": false
          },
          {
            "AccessName": "Reject Profile Registration",
            "AccessKey": "RejectProfileRegistration",
            "IsActive": false
          },
          {
            "AccessName": "Verify Profile Registration",
            "AccessKey": "VerifyProfileRegistration",
            "IsActive": true
          },
          {
            "AccessName": "Email Map Request",
            "AccessKey": "EmailMapRequest",
            "IsActive": true
          },
          {
            "AccessName": "Map Centre Admin Reports",
            "AccessKey": "MapCentreAdminReports",
            "IsActive": true
          },
          {
            "AccessName": "Profile Search",
            "AccessKey": "ProfileSearch",
            "IsActive": true
          },
          {
            "AccessName": "Map Request Search",
            "AccessKey": "MapRequestSearch",
            "IsActive": true
          }
        ]
      },
      {
        "PortalId": 5,
        "PortalName": "Supplier Diversity",
        "PortalKey": "SD",
        "IsMandateDone": true,
        "RoleId": 2,
        "Role": "Admin",
        "RoleAccess": [
          {
            "AccessName": "View Registrants",
            "AccessKey": "ViewRegistrants",
            "IsActive": true
          },
          {
            "AccessName": "Search Using Different Vendor Details",
            "AccessKey": "SearchUsingDifferentVendorDetails",
            "IsActive": true
          },
          {
            "AccessName": "Select Category",
            "AccessKey": "SelectCategory",
            "IsActive": true
          },
          {
            "AccessName": "View Search Results",
            "AccessKey": "ViewSearchResults",
            "IsActive": true
          },
          {
            "AccessName": "Choose Date",
            "AccessKey": "ChooseDate",
            "IsActive": true
          },
          {
            "AccessName": "Choose Report Name",
            "AccessKey": "ChooseReportName",
            "IsActive": true
          },
          {
            "AccessName": "Extract",
            "AccessKey": "Extract",
            "IsActive": true
          }
        ]
      }
    ]
  }
}

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
      "IsVerified": true,
      "PortalId": 3,
      "PortlaName": "Map Center",
      "PortalKey": "MC",
      "IsMandateDone": false,
      "status":"submitted"
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
  createdDate:'',
  status:null,
  portalId:null,
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

export const statusData={
  "Succeeded": true,
  "Message": "Status Recieved",
  "Errors": null,
  "Data": [
    {
      "StatusId":1,
      "StatusKey":"submitted",
      "StatusDescription":"Submitted"
    },
    {
      "StatusId":2,
      "StatusKey":"verified",
      "StatusDescription":"Verified"
    },
    {
      "StatusId":3,
      "StatusKey":"partiallyverified",
      "StatusDescription":"Partially Verified"
    },
    {
      "StatusId":4,
      "StatusKey":"approved",
      "StatusDescription":"Approved"
    },
    {
      "StatusId":5,
      "StatusKey":"deny",
      "StatusDescription":"Deny"
    },
  ]
}

export const documentTypeData=[
  {
    documentId:"1",
    documentType:"drivingLicenseFront",
    documentDescription:"Driving License(Front)"
  },
  {
    documentId:"2",
    documentType:"drivingLicenseLast",
    documentDescription:"Driving License(Last)"
  },
  {
    documentId:"3",
    documentType:"nondisclosureagreement",
    documentDescription:"Non disclosure agreement"
  }
]

export const supportedFormat=['.jpg','.png','.doc','.docx','.pdf']