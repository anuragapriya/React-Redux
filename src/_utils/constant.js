export const user = {
    id: null,
    userName: '',
    email: '',
    roles: [], // Ensure roles is an array of plain objects
    isVerified: false,
    jwtToken: '',
    tokenExpiry: '',
    refreshToken: '',
    refreshTokenExpiry: ''
};


export const userDetails={
    id: null,
    firstName:'',
    lastName: '',
    companyName:'',
    telephone:null,
    email: '',
    confirmEmail:'',
    password:'',
    confirmPassword:'',
    securityQuestions:[],
    firstSecurityQuestion:'',
    firstSecurityAnswer:'',
    secondSecurityQuestion:'',
    secondSecurityAnswer:'',
    thirdSecurityQuestion:'',
    thirdSecurityAnswer:'',
    organizationList:[],
    assignToAgency:'',
    assignTOJurisdiction:''
}

export const labels = {
    loginHeader:"Log In",
    loginButtonLabel:"LOGIN",
    resetPwdButtonLabel:"Reset Password",
    signUpLabel: "Sign Up",
    passwordChecklistLabel:"Your password must contain:",
    jurisdictionLabel:"JURISDICTION",
    seasonStartLabel:"SEASON START",
    seasonEndLabel:"SEASON END",
    manageProfileLabel:"Manage Profile"
}