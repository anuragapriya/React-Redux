import React, { useState, useEffect } from 'react';
import { portalList } from '_utils/tempData';
import {PasswordCheck,CustomFormControl,MobileNumberInput,PasswordInput,AutocompleteInput} from '_components';
import { Typography } from '@mui/material';

const PersonalDetails = ({ isPasswordValid, register, errors, watch, control, trigger, setIsPasswordValid }) => {
    const [inputColors, setInputColors] = useState({});
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const password = watch('password', '');
    const fullName = watch('fullName', '');

    useEffect(() => {
        if (errors.password) {
            setShowPasswordCheck(true);
        }
    }, [errors.password]);

    const handlePasswordFocus = () => {
        if (!isPasswordValid) {
            setShowPasswordCheck(true);
        }
    };

    const handleBlur = (e) => {
        const fieldName = e.target.name;
        const fieldError = errors[fieldName];

        if (fieldName === 'password') {
            setInputColors(prevColors => ({
                ...prevColors,
                [fieldName]: isPasswordValid && !fieldError && e.target.value ? 'inputBackground' : ''
            }));
            if (isPasswordValid && !fieldError) {
                setShowPasswordCheck(false);
            }
        } else {
            setInputColors(prevColors => ({
                ...prevColors,
                [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
            }));
        }
        trigger(fieldName); // Trigger validation for the field
    };

    const handlePasswordValidation = (isValid) => {
        setIsPasswordValid(isValid);
        if (isValid) {
            setShowPasswordCheck(false);
        }
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
                inputColors={inputColors}
            />
            <CustomFormControl
                id="companyName"
                label="Company Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <CustomFormControl
                id="emailAddress"
                label="Email Address"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <MobileNumberInput
                control={control}
                name="mobileNumber"
                label="Phone Number"
                rules={{ required: 'Phone Number is required' }}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <Typography component="div" className='passwordcheck'>
             <PasswordInput
                control={control}
                name="password"
                label="Password"
                rules={{ required: 'Password is required' }}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handlePasswordFocus}
                inputColors={inputColors}
                isPasswordValid={isPasswordValid}
            />
            
            {showPasswordCheck && (
                <PasswordCheck password={password} userName={fullName} onValidationChange={handlePasswordValidation} />
            )}
             </Typography>
            <Typography component="div" className='passwordcheck mobile-padding'>
            <AutocompleteInput
                control={control}
                name="selectPortal"
                label="Select Portal"
                options={portalList}
                error={!!errors.selectPortal}
                helperText={errors.selectPortal?.message}
                handleBlur={handleBlur}
                inputColor={inputColors['selectPortal']}
            />
            </Typography>
            
        </>
    );
};

export default PersonalDetails;