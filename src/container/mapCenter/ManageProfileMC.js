import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { alertActions, mapCenterAction, userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
import { additionalDetailsValidationSchema, companyPOCValidationSchema, companyValidationSchema, uploadValidationSchema } from "_utils/validationSchema";
import { CompanyDetails,AdditionalDetails ,CompanyPOC } from "container/user";
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, UploadFiles } from '_components';
import { supportedFormat } from '_utils/constant';
import UnderConstruction from '_components/UnderConstruction';
import images from '../../images';

const ManageProfileMC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { portalkey, id } = useParams();
    const header = 'Map Center';
    const user = useSelector(x => x.mapcenter?.userData);
    const [inputColors, setInputColors] = useState({});
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [files, setFiles] = useState([]);
    const documentTypeData = user?.DocumentData || [];
    const documentData = documentTypeData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentTypeID
    }));

    const combinedSchema = additionalDetailsValidationSchema
        .concat(companyValidationSchema)
        .concat(companyPOCValidationSchema);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting, isValid }, watch, trigger } = useForm({
        resolver: yupResolver(combinedSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(mapCenterAction.clear());
                const user = await dispatch(mapCenterAction.get({ id, portal: portalkey })).unwrap();
                const data = user?.Data;
                reset(data);
                console.log(data);
                applyInitialColors(data);
                if (data?.FileData) {
                    setFiles(data?.FileData.map(file => ({
                        ID: file.ID,
                        DocumentTypeID: file.DocumentTypeID,
                        FileName: file.FileName,
                        Format: file.Format,
                        Size: file.Size,
                        Portalkey: file.Portalkey,
                        File: file.File
                    })));
                }
            } catch (error) {
                dispatch(alertActions.error({
                    message: error,
                    header: header
                }));
                reset(user);
            }
        };
        fetchData();
    }, [id, dispatch, reset, portalkey]);

    const applyInitialColors = (user) => {
        const colors = {};
        for (const key in user) {
            if (user[key]) {
                colors[key] = 'inputBackground'; // Your desired class
            }
        }
        setInputColors(colors);
    };

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            // Validate that all required document types have files
            const missingDocumentTypes = documentTypeData.filter(docType =>
                !files.some(file => file.DocumentTypeID === docType.DocumentTypeID)
            );

            if (missingDocumentTypes.length > 0) {
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
                AlternateEmail: user.AlternateEmail,
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
                AdditionalID: user?.AdditionalID || null,
                FileData: files
            };

            const result = await dispatch(mapCenterAction.update({ id, Data: transformedData }));
            console.log(result);
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.error.message, header: header }));
                return;
            }
            navigate('/');
            dispatch(alertActions.success({ message: 'Form submitted successfully!', header: header, showAfterRedirect: true }));

        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: header }));
        }
    };


    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); // Trigger validation for the field

        const fieldError = errors[fieldName];

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));
    };

    const handleOnChange = (event, newvalue) => {
        setSelectedDocumentType(newvalue?.value);
    };

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
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
                                        <Grid item xs={12} sm={6} md={4} className="Personal-Information">
                                            <Typography component="div" className="mapcontainer">
                                                <Typography component="div" className="Personal-Informationsheading">
                                                    <Typography component="h2" variant="h5">Personal Information</Typography>
                                                </Typography>
                                                <AdditionalDetails inputColors={inputColors} handleBlur={handleBlur} register={register} control={control} trigger={trigger} errors={errors} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4} className="Personal-Information">
                                            <Typography component="div" className="mapcontainer">
                                                <Typography component="div" className="Personal-Informationsheading">
                                                    <Typography component="h2" variant="h5">Company Information</Typography>
                                                </Typography>
                                                <CompanyDetails inputColors={inputColors} handleBlur={handleBlur} register={register} errors={errors} control={control} trigger={trigger} />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <Typography component="div" className="UploadFiles-container mapcontainer  ">
                                                <Typography component="div" className="Personal-Informationsheading ">
                                                    <Typography component="h2" variant="h5">Document Upload  <img src={images.raphaelinfo} alt='raphaelinfo'></img></Typography>
                                                </Typography>
                                                <Typography  component="div" className="passwordcheck">
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
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} md={8}>
                                <CompanyPOC register={register} errors={errors} control={control} trigger={trigger} inputColors={inputColors} handleBlur={handleBlur} />
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