import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, MobileNumberInput, MultiSelectAutocomplete,CustomFormControl,MultiSelectInput } from '_components'
import { supplierClassificationData , supplierBusinessData} from '_utils/constant';
import { Typography, Button } from '@mui/material';
const SupplierDetails = ({ register, errors, stateData,control, trigger }) => {
    const [inputColors, setInputColors] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); 
        // const fieldError = errors[fieldName];

        // setInputColors(prevColors => ({
        //     ...prevColors,
        //     [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        // }));
    };
    const handleSelectionChange = (newValue) => {
        console.log(newValue);
        setSelectedOptions(newValue);
      };

    const supplierClassificationDropdownData = supplierClassificationData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentTypeID
    }));
    const supplierBusinessDropdownData = supplierBusinessData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentTypeID
    }));
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
            <Typography  component="div" className="passwordcheck border-none">
                <AutocompleteInput
                    id="BusinessCatagory"
                    name="BusinessCatagory"
                    label="Business Category"
                    control={control}
                    options={supplierBusinessDropdownData}
                    error={!!errors.businessCatagory}
                    helperText={errors.businessCatagory?.message}
                    handleBlur={handleBlur}
                    // onFocus={handleOtherFocus}
                    inputColor={inputColors['selectPortal']}
                />
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
            <Typography  component="div" className="passwordcheck mar-top-16">
                <MultiSelectInput
                    id="Classification"
                    name="Classification"
                    label="Classification"
                    control={control}
                    options={supplierClassificationDropdownData}
                    onChange={handleSelectionChange}
                    error={!!errors.classification}
                    helperText={errors.classification?.message}
                    handleBlur={handleBlur}
                    inputColor={inputColors['selectPortal']}
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
                {/* <CustomFormControl
                    id="state"
                    label="State"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                /> */}
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