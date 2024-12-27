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

export const passwordValidationSchema = Yup.object().shape({
    Password: Yup.string()
        .required('Password is required')
        .test('minLength', value => value && value.length >= 16)
        .test('uppercase', value => /[A-Z]/.test(value))
        .test('lowercase', value => /[a-z]/.test(value))
        .test('number', value => /[0-9]/.test(value))
        .test('special', value => /[!@#$%^&*(),.?":{}|<>']/.test(value))
        .test('FullName', function (value) {
            const { FullName } = this.parent;
            return value && !value?.toLowerCase().includes(FullName?.toLowerCase());
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
    HomeState: Yup.string()
        .nullable()
        .required('State is required'),
    HomeZipCode: Yup.string()
        .nullable()
        .required('Zip code is required'),
    DLNumber: Yup.string()
        .nullable()
        .required('Driving License is required'),
    DLState: Yup.string()
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
    CompanyState: Yup.string()
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
    CompanyName: Yup.string()
        .required('Company Name is Required'),
    CompanyWebsite: Yup.string()
        .required('Company Website is Required'),
    BusinessCatagory: Yup.string()
        .nullable()
        .required('Business Category is Required'),
    Classification: Yup.string()
        .nullable()
        .required('Classification is Required'),
    ServicesProductsProvided: Yup.string()
        .required('Services are Required'),
    expirydate: Yup.string()
        .required('Expiry Date is Required'),
    Contactperson: Yup.string()
        .required('Contact Person is Required'),
    Title: Yup.string()
        .required('Title is Required'),
    Email: Yup.string()
        .required('Email is required')
        .email('Please provide a valid email address'),
    PhoneNumber: Yup.string()
        .required('Phone Number is required')
        .matches(/^\d{3}-\d{3}-\d{4}$/, 'Phone number must be in the following format (eg. 123-123-1234)'),
    Address: Yup.string()
        .required('address is required'),
    State: Yup.string()
        .nullable()
        .required('State is required'),
    City: Yup.string()
        .nullable()
        .required('City is Required'),
    ZipCode: Yup.string()
        .required('Zip code is required'),
})
