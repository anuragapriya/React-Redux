import React, { useEffect, useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, MobileNumberInput, MultiSelectAutocomplete, CustomFormControl, MultiSelectInput } from '_components'
import { supplierClassificationData, supplierBusinessData } from '_utils/constant';
import { Typography, Button } from '@mui/material';
const SupplierDetails = ({ register, errors, stateData, control, handleBlur,classificationData, businessCategoryData, getCatagoryID }) => {
    const [inputColors, setInputColors] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);
    useEffect(()=>{

        if (getCatagoryID?.length) {
            const initialDefaultValues = classificationData.filter(option =>
                getCatagoryID.includes(option.value)
            );
            // console.log(initialDefaultValues);
            // setSelectedOptions(defaultValues);
            setSelectedOptions(initialDefaultValues);
        }
    },[getCatagoryID])

    const handleSelectionChange = (newValue) => {
        // console.log(newValue);
        setSelectedOptions(newValue);
        // console.log(selectedOptions);
    };
    return <>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="CompanyName"
                    label="Company Name"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                        // onFocus={handleOtherFocus}
                        inputColors={inputColors}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <Typography component="div" className="passwordcheck mar-top-16 border-none">
                    <MultiSelectInput
                        id="ClassificationID"
                        name="ClassificationID"
                        label="Classification"
                        control={control}
                        value={selectedOptions} 
                        options={classificationData}
                        onChange={handleSelectionChange}
                        error={!!errors.ClassificationID}
                        helperText={errors.ClassificationID?.message}
                        handleBlur={handleBlur}
                        inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
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
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                <AutocompleteInput
                    control={control}
                    name="State"
                    label="State"
                    options={stateData}
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    handleBlur={handleBlur}
                    inputColor={inputColors['HomeState']}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                <CustomFormControl
                    id="ZipCode"
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