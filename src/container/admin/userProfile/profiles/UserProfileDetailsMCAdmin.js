import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mui/material';
import { Grid, IconButton } from "@material-ui/core";
import { alertActions, mapCenterAction, masterActions, userProfileAction } from '_store';
import { mapCenterAdminValidationSchema } from "_utils/validationSchema";
import { supportedFormat } from '_utils/constant';
import { base64ToFile } from '_utils';
import { AutocompleteInput, UploadFiles } from '_components';
import { CompanyDetails, AdditionalDetails, CompanyPOC } from "container/user";
import { mapCenterRegistrationLabels } from '_utils/labels';
import { raphaelinfo, materialsymbolsdownload } from 'images';
import { green } from '@mui/material/colors';
import { CheckCircleRounded } from '@mui/icons-material';
import RejectReason from './RejectReason';

const UserProfileDetailsMCAdmin = ({ selectedUser, setSelectedUser, setshowDetailSection, handleReject, handleRefresh }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const header = 'Map Center';
    const portalkey = "mc";
    const id = selectedUser?.UserID;
    const [actionType, setActionType] = useState(null);
    const [open, setOpen] = useState(false);

    const authUser = useSelector(x => x.auth.value);
    const userAccess = authUser?.Data?.UserAccess;
    const userdetails = authUser?.Data?.UserDetails;
    const authUserName = `${userdetails.FirstName} ${userdetails.LastName}`;
    const isReviewer = userAccess?.some(access => access.Role.toLowerCase().includes('reviewer'));
    const isAdmin = userAccess?.some(access => access.Role.toLowerCase().includes('admin'));

    const user = useSelector(x => x.mapcenter?.userData);
    const statusID = user?.StatusID;
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [files, setFiles] = useState([]);

    const documentTypeData = user?.DocumentData || [];
    const states = user?.State || [];
    const exsistingFiles = user?.FileData || [];

    const documentData = documentTypeData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentTypeID
    }));

    const stateData = states.map(x => ({
        label: x.StateName,
        value: x.StateId
    }));

    const formatPhoneNumber = (number) => {
        const cleaned = ('' + number).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return number;
    };

    const { register, handleSubmit, control, reset, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(mapCenterAdminValidationSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(mapCenterAction.clear());
                const user = await dispatch(mapCenterAction.get({ id })).unwrap();
                const userData = user?.Data;
                const data = { ...userData, MobileNumber: formatPhoneNumber(userData.MobileNumber) };
                reset(data);
                if (data?.FileData) {
                    setFiles(data?.FileData.map(file => ({
                        ID: file.ID,
                        AdditionalID: file.AdditionalID,
                        DocumentTypeID: file.DocumentTypeID,
                        FileName: file.FileName,
                        Format: file.Format,
                        Size: file.Size,
                        PortalKey: file.PortalKey,
                        File: file.File,
                        Url: file.Url
                    })));
                }
            } catch (error) {
                dispatch(alertActions.error({
                    message: error?.message || error,
                    header: header
                }));
                reset(user);
            }
        };
        fetchData();
    }, [id, dispatch, reset, portalkey]);

    const handleSaveClick = () => {
        setActionType('save', () => handleSubmit(onSubmit)());
    };

    const handleApproveClick = () => {
        setActionType('approve', () => handleSubmit(onSubmit)());
    };

    const handleVerifyClick = () => {
        setActionType('verify', () => handleSubmit(onSubmit)());
    };

    useEffect(() => {
        if (actionType) {
            handleSubmit(onSubmit)();
        }
    }, [actionType]);

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            let result;
            const isApprove = actionType === 'approve';

            if (isAdmin) {
                const missingDocumentTypes = documentTypeData.filter(docType =>
                    !files.some(file => file.DocumentTypeID === docType.DocumentTypeID)
                );

                if (!documentData || missingDocumentTypes.length > 0) {
                    const missingDescriptions = missingDocumentTypes.map(docType => docType.DocumentDescription).join(', ');
                    dispatch(alertActions.error({
                        message: `Missing files for document types: ${missingDescriptions}`,
                        header: header
                    }));
                    return;
                }
                const transformedData = saveData(data, isApprove);
                result = await dispatch(mapCenterAction.update({ id, transformedData }));
            }
            else if (isReviewer) {
                const transformedData = {
                    UserID: id,
                    StatusID: 4,
                    ComapanyName: data.CompanyName,
                    CreatedBy: authUserName
                };
                result = await dispatch(userProfileAction.verifyUser(transformedData));
            }

            if (result?.error) {
                dispatch(alertActions.error({ message: result?.payload || result?.error.message, header: header }));
                return;
            }
            handleCancelClick();
            const message = isAdmin ?
                (isApprove ? mapCenterRegistrationLabels.message2 : mapCenterRegistrationLabels.message3)
                : mapCenterRegistrationLabels.message4;
            dispatch(alertActions.success({ message: message, header: header, showAfterRedirect: true }));

        } catch (error) {
            dispatch(alertActions.error({ message: error?.message || error, header: header }));
        }
        finally {
            setActionType(null); // Reset actionType after submission
        }
    };


    const saveData = (data, isApprove) => {
        // Validate that all required document types have files


        const transformedData = {
            UserID: id,
            FullName: data.FullName,
            AlternateEmail: user.AlternateEmail || '',
            DLState: data.DLState,
            DLNumber: data.DLNumber,
            HomeStreetAddress1: data.HomeStreetAddress1,
            HomeStreetAddress2: data.HomeStreetAddress2 || '',
            HomeCity: data.HomeCity,
            HomeState: data.HomeState,
            HomeZipCode: data.HomeZipCode,
            CompanyName: data.CompanyName,
            TaxIdentificationNumber: data.TaxIdentificationNumber,
            CompanyStreetAddress1: data.CompanyStreetAddress1,
            CompanyStreetAddress2: data.CompanyStreetAddress2 || '',
            CompanyCity: data.CompanyCity,
            CompanyState: data.CompanyState,
            CompanyZipCode: data.CompanyZipCode,
            CompanyContactName: data.CompanyContactName,
            CompanyContactTelephone: data.CompanyContactTelephone,
            CompanyContactEmailAddress: data.CompanyContactEmailAddress,
            AuthorizedWGLContact: data.AuthorizedWGLContact,
            AdditionalID: user?.AdditionalID || 0,
            StatusID: (user?.StatusID === 6 || isApprove) ? 6 : 9,
            PhoneNumber: data.MobileNumber,
            EmailID: user.EmailID,
            ModifiedBy: authUserName,
            FileData: files
        };

        return transformedData;
    }

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); // Trigger validation for the field
    };

    const handleOnChange = (event, newvalue) => {
        setSelectedDocumentType(newvalue);
    };

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDownload = async () => {
        try {
            const result = await dispatch(masterActions.getNondisclosureDocument()).unwrap();
            if (!result?.error) {
                base64ToFile(result.File, result.FileName);
            }

        }
        catch (error) {
            dispatch(alertActions.error({
                message: error?.message || error,
                header: header
            }));
        }
    };

    const handleCancelClick = () => {
        setSelectedUser(null);
        setshowDetailSection(false);
        handleRefresh();
    }

    const handleRejectClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRejectConfirm = (reason, comments) => {
        handleReject(selectedUser, reason, comments);
        setOpen(false);
    };

    return (
        <>
            {!(user?.loading) && (
                <Typography component="div" className="MapCenterAccecss">
                    <Typography component="div" className="MapCenterAccecssheading">
                        <Typography component="h1" variant="h5">Map Center Access</Typography>
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography className="Personal-Information-container" component="div">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} sm={6} md={6} className="Personal-Information">
                                                    <Typography component="div" className="mapcontainer">
                                                        <Typography component="div" className="Personal-Informationsheading">
                                                            <Typography component="h2" variant="h5">Personal Information</Typography>
                                                        </Typography>
                                                        <AdditionalDetails
                                                            handleBlur={handleBlur}
                                                            register={register}
                                                            control={control}
                                                            stateData={stateData}
                                                            errors={errors}
                                                            isAdmin={true}
                                                            isDisabled={isReviewer ? true : false}
                                                        />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={6} className="Personal-Information">
                                                    <Typography component="div" className="mapcontainer">
                                                        <Typography component="div" className="Personal-Informationsheading">
                                                            <Typography component="h2" variant="h5">Company Information</Typography>
                                                        </Typography>
                                                        <CompanyDetails
                                                            handleBlur={handleBlur}
                                                            register={register}
                                                            errors={errors}
                                                            control={control}
                                                            stateData={stateData}
                                                            isDisabled={isReviewer ? true : false}
                                                        />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <CompanyPOC
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                        handleBlur={handleBlur}
                                                        isDisabled={isReviewer ? true : false} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {isAdmin && (<Grid item xs={12} sm={12} md={4}>
                                            <Typography component="div" className="UploadFiles-container mapcontainer  ">
                                                <Typography component="div" className="Personal-Informationsheading ">
                                                    <Typography component="h2" variant="h5">Document Upload  <img src={raphaelinfo} alt='raphaelinfo'></img></Typography>
                                                </Typography>
                                                <Typography component="div" className="passwordcheck marbottom0 selecticon">
                                                    <AutocompleteInput
                                                        control={control}
                                                        name="documentType"
                                                        label="Document Type"
                                                        options={documentData}
                                                        error={!!errors.documentType}
                                                        helperText={errors.documentType?.message}
                                                        handleBlur={handleBlur}
                                                        onChange={handleOnChange}
                                                    />
                                                </Typography>
                                                <UploadFiles
                                                    initialFiles={files}
                                                    portalKey={portalkey}
                                                    selectedDocumentType={selectedDocumentType}
                                                    supportedFormats={supportedFormat}
                                                    documentTypes={documentTypeData}
                                                    control={control}
                                                    errors={errors}
                                                    onFileChange={handleFileChange}
                                                    exsistingFiles={exsistingFiles}
                                                />
                                                {/* <Typography component="div" className="SupportedFormats">
                                                    <Typography component="h3" >Download Template</Typography>
                                                    <div className="mar-top-16" >
                                                        <Typography component="div">Non-disclosure agreement
                                                            <IconButton onClick={handleDownload}>
                                                                <img src={materialsymbolsdownload} alt="material-symbols_download"></img>
                                                            </IconButton>
                                                        </Typography>
                                                    </div>
                                                </Typography> */}
                                            </Typography>
                                        </Grid>
                                        )}
                                        {isReviewer && (<Grid item xs={12} sm={12} md={4}>

                                            <Typography component="div" className="SupportedFormats Personal-Informationsheading">
                                                <Typography component="h2">Uploaded Documents</Typography>
                                                <Typography component="div" className="fileformat">
                                                    {documentTypeData && documentTypeData.map(type => {
                                                        const uploadedDocument = files.filter(x => x.DocumentTypeID === type.DocumentTypeID);
                                                        if (uploadedDocument && uploadedDocument.length > 0) {
                                                            return (
                                                                <div className="mar-top-16" key={type.DocumentTypeID}>
                                                                    <Typography component="div" >
                                                                        <CheckCircleRounded fontSize="small" style={{ color: green[500] }} />
                                                                        <Typography component="span" className="DocumentDescription">{type.DocumentDescription}</Typography>
                                                                        <Typography component="div" className="DocumentTypeID">
                                                                            <IconButton disabled={true} onClick={() => handleDownload(uploadedDocument[0].File, uploadedDocument[0].FileName)}>

                                                                                <img src={materialsymbolsdownload} alt='download'></img>
                                                                            </IconButton>

                                                                        </Typography>
                                                                    </Typography>
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div className="mar-top-16" key={type.DocumentTypeID}>
                                                                    <Typography component="div"><CheckCircleRounded fontSize="small" color="disabled" /><Typography component="span" className="DocumentDescription"> {type.DocumentDescription}</Typography></Typography>
                                                                </div>
                                                            );
                                                        }
                                                    })}
                                                </Typography>
                                            </Typography>
                                        </Grid>)}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Typography>
                        <Grid item xs={12} sm={12} md={12} className="userprofilebutton">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={6} >
                                    <Button variant="contained" color="red" className="cancelbutton" onClick={handleCancelClick}>
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} >
                                    {isAdmin &&
                                        (<>
                                            {[4, 9].includes(statusID) &&
                                                <Button
                                                    type="button"
                                                    variant="contained" className='submitbutton save buttonmarginleft-20' color="primary"
                                                    disabled={!isValid}
                                                    onClick={handleApproveClick}>
                                                    Approve
                                                </Button>
                                            }
                                            {[4, 9, 6].includes(statusID) &&
                                                <Button
                                                    type="button"
                                                    variant="contained" className='submitbutton save' color="primary"
                                                    disabled={!isValid}
                                                    onClick={handleSaveClick}>
                                                    Save
                                                </Button>
                                            }
                                        </>)}
                                    {(isReviewer && statusID === 1) && (<>
                                        <Button
                                            type="button"
                                            variant="contained" className='submitbutton save' color="primary"
                                            onClick={handleVerifyClick}>
                                            Verify
                                        </Button>
                                        <Button type="button" variant="contained" className="delete" //onClick={() => handleRejectClick()}
                                            onClick={() => handleReject(selectedUser)}>
                                            Deny
                                        </Button>
                                    </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        {open && <RejectReason open={open} onConfirm={handleRejectConfirm} handleClose={handleClose}></RejectReason>}
                    </form>
                </Typography>
            )}
        </>
    );
};

export default UserProfileDetailsMCAdmin;