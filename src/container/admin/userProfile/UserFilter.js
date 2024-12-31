import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormControl, AutocompleteInput } from '_components';
import { alertActions, masterActions } from '_store';
import { Button } from '@mui/material';
import CustomTextFieldInput from '_components/CustomTextFieldInput';

const UserFilter = ({ handleFilterSubmit }) => {
    const dispatch = useDispatch();
    const portals = useSelector((x) => x.master?.portalData);
    const portalData = (!portals?.loading && !portals?.error) ? portals?.map(x => ({
        label: x.PortalDescription,
        value: x.PortalID
    })) : [];

    useEffect(() => {
        dispatch(masterActions.getPortalData());
    }, [dispatch]);

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            const result = [];
            // const result = await dispatch(registrationActions.register(data)).unwrap();
            // if (!result.error) {
            const portalKey = portals?.find(option => option.PortalID === data.PortalId).PortalKey;
            handleFilterSubmit({ result }, portalKey);
            //  } 
        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: "Fetch Failed" }));
        }
    };
    return <>
        <form onSubmit={handleSubmit(onSubmit)} className='Registrationcontainer'>
            <AutocompleteInput
                control={control}
                name="PortalId"
                label="Select Portal"
                options={portalData}
                error={!!errors.PortalId}
                helperText={errors.PortalId?.message}
            />
 <CustomTextFieldInput
                control={control}
                name="email"
                label="Email Address"                
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
            />
            <CustomTextFieldInput
                control={control}
                name="fullName"
                label="Full Name"                
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ''}
            />
            <Button
                type="submit"
                variant="contained"
                className='Loginbutton'
                color="primary"
            >
                Search
            </Button>
        </form>
    </>;
}

export default UserFilter;