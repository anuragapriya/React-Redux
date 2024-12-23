import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { CustomFormControl, MultiSelectInput } from '_components';
import { AutocompleteInput, MobileNumberInput, MultiSelectAutocomplete } from '_components'
import { supplierClassificationData , supplierBusinessData} from '_utils/constant';
const SupplierDetails = ({ register, errors, control, trigger }) => {
    const [inputColors, setInputColors] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleBlur = (e) => {
        const fieldName = e.target.name;
        const fieldError = errors[fieldName];

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));

        trigger(fieldName); // Trigger validation for the field
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
                    id="companyName"
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
                    id="companyWebsite"
                    label="Company Website"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>

            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <AutocompleteInput
                    id="businessCatagory"
                    name="businessCatagory"
                    label="Business Category"
                    control={control}
                    options={supplierBusinessDropdownData}
                    error={!!errors.businessCatagory}
                    helperText={errors.businessCatagory?.message}
                    handleBlur={handleBlur}
                    // onFocus={handleOtherFocus}
                    inputColor={inputColors['selectPortal']}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <MultiSelectInput
                    id="classification"
                    name="classification"
                    label="Classification"
                    control={control}
                    options={supplierClassificationDropdownData}
                    onChange={handleSelectionChange}
                    error={!!errors.classification}
                    helperText={errors.classification?.message}
                    handleBlur={handleBlur}
                    inputColor={inputColors['selectPortal']}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className='supplierDetailes'>
                <CustomFormControl
                    id="services"
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
                    id="contactperson"
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
                    id="title"
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
                    id="email"
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
                    name="mobileNumber"
                    label="Phone Number"
                    rules={{ required: 'Phone Number is required' }}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} className='supplierDetailes'>
                <CustomFormControl
                    id="address"
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
                    id="city"
                    label="City"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                <CustomFormControl
                    id="state"
                    label="State"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    inputColors={inputColors}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                <CustomFormControl
                    id="zipcode"
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