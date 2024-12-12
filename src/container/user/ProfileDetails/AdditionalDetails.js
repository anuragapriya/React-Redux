import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import { CustomFormControl } from '_components';
const AdditionalDetails = ({ register, errors, control, trigger }) => {
    const [inputColors, setInputColors] = useState({});
    const handleBlur = (e) => {
        const fieldName = e.target.name;
        const fieldError = errors[fieldName];

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));

        trigger(fieldName); // Trigger validation for the field
    };
    return <>
        <CustomFormControl
            id="fullName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="address"
            label="Street Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="city"
            label="City"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <Grid container spacing={3}>
            <Grid item xs={12} sm={5} md={6} className="Personal-Information">
                <CustomFormControl
                    id="state"
                    label="State"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
                <CustomFormControl
                    id="zipcode"
                    label="Zip Code"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={5} md={6} className="Personal-Information">
                <CustomFormControl
                    id="drivinglicense"
                    label="Driving License"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
                <CustomFormControl
                    id="licenseStatus"
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