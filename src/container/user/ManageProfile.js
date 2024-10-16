import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { userActions, alertActions } from '_store';
import { ComboSelectBox, PasswordCheck } from '_components';
import { selectOptions } from '_utils/tempData';
import { profileValidationSchema } from '_utils/validationSchema';

const ManageProfile = ({title, open, handleClose, selectedrowId }) => {
    const id = selectedrowId;
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);

    const { register, handleSubmit, control, reset, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(profileValidationSchema(id))
    });

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    useEffect(() => {
        dispatch(userActions.clear());
            if (id) {
                
                dispatch(userActions.getById(id)).unwrap().then(user => reset(user));
            } else {
                
                reset(user); // Reset form state when adding a new user
            }        
    }, [id, dispatch, reset]);

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            let message;
            if (id) {
                await dispatch(userActions.update({ id, data })).unwrap();
                message = 'User updated';
            } else {
                await dispatch(userActions.register(data)).unwrap();
                message = 'User added';
            }
            handleClose();
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="edit-modal-title" aria-describedby="edit-modal-description">
            <Box sx={{ ...style, width: 400 }}>
                {!(user?.loading || user?.error) &&
                    (<Typography component="div" className="mobilebanner">
                        <Typography component="h1" variant="h5">{title}</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                {...register('telephone')}
                                label="Telephone"
                                fullWidth
                                margin="normal"
                                error={!!errors.telephone}
                                helperText={errors.telephone?.message}
                            />
                            <TextField
                                {...register('email')}
                                label="Email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
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
                            <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                        </form>
                    </Typography>
                    )}
                {user?.error &&
                    <div class="text-center m-5">
                        <div class="text-danger">Error loading user: {user.error}</div>
                    </div>
                }
            </Box>
        </Modal>
    );
};

export default ManageProfile;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh', // Ensure the modal does not exceed the viewport height
    overflowY: 'auto' // Add vertical scroll bar
};