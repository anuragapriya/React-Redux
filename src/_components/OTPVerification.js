import React from "react";
import {  useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from 'react-redux';
import {  alertActions } from '_store';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const OTPVerification = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open= props.open;
    const handleClose=()=> props.handleClose;

        // form validation rules 
        const validationSchema = Yup.object().shape({
            number1: Yup.string()
                .required('Enter OTP'),
            number2: Yup.string()
                .required('Enter OTP'),
            number3: Yup.string()
                .required('Enter OTP'),
            number4: Yup.string()
                .required('Enter OTP'),
            number5: Yup.string()
                .required('Enter OTP')
        });
        const formOptions = { resolver: yupResolver(validationSchema) };
    
        // get functions to build form with useForm() hook
        const { register, handleSubmit, formState } = useForm(formOptions);
        const { errors, isSubmitting } = formState;
    
        async function onSubmit(data) {
            dispatch(alertActions.clear());
            try {
                props.handleClose();
                dispatch(alertActions.success({header:'Reset Password', message: 'OTP Verified', showAfterRedirect: true }));
            } catch (error) {
                dispatch(alertActions.error(error));
            }
        }
     
    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className="modalpopup modalpopupVerification">
                    <Box>
                        <Typography component="h2" variant="h5" >Hello, Maria!</Typography>
                        <Typography component="p" variant="p" >We have sent a Verification code to (202)-547-3291.
                            Please entr the code below to Verify your identity and proceed with the password reset.</Typography>
                    </Box>
                    <form className="form p-0" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row m-0">
                            <Grid item xs={2} className="ResetLogo p-0">
                                <TextField
                                    {...register('number1')}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="number1"
                                    name="number1"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={2} className="ResetLogo p-0">
                                <TextField
                                    {...register('number2')}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="number2"
                                    name="number2"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={2} className="ResetLogo p-0">
                                <TextField
                                    {...register('number3')}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="number3"
                                    name="number3"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={2} className="ResetLogo p-0">
                                <TextField
                                    {...register('number4')}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="number4"
                                    name="number4"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={2} className="ResetLogo p-0">
                                <TextField
                                    {...register('number5')}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="number5"
                                    name="number5"
                                    autoFocus
                                />
                            </Grid>
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
        </React.Fragment>
    );
}

export default OTPVerification;