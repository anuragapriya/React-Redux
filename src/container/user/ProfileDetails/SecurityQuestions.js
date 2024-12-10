import React from 'react';
import { TextField } from '@mui/material';
import {  Controller } from 'react-hook-form';
import { ComboSelectBox } from '_components';
import { selectOptions } from '_utils/tempData';
const SecurityQuestions =({ id,register, errors,  control })=>
{
    return (<>
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

export default SecurityQuestions;