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
        .nullable()
        .required('Please select any Portal'),
});

export const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required')
        .min(8)
});

export const additionalDetailsValidationSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Full Name is required'),
    HomeStreetAddress1: Yup.string()
        .required('address is required'),
    HomeCity: Yup.string()
        .required('City is required'),
    HomeState: Yup.string()
        .required('State is required'),
    HomeZipCode: Yup.string()
        .required('Zip code is required'),
    DLNumber: Yup.string()
        .required('Driving License is required'),
    DLState: Yup.string()
        .required('License state is required'),
});

export const companyValidationSchema = Yup.object().shape({
    CompanyName: Yup.string()
        .required('Full Name is required'),
    TaxIdentificationNumber: Yup.string()
        .required('Tax Identification Number is required'),
    CompanyStreetAddress1: Yup.string()
        .required('Address is required'),
    CompanyCity: Yup.string()
        .required('City is required'),
    CompanyState: Yup.string()
        .required('State is required'),
    CompanyZipCode: Yup.string()
        .required('Zip Code is required'),
});

export const companyPOCValidationSchema = Yup.object().shape({
    CompanyContactName: Yup.string()
        .required('Full Name is required'),
    CompanyContactTelephone: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    CompanyContactEmailAddress: Yup.string()
        .required('Email Address is required')
        .email('Email Address is invalid'),
    AuthorizedWGLContact: Yup.string()
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
        .min(8, '')
});

export const resetValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
});

export const uploadValidationSchema = Yup.object().shape({
    file: Yup.mixed().test('fileSize', 'File is too large', (value) => {
        return value && value.size <= 1000000; // 1MB limit
    }).required('File is required'),
    documentType: Yup.string()
        .required('Document type is required')
        .nullable(),
});
export const SupplierDetailsSchema = Yup.object().shape({
    companyName: Yup.string()
        .required('Company Name is Required'),
    companyWebsite: Yup.string()
        .required('Company Website is Required'),
    businessCatagory: Yup.string()
        .nullable()
        .required('Business Category is Required'),
    classification: Yup.string()
        .nullable()
        .required('Classification is Required'),
    services: Yup.string()
        .required('Services are Required'),
    expirydate: Yup.string()
        .required('Expiry Date is Required'),
    contactperson: Yup.string()
        .required('Contact Person is Required'),
    title: Yup.string()
        .required('Title is Required'),
    email: Yup.string()
        .required('Email is required')
        .email('Please provide a valid email address'),
    mobileNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    address: Yup.string()
        .required('address is required'),
    state: Yup.string()
        .nullable()
        .required('State is required'),
    country: Yup.string()
        .nullable()
        .required('Country is Required'),
    zipcode: Yup.string()
        .required('Zip code is required'),
})
