import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

const CompanyDetails = ({ register, errors, control, trigger }) => {
    return <>
        <TextField
            {...register('pocFullName', { required: 'Full Name is required' })}
            label="Full Name"
            fullWidth
            margin="normal"
            error={!!errors.pocFullName}
            helperText={errors.pocFullName?.message}
        />
        <Controller
            name="pocMobileNumber"
            control={control}
            rules={{ required: 'Phone Number is required' }}
            render={({ field }) => (
                <InputMask
                    mask="999-999-9999"
                    maskChar=""
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={() => trigger('pocMobileNumber')}
                >
                    {(inputProps) => (
                        <TextField
                            {...inputProps}
                            label="Phone Number"
                            fullWidth
                            margin="normal"
                            error={!!errors.pocMobileNumber}
                            helperText={errors.pocMobileNumber?.message}
                        />
                    )}
                </InputMask>
            )}
        />
        <TextField
            {...register('pocEmailAddress', { required: 'Email Address is required' })}
            label="Email Address"
            fullWidth
            margin="normal"
            error={!!errors.pocEmailAddress}
            helperText={errors.pocEmailAddress?.message}
            onBlur={() => trigger('pocEmailAddress')}
        />
        <TextField
            {...register('authorizedContact', { required: 'Authorized WGL Contact is required' })}
            label="Authorized WGL Contact"
            fullWidth
            margin="normal"
            error={!!errors.authorizedContact}
            helperText={errors.authorizedContact?.message}
        />
    </>;
};

export default CompanyDetails;