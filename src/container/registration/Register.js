import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Link, Grid, } from '@mui/material';
import { userActions, alertActions } from '_store';
import { registerValidationSchema } from '_utils/validationSchema';
import { PersonalDetails } from 'container/user';
import { ModalPopup } from '_components';
import { verifyEmailLabels } from '_utils/labels';
import TimerModal from '_components/TimerModal';

const Register = () => {
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control, formState: { errors, isSubmitting }, watch ,trigger} = useForm({
        resolver: yupResolver(registerValidationSchema)
    });

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            let message;
            await dispatch(userActions.register(data)).unwrap();
            // message = 'User Resgistered Successfully';
            // navigate('/registration/verified');
            //  dispatch(alertActions.success({ message, showAfterRedirect: true }));
            setOpen(true);
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const handleBtnSecondaryClick = () => {
        setOpen(false);
    }

    return (
        <>
            {!(user?.loading || user?.error) &&
                (<Typography component="div" className="mobilebanner">
                    <Typography component="h1" variant="h5">Registration</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <PersonalDetails register={register} errors={errors} watch={watch} control={control} trigger={trigger}></PersonalDetails>
                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
                            Register
                        </Button>
                        <Grid container>
                            <Grid item className="accountSignup">
                                <div>Do you already have an account? Login</div>
                                <Link href="./" variant="body2">
                                    here
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Typography>
                )}
            {open && <TimerModal
                timerCountdown={5}
                header={verifyEmailLabels.header}
                message1={verifyEmailLabels.message1}
                message2={verifyEmailLabels.message2}
                btnSecondaryText={verifyEmailLabels.btnSecondaryText}
                handleBtnSecondaryClick={handleBtnSecondaryClick}
            />}
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