import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from 'react-redux';
import { alertActions } from '_store';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { otpValidationSchema } from "_utils/validationSchema";

const OTPVerification = ({ open, handleOTPSubmit }) => {
    const dispatch = useDispatch();

    // form validation rules 
    const formOptions = { resolver: yupResolver(otpValidationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(formOptions);

    async function onSubmit(data) {
        const otp = Object.values(data).join('');
        handleOTPSubmit(otp);
    }

    return (
        <Modal
            open={open}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modalpopup modalpopupVerification">
                <Box>
                    <Typography component="h2" variant="h5">Hello, Maria!</Typography>
                    <Typography component="p">We have sent a Verification code to (202)-547-3291.
                        Please enter the code below to verify your identity and proceed with the password reset.</Typography>
                </Box>
                <form className="form p-0" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row m-0">
                        {['number1', 'number2', 'number3', 'number4', 'number5','number6'].map((name, index) => (
                            <Grid item xs={2} className="ResetLogo p-0" key={index}>
                                <TextField
                                    {...register(name)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id={name}
                                    name={name}
                                    autoFocus={index === 0}
                                    error={!!errors[name]}
                                    helperText={errors[name]?.message}
                                    aria-label={`OTP digit ${index + 1}`}
                                />
                            </Grid>
                        ))}
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="Loginbutton"
                        disabled={isSubmitting}
                    >
                        VERIFY
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default OTPVerification;