import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { CustomFormControl } from '_components';
import CompanyPOC from './CompanyPOC';

const CompanyDetails = ({ register, errors, control, trigger, inputColors, handleBlur }) => {
    return <>
        <CustomFormControl
            id="CompanyName"
            label="Company Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="TaxIdentificationNumber"
            label="Tax Identification Number"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="CompanyStreetAddress1"
            label="Street Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="CompanyCity"
            label="City"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <Grid container spacing={3} >
            <Grid item xs={12} sm={12} md={6} className="Personal-Information CompanyDetails">
                <CustomFormControl
                    id="CompanyState"
                    label="State"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="Personal-Information CompanyDetails">
                <CustomFormControl
                    id="CompanyZipCode"
                    label="Zip Code"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>  
           
        </Grid>
    </>
};

export default CompanyDetails;