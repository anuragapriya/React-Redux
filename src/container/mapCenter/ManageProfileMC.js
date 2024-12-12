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
import Grid from "@material-ui/core/Grid";
import UploadFiles from '_components/UpoloadFiles'
const ManageProfileMC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(x => x.users?.item);

    const combinedSchema = additionalDetailsValidationSchema.concat(companyValidationSchema);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, watch, trigger } = useForm({
        resolver: yupResolver(combinedSchema)
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

    return <>
        <Typography component="div" className="MapCenterAccecss">
            <Typography component="div" className="MapCenterAccecssheading">
                <Typography component="h1" variant="h5">Map Center Access</Typography>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} className="Personal-Information-container">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={5} md={4} className="Personal-Information">
                        <Typography component="div" className="mapcontainer">
                            <Typography component="div" className="Personal-Informationsheading">
                                <Typography component="h2" variant="h5">Personal Information</Typography>
                            </Typography>
                            <AdditionalDetails register={register} errors={errors} control={control} trigger={trigger} />
                        </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} md={4} className="Personal-Information">
                            
                        <Typography component="div" className="mapcontainer">
                            <Typography component="div" className="Personal-Informationsheading">
                                <Typography component="h2" variant="h5">Company Point of Contact</Typography>
                            </Typography>
                            <CompanyDetails register={register} errors={errors}  control={control} trigger={trigger} />
                        </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} md={4} >
                            <Typography component="div" className="UploadFiles-container mapcontainer">
                        <UploadFiles/>
                        </Typography>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="Personal-Information">
                        <Button variant="contained" color="primary" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Complete Registration
                        </Button>
                    </Grid>

                </Grid>


            </form>
        </Typography>
    </>
};

export default ManageProfileMC;