import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { authActions, alertActions } from '_store';
import OTPVerification from "_components/OTPVerification";
import { labels } from '_utils/labels';
import { Button, TextField, Link, Typography, Box, Modal, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import { loginValidationSchema } from "_utils/validationSchema";
import {  ForgotPassword } from "container/loginPage";
import Grid from "@material-ui/core/Grid";
import { CustomFormControl, PasswordInput } from "_components";

export default function Login() {
    const [modalState, setModalState] = useState({ open: false, otpOpen: false, manageUseropen: false, error: null });
    const [error, setError] = useState(null);
    const [inputColors, setInputColors] = useState({});
    const dispatch = useDispatch();

    // form validation rules 
    const { register, handleSubmit,control, formState: { errors, isSubmitting, isValid }, watch ,trigger} = useForm({
        resolver: yupResolver(loginValidationSchema),
        mode: 'onChange'
    });

    const onSubmit = async ({ Email, Password }) => {
        try {
            dispatch(authActions.login({ Email, Password }));
        } catch (error) {
            dispatch(alertActions.error({ message: error, header: "Login Failed" }));
        }
    };

    const handleOpen = () => setModalState({ ...modalState, open: true });
    const handleClose = () => setModalState({ ...modalState, open: false });
    const handleOtpOpen = () => setModalState({ ...modalState, open: false, otpOpen: true });
    const handleOtpClose = () => setModalState({ ...modalState, otpOpen: false });

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); 
        // const fieldError = errors[fieldName];

        // setInputColors(prevColors => ({
        //     ...prevColors,
        //     [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        // }));
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
                        <CustomFormControl
                            id="Email"
                            label="Email Address"
                            type="text"
                            register={register}
                            errors={errors}
                            handleBlur={handleBlur}
                            inputColors={inputColors}
                        />
                        <Typography component="div" className="PasswordInput">
                        <PasswordInput
                            control={control}
                            name="Password"
                            label="Password"
                            rules={{ required: 'Password is required' }}
                            errors={errors}
                            handleBlur={handleBlur}
                            inputColors={inputColors}   
                            isPasswordValid={true}
                        />
                        </Typography>
                        <Link href="#" onClick={handleOpen} variant="body2" className="ResetPassword">
                            {labels.resetPwdButtonLabel}
                        </Link>                        
                        <Typography component="div" className="loginbuttonfixed">
                        <Typography component="div" className="loginbuttonfixedbutton">
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
                        </Typography>
                        </Typography>
                    </form>
                </div>
            </Typography>
            <ForgotPassword open={modalState.open} handleClose={handleClose} onSubmitToOTP={handleOtpOpen} />
            <OTPVerification open={modalState.otpOpen} handleClose={handleOtpClose} />
        </div>
    );
}