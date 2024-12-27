import React, { useState } from 'react';
import { UserProfileAI, UserProfileMB,UserFilter } from "container/admin";

const Users = () => {
    const [portalKey, setPortalKey] = useState('AI');
    const [data, setData] = useState([
        { ID: 1, FullName: 'Item 1', RoleID: null, StatusID: null, AgencyID: null },
        { ID: 2, FullName: 'Item 2', RoleID: null, StatusID: null, AgencyID: null },
    ]);

    const [errors, setErrors] = useState({});
    const [editedRowId, setEditedRowId] = useState(null);

    const handleChange = (newValue, rowData, field) => {
        const newData = data.map(row => row.ID === rowData.ID ? { ...row, [field]: newValue } : row);
        setData(newData);

        // Clear error if a value is selected
        if (newValue) {
            setErrors(prevErrors => ({ ...prevErrors, [rowData.ID]: { ...prevErrors[rowData.ID], [field]: false } }));
        }
    };

    const validate = (rowData, requiredFields) => {
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!rowData[field]) {
                newErrors[field] = true;
            }
        });
        setErrors(prevErrors => ({ ...prevErrors, [rowData.ID]: newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (editedRowId !== null) {
            const editedRow = data.find(row => row.ID === editedRowId);
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
        setData(newData);
        setPortalKey(newPortalKey);
    };

    return (
        <>
            {/* <UserFilter handleFilterSubmit={handleFilterSubmit}></UserFilter> */}
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