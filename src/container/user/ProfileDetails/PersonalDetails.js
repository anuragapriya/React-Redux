import React, { useState, useEffect } from 'react';
import { portalList } from '_utils/tempData';
import {PasswordCheck,CustomFormControl,MobileNumberInput,PasswordInput,AutocompleteInput} from '_components';
import { Typography } from '@mui/material';

const PersonalDetails = ({ isPasswordValid, register, errors, watch, control, trigger, setIsPasswordValid }) => {
    const [inputColors, setInputColors] = useState({});
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const Password = watch('Password', '');
    const FirstName = watch('FirstName', '');

    useEffect(() => {
        if (errors.Password) {
            setShowPasswordCheck(true);
        }
    }, [errors.Password]);

    const handlePasswordFocus = () => {
        if (!isPasswordValid) {
            setShowPasswordCheck(true);
        }
    };

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); 
        const fieldError = errors[fieldName];

        if (fieldName === 'Password') {
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
                id="FirstName"
                label="Full Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <CustomFormControl
                id="CompanyName"
                label="Company Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <CustomFormControl
                id="EmailAddress"
                label="Email Address"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <MobileNumberInput
                control={control}
                name="MobileNumber"
                label="Phone Number"
                rules={{ required: 'Phone Number is required' }}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            <Typography component="div" className='passwordcheck'>
             <PasswordInput
                control={control}
                name="Password"
                label="Password"
                rules={{ required: 'Password is required' }}
                errors={errors}
                handleBlur={handleBlur}
                handleFocus={handlePasswordFocus}
                inputColors={inputColors}
                isPasswordValid={isPasswordValid}
            />
            
            {showPasswordCheck && (
                <PasswordCheck password={Password} userName={FirstName} onValidationChange={handlePasswordValidation} />
            )}
             </Typography>
            <Typography component="div" className='passwordcheck mobile-padding'>
            <AutocompleteInput
                control={control}
                name="PortalId"
                label="Select Portal"
                options={portalList}
                error={!!errors.PortalId}
                helperText={errors.PortalId?.message}
                handleBlur={handleBlur}
                inputColor={inputColors['PortalId']}
            />
            </Typography>
            
        </>
    );
};

export default PersonalDetails;