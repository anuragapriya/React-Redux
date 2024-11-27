export const user = {
    id: null,
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
            PortalName: "AccountInquiry",
            PortalRole: "Admin",
            IsProfileCompleted:1,
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
            PortalName: "EnergyAssistance",
            PortalRole: "Admin",
            IsProfileCompleted:0,
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
            PortalName: "MapCenter",
            PortalRole: "SecurityReviewer",
            IsProfileCompleted:0,
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
            IsProfileCompleted:1,
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

export const labels = {
    loginHeader: "Log In",
    loginButtonLabel: "LOGIN",
    resetPwdButtonLabel: "Reset Password",
    signUpLabel: "Sign Up",
    passwordChecklistLabel: "Your password must contain:",
    jurisdictionLabel: "JURISDICTION",
    seasonStartLabel: "SEASON START",
    seasonEndLabel: "SEASON END",
    manageProfileLabel: "Manage Profile"
}

export const portalAccessData=[
    {
        "PortalId": 1,
        "PortalName": "Account Inquiry",
        "UserDetails": {
            "FirstName": "Ravi",
            "LastName": "Soni",
            "EmailAddress": "ravi.soni1@sutherlandglobal.com"
        },
        "PortalRoleAccess": [
            {
                "RoleId": 1,
                "Role": "Admin",
                "FeatureAccess": [
                    {
                        "FeatureId": 1,
						"MappingFeatureId": 1,
                        "Name": "UnlockProfile",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 2,
						"MappingFeatureId": 2,
                        "Name": "ResetPassword",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 3,
						"MappingFeatureId": 3,
                        "Name": "DeleteProfile",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 4,
						"MappingFeatureId": 4,
                        "Name": "ForgotPassword",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 5,
						"MappingFeatureId": 5,
                        "Name": "UserRegistration",
                        "Isactive": 1
                    }
                ]
            },
            {
                "RoleId": 2,
                "Role": "Contributor",
                "FeatureAccess": [
                    {
                        "FeatureId": 1,
						"MappingFeatureId": 6,
                        "Name": "UnlockProfile",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 2,
						"MappingFeatureId": 7,
                        "Name": "ResetPassword",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 3,
						"MappingFeatureId": 8,
                        "Name": "DeleteProfile",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 4,
						"MappingFeatureId": 9,
                        "Name": "ForgotPassword",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 5,
						"MappingFeatureId": 10,
                        "Name": "UserRegistration",
                        "Isactive": 1
                    }
                ]
            },
            {
                "RoleId": 3,
                "Role": "SecurityReviewer",
                "FeatureAccess": [
                    {
                        "FeatureId": 1,
						"MappingFeatureId": 11,
                        "Name": "UnlockProfile",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 2,
						"MappingFeatureId": 12,
                        "Name": "ResetPassword",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 3,
						"MappingFeatureId": 13,
                        "Name": "DeleteProfile",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 4,
						"MappingFeatureId": 14,
                        "Name": "ForgotPassword",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 5,
						"MappingFeatureId": 15,
                        "Name": "UserRegistration",
                        "Isactive": 0
                    }
                ]
            },
            {
                "RoleId": 4,
                "Role": "StandardUser",
                "FeatureAccess": [
                    {
                        "FeatureId": 1,
						"MappingFeatureId": 16,
                        "Name": "UnlockProfile",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 2,
						"MappingFeatureId": 17,
                        "Name": "ResetPassword",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 3,
						"MappingFeatureId": 18,
                        "Name": "DeleteProfile",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 4,
						"MappingFeatureId": 19,
                        "Name": "ForgotPassword",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 5,
						"MappingFeatureId": 20,
                        "Name": "UserRegistration",
                        "Isactive": 0
                    }
                ]
            }
        ]
    },
    {
        "PortalId": 2,
        "PortalName": "Energy Assistance",
        "UserDetails": {
            "FirstName": "Ravi",
            "LastName": "Soni",
            "EmailAddress": "ravi.soni1@sutherlandglobal.com"
        },
        "PortalRoleAccess": [
            {
                "RoleId": 5,
                "Role": "Admin",
                "FeatureAccess": [
                    {
                        "FeatureId": 6,
						"MappingFeatureId": 21,
                        "Name": "ApproveProfileRegistration",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 7,
						"MappingFeatureId": 22,
                        "Name": "RejectProfileRegistration",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 8,
						"MappingFeatureId": 23,
                        "Name": "VerifyProfileRegistration",
                        "Isactive": 1
                    }
                ]
            },
            {
                "RoleId": 6,
                "Role": "ContributorEA",
                "FeatureAccess": [
                    {
                        "FeatureId": 6,
						"MappingFeatureId": 24,
                        "Name": "ApproveProfileRegistration",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 7,
						"MappingFeatureId": 25,
                        "Name": "RejectProfileRegistration",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 8,
						"MappingFeatureId": 26,
                        "Name": "VerifyProfileRegistration",
                        "Isactive": 1
                    }
                ]
            },
            {
                "RoleId": 7,
                "Role": "InternalUser",
                "FeatureAccess": [
                    {
                        "FeatureId": 6,
						"MappingFeatureId": 27,
                        "Name": "ApproveProfileRegistration",
                        "Isactive": 1
                    },
                    {
                        "FeatureId": 7,
						"MappingFeatureId": 28,
                        "Name": "RejectProfileRegistration",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 8,
						"MappingFeatureId": 28,
                        "Name": "VerifyProfileRegistration",
                        "Isactive": 0
                    }
                ]
            },
            {
                "RoleId": 8,
                "Role": "StandardUser",
                "FeatureAccess": [
                    {
                        "FeatureId": 6,
						"MappingFeatureId": 29,
                        "Name": "ApproveProfileRegistration",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 7,
						"MappingFeatureId": 30,
                        "Name": "RejectProfileRegistration",
                        "Isactive": 0
                    },
                    {
                        "FeatureId": 8,
						"MappingFeatureId": 31,
                        "Name": "VerifyProfileRegistration",
                        "Isactive": 1
                    }
                ]
            }
        ]
    }
]