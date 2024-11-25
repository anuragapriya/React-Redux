import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Select, MenuItem, FormControl, InputLabel, Switch, Button } from '@mui/material';
import { portalAccessData } from '_utils/constant';
import _ from 'lodash';

const PortalConfiguration = () => {
    const [selectedPortal, setSelectedPortal] = useState(portalAccessData[0]?.PortalId || '');
    const [data, setData] = useState(_.cloneDeep(portalAccessData));
    const [initialData, setInitialData] = useState([]);

    useEffect(() => {
        // Store a deep copy of the initial data
        setInitialData(_.cloneDeep(portalAccessData));
    }, []);

    const pivotData = useCallback((portal) => {
        const result = [];
        const accessNames = new Set();
        const roles = {};

        portal.PortalRoleAccess.forEach(roleAccess => {
            roleAccess.FeatureAccess.forEach(permission => {
                accessNames.add(permission.FeatureId);
                if (!roles[permission.FeatureId]) {
                    roles[permission.FeatureId] = {};
                }
                roles[permission.FeatureId][roleAccess.RoleId] = permission.Isactive;
            });
        });

        accessNames.forEach(featureId => {
            const featureName = portal.PortalRoleAccess[0].FeatureAccess.find(permission => permission.FeatureId === featureId).Name;
            const row = { FeatureId: featureId, FeatureName: featureName };
            Object.keys(roles[featureId]).forEach(roleId => {
                row[roleId] = roles[featureId][roleId];
            });
            result.push(row);
        });

        return result;
    }, []);

    const pivotedData = useMemo(() => {
        const selectedData = data.find(portal => portal.PortalId === selectedPortal);
        return pivotData(selectedData);
    }, [selectedPortal, data, pivotData]);

    const handlePortalChange = (event) => {
        setSelectedPortal(event.target.value);
        // Reset the data state to the initial data
        setData(_.cloneDeep(initialData));
    };

    const handleToggle = (featureId, roleId) => {
        setData(prevData => {
            const updatedData = prevData.map(portal => {
                if (portal.PortalId === selectedPortal) {
                    portal.PortalRoleAccess.forEach(roleAccess => {
                        roleAccess.FeatureAccess.forEach(permission => {
                            if (permission.FeatureId === parseInt(featureId) && roleAccess.RoleId === parseInt(roleId)) {
                                permission.Isactive = permission.Isactive === 1 ? 0 : 1;
                            }
                        });
                    });
                }
                return portal;
            });
            return updatedData;
        });
    };

    const handleSubmit = () => {
        const changedData = [];
        data.forEach((portal, portalIndex) => {
            portal.PortalRoleAccess.forEach((roleAccess, roleIndex) => {
                roleAccess.FeatureAccess.forEach((permission, featureIndex) => {
                    const initialPermission = initialData[portalIndex].PortalRoleAccess[roleIndex].FeatureAccess[featureIndex];
                    if (permission.Isactive !== initialPermission.Isactive) {
                        changedData.push({
                            RoleMappingId: permission.MappingFeatureId,
                            Isactive: permission.Isactive
                        });
                    }
                });
            });
        });

        console.log('Changed Data:', changedData);
        // You can use fetch or axios to send the changed data to a server
        // fetch('/api/submit', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(changedData),
        // });
    };

    const columns = useMemo(() => {
        const dynamicColumns = [
            { header: 'Feature Name', accessorKey: 'FeatureName' }
        ];
        if (pivotedData.length > 0) {
            Object.keys(pivotedData[0]).forEach(key => {
                if (key !== 'FeatureId' && key !== 'FeatureName') {
                    const role = data.find(portal => portal.PortalId === selectedPortal)
                                    .PortalRoleAccess.find(roleAccess => roleAccess.RoleId === parseInt(key)).Role;
                    dynamicColumns.push({
                        header: role,
                        accessorKey: key,
                        Cell: ({ cell }) => (
                            <Switch
                                checked={cell.getValue() === 1}
                                onChange={() => handleToggle(cell.row.original.FeatureId, key)}
                            />
                        ),
                    });
                }
            });
        }
        return dynamicColumns;
    }, [pivotedData, data, selectedPortal]);

    const table = useMaterialReactTable({
        columns,
        data: pivotedData,
        enableColumnResizing: true,
        enableSorting: true,
        enablePagination: true,
        enableHiding: false,
        enableGlobalFilter: false,
        enableFullScreenToggle: false,
        enableColumnActions: false,
    });

    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="portal-select-label">Select Portal</InputLabel>
                <Select
                    labelId="portal-select-label"
                    value={selectedPortal || ''}
                    onChange={handlePortalChange}
                >
                    {data.map(portal => (
                        <MenuItem key={portal.PortalId} value={portal.PortalId}>
                            {portal.PortalName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <MaterialReactTable table={table} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default PortalConfiguration;
