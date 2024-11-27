
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PortalConfiguration from "./PortalConfiguration";
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { portalAccessActions } from '_store';

const Configuration = () => {
    const dispatch = useDispatch();
    const portalAccessData = useSelector((x) => x.configs?.portalAccessGetData);
    const accessData = Array.isArray(portalAccessData) ? portalAccessData : [];
    const [selectedPortal, setSelectedPortal] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        dispatch(portalAccessActions.getAccess());
    }, [dispatch]);

    useEffect(() => {
        if (accessData.length > 0) {
            const defaultPortalId =selectedPortal? selectedPortal : accessData[0]?.PortalId;
            setSelectedPortal(defaultPortalId);
            const portalData = accessData.find(x => x.PortalId === defaultPortalId);
            setData(portalData);
        }
    }, [accessData]);

    useEffect(() => {
        if (selectedPortal) {
            const portalData = accessData.find(x => x.PortalId === selectedPortal);
            setData(portalData);
        }
    }, [selectedPortal, accessData]);

    const handlePortalChange = (event) => {
        setSelectedPortal(event.target.value);
    };

    const handleSubmitted=()=>
    {
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
                    {accessData.map(portal => (
                        <MenuItem key={portal.PortalId} value={portal.PortalId}>
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
