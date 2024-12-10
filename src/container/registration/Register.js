import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Link, Grid } from '@mui/material';
import { alertActions, registrationActions } from '_store';
import { registerValidationSchema } from '_utils/validationSchema';
import { PersonalDetails } from 'container/user';
import { verifyEmailLabels } from '_utils/labels';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registrationStatus = useSelector(x => x.registration?.status);

    const { register, handleSubmit, control, formState: { errors, isValid }, watch, trigger } = useForm({
        resolver: yupResolver(registerValidationSchema),
        mode:'onChange'
    });

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            await dispatch(registrationActions.register(data)).unwrap();
            navigate('/');
            dispatch(alertActions.success({
                showAfterRedirect: true,
                message: verifyEmailLabels.message1,
                message2: verifyEmailLabels.message2,
                header: verifyEmailLabels.header
            }));
        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: "Registration Failed" }));
        }
    };

    return (
        <>
            <Typography component="div" className="mobilebanner">
                <Typography component="h1" variant="h5">Registration</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PersonalDetails register={register} errors={errors} watch={watch} control={control} trigger={trigger} />
                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isValid}>
                        Register
                    </Button>
                    <Grid container>
                        <Grid item className="accountSignup">
                            <div>Do you already have an account? Login</div>
                            <Link component={RouterLink} to="/" variant="body2">
                                here
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Typography>
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
