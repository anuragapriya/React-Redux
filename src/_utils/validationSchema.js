import * as Yup from 'yup';
export const registerValidationSchema = Yup.object().shape({
    FullName: Yup.string()
        .required('Full Name is required'),
    CompanyName: Yup.string()
        .required('Company Name is required'),
    MobileNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    EmailAddress: Yup.string()
        .required('Email Address is required')
        .email('Email Address is invalid'),
    Password: Yup.string()
        .required('Password is required')
        .test('minLength', value => value && value.length >= 16)
        .test('uppercase', value => /[A-Z]/.test(value))
        .test('lowercase', value => /[a-z]/.test(value))
        .test('number', value => /[0-9]/.test(value))
        .test('special', value => /[!@#$%^&*(),.?":{}|<>']/.test(value))
        .test('FullName', function (value) {
            const { FullName } = this.parent;
            return value && !value.toLowerCase().includes(FullName.toLowerCase());
        }),
    PortalId: Yup.number()
        .nullable()
        .required('Please select any Portal'),
});

export const passwordValidationSchema = (fullName) => Yup.object().shape({
    Password: Yup.string()
        .required('Password is required')
        .test('minLength', 'Password must be at least 16 characters', value => value && value.length >= 16)
        .test('uppercase', 'Password must contain at least one uppercase letter', value => /[A-Z]/.test(value))
        .test('lowercase', 'Password must contain at least one lowercase letter', value => /[a-z]/.test(value))
        .test('number', 'Password must contain at least one number', value => /[0-9]/.test(value))
        .test('special', 'Password must contain at least one special character', value => /[!@#$%^&*(),.?":{}|<>']/.test(value))
        .test('FullName', 'Password must not contain your full name', function (value) {
            return value && !value.toLowerCase().includes(fullName.toLowerCase());
        }),
});

export const additionalDetailsValidationSchema = Yup.object().shape({
    FullName: Yup.string()
        .required('Full Name is required'),
    HomeStreetAddress1: Yup.string()
        .nullable()
        .required('address is required'),
    HomeCity: Yup.string()
        .nullable()
        .required('City is required'),
    HomeState: Yup.number()
        .nullable()
        .required('State is required'),
    HomeZipCode: Yup.string()
        .nullable()
        .required('Zip code is required'),
    DLNumber: Yup.string()
        .nullable()
        .required('Driving License is required'),
    DLState: Yup.number()
        .nullable()
        .required('License state is required'),
});

export const companyValidationSchema = Yup.object().shape({
    CompanyName: Yup.string()
        .nullable()
        .required('Company Name is required'),
    TaxIdentificationNumber: Yup.string()
        .nullable()
        .required('Tax Identification Number is required'),
    CompanyStreetAddress1: Yup.string()
        .nullable()
        .required('Address is required'),
    CompanyCity: Yup.string()
        .nullable()
        .required('City is required'),
    CompanyState: Yup.number()
        .nullable()
        .required('State is required'),
    CompanyZipCode: Yup.string()
        .nullable()
        .required('Zip Code is required'),
});

export const companyPOCValidationSchema = Yup.object().shape({
    CompanyContactName: Yup.string()
        .nullable()
        .required('Full Name is required'),
    CompanyContactTelephone: Yup.string()
        .nullable()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    CompanyContactEmailAddress: Yup.string()
        .nullable()
        .required('Email Address is required')
        .email('Email Address is invalid'),
    AuthorizedWGLContact: Yup.string()
        .nullable()
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
    Email: Yup.string()
        .required('Email is required')
        .email('Please provide a valid email address'),
    Password: Yup.string()
        .required('Password is required'),
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
    CompanyName: Yup.string().nullable().required('Company Name is Required'),
    CompanyWebsite: Yup.string().nullable().required('Company Website is Required'),
    CategoryID: Yup.number().nullable().required('Business Category is Required'),
    ClassificationID: Yup.string().nullable().required('Classification is required'),
    ServicesProductsProvided: Yup.string().nullable().required('Services are Required'),
    ExpiryDate: Yup.string().nullable().required('Expiry Date is Required'),
    ContactPerson: Yup.string().nullable().required('Contact Person is Required'),
    Title: Yup.string().nullable().required('Title is Required'),
    Email: Yup.string().nullable().required('Email is required').email('Please provide a valid email address'),
    PhoneNumber: Yup.string().nullable().required('Phone Number is required').matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    Address: Yup.string().nullable().required('Address is required'),
    State: Yup.number().nullable().required('State is required'),
    City: Yup.string().nullable().required('City is Required'),
    ZipCode: Yup.string().nullable().required('Zip code is required'),
    AgencyID: Yup.number().nullable().required('Agency is Required'),
    AgencyStateID: Yup.number().nullable().required('Agency State is Required'),    
});
