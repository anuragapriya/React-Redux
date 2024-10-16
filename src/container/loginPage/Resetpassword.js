import React from "react";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { alertActions } from '_store';
import { Grid, Box, Modal, Button, TextField, Typography } from '@mui/material';
import images from '../../images';
import { resetValidationSchema } from "_utils/validationSchema";

const ResetPassword = ({ open, handleClose, onSubmitToOTP }) => {
    const dispatch = useDispatch();

    // form validation rules 
    const formOptions = { resolver: yupResolver(resetValidationSchema) };
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(formOptions);

    const onSubmit = async ({ email, phoneNumber }) => {
        try {
            handleClose();
            onSubmitToOTP();
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modalpopup">
                <Box className="row modalpopupinner">
                    <Grid item xs={3} className="ResetLogo p-0">
                        <img src={images.ResetpasswordLogo} alt="Reset Logo" />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography id="child-modal-title" variant="body1">
                            Enter your email or phone number and we will send you a link/code to reset your password.
                        </Typography>
                    </Grid>
                    <form className="form p-0" onSubmit={handleSubmit(onSubmit)}>
                        <div className="Emailicons">
                            <img src={images.Emailicon} alt="Email icon" />
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
                                aria-label="Email"
                            />
                        </div>
                        <div className="Emailicons">
                            <img src={images.Phoneicon} alt="Phone icon" />
                            <TextField
                                {...register('phoneNumber')}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="phoneNumber"
                                label="Phone Number"
                                type="tel"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message}
                                aria-label="Phone Number"
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="Loginbutton"
                            disabled={isSubmitting}
                        >
                            SEND LINK TO EMAIL / CODE TO PHONE
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    );
}

export default ResetPassword;
