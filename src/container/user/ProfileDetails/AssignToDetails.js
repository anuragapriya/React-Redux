import React, { useState } from 'react';
import { AutocompleteInput } from '_components';
import { jurisdictionList, organizationList } from '_utils/tempData';

const AssignToDetails = ({ role, errors, control ,trigger}) => {
    const [inputColors, setInputColors] = useState({});

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); 
        // const fieldError = errors[fieldName];
        // setInputColors(prevColors => ({
        //     ...prevColors,
        //     [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        // }));
    };

    return (
        <>
            <AutocompleteInput
                control={control}
                name="assignToAgency"
                label="Assign To Agency"
                options={organizationList}
                error={!!errors.assignToAgency}
                helperText={errors.assignToAgency?.message}
                handleBlur={handleBlur}
                inputColor={inputColors['assignToAgency']}
            />
            {role === 'EA' && (
                <AutocompleteInput
                    control={control}
                    name="assignToJurisdiction"
                    label="Assign To Jurisdiction"
                    options={jurisdictionList}
                    error={!!errors.assignToJurisdiction}
                    helperText={errors.assignToJurisdiction?.message}
                    handleBlur={handleBlur}
                    inputColor={inputColors['assignToJurisdiction']}
                />
            )}
            {role === 'Marketer' && (
                <>
                    <AutocompleteInput
                        control={control}
                        name="selectAccessRight"
                        label="Select Access Right"
                        options={jurisdictionList}
                        error={!!errors.selectAccessRight}
                        helperText={errors.selectAccessRight?.message}
                        handleBlur={handleBlur}
                        inputColor={inputColors['selectAccessRight']}
                    />
                    <AutocompleteInput
                        control={control}
                        name="selectAMarketer"
                        label="Select a Marketer"
                        options={organizationList}
                        error={!!errors.selectAMarketer}
                        helperText={errors.selectAMarketer?.message}
                        handleBlur={handleBlur}
                        inputColor={inputColors['selectAMarketer']}
                    />
                </>
            )}
        </>
    );
};

export default AssignToDetails;