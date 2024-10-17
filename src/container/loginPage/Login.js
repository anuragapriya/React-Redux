import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { authActions, alertActions } from '_store';
import OTPVerification from "_components/OTPVerification";
import { ResetPassword } from "container/loginPage";
import { labels } from "_utils/constant";
import { Button, TextField, Link, Grid, Typography, Box, Modal } from '@mui/material';
import { loginValidationSchema } from "_utils/validationSchema";
import {  ManagedProfile } from "container/user";

export default function Login() {
    const [modalState, setModalState] = useState({ open: false, otpOpen: false,manageUseropen:false });
    const dispatch = useDispatch();

    // form validation rules 
    const formOptions = { resolver: yupResolver(loginValidationSchema) };
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(formOptions);

    const onSubmit = async ({ email, password }) => {
        try {
            await dispatch(authActions.login({ email, password }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const handleOpen = () => setModalState({ ...modalState, open: true });
    const handleClose = () => setModalState({ ...modalState, open: false });
    const handleOtpOpen = () => setModalState({ ...modalState, otpOpen: true });
    const handleOtpClose = () => setModalState({ ...modalState, otpOpen: false });
    const handleManageUserOpen = () => setModalState({ ...modalState, manageUseropen: true });
    const handleManageUserClose = () => setModalState({ ...modalState, manageUseropen: false });

    return (
        <>
            <Typography component="div" className="mobilebanner">
                <Typography component="h1" variant="h5" className="Logincontent">
                    {labels.loginHeader}
                </Typography>
                <div className="paper">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('email')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            {...register('password')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Link href="#" onClick={handleOpen} variant="body2" className="ResetPassword">
                            {labels.resetPwdButtonLabel}
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="Loginbutton"
                            disabled={isSubmitting}
                        >
                            {labels.loginButtonLabel}
                        </Button>
                        <Grid container>
                            <Grid item className="accountSignup">
                                <div>Don't have an account?</div>
                                <Link onClick={handleManageUserOpen} variant="body2">
                                    {labels.signUpLabel}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Typography>
            <ResetPassword open={modalState.open} handleClose={handleClose} onSubmitToOTP={handleOtpOpen} />
            <OTPVerification open={modalState.otpOpen} handleClose={handleOtpClose} />
            <ManagedProfile title={labels.signUpLabel} open={modalState.manageUseropen} handleClose={handleManageUserClose}/>
        </>
    );
}
