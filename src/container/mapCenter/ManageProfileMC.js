import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Button } from '@mui/material';
import { Grid, IconButton } from "@material-ui/core";
import { alertActions, mapCenterAction } from '_store';
import { additionalDetailsValidationSchema, companyPOCValidationSchema, companyValidationSchema } from "_utils/validationSchema";
import { supportedFormat } from '_utils/constant';
import { base64ToFile } from '_utils';
import { AutocompleteInput, UploadFiles, UnderConstruction } from '_components';
import { CompanyDetails, AdditionalDetails, CompanyPOC } from "container/user";
import { mapCenterRegistrationLabels } from '_utils/labels';
import { raphaelinfo, materialsymbolsdownload } from '../../images';
const ManageProfileMC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { portalkey, id } = useParams();
    const header = 'Map Center';
    const user = useSelector(x => x.mapcenter?.userData);
    const [inputColors, setInputColors] = useState({});
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [selectedHomeState, setSelectedHomeState] = useState(null);
    const [selectedCompanyState, setSelectedCompanyState] = useState(null);
    const [files, setFiles] = useState([]);
    const documentTypeData = user?.DocumentData || [];
    const states = user?.State || [];
    const documentData = documentTypeData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentTypeID
    }));

    const stateData = states.map(x => ({
        label: x.StateName,
        value: x.StateId.toString()
    }));

    const combinedSchema = additionalDetailsValidationSchema
        .concat(companyValidationSchema)
        .concat(companyPOCValidationSchema);

    const { register, handleSubmit, control, reset, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(combinedSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(mapCenterAction.clear());
                const user = await dispatch(mapCenterAction.get({ id, portal: portalkey })).unwrap();
                const data = user?.Data;
                reset(data);
                if (data?.FileData) {
                    setFiles(data?.FileData.map(file => ({
                        ID: file.ID,
                        DocumentTypeID: file.DocumentTypeID,
                        FileName: file.FileName,
                        Format: file.Format,
                        Size: file.Size,
                        PortalKey: file.PortalKey,
                        File: file.File
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

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            // Validate that all required document types have files
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
                FileData: files
            };

            const result = await dispatch(mapCenterAction.update({ id, transformedData }));
            console.log(result);
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.error.message, header: header }));
                return;
            }
            // navigate('/');
            dispatch(alertActions.success({ message: mapCenterRegistrationLabels.message1, header: mapCenterRegistrationLabels.header, showAfterRedirect: true }));

        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: header }));
        }
    };

    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); // Trigger validation for the field
    };

    // const handleHomeStateChange = (e, newValue) => {
    //     setSelectedHomeState(newValue ? newValue.value : null);
    // };

    // const handleCompanyStateChange = (e, newValue) => {
    //     setSelectedCompanyState(newValue ? newValue.value : null);
    // };

    const handleOnChange = (event, newvalue) => {
        setSelectedDocumentType(newvalue?.value);
    };

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    const handleDownload = async (base64String, fileName) => {
        try {
            const result = await dispatch(mapCenterAction.getNondisclosureDocument()).unwrap();
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

    return (
        <>
            {!(user?.loading || user?.error) && (
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
                                                        />
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12}>
                                                    <CompanyPOC 
                                                    register={register} 
                                                    errors={errors} 
                                                    control={control} 
                                                    handleBlur={handleBlur} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography component="div" className="UploadFiles-container mapcontainer  ">
                                                <Typography component="div" className="Personal-Informationsheading ">
                                                    <Typography component="h2" variant="h5">Document Upload  <img src={raphaelinfo} alt='raphaelinfo'></img></Typography>
                                                </Typography>
                                                <Typography component="div" className="passwordcheck">
                                                    <AutocompleteInput
                                                        control={control}
                                                        name="documentType"
                                                        label="Document Type"
                                                        options={documentData}
                                                        error={!!errors.documentType}
                                                        helperText={errors.documentType?.message}
                                                        handleBlur={handleBlur}
                                                        inputColor={inputColors['documentType']}
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
                                                />
                                                <Typography component="div" className="SupportedFormats">
                                                    <Typography component="h3" >Download Template</Typography>
                                                    <div className="mar-top-16" >
                                                        <Typography component="div">Non-disclosure agreement
                                                            <IconButton onClick={handleDownload}>
                                                                <img src={materialsymbolsdownload} alt="material-symbols_download"></img>
                                                            </IconButton>
                                                        </Typography>
                                                    </div>
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Typography>
                        <Grid item xs={12} sm={12} md={12} className="Personal-Information">
                            <Button type="submit" variant="contained" className="CompleteRegistration" color="primary" disabled={!isValid} >
                                Complete Registration
                            </Button>
                        </Grid>
                    </form>
                </Typography>
            )}
            {user?.error && <UnderConstruction />}
        </>
    );
};

export default ManageProfileMC;