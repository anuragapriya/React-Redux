import React, { useState } from 'react';
import { CustomFormControl, MobileNumberInput } from '_components';
import { Typography } from '@mui/material';
import Grid from "@material-ui/core/Grid";

const CompanyPOC = ({ register, errors, control, trigger ,inputColors,handleBlur}) => {


    return <>
        <Typography component="div" className="Personal-Informationsheading">
            <Typography component="h2" variant="h5">Company Point of Contact</Typography>
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} className="Personal-Information CompanyDetails">
        <CustomFormControl
            id="CompanyContactName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="CompanyContactEmailAddress"
            label="Email Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className="Personal-Information CompanyDetails">
        <MobileNumberInput
            control={control}
            name="CompanyContactTelephone"
            label="Phone Number"
            rules={{ required: 'Phone Number is required' }}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
           <CustomFormControl
            id="AuthorizedWGLContact"
            label="Authorized WGL Contact"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        </Grid>
        </Grid>
        
     
    </>;
};

export default CompanyPOC;