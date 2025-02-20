import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import {  AutocompleteInput, CustomDateRangePicker, CustomStaticDateRangePicker } from '_components';
import { alertActions, nominationpipelineAction } from '_store';
import { Typography, Button, Box,  ClickAwayListener } from '@mui/material';
import Popper from '@mui/material/Popper';
import { Grid } from '@material-ui/core';
import FilterListIcon from '@mui/icons-material/FilterList';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { pipelineNominationFilterSchema } from '_utils/validationSchema';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const PipelineNominationFilter = ({ marketerData, pipelineData,
    fromDate, setFromDate, toDate, setToDate, marketerId, setMarketerId, pipelineID, setPipelineID,
    handleFilterSubmit, isOpen, onClose, onOpen }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const marketerList = marketerData?.map(x => ({
        label: x.MarketerName,
        value: x.MarketerID
    })) || [];

    const pipelineList = pipelineData?.map(x => ({
        label: x.Name,
        value: x.PipelineID
    })) || [];

    const { handleSubmit, control, watch, reset, trigger, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(pipelineNominationFilterSchema),
        defaultValues: {
            MarketerID: marketerId,
            PipelineID: pipelineID,
            SelectedDate: [dayjs(fromDate), dayjs(toDate)]
        }
    });

    const watchedValues = watch();

    useEffect(() => {
        const hasValue = Object.values(watchedValues).some(value => value !== '' && value !== null);
        setIsFormValid(hasValue);
    }, [watchedValues]);

    useEffect(() => {
        if (marketerId) {
            setValue('MarketerID', marketerId);
        }
    }, [marketerId, setValue]);

    useEffect(() => {
        if (pipelineID) {
            setValue('PipelineID', pipelineID);
        }
    }, [pipelineID, setValue]);

    const canBeOpen = isOpen && Boolean(anchorEl);
    const id = canBeOpen ? 'simple-popper' : undefined;

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            const formattedAnnouncementStartDate = dayjs(data.SelectedDate[0]).utc().format('YYYY-MM-DDTHH:mm:ss');
            const formattedAnnouncementEndDate = dayjs(data.SelectedDate[1]).utc().format('YYYY-MM-DDTHH:mm:ss');
            const transformData = {
                marketerID: data.MarketerID || 0,
                pipelineID: data.PipelineID || 0,
                FromDate: formattedAnnouncementStartDate,
                ToDate: formattedAnnouncementEndDate
            }
            setFromDate(fromDate);
            setToDate(toDate); 
            const result = await dispatch(nominationpipelineAction.filter(transformData)).unwrap();
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: "Fetch Failed" }));
                return;
            }  
            setMarketerId(data?.MarketerID);
            setPipelineID(data?.PipelineID);
            setFromDate(transformData?.FromDate);
            setToDate(transformData.ToDate);          
            handleFilterSubmit(result?.Data);
            resetValues();
            onClose();
        } catch (error) {
            dispatch(alertActions.error({ message: error?.message || error, header: "Fetch Failed" }));
        }
    };

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };

    const handleCancelClick = () => {
        resetValues();
        onClose();
    };

    const resetValues = () => {
        reset({
            PipelineDate: '',
        });
    };

    const handleClickAway = () => {
        resetValues();
        onClose();
    };

    return (
        <>
            <Button className='Filter' type="button" variant="contained" color="primary" aria-describedby={id} onClick={handleClick}>
                <FilterListIcon />Filter
            </Button>
            <Popper id={id} open={canBeOpen} anchorEl={anchorEl} className="Filtercontainer marketerGroup Border">
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }} className="Filtercontainerinner">
                        <form onSubmit={handleSubmit(onSubmit)} className='Registrationcontainer marketerFiltercontainer'>
                            {/* <Typography component="div" className='userprofilelist'>
                            <Grid container direction="row" spacing={{ xs: 2, md: 3 }}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="h2" className='userprofilelistcontent'>Marketer</Typography>
                                </Grid>
                            </Grid>
                        </Typography> */}
                            <Typography component="div" className="passwordcheck border-none marbottom0 selecticon">
                                <CustomDateRangePicker
                                    id="SelectedDate"
                                    control={control}
                                    trigger={trigger}
                                    name="SelectedDate"
                                    label="From - To"
                                    error={!!errors.SelectedDate}
                                    helperText={errors.SelectedDate?.message}
                                    handleBlur={handleBlur}
                                    minimumDate={new Date()}
                                />
                            </Typography>
                            <Typography component="div" className='marbottom0 selecticon marginbottom16'>
                                <AutocompleteInput
                                    control={control}
                                    name="MarketerID"
                                    label="Select Marketer"
                                    options={marketerList}
                                    error={!!errors.MarketerID}
                                    helperText={errors.MarketerID?.message}
                                    handleBlur={handleBlur}
                                    trigger={trigger}
                                />
                            </Typography>
                            <Typography component="div" className='marbottom0 selecticon marginbottom16'>
                                <AutocompleteInput
                                    control={control}
                                    name="PipelineID"
                                    label="Select Pipeline"
                                    options={pipelineList}
                                    error={!!errors.PipelineID}
                                    helperText={errors.PipelineID?.message}
                                    handleBlur={handleBlur}
                                    trigger={trigger}
                                />
                            </Typography>

                            <Box className="CreateMarketerbutton" spacing={{ xs: 2, md: 3 }} >

                                <Button type="submit"
                                    variant="contained"
                                    className='submitbutton'
                                    color="primary"
                                    disabled={!isFormValid}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="contained"
                                    className='cancelbutton'
                                    color="primary"
                                    onClick={handleCancelClick}>
                                    Cancel
                                </Button>
                            </Box>
                        </form>
                    </Box>
            </Popper>
        </>
    );
}

export default PipelineNominationFilter;