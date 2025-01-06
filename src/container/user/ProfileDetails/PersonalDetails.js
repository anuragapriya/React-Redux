import React, { useState, useEffect } from 'react';
import { PasswordCheck, CustomFormControl, MobileNumberInput, PasswordInput, AutocompleteInput, ModalPopup } from '_components';
import { Typography } from '@mui/material';
import { aggrementEALabel } from '_utils/labels';

const PersonalDetails = ({ isPasswordValid, register, errors, watch, resetField, control, trigger, setIsPasswordValid, portalData, portalList, setIsAgreed }) => {
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [openAgreeModal, setOpenAgreeModal] = useState(false);
    const Password = watch('Password', '');
    const FullName = watch('FullName', '');

    useEffect(() => {
        if (errors.Password) {
            setShowPasswordCheck(true);
        } else {
            setShowPasswordCheck(false);
        }
    }, [errors.Password]);

    const handlePasswordFocus = () => {
        if (!isPasswordValid) {
            setShowPasswordCheck(true);
        }
    };

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName);
    };

    const handlePasswordValidation = (isValid) => {
        setIsPasswordValid(isValid);
        if (isValid) {
            setShowPasswordCheck(false);
        }
    };

    const handlePortalChange = (e, newValue) => {
        const portalKey = portalList?.find(p => p.PortalID === newValue?.value)?.PortalKey;
        if (portalKey && portalKey.toLowerCase() === 'ea') {
            setOpenAgreeModal(true);
        }
    };

    const handleConfirmClick = async () => {       
        await setOpenAgreeModal(false);
        await setIsAgreed(true); 
    };

    const handleClose = () => {
        setOpenAgreeModal(false);
        setIsAgreed(false);
        resetField('PortalId');
    };

    return (
        <>
            <CustomFormControl
                id="FullName"
                label="Full Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
            />
            <CustomFormControl
                id="CompanyName"
                label="Company Name"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
            />
            <CustomFormControl
                id="EmailAddress"
                label="Email Address"
                type="text"
                register={register}
                errors={errors}
                handleBlur={handleBlur}
            />
            <MobileNumberInput
                control={control}
                name="MobileNumber"
                label="Phone Number"
                rules={{ required: 'Phone Number is required' }}
                errors={errors}
                handleBlur={handleBlur}
            />
            <Typography component="div" className='passwordcheck'>
                <PasswordInput
                    control={control}
                    name="Password"
                    label="Password"
                    rules={{ required: 'Password is required' }}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleFocus={handlePasswordFocus}
                    isPasswordValid={isPasswordValid}
                />
                {showPasswordCheck && (
                    <PasswordCheck password={Password} userName={FullName} onValidationChange={handlePasswordValidation} />
                )}
            </Typography>
            <Typography component="div" className='passwordcheck mobile-padding'>
                <AutocompleteInput
                    control={control}
                    name="PortalId"
                    label="Select Portal"
                    options={portalData}
                    error={!!errors.PortalId}
                    helperText={errors.PortalId?.message}
                    handleBlur={handleBlur}
                    onChange={handlePortalChange}
                />
            </Typography>
            {openAgreeModal && <ModalPopup
                header={aggrementEALabel.header}
                message1={aggrementEALabel.message1}
                btnPrimaryText={aggrementEALabel.btnPrimaryText}
                btnSecondaryText={aggrementEALabel.btnSecondaryText}
                handlePrimaryClick={handleConfirmClick}
                handleSecondaryClick={handleClose}
            />}
        </>
    );
};

export default PersonalDetails;