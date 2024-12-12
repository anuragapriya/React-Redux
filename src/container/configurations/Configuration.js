
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PortalConfiguration from "./PortalConfiguration";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { portalAccessActions,alertActions } from '_store';
import { useForm } from 'react-hook-form';
import { AutocompleteInput } from '_components';

const Configuration = () => {
    const dispatch = useDispatch();
    const portalAccessData = useSelector((x) => x.configs?.portalAccessGetData);
    const accessData = portalAccessData ? portalAccessData.Data : [];
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [data, setData] = useState(null);
    const options=(accessData?.map(portal => ({
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

    const handleSubmitted = () => {
        dispatch(portalAccessActions.getAccess());
    }

    return (
        <form>
        <AutocompleteInput
            control={control}
            name="selectedPortal"
            label="Select Portal"
            value={options?.find(option => option.value === selectedPortal || null)}
            options={options}
            error={!!errors.selectedPortal}
            helperText={errors.selectedPortal?.message}
            handleBlur={() => {}}
            onChange={handlePortalChange}
            inputColor="inputColorClass" // Add your custom class if needed
        />
       {data && <PortalConfiguration data={data} handleSubmitted={handleSubmitted} />}
    </form>
    );
}

export default Configuration;
