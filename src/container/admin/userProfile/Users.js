import React, { useState } from 'react';
import { UserProfileAI, UserProfileMB, UserFilter } from "container/admin";
import CustomFilterPanelPosition from '../dummy';

const Users = () => {
    const [portalKey, setPortalKey] = useState('AI');
    const [data, setData] = useState([
        { id: 1, FullName: 'Item 1', RoleID: 1, StatusID: 2, AgencyID: 1, JurisdictionID: 2 },
        { id: 2, FullName: 'Item 2', RoleID: 2, StatusID: 1, AgencyID: 2, JurisdictionID: 1 },
    ]);

    const [errors, setErrors] = useState({});
    const [editedRowId, setEditedRowId] = useState(null);

    const handleChange = (newValue, rowData, field) => {
        const newData = data.map(row => row.id === rowData.id ? { ...row, [field]: newValue } : row);
        setData(newData);

        // Clear error if a value is selected
        if (newValue) {
            setErrors(prevErrors => ({ ...prevErrors, [rowData.id]: { ...prevErrors[rowData.id], [field]: false } }));
        }
    };

    const validate = (rowData, requiredFields) => {
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!rowData[field]) {
                newErrors[field] = true;
            }
        });
        setErrors(prevErrors => ({ ...prevErrors, [rowData.id]: newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (editedRowId !== null) {
            const editedRow = data.find(row => row.id === editedRowId);
            const requiredFields = ['RoleID', 'StatusID', 'AgencyID']; // List of required fields
            if (validate(editedRow, requiredFields)) {
                // Submit data
                console.log('Data submitted:', editedRow);
            } else {
                console.log('Validation failed');
            }
        }
    };

    const handleFilterSubmit = (newData, newPortalKey) => {
        setPortalKey(newPortalKey);
    };

    return (
        <>
            {/* <CustomFilterPanelPosition />
            <UserFilter handleFilterSubmit={handleFilterSubmit} /> */}
            {portalKey === 'AI' && (
                <UserProfileAI
                    data={data}
                    setData={setData}
                    errors={errors}
                    setErrors={setErrors}
                    editedRowId={editedRowId}
                    setEditedRowId={setEditedRowId}
                    handleChange={handleChange}
                />
            )}
            {portalKey === 'MB' && (
                <UserProfileMB
                    data={data}
                    setData={setData}
                    errors={errors}
                    setErrors={setErrors}
                    editedRowId={editedRowId}
                    setEditedRowId={setEditedRowId}
                    handleChange={handleChange}
                />
            )}
            <button onClick={handleSubmit}>Submit</button>
        </>
    );
};

export default Users;