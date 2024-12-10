import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { alertActions, userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
import { additionalDetailsValidationSchema, companyValidationSchema } from "_utils/validationSchema";
import { CompanyDetails } from "container/user";
import AdditionalDetails from "container/user/ProfileDetails/AdditionalDetails";

const ManageProfileMC =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(x => x.users?.item);

    const { register, handleSubmit, control, reset,formState: { errors, isSubmitting }, watch, trigger } = useForm({
        resolver: yupResolver(additionalDetailsValidationSchema,companyValidationSchema)
    });

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
            // await dispatch(registrationActions.register(data)).unwrap();
            // navigate('/');
            // dispatch(alertActions.success({
            //     showAfterRedirect: true,
            //     message: verifyEmailLabels.message1,
            //     message2: verifyEmailLabels.message2,
            //     header: verifyEmailLabels.header
            // }));

        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: "Registration Failed" }));
        }
    };

    return  <>
    <Typography component="div" className="mobilebanner">
        <Typography component="h1" variant="h5">Registration</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
            <AdditionalDetails register={register} errors={errors}  control={control}/>
            <CompanyDetails register={register} errors={errors} watch={watch} control={control} trigger={trigger}/>           
            <Button   variant="contained" color="primary" disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit"  variant="contained" color="primary" disabled={isSubmitting}>
                Complete Registration
            </Button>
        </form>
    </Typography>
</>
};

export default ManageProfileMC;