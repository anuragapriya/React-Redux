import React from 'react';
import { TextField } from '@mui/material';
import {  Controller } from 'react-hook-form';
import { ComboSelectBox, PasswordCheck } from '_components';
import { selectOptions } from '_utils/tempData';

const PersonalDetails = ({id,register,errors,watch,control}) => {
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    return (<>
        <TextField
            {...register('firstName')}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
        />
        <TextField
            {...register('lastName')}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
        />
        <TextField
            {...register('companyName')}
            label="Company Name"
            fullWidth
            margin="normal"
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
        />
        <TextField
            {...register('mobileNumber')}
            label="Telephone"
            fullWidth
            margin="normal"
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber?.message}
        />
        <TextField
            {...register('emailAddress')}
            label="Email"
            fullWidth
            margin="normal"
            error={!!errors.emailAddress}
            helperText={errors.emailAddress?.message}
        />
        <TextField
            {...register('confirmEmail')}
            label="Confirm Email"
            fullWidth
            margin="normal"
            error={!!errors.confirmEmail}
            helperText={errors.confirmEmail?.message}
        />
        {!id && (
            <>
                <TextField
                    {...register('password')}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField
                    {...register('confirmPassword')}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                />
                <PasswordCheck password={password} confirmPassword={confirmPassword} />
            </>
        )}
        <Controller
            name="firstSecurityQuestion"
            control={control}
            render={({ field }) => (
                <ComboSelectBox
                    {...field}
                    boxLabel="First Security Question"
                    options={selectOptions}
                    handleChange={(value) => field.onChange(value)}
                    error={!!errors.firstSecurityQuestion}
                    helperText={errors.firstSecurityQuestion?.message}
                />
            )}
        />
        <TextField
            {...register('firstSecurityAnswer')}
            label="First Security Answer"
            fullWidth
            margin="normal"
            type={id ? 'password' : 'text'}
            error={!!errors.firstSecurityAnswer}
            helperText={errors.firstSecurityAnswer?.message}
        />
        <Controller
            name="secondSecurityQuestion"
            control={control}
            render={({ field }) => (
                <ComboSelectBox
                    {...field}
                    boxLabel="Second Security Question"
                    options={selectOptions}
                    handleChange={(value) => field.onChange(value)}
                    error={!!errors.secondSecurityQuestion}
                    helperText={errors.secondSecurityQuestion?.message}
                />
            )}
        />
        <TextField
            {...register('secondSecurityAnswer')}
            label="Second Security Answer"
            fullWidth
            margin="normal"
            type={id ? 'password' : 'text'}
            error={!!errors.secondSecurityAnswer}
            helperText={errors.secondSecurityAnswer?.message}
        />
        <Controller
            name="thirdSecurityQuestion"
            control={control}
            render={({ field }) => (
                <ComboSelectBox
                    {...field}
                    boxLabel="Third Security Question"
                    options={selectOptions}
                    handleChange={(value) => field.onChange(value)}
                    error={!!errors.thirdSecurityQuestion}
                    helperText={errors.thirdSecurityQuestion?.message}
                />
            )}
        />
        <TextField
            {...register('thirdSecurityAnswer')}
            label="Third Security Answer"
            fullWidth
            margin="normal"
            type={id ? 'password' : 'text'}
            error={!!errors.thirdSecurityAnswer}
            helperText={errors.thirdSecurityAnswer?.message}
        />
    </>);
};

export default PersonalDetails;