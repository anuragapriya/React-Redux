import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import { CustomFormControl } from '_components';
import {AutocompleteInput , MobileNumberInput} from '_components'
const SupplierDetails = ({ register, errors, control, trigger }) => {
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
    const selectBusinessCatagory = ["A", "B", "C"];
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
        id="companyWebsite"
        label="Company Website"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
     <AutocompleteInput
                id="businessCatagory"
                name="businessCatagory"
                label="Business Category"
                control={control}
                options={selectBusinessCatagory}
            handleBlur={handleBlur}
            />
              <AutocompleteInput
                id="classification"
                name="businessCatagory"
                label="Classification"
                control={control}
                options={selectBusinessCatagory}
            handleBlur={handleBlur}
            />
                <CustomFormControl
        id="companyWebsite"
        label="Services / Products Provided"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
        <CustomFormControl
        id="companyWebsite"
        label="Expiry Date of the Certificate"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
        <CustomFormControl
        id="companyWebsite"
        label="Contact Person"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
        <CustomFormControl
        id="companyWebsite"
        label="Title"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
        <CustomFormControl
        id="companyWebsite"
        label="Email"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
       <MobileNumberInput
            control={control}
            name="pocMobileNumber"
            label="Phone Number"
            rules={{ required: 'Phone Number is required' }}
            errors={errors}
            handleBlur={handleBlur}
            inputColors={inputColors}
        />
        <CustomFormControl
        id="companyWebsite"
        label="Address"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
     <AutocompleteInput
                id="classification"
                name="businessCatagory"
                label="State"
                control={control}
                options={selectBusinessCatagory}
            handleBlur={handleBlur}
            />
             <AutocompleteInput
                id="classification"
                name="businessCatagory"
                label="Country"
                control={control}
                options={selectBusinessCatagory}
            handleBlur={handleBlur}
            />
              <CustomFormControl
        id="companyWebsite"
        label="ZipCode"
        type="text"
        register={register}
        errors={errors}
        handleBlur={handleBlur}
        inputColors={inputColors}
    />
        
    </>
};

export default SupplierDetails;