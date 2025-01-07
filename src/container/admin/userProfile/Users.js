import React, { useState } from 'react';
import { UserFilter, UserProfileList } from "container/admin";
import { getAIUserProfileData } from '_utils/constant';
import { Button } from '@material-ui/core';
const Users = () => {
    const [portalKey, setPortalKey] = useState('MB');
    const userProfiles= getAIUserProfileData.Data;
    const [data, setData] = useState(userProfiles.UserData);

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
            {/* <CustomFilterPanelPosition /> */}
           
          
                <UserProfileList
                    data={data}
                    userProfiles={userProfiles}
                    setData={setData}
                    errors={errors}
                    setErrors={setErrors}
                    editedRowId={editedRowId}
                    setEditedRowId={setEditedRowId}
                    handleChange={handleChange}
                    handleFilterSubmit={()=>handleFilterSubmit}
                />
           
           <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary" className='submitbutton' onClick={handleSubmit}>Submit</Button>
        </>
    );
};

export default Users;