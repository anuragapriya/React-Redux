import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { authActions, alertActions } from '_store';
import OTPVerification from "_components/OTPVerification";
import { labels } from '_utils/labels';
import { Button, TextField, Link, Typography, Box, Modal } from '@mui/material';
import { loginValidationSchema } from "_utils/validationSchema";
import { ResetPassword } from "container/loginPage";
import Grid from "@material-ui/core/Grid";

export default function Login() {
    const [modalState, setModalState] = useState({ open: false, otpOpen: false, manageUseropen: false, error: null });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // form validation rules 
    const { register, handleSubmit, formState: { errors, isSubmitting,isValid },watch } = useForm({
        resolver: yupResolver(loginValidationSchema),
        mode:'onChange'
    });

    const onSubmit = async ({ email, password }) => {
        try {
            dispatch(authActions.login({ email, password }));
        } catch (error) {
            dispatch(alertActions.error({ message: error, header: "Login Failed" }));
        }
    };

    const handleOpen = () => setModalState({ ...modalState, open: true });
    const handleClose = () => setModalState({ ...modalState, open: false });
    const handleOtpOpen = () => setModalState({ ...modalState, open: false, otpOpen: true });
    const handleOtpClose = () => setModalState({ ...modalState, otpOpen: false });

    // Watch all form fields
    const formValues = watch();

    // Check if all required fields are filled
    const isFormValid = () => {
        return Object.values(formValues).every(value => value !== undefined && value !== '');
    };

    return (
        <div >
            <Typography component="div" className="mobilebanner">
            <Typography component="div" className="loginheader">
                <Typography component="h1" variant="h5" className="Logincontent">
                    {labels.loginHeader}
                </Typography>
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
                            label="Company Email Address"
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
                             className="Loginbutton Loginbuttonheight"
                            disabled={!isValid}
                        >
                            {labels.loginButtonLabel}
                        </Button>
                        <Grid container>
                            <Grid item className="accountSignup">
                                <div>Don’t have an account? Register </div>
                                <Link href="./register" variant="body2">
                                    {labels.signUpLabel}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Typography>
            <ResetPassword open={modalState.open} handleClose={handleClose} onSubmitToOTP={handleOtpOpen} />
            <OTPVerification open={modalState.otpOpen} handleClose={handleOtpClose} />
        </div>
    );
}