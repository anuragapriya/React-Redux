import React from 'react';
import { TextField } from '@mui/material';

const AdditionalDetails = ({ register, errors, control }) => {
    return <>
        <TextField
            {...register('fullName', { required: 'Full Name is required' })}
            label="First & Last Name"
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
        />
        <TextField
            {...register('address', { required: 'Street Address is required' })}
            label="Street Address"
            fullWidth
            margin="normal"
            error={!!errors.address}
            helperText={errors.address?.message}
        />
        <TextField
            {...register('city', { required: 'City is required' })}
            label="City"
            fullWidth
            margin="normal"
            error={!!errors.city}
            helperText={errors.city?.message}
        />
        <div className="row">
            <TextField
                {...register('state', { required: 'State is required' })}
                label="State"
                fullWidth
                margin="normal"
                error={!!errors.state}
                helperText={errors.state?.message}
            />
            <TextField
                {...register('zipcode', { required: 'Zip code is required' })}
                label="Zip code"
                fullWidth
                margin="normal"
                error={!!errors.zipcode}
                helperText={errors.zipcode?.message}
            />
        </div>
        <div className="row">
            <TextField
                {...register('drivinglicense', { required: 'Driving License is required' })}
                label="Driving License"
                fullWidth
                margin="normal"
                error={!!errors.drivinglicense}
                helperText={errors.drivinglicense?.message}
            />
            <TextField
                {...register('licenseStatus', { required: 'License status is required' })}
                label="License status"
                fullWidth
                margin="normal"
                error={!!errors.licenseStatus}
                helperText={errors.licenseStatus?.message}
            />
        </div>
    </>
};

export default AdditionalDetails;