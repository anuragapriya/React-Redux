
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PortalConfiguration from "./PortalConfiguration";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { portalAccessActions,alertActions } from '_store';

const Configuration = () => {
    const dispatch = useDispatch();
    const portalAccessData = useSelector((x) => x.configs?.portalAccessGetData);
    const accessData = portalAccessData ? portalAccessData.Data : [];
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        try {
            dispatch(portalAccessActions.getAccess());
            if (!portalAccessData.Submitted && portalAccessData.Errors) {
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
            const portalData = accessData.find(x => x.PortalID === defaultPortalId);
            setData(portalData);
        }
    }, [accessData]);

    useEffect(() => {
        if (accessData && selectedPortal) {
            const portalData = accessData.find(x => x.PortalID === selectedPortal);
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
        <>
            <FormControl fullWidth>
                <InputLabel id="portal-select-label">Select Portal</InputLabel>
                <Select
                    labelId="portal-select-label"
                    value={selectedPortal || ''}
                    onChange={handlePortalChange}
                >
                    {accessData && accessData.map(portal => (
                        <MenuItem key={portal.PortalID} value={portal.PortalID}>
                            {portal.PortalName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <PortalConfiguration data={data} handleSubmitted={handleSubmitted} />
        </>
    );
}

export default Configuration;
