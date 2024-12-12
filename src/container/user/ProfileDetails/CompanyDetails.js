import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { CustomFormControl, MobileNumberInput } from '_components';

const CompanyDetails = ({ register, errors, control, trigger }) => {
    const [inputColors, setInputColors] = useState({});
    const handleBlur = async (e) => {
        const fieldName = e.target.name;

        console.log(`Triggering validation for: ${fieldName}`);
        const result = await trigger(fieldName); // Wait for the validation to complete
        console.log(`Validation result for ${fieldName}:`, result);

        const fieldError = errors[fieldName];
        console.log(`Error for ${fieldName}:`, fieldError);

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));
    };
    return <>
        <CustomFormControl
            id="pocFullName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <MobileNumberInput
            control={control}
            name="pocMobileNumber"
            label="Phone Number"
            rules={{ required: 'Phone Number is required' }}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="pocEmailAddress"
            label="Email Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="authorizedContact"
            label="Authorized WGL Contact"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
    </>;
};

export default CompanyDetails;