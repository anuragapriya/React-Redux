import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { ComboSelectBox, PasswordCheck, PasswordField } from '_components';
import { portalList } from '_utils/tempData';

const PersonalDetails = ({ register, errors, watch, control, trigger }) => {
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

    return (
        <>
            <TextField
                {...register('fullName', { required: 'Full Name is required' })}
                label="Full Name"
                fullWidth
                margin="normal"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                onFocus={handleOtherFocus}
            />
            <TextField
                {...register('companyName', { required: 'Company Name is required' })}
                label="Company Name"
                fullWidth
                margin="normal"
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
                onFocus={handleOtherFocus}
            />
            <TextField
                {...register('emailAddress', { required: 'Email Address is required' })}
                label="Email Address"
                fullWidth
                margin="normal"
                error={!!errors.emailAddress}
                helperText={errors.emailAddress?.message}
                onFocus={handleOtherFocus}
                onBlur={() => trigger('emailAddress')}
            />
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
                        onBlur={() => trigger('mobileNumber')}
                        onFocus={handleOtherFocus}
                    >
                        {(inputProps) => (
                            <TextField
                                {...inputProps}
                                label="Phone Number"
                                fullWidth
                                margin="normal"
                                error={!!errors.mobileNumber}
                                helperText={errors.mobileNumber?.message}
                                onFocus={handleOtherFocus}
                            />
                        )}
                    </InputMask>
                )}
            />
            <PasswordField
                register={register}
                error={!!errors.password}
                helperText={errors.password?.message}
                onFocus={handlePasswordFocus}
                onBlur={handleOtherFocus}
                isPasswordFocused={isPasswordFocused}
            />
            {showPasswordCheck && isPasswordFocused && <PasswordCheck password={password} confirmPassword='' />}
            <Controller
                name="selectPortal"
                control={control}
                rules={{ required: 'Please select any Portal' }}
                render={({ field }) => (
                    <ComboSelectBox
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
                    />
                )}
            />
        </>
    );
};

export default PersonalDetails;