import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { alertActions, userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
import { additionalDetailsValidationSchema, companyPOCValidationSchema, companyValidationSchema, uploadValidationSchema } from "_utils/validationSchema";
import { CompanyDetails } from "container/user";
import AdditionalDetails from "container/user/ProfileDetails/AdditionalDetails";
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, UploadFiles } from '_components';
import { documentTypeData, supportedFormat } from '_utils/constant';
import { convertToBase64 } from '_utils';
import axios from 'axios';

const ManageProfileMC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { portalkey, id } = useParams();
    const user = useSelector(x => x.users?.item);
    const [inputColors, setInputColors] = useState({});
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [files, setFiles] = useState([]);
    const documentData = documentTypeData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentType
    }));

    const combinedSchema = additionalDetailsValidationSchema
        .concat(companyValidationSchema)
        .concat(companyPOCValidationSchema);
    //   .concat(uploadValidationSchema);

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting, isValid }, watch, trigger } = useForm({
        resolver: yupResolver(combinedSchema)
    });

    useEffect(() => {
        dispatch(userActions.clear());
        if (id) {
            dispatch(userActions.getById(id)).unwrap().then(user => {
                reset(user);
                applyInitialColors(user);
            });
        } else {
            reset(user); // Reset form state when adding a new user
            applyInitialColors(user);
        }
    }, [id, dispatch, reset]);

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
            // Convert files to Base64
            const filePromises = files.map(file => convertToBase64(file).then(base64 => ({
                DocumentTypeID: file.DocumentTypeID,
                FileName: file.name,
                Format: file.extension,
                Size: `${file.size} bytes`,
                Portalkey: portalkey,
                File: base64
            })));

            const fileData = await Promise.all(filePromises);

            // Validate that all required document types have files
            const missingDocumentTypes = documentTypeData.filter(docType =>
                !fileData.some(file => file.DocumentTypeID === docType.DocumentType)
            );

            if (missingDocumentTypes.length > 0) {
                const missingDescriptions = missingDocumentTypes.map(docType => docType.DocumentDescription).join(', ');
                dispatch(alertActions.error({
                    message: `Missing files for document types: ${missingDescriptions}`,
                    header: "Validation Error"
                }));
                return;
            }

            const transformedData = {
                Data: [
                    {
                        UserID: id,
                        AlternateEmail: data.emailAddress,
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
                        FileData: fileData
                    }
                ]
            };

            await axios.post('/your-endpoint', transformedData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            dispatch(alertActions.success('Form submitted successfully!'));
            navigate('/');
        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: "Submission Failed" }));
        }
    };

    const handleBlur = (e) => {
        const fieldName = e.target.name;
        const fieldError = errors[fieldName];

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));

        trigger(fieldName); // Trigger validation for the field
    };

    const handleOnChange = (event, newvalue) => {
        setSelectedDocumentType(newvalue?.value);
    };

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    return <>
        <Typography component="div" className="MapCenterAccecss">
            <Typography component="div" className="MapCenterAccecssheading">
                <Typography component="h1" variant="h5">Map Center Access</Typography>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className="Personal-Information-container" component="div">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={4} className="Personal-Information">
                                    <Typography component="div" className="mapcontainer">
                                        <Typography component="div" className="Personal-Informationsheading">
                                            <Typography component="h2" variant="h5">Personal Information</Typography>
                                        </Typography>
                                        <AdditionalDetails inputColors={inputColors} onBlur={handleBlur} register={register} errors={errors} control={control} trigger={trigger} />
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
                                <Grid item xs={12} sm={6} md={4} >
                                    <Typography component="div" className="UploadFiles-container mapcontainer">
                                        <Typography component="div" className="Personal-Informationsheading">
                                            <Typography component="h2" variant="h5">Document Upload</Typography>
                                        </Typography>
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
                    </Grid>
                </Typography>
                <Grid item xs={12} sm={12} md={12} className="Personal-Information">
                    <Button type="submit" variant="contained" className="CompleteRegistration" color="primary" disabled={!isValid}>
                        Complete Registration
                    </Button>
                </Grid>
            </form>
        </Typography>
    </>
};

export default ManageProfileMC;