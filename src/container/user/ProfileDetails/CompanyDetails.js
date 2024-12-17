import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { CustomFormControl } from '_components';
import CompanyPOC from './CompanyPOC';

const CompanyDetails = ({ register, errors, control, trigger }) => {
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
            id="companyName"
            label="Company Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="taxId"
            label="Tax Identification Number"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="companyAddress"
            label="Street Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
            id="companyCity"
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
                    id="companyState"
                    label="State"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
                </Grid>
                <Grid item xs={12} sm={5} md={6} className="Personal-Information">
                <CustomFormControl
                    id="companyZipcode"
                    label="Zip Code"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>  
            <CompanyPOC register={register} errors={errors} control={control} trigger={trigger} />
        </Grid>
    </>
};

export default CompanyDetails;