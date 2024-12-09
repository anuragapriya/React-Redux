import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name is required'),
    companyName: Yup.string()
        .required('Company Name is required'),
    mobileNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    emailAddress: Yup.string()
        .required('Email Address is required')
        .email('Email Address is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(8),
    selectPortal: Yup.number()
        .required('Please select any Portal'),
});

export const additionalDetailsValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name is required'),
    address: Yup.string()
        .required('address is required'),
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State is required'),
    zipcode: Yup.string()
        .required('Zip code is required'),
    drivinglicense: Yup.string()
        .required('Driving License is required'),
    licenseStatus: Yup.string()
        .required('License status is required'),
});

export const companyValidationSchema = Yup.object().shape({
    pocFullName: Yup.string()
        .required('Full Name is required'),
    pocMobileNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    pocEmailAddress: Yup.string()
        .required('Email Address is required')
        .email('Email Address is invalid'),
    authorizedContact: Yup.string()
        .required('Authorized WG Contact is required')
});

export const profileValidationSchema = () => Yup.object().shape({
    firstSecurityQuestion: Yup.number()
        .required('Please select the first security question'),
    firstSecurityAnswer: Yup.string()
        .required('First security answer is required'),
    secondSecurityQuestion: Yup.number()
        .required('Please select the second security question'),
    secondSecurityAnswer: Yup.string()
        .required('Second security answer is required'),
    thirdSecurityQuestion: Yup.number()
        .required('Please select the third security question'),
    thirdSecurityAnswer: Yup.string()
        .required('Third security answer is required'),
});

export const otpValidationSchema = Yup.object().shape({
    number1: Yup.string().required('Enter OTP'),
    number2: Yup.string().required('Enter OTP'),
    number3: Yup.string().required('Enter OTP'),
    number4: Yup.string().required('Enter OTP'),
    number5: Yup.string().required('Enter OTP')
});

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Please provide a valid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(8,'')
});

export const resetValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
});
