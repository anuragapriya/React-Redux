import React, { useState } from 'react';
import { portalList } from '_utils/tempData';
import {PasswordCheck,CustomFormControl,MobileNumberInput,PasswordInput,AutocompleteInput} from '_components';

const PersonalDetails = ({ register, errors, watch, control, trigger }) => {
    const [inputColors, setInputColors] = useState({});
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const password = watch('password');

    const handlePasswordFocus = () => {
        setShowPasswordCheck(true);
        setIsPasswordFocused(true);
    };

    const handleOtherFocus = () => {
        setIsPasswordFocused(false);
    };

    const handleBlur = (e) => {
        const fieldName = e.target.name;
        const fieldError = errors[fieldName];

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));

        trigger(fieldName); // Trigger validation for the field
    };

    return (
        <>
            <CustomFormControl
                id="fullName"
                label="Full Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handleOtherFocus}
                inputColors={inputColors}
            />
            <CustomFormControl
                id="companyName"
                label="Company Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handleOtherFocus}
                inputColors={inputColors}
            />
            <CustomFormControl
                id="emailAddress"
                label="Email Address"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handleOtherFocus}
                inputColors={inputColors}
            />
           
           <MobileNumberInput
                control={control}
                name="mobileNumber"
                label="Phone Number"
                rules={{ required: 'Phone Number is required' }}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handleOtherFocus}
                inputColors={inputColors}
            />
             <PasswordInput
                control={control}
                name="password"
                label="Password"
                rules={{ required: 'Password is required' }}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handlePasswordFocus}
                inputColors={inputColors}
            />
            {showPasswordCheck && isPasswordFocused && <PasswordCheck password={password} confirmPassword='' />}
            <AutocompleteInput
                control={control}
                name="selectPortal"
                label="Select Portal"
                options={portalList}
                error={!!errors.selectPortal}
                helperText={errors.selectPortal?.message}
                handleBlur={handleBlur}
                onFocus={handleOtherFocus}
                inputColor={inputColors['selectPortal']}
            />
        </>
    );
};

export default PersonalDetails;