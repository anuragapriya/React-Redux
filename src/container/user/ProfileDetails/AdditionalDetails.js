import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, CustomFormControl } from '_components';
const AdditionalDetails = ({ register, errors, control, stateData, inputColors, handleBlur }) => {
    return <>
        <CustomFormControl
            id="FullName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="HomeStreetAddress1"
            label="Street Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="HomeCity"
            label="City"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} className="Personal-Information CompanyDetails">
                <AutocompleteInput
                    control={control}
                    name="HomeState"
                    label="State"
                    options={stateData}
                    error={!!errors.HomeState}
                    helperText={errors.HomeState?.message}
                    handleBlur={handleBlur}
                    inputColor={inputColors['HomeState']}
                />
                <CustomFormControl
                    id="HomeZipCode"
                    label="Zip Code"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="Personal-Information CompanyDetails">
                <CustomFormControl
                    id="DLNumber"
                    label="Driving License"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
                <CustomFormControl
                    id="DLState"
                    label="License State"
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

export default AdditionalDetails;