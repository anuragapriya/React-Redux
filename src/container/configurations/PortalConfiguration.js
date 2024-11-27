
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Switch, Button } from '@mui/material';
import { portalAccessActions, alertActions } from '_store';
import _ from 'lodash';

const PortalConfiguration = (props) => {
    const dispatch = useDispatch();
    const initialData = props.data;
    const [data, setData] = useState(_.cloneDeep(initialData));

    useEffect(() => {
        setData(_.cloneDeep(props.data));
    }, [props.data]);

    const pivotData = useCallback((portal) => {
        const result = [];
        const accessNames = new Set();
        const roles = {};

        portal?.PortalRoleAccess.forEach(roleAccess => {
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
        return pivotData(data);
    }, [data, pivotData]);

    const handleToggle = (featureId, roleId) => {
        setData(prevData => {
            const updatedData = _.cloneDeep(prevData);
            updatedData.PortalRoleAccess.forEach(roleAccess => {
                roleAccess.FeatureAccess.forEach(permission => {
                    if (permission.FeatureId === parseInt(featureId) && roleAccess.RoleId === parseInt(roleId)) {
                        permission.Isactive = permission.Isactive === 1 ? 0 : 1;
                    }
                });
            });
            return updatedData;
        });
    };

    const handleSubmit = async () => {
        const changedData = [];
        data.PortalRoleAccess.forEach((roleAccess, roleIndex) => {
            roleAccess.FeatureAccess.forEach((permission, featureIndex) => {
                const initialPermission = initialData.PortalRoleAccess[roleIndex].FeatureAccess[featureIndex];
                if (permission.Isactive !== initialPermission.Isactive) {
                    changedData.push({
                        RoleMappingId: permission.MappingFeatureId,
                        Isactive: permission.Isactive
                    });
                }
            });
        });

        try {
            let message;

            await dispatch(portalAccessActions.postAccess(changedData)).unwrap();
            message = 'Config updated';
props.handleSubmitted();
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const columns = useMemo(() => {
        const dynamicColumns = [
            { header: 'Feature Name', accessorKey: 'FeatureName' }
        ];
        if (pivotedData.length > 0) {
            Object.keys(pivotedData[0]).forEach(key => {
                if (key !== 'FeatureId' && key !== 'FeatureName') {
                    const role = data.PortalRoleAccess.find(roleAccess => roleAccess.RoleId === parseInt(key)).Role;
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
    }, [pivotedData, data]);

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
            <MaterialReactTable table={table} />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default PortalConfiguration;
