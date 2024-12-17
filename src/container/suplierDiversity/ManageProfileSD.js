import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { alertActions, userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
import { SupplierDetailsSchema } from "_utils/validationSchema";
import Grid from "@material-ui/core/Grid";
import { UploadFiles } from '_components';
import { AutocompleteInput } from '_components';
import SupplierDetails from '../user/ProfileDetails/SupplierDetails'
import { supplierDocumentTypeData, supplierSupportedFormat } from '_utils/constant';

const ManageProfileSD = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { portalkey, id } = useParams();
    const user = useSelector(x => x.users?.item);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
    const [inputColors, setInputColors] = useState({});
    const [files, setFiles] = useState([]);
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting }, watch, trigger } = useForm({
        resolver: yupResolver(SupplierDetailsSchema)
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

    // const handleOnChange = (event,newvalue) => {
    //     setSelectedDocumentType(newvalue.value);
    // };
    const handleBlur = (e) => {
        const fieldName = e.target.name;
        const fieldError = errors[fieldName];

        setInputColors(prevColors => ({
            ...prevColors,
            [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
        }));

        trigger(fieldName); // Trigger validation for the field
    };
    const documentData = supplierDocumentTypeData.map(x => ({
        label: x.DocumentDescription,
        value: x.DocumentId
    }));

    const handleOnChange = (event, newvalue) => {
        setSelectedDocumentType(newvalue.value);
    };
    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };
    return <>
        <Typography component="div" className="MapCenterAccecss">
            <Typography component="div" className="MapCenterAccecssheading">
                <Typography component="h1" variant="h5">Supplier Diversity</Typography>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography className="Personal-Information-container" component="div">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12} >
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={8} className="Personal-Information">
                                    <Typography component="div" className="mapcontainer">

                                        <SupplierDetails register={register} errors={errors} control={control} trigger={trigger} />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} sm={6} md={4} >
                                    <Typography component="div" className="Personal-Informationsheading">
                                        <Typography component="h2" variant="h5" >Documents uplaod</Typography>
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
                                            supportedFormats={supplierSupportedFormat}
                                            documentTypes={supplierDocumentTypeData}
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
                    <Button variant="contained" color="primary" className="Cancelbutton" disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" className='CompleteRegistration' color="primary" disabled={isSubmitting}>
                        Register
                    </Button>
                </Grid>




            </form>
        </Typography>

    </>;
};

export default ManageProfileSD;