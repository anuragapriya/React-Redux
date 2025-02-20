import React from 'react';
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, CustomFormControl, MobileNumberInput } from '_components';
const AdditionalDetails = ({ register, errors, control, trigger, stateData, handleBlur, isAdmin, isDisabled }) => {
    return <>
        <CustomFormControl
            id="FullName"
            label="Full Name"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            disable={isDisabled || false}
        />
        {isAdmin && (<>
            <CustomFormControl
                id="EmailID"
                label="Email Address"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
                disable={true}
            />
            <MobileNumberInput
                control={control}
                name="MobileNumber"
                label="Phone Number"
                rules={{ required: 'Phone Number is required' }}
                errors={errors}
                handleBlur={handleBlur}
                disabled={isDisabled || false}
            />
        </>)}
        <CustomFormControl
            id="HomeStreetAddress1"
            label="Street Address"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            disable={isDisabled || false}
        />
        <CustomFormControl
            id="HomeCity"
            label="City"
            type="text"
            register={register}
            errors={errors}
            handleBlur={handleBlur}
            disable={isDisabled || false}
        />
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} className="Personal-Information marbottom0 selecticon CompanyDetails passwordcheck">
                <AutocompleteInput
                    id="HomeState"
                    control={control}
                    name="HomeState"
                    label="State"
                    options={stateData}
                    error={!!errors.HomeState}
                    helperText={errors.HomeState?.message}
                    handleBlur={handleBlur}
                    trigger={trigger}
                    disabled={isDisabled || false}
                />
                <CustomFormControl
                    id="DLNumber"
                    label="Driving License"
                    type="text"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    disable={isDisabled || false}
                />


            </Grid>
            <Grid item xs={12} sm={12} md={6} className="Personal-Information marbottom0 selecticon CompanyDetails passwordcheck">
                <CustomFormControl
                    id="HomeZipCode"
                    label="Zip Code"
                    type="number"
                    register={register}
                    errors={errors}
                    handleBlur={handleBlur}
                    disable={isDisabled || false}
                />
                <AutocompleteInput
                    id="DLState"
                    control={control}
                    name="DLState"
                    label="License State"
                    options={stateData}
                    error={!!errors.DLState}
                    helperText={errors.DLState?.message}
                    handleBlur={handleBlur}
                    trigger={trigger}
                    disabled={isDisabled || false}
                />
            </Grid>
        </Grid>
    </>
};

export default AdditionalDetails;