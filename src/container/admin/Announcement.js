import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { portalAccessActions, alertActions } from '_store';
import { useForm } from 'react-hook-form';
import { AutocompleteInput } from '_components';
const Announcement = () => {
    const dispatch = useDispatch();
    const portalAccessData = useSelector((x) => x.configs?.portalAccessGetData);
    const accessData = portalAccessData?.Data || [];
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [data, setData] = useState(null);
    const options = (accessData?.map(portal => ({
        value: portal.PortalID,
        label: portal.PortalName
    })));

    const { control, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        try {
            dispatch(portalAccessActions.getAccess());
            if (portalAccessData && !portalAccessData.Submitted && portalAccessData.Errors) {
                dispatch(alertActions.error(portalAccessData.Message));
            }

        }
        catch (error) {
            dispatch(alertActions.error(error));
        }
    }, [dispatch]);

    useEffect(() => {
        if (accessData && accessData.length > 0) {
            const defaultPortalId = selectedPortal ? selectedPortal : accessData[0]?.PortalID;
            setSelectedPortal(defaultPortalId);
            const portalData = accessData?.find(x => x.PortalID === defaultPortalId);
            setData(portalData);
        }
    }, [accessData]);

    useEffect(() => {
        if (accessData && selectedPortal) {
            const portalData = accessData?.find(x => x.PortalID === selectedPortal);
            setData(portalData);
        }
    }, [selectedPortal, accessData]);

    const handlePortalChange = (event) => {
        setSelectedPortal(event.target.value);
    };
    return <>
        <Box className="Announcementcontainer">
            <Typography component="h2" className='Announcementcontent'>ANNOUNCEMENTS</Typography>
            <Grid container direction="row" spacing={{ xs: 2, md: 3 }} >
                <Grid size={{ xs: 12, sm: 12, md: 8 }} className='CardDetailContainer' >
                    <Grid container direction="row" spacing={{ xs: 2, md: 3 }} >
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}  >
                            <form>
                                <Typography component="div" className='passwordcheck '>
                                    <AutocompleteInput
                                        control={control}
                                        name="selectedPortal"
                                        label="Select Portal"
                                        value={options?.find(option => option.value === selectedPortal || null)}
                                        options={options}
                                        error={!!errors.selectedPortal}
                                        helperText={errors.selectedPortal?.message}
                                        handleBlur={() => { }}
                                        onChange={handlePortalChange}
                                        inputColor="inputColorClass" // Add your custom class if needed
                                    />
                                </Typography>

                            </form>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }} >
                            
                            <form>
                                <Typography component="div" className='passwordcheck '>
                                    <AutocompleteInput
                                        control={control}
                                        name="selectedPortal"
                                        label="Select Portal"
                                        value={options?.find(option => option.value === selectedPortal || null)}
                                        options={options}
                                        error={!!errors.selectedPortal}
                                        helperText={errors.selectedPortal?.message}
                                        handleBlur={() => { }}
                                        onChange={handlePortalChange}
                                        inputColor="inputColorClass" // Add your custom class if needed
                                    />
                                </Typography>

                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }} className='CardDetailContainer-right'>
                    <Typography variant="div" component="div" className="">
                        <Typography variant="h3" component="h3" className="Announcements-text">Announcements</Typography>
                        <Typography className='Announcementcontainer' component="div" >
                            <Typography className='Announcementsnew' component="div" >

                                <Typography component="div" className="dateMonth">
                                    <Typography component="h2">
                                        29
                                    </Typography>
                                    <Typography component="span">
                                        Nov
                                    </Typography>
                                </Typography>
                                <Typography component="div">
                                    <Typography component="h3" className='title'>Management</Typography>
                                    <Typography component="p" className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography>
                                </Typography>

                            </Typography>
                            <Typography className='Announcementsnew' component="div" >

                                <Typography component="div" className="dateMonth">
                                    <Typography component="h2">
                                        29
                                    </Typography>
                                    <Typography component="span">
                                        Nov
                                    </Typography>
                                </Typography>
                                <Typography component="div">
                                    <Typography component="h3" className='title'>Management</Typography>
                                    <Typography component="p" className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography>
                                </Typography>

                            </Typography>
                            <Typography className='Announcementsnew' component="div" >

                                <Typography component="div" className="dateMonth">
                                    <Typography component="h2">
                                        29
                                    </Typography>
                                    <Typography component="span">
                                        Nov
                                    </Typography>
                                </Typography>
                                <Typography component="div">
                                    <Typography component="h3" className='title'>Management</Typography>
                                    <Typography component="p" className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography>
                                </Typography>

                            </Typography>

                        </Typography>
                    </Typography>
                </Grid>
            </Grid>

        </Box>

    </>;
};


export default Announcement;