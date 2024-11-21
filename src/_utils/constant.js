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
    assignTOJurisdiction: ''
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