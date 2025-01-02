import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { SupplierDetailsSchema } from "_utils/validationSchema";
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, UnderConstruction, UploadFiles } from '_components';
import { alertActions, supplyDiversityAction, userActions } from '_store';
import SupplierDetails from '../user/ProfileDetails/SupplierDetails'
import { supplierSupportedFormat } from '_utils/constant';

import { diversityRegistrationLabels } from '_utils/labels';
import { raphaelinfo } from '../../images';
const ManageProfileSD = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const header = 'Supplier Diversity';
    const { portalkey, id } = useParams();
    // const user = useSelector(x => x.users?.item);
    const user = useSelector(x => x.supplydiversity?.userData);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [inputColors, setInputColors] = useState({});
    const documentTypeData = user?.DocumentData || [];
    const [files, setFiles] = useState([]);
    const states = user?.State1 || [];
    const classificationDropDownData = user?.Classification || [];
    const businessDropDownData = user?.BusinessCategory || [];
    const getCatagoryID = user?.ClassificationID ||[];

    const documentData = documentTypeData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentTypeID
    }));
    const stateData = states.map(x => ({
        label: x.StateName,
        value: x.StateId.toString()
    }));
    const classificationData = classificationDropDownData.map(x => ({
        label: x.ClassificationName,
        value: x.ClassificationID.toString()
    }));
    const businessCategoryData = businessDropDownData.map(x => ({
        label: x.CategoryName,
        value: x.CategoryID.toString()
    }));

    const { register, handleSubmit, control, reset, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(SupplierDetailsSchema)
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(supplyDiversityAction.clear());
                const user = await dispatch(supplyDiversityAction.get({ id, portal: portalkey })).unwrap();
                const data = user?.Data;
                reset(data);
                console.log(data);
                // applyInitialColors(data);
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
                AdditionalID: user?.AdditionalID || 0,
                UserID: id,
                CompanyName: data.CompanyName,
                ContactPerson: data.ContactPerson,
                Title: data.Title,
                Address: data.Address,
                City: data.City,
                State: data.State,
                CompanyWebsite: data.CompanyWebsite,
                Email: data.Email,
                ZipCode: data.ZipCode,
                PhoneNumber: data.PhoneNumber,
                Fax: data.Fax,
                CellPhone: data.CellPhone,
                CategoryID: data.CategoryID,
                ClassificationID: data.ClassificationID,
                ServicesProductsProvided: data.ServicesProductsProvided,
                FileData: files,
            };

            const result = await dispatch(supplyDiversityAction.update({ id, transformedData }));
            console.log(result);
            if (result?.error) {
                dispatch(alertActions.error({ message: result?.error.message, header: header }));
                return;
            }
            navigate('/');
            dispatch(alertActions.success({ message: diversityRegistrationLabels.message1, header: diversityRegistrationLabels.header, showAfterRedirect: true }));

        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: header }));
        }
    };

    // const handleOnChange = (event,newvalue) => {
    //     setSelectedDocumentType(newvalue.value);
    // };
    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        console.log(fieldName);
        await trigger(fieldName); // Trigger validation for the field

        // const fieldError = errors[fieldName];

        // setInputColors(prevColors => ({
        //     ...prevColors,
        //     [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        // }));
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
                        <Typography component="h1" variant="h5">Supplier Diversity</Typography>
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography className="Personal-Information-container" component="div">
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} md={12} >
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={8} className="Personal-Information">
                                            <Typography component="div" className="mapcontainer">
                                                <Typography component="div" className="Personal-Informationsheading">
                                                    <Typography component="h2" variant="h5" className='margin-bottom-12'>Personal Information</Typography>
                                                </Typography>
                                                <SupplierDetails register={register} errors={errors} control={control} stateData={stateData} businessCategoryData={businessCategoryData} classificationData={classificationData} handleBlur={handleBlur} getCatagoryID={getCatagoryID} trigger={trigger} />
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} >
                                            <Typography component="div" className="Personal-Informationsheading">

                                                <Grid item xs={12} sm={6} md={12} >
                                                    <Typography component="h2" variant="h5" >Documents uplaod <img src={raphaelinfo} alt='raphaelinfo'></img></Typography>

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
                                                </Grid>
                                                <UploadFiles
                                                    initialFiles={files}
                                                    portalKey={portalkey}
                                                    selectedDocumentType={selectedDocumentType}
                                                    supportedFormats={supplierSupportedFormat}
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
                            <Button type="submit" variant="contained" className='CompleteRegistration' color="primary" disabled={!isValid}>
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

export default ManageProfileSD;