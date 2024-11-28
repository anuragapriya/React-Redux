import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { userActions, alertActions } from '_store';
import { registerValidationSchema } from '_utils/validationSchema';
import { PasswordCheck } from '_components';
import { labels } from "_utils/constant";

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(x => x.users?.item);

    const { register, handleSubmit, control, reset, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(registerValidationSchema)
    });

    const password = watch('password');

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            let message;

            await dispatch(userActions.register(data)).unwrap();
            message = 'User Resgistered Successfully';
            navigate('/');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const onCancel = () => {
        navigate('/');
    }

    return (
        <>
            {!(user?.loading || user?.error) &&
                (<Typography component="div" className="mobilebanner">
                    <Typography component="h1" variant="h5">{labels.signUpLabel}</Typography>
                    <div className="paper">
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
                                {...register('mobileNumber')}
                                label="Mobile Number"
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
                                {...register('password')}
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <PasswordCheck password={password} confirmPassword={""} />
                            <Button type="submit"  variant="contained" color="primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </Button>
                            <Button
                            type="button"                            
                            variant="contained"
                            color="primary"
                            onClick={onCancel}
                        >
                            Back to Login
                        </Button>
                        </form>
                    </div>
                </Typography>
                )}
            {user?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error loading user: {user.error}</div>
                </div>
            }
        </>
    );
};

export default Register;

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