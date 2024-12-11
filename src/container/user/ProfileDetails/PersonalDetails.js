import React, { useState } from 'react';
import {  FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { ComboSelectBox, PasswordCheck, PasswordField } from '_components';
import { portalList } from '_utils/tempData';
import ErrorIcon from '@mui/icons-material/Error'; // Import an error icon from Material-UI

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
            <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.fullName}>
                <InputLabel htmlFor="fullName">Full Name</InputLabel>
                <OutlinedInput
                    id="fullName"
                    type="text"
                    {...register('fullName', { required: 'Full Name is required' })}
                    onBlur={handleBlur}
                    onFocus={handleOtherFocus}
                    endAdornment={
                        errors.fullName ? (
                            <InputAdornment position="end">
                                <ErrorIcon style={{ color: 'red' }} />
                            </InputAdornment>
                        ) : null
                    }
                    label="Full Name"
                    className={inputColors['fullName']}
                />
                <FormHelperText>{errors.fullName?.message}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.companyName}>
                <InputLabel htmlFor="companyName">Company Name</InputLabel>
                <OutlinedInput
                    id="companyName"
                    type="text"
                    {...register('companyName', { required: 'Company Name is required' })}
                    onBlur={handleBlur}
                    onFocus={handleOtherFocus}
                    endAdornment={
                        errors.companyName ? (
                            <InputAdornment position="end">
                                <ErrorIcon style={{ color: 'red' }} />
                            </InputAdornment>
                        ) : null
                    }
                    label="Company Name"
                    className={inputColors['companyName']}
                />
                <FormHelperText>{errors.companyName?.message}</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.emailAddress}>
                <InputLabel htmlFor="emailAddress">Email Address</InputLabel>
                <OutlinedInput
                    id="emailAddress"
                    type="text"
                    {...register('emailAddress', { required: 'Email Address is required' })}
                    onBlur={handleBlur}
                    onFocus={handleOtherFocus}
                    endAdornment={
                        errors.emailAddress ? (
                            <InputAdornment position="end">
                                <ErrorIcon style={{ color: 'red' }} />
                            </InputAdornment>
                        ) : null
                    }
                    label="Email Address"
                    className={inputColors['emailAddress']}
                />
                <FormHelperText>{errors.emailAddress?.message}</FormHelperText>
            </FormControl>
            <Controller
                name="mobileNumber"
                control={control}
                rules={{ required: 'Phone Number is required' }}
                render={({ field }) => (
                    <InputMask
                        mask="999-999-9999"
                        maskChar=""
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={handleBlur}
                        onFocus={handleOtherFocus}
                    >
                        {(inputProps) => (
                            <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.mobileNumber}>
                                <InputLabel htmlFor="mobileNumber">Phone Number</InputLabel>
                                <OutlinedInput
                                    {...inputProps}
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    endAdornment={
                                        errors.mobileNumber ? (
                                            <InputAdornment position="end">
                                                <ErrorIcon style={{ color: 'red' }} />
                                            </InputAdornment>
                                        ) : null
                                    }
                                    label="Phone Number"
                                    className={inputColors['mobileNumber']}
                                />
                                <FormHelperText>{errors.mobileNumber?.message}</FormHelperText>
                            </FormControl>
                        )}
                    </InputMask>
                )}
            />
            <PasswordField
                register={register}
                trigger={trigger}
                error={!!errors.password}
                helperText={errors.password?.message}
                onFocus={handlePasswordFocus}
                onBlur={handleBlur}
                isPasswordFocused={isPasswordFocused}
                inputColors={inputColors}
            />
            {showPasswordCheck && isPasswordFocused && <PasswordCheck password={password} confirmPassword='' />}
            <Controller
                name="selectPortal"
                control={control}
                rules={{ required: 'Please select any Portal' }}
                render={({ field }) => (
                    <ComboSelectBox
                        name="selectPortal"
                        className="selectPortal"
                        {...field}
                        boxLabel="Select Portal"
                        options={portalList}
                        handleChange={(value) => {
                            console.log('Selected Portal:', value);
                            field.onChange(value);
                        }}
                        error={!!errors.selectPortal}
                        helperText={errors.selectPortal?.message}
                        onFocus={handleOtherFocus}
                        onBlur={handleBlur}
                        inputColor={inputColors['selectPortal']}
                        trigger={trigger} // Pass the trigger function
                    />
                )}
            />
        </>
    );
};

export default PersonalDetails;