import React from 'react';
import { Controller } from 'react-hook-form';
import { ComboSelectBox, PasswordCheck } from '_components';
import { jurisdictionList, organizationList } from '_utils/tempData';

const AssignToDetails = (props) => {

    const { role, errors, control } = props;

    return <>
        <Controller
            name="assignToAgency"
            control={control}
            render={({ field }) => (
                <ComboSelectBox
                    {...field}
                    boxLabel="Assign To Agency"
                    options={organizationList}
                    handleChange={(value) => field.onChange(value)}
                    error={!!errors.assignToAgency}
                    helperText={errors.assignToAgency?.message}
                />
            )}
        />
        {(role && role == 'EA') && <Controller
            name="assignToJurisdiction"
            control={control}
            render={({ field }) => (
                <ComboSelectBox
                    {...field}
                    boxLabel="Assign To Jurisdiction"
                    options={jurisdictionList}
                    handleChange={(value) => field.onChange(value)}
                    error={!!errors.assignToJurisdiction}
                    helperText={errors.assignToJurisdiction?.message}
                />
            )}
        />
        }
        {(role && role == 'Marketer') && <><Controller
            name="selectAccessRight"
            control={control}
            render={({ field }) => (
                <ComboSelectBox
                    {...field}
                    boxLabel="Select Access Right"
                    options={jurisdictionList}
                    handleChange={(value) => field.onChange(value)}
                    error={!!errors.assignToJurisdiction}
                    helperText={errors.assignToJurisdiction?.message}
                />
            )}
        />
            <Controller
                name="selectAMarketer"
                control={control}
                render={({ field }) => (
                    <ComboSelectBox
                        {...field}
                        boxLabel="Select a Marketer"
                        options={organizationList}
                        handleChange={(value) => field.onChange(value)}
                        error={!!errors.assignToJurisdiction}
                        helperText={errors.assignToJurisdiction?.message}
                    />
                )}
            />
        </>
        }
    </>;
};

export default AssignToDetails;