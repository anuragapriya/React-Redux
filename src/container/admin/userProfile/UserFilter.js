import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CustomFormControl, AutocompleteInput } from '_components';
import { alertActions, masterActions } from '_store';
import { Button } from '@mui/material';
import CustomTextFieldInput from '_components/CustomTextFieldInput';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

const UserFilter = ({ handleFilterSubmit,handleportal,statuses }) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;
    const dispatch = useDispatch();
    const portals = useSelector((x) => x.master?.portalData);
    const portalData = (!portals?.loading && !portals?.error) ? portals?.map(x => ({
        label: x.PortalDescription,
        value: x.PortalID
    })) : [];

    useEffect(() => {
        dispatch(masterActions.getPortalData());
    }, [dispatch]);

    const { handleSubmit, control, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        console.log('async', data);
        handleportal(data);
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
        <button className='Filter' aria-describedby={id} type="button" onClick={handleClick}>
            Filter
        </button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                        <form onSubmit={handleSubmit(onSubmit)} className='Registrationcontainer'>
                            <AutocompleteInput
                                control={control}
                                name="PortalId"
                                label="Select Portal"
                                options={portalData}
                            />
                            <CustomTextFieldInput
                                control={control}
                                name="email"
                                label="Email Address"
                            />
                            <CustomTextFieldInput
                                control={control}
                                name="fullName"
                                label="Full Name"
                                error={!!errors.fullName}
                                helperText={errors.fullName ? errors.fullName.message : ''}
                            />
                            <AutocompleteInput
                                control={control}
                                name="StatusId"
                                label="Status"
                                options={statuses}
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
                    </Box>
                </Fade>
            )}
        </Popper>
    </>;
}

export default UserFilter;