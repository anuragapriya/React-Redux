import React, { useEffect, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, MobileNumberInput, MultiSelectInput, CustomFormControl } from '_components';
import { Typography } from '@mui/material';

const SupplierDetails = ({ register,
    errors,
    stateData,
    control,
    handleBlur,
    handleClassificationChange,
    classification,
    classificationData,
    businessCategoryData,
    setValue }) => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="CompanyName"
                    label="Company Name"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="CompanyWebsite"
                    label="Company Website"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <Typography component="div" className="passwordcheck border-none">
                    <AutocompleteInput
                        id="CategoryID"
                        name="CategoryID"
                        label="Business Category"
                        control={control}
                        options={businessCategoryData}
                        error={!!errors.CategoryID}
                        helperText={errors.CategoryID?.message}
                        handleBlur={handleBlur}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <Typography component="div" className="passwordcheck  border-none">
                    <MultiSelectInput
                        id="ClassificationID"
                        control={control}
                        name="ClassificationID"
                        label="Classification"
                        options={classificationData}
                        value={classification}
                        onChange={handleClassificationChange}
                        error={!!errors.ClassificationID}
                        helperText={errors.ClassificationID?.message}
                        handleBlur={handleBlur}
                        setValue={setValue}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="ServicesProductsProvided"
                    label="Services / Products Provided"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="expirydate"
                    label="Expiry Date of the Certificate"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="ContactPerson"
                    label="Contact Person"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="Title"
                    label="Title"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="Email"
                    label="Email"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <MobileNumberInput
                    control={control}
                    name="PhoneNumber"
                    label="Phone Number"
                    rules={{ required: 'Phone Number is required' }}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} className='supplierDetailes'>
                <CustomFormControl
                    id="Address"
                    label="Address"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                <CustomFormControl
                    id="City"
                    label="City"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
            <Typography component="div" className="passwordcheck border-none">
                <AutocompleteInput
                    control={control}
                    name="State"
                    label="State"
                    options={stateData}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    handleBlur={handleBlur}
                />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                <CustomFormControl
                    id="ZipCode"
                    label="ZipCode"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                />
            </Grid>
        </Grid>
    );
};

export default SupplierDetails;