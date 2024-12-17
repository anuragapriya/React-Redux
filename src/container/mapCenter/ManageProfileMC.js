import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { alertActions, userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
import { additionalDetailsValidationSchema, companyValidationSchema } from "_utils/validationSchema";
import { CompanyDetails } from "container/user";
import AdditionalDetails from "container/user/ProfileDetails/AdditionalDetails";
import Grid from "@material-ui/core/Grid";
import { AutocompleteInput, UploadFiles } from '_components'
import { documentTypeData, supportedFormat } from '_utils/constant';
const ManageProfileMC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(x => x.users?.item);
     const [inputColors, setInputColors] = useState({});
     const [selectedDocumentType,setSelectedDocumentType]=useState(null);
     const documentData = documentTypeData.map(x => ({
        label: x.documentDescription,
        value: x.documentId
      }));

    const combinedSchema = additionalDetailsValidationSchema.concat(companyValidationSchema);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, watch, trigger } = useForm({
        resolver: yupResolver(combinedSchema)
    });

    useEffect(() => {
        dispatch(userActions.clear());
        if (id) {

            dispatch(userActions.getById(id)).unwrap().then(user => reset(user));
        } else {

            reset(user); // Reset form state when adding a new user
        }
    }, [id, dispatch, reset]);

    const onSubmit = async (data) => {
        dispatch(alertActions.clear());
        try {
            // await dispatch(registrationActions.register(data)).unwrap();
            // navigate('/');
            // dispatch(alertActions.success({
            //     showAfterRedirect: true,
            //     message: verifyEmailLabels.message1,
            //     message2: verifyEmailLabels.message2,
            //     header: verifyEmailLabels.header
            // }));

        } catch (error) {
            dispatch(alertActions.error({ message: error.message, header: "Registration Failed" }));
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

    const handleOnChange = (event,newvalue) => {
        setSelectedDocumentType(newvalue.value);
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
                                    <AdditionalDetails register={register} errors={errors} control={control} trigger={trigger} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} className="Personal-Information">
                                <Typography component="div" className="mapcontainer">
                                    <Typography component="div" className="Personal-Informationsheading">
                                        <Typography component="h2" variant="h5">Company Point of Contact</Typography>
                                    </Typography>
                                    <CompanyDetails register={register} errors={errors} control={control} trigger={trigger} />
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
                                    <UploadFiles  selectedDocumentType={selectedDocumentType} supportedFormats={supportedFormat} documentTypes={documentTypeData} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                    </Typography>
                    <Grid item xs={12} sm={12} md={12} className="Personal-Information">
                        <Button variant="contained" className="Cancelbutton" color="primary" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" className="CompleteRegistration" color="primary" disabled={isSubmitting}>
                            Complete Registration
                        </Button>
                   
                </Grid>
            </form>
        </Typography>
    </>
};

export default ManageProfileMC;