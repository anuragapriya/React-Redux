import * as Yup from 'yup';

export const registerValidationSchema= Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    companyName: Yup.string()
        .required('Company name is required'),
    mobileNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    emailAddress: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

export const profileValidationSchema=(id) => Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required'),
    lastName: Yup.string()
        .required('Last name is required'),
    companyName: Yup.string()
        .required('Company name is required'),
    mobileNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    emailAddress: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    confirmEmail: Yup.string()
        .required('Please confirm your email')
        .oneOf([Yup.ref('emailAddress')], 'Emails must match'),
    password: Yup.string()
        .concat(id ? null : Yup.string().required('Password is required'))
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
    //.concat(id ? null :Yup.string().required('Please confirm your password'))
        .oneOf([Yup.ref('password')], 'Passwords must match'),
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
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
});

export const resetValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
});
