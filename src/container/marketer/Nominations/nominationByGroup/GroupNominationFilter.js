import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Popper from '@mui/material/Popper';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Box, Typography } from '@mui/material';
import { alertActions, nominationgroupAction } from '_store';
import { AutocompleteInput, CustomDateRangePicker, CustomStaticDateRangePicker1 } from '_components';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(utc);
dayjs.extend(customParseFormat);

const GroupNominationFilter = ({ marketerData, marketerGroupData, pipelineData, fromDate, setFromDate, toDate, setToDate, handleFilterSubmit, marketerId,
    marketerGroupId, setMarketerGroupId, pipelineID, setPipelineID, setMarketerId, isOpen, onClose, onOpen, isAdmin }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { handleSubmit, control, watch, reset, trigger, setValue, formState: { errors } } = useForm({
    });
    useEffect(() => {
        if (fromDate & toDate) {
            setValue('SelectedDate', [dayjs(fromDate), dayjs(toDate)]);
        }
    }, [fromDate, toDate, setValue]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        if (isOpen) {
            handleCancelClick();
        } else {
            onOpen();
        }
    }
    const canBeOpen = isOpen && Boolean(anchorEl);
    const id = canBeOpen ? 'simple-popper' : undefined;
    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName);
    };



    const marketerList = marketerData?.map(x => ({
        label: x.MarketerName,
        value: x.MarketerID
    })) || [];

    const marketerGroupList = marketerGroupData?.map(x => ({
        label: x.GroupName,
        value: x.GroupID
    })) || [];

    const pipelineList = pipelineData?.map(x => ({
        label: x.Name,
        value: x.PipelineID
    })) || [];
    const resetValues = () => {
        reset({
            NominatedBy: '',
            selectGroup: '',
            selectpipeline: '',
            SelectedDate: [dayjs(fromDate), dayjs(toDate)]
        });
    };
    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            const formattedAnnouncementStartDate = dayjs(data.SelectedDate[0]).format('YYYY-MM-DDTHH:mm:ss');
            const formattedAnnouncementEndDate = dayjs(data.SelectedDate[1]).format('YYYY-MM-DDTHH:mm:ss');
            const transformData = {
                marketerID: data.marketerId || 0,
                pipelineID: data.pipelineID || 0,
                // marketerGroupId: data.marketerGroupId || 0,
                FromDate: formattedAnnouncementStartDate,
                ToDate: formattedAnnouncementEndDate
            }

            console.log(transformData);
            setFromDate(transformData?.FromDate);
            setToDate(transformData.ToDate);
            handleFilterSubmit({});
            const result = await dispatch(nominationgroupAction.filter(transformData)).unwrap();
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: "Fetch Failed" }));
                return;
            }
            setMarketerId(data?.marketerId);
            // setPipelineID(data?.pipelineID);
            setFromDate(transformData?.FromDate);
            setToDate(transformData.ToDate);
            setMarketerGroupId(data?.marketerGroupId)
            handleFilterSubmit(result?.Data);
            // resetValues();
            onClose();
        } catch (error) {
            dispatch(alertActions.error({ message: error?.message || error, header: "Fetch Failed" }));
        }
    };
    const handleCancelClick = () => {
        resetValues();
        onClose();
    };
    return (
        <>
            <Button className='Filter' type="button" variant='contained' color="primary" aria-describedby={id} onClick={handleClick}>
                <FilterListIcon />Filter
            </Button>
            <Popper id={id} open={canBeOpen} anchorEl={anchorEl} className='Filtercontainer'>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.poper' }} className="Filtercontainerinner">
                    <form onSubmit={handleSubmit(onSubmit)} className='Registrationcontainer marketerFiltercontainer'>
                        <Typography component="div" className='passwordcheck border-none marbottom0 selecticon'>
                            <CustomStaticDateRangePicker1
                                id="SelectedDate"
                                control={control}
                                trigger={trigger}
                                name="SelectedDate"
                                label="From - To"
                                handleBlur={handleBlur}
                                minDate={dayjs().subtract(12, 'month')}
                                maxDate={dayjs().add(12, 'month')}
                                maxDays={31}
                            />

                        </Typography>
                        {isAdmin ? <Typography component="div" className='marbottom0 selecticon marginbottom16'>
                            <AutocompleteInput
                                control={control}
                                name="marketerId"
                                label="Marketer"
                                options={marketerList}
                                handleBlur={handleBlur}
                                trigger={trigger}
                            />
                        </Typography> : null}
                        <Typography component="div" className='marbottom0 selecticon marginbottom16'>
                            <AutocompleteInput
                                control={control}
                                name="marketerGroupId"
                                label="Select Group"
                                options={marketerGroupList}
                                handleBlur={handleBlur}
                                trigger={trigger}
                            />
                        </Typography>
                        {/* <Typography component="div" className='marbottom0 selecticon marginbottom16'>
                            <AutocompleteInput
                                control={control}
                                name="pipelineID"
                                label="Select PipeLine"
                                options={pipelineList}
                                handleBlur={handleBlur}
                                trigger={trigger}
                            />
                        </Typography> */}
                        <Box className="CreateMarketerbutton" spacing={{ xs: 2, md: 3 }} >

                            <Button type="submit"
                                variant="contained"
                                className='submitbutton'
                                color="primary"
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
    )
}

export default GroupNominationFilter;

