import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import { CustomFormControl } from '_components';
import { AutocompleteInput, MobileNumberInput } from '_components'
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
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
                <CustomFormControl
                    id="companyName"
                    label="Company Name"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
                <CustomFormControl
                    id="companyWebsite"
                    label="Company Website"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
       
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <AutocompleteInput
                id="businessCatagory"
                name="businessCatagory"
                label="Business Category"
                control={control}
                options={selectBusinessCatagory}
                handleBlur={handleBlur}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <AutocompleteInput
                id="classification"
                name="businessCatagory"
                label="Classification"
                control={control}
                options={selectBusinessCatagory}
                handleBlur={handleBlur}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="Services / Products Provided"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="Expiry Date of the Certificate"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="Contact Person"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="Title"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="Email"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            </Grid>
            <Grid item xs={12} sm={6}  md={6}  className='supplierDetailes'>
            <MobileNumberInput
                control={control}
                name="pocMobileNumber"
                label="Phone Number"
                rules={{ required: 'Phone Number is required' }}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
             </Grid>
             <Grid item xs={12} sm={12} md={12} className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="Address"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
            <AutocompleteInput
                id="classification"
                name="businessCatagory"
                label="State"
                control={control}
                options={selectBusinessCatagory}
                handleBlur={handleBlur}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
            <AutocompleteInput
                id="classification"
                name="businessCatagory"
                label="Country"
                control={control}
                options={selectBusinessCatagory}
                handleBlur={handleBlur}
            />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
            <CustomFormControl
                id="companyWebsite"
                label="ZipCode"
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

export default SupplierDetails;