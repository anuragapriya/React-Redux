import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { alertActions, userActions } from '_store';
import { useNavigate, useParams } from 'react-router-dom';
// import { additionalDetailsValidationSchema, companyValidationSchema } from "_utils/validationSchema";
import {SupplierDetailsSchema } from "_utils/validationSchema";
import Grid from "@material-ui/core/Grid";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { UploadFiles } from '_components';
// import { AutocompleteInput } from '_components';
import SupplierDetails from '../user/ProfileDetails/SupplierDetails'
import { supplierDocumentTypeData, supplierSupportedFormat } from '_utils/constant';

const ManageProfileSD = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(x => x.users?.item);
    const [selectedDocumentType,setSelectedDocumentType]=useState(null);
    // const combinedSchema = additionalDetailsValidationSchema.concat(companyValidationSchema);
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
    const docsType = ["Certification Document", "Capability Statement", "Additional Documents"];
    const handleOnChange = (event,newvalue) => {
        setSelectedDocumentType(newvalue.value);
    };

    return <>
        <Typography component="div" className="MapCenterAccecss">
            <Typography component="div" className="MapCenterAccecssheading">
                <Typography component="h1" variant="h5">Supplier Diversity</Typography>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} className="Personal-Information-container">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={5} md={4} className="Personal-Information">
                                <Typography component="div" className="mapcontainer">
                                    <Typography component="div" className="Personal-Informationsheading">
                                        {/* <Typography component="h2" variant="h5">Personal Information</Typography> */}
                                    </Typography>
                                    <SupplierDetails register={register} errors={errors} control={control} trigger={trigger} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={5} md={4} className="Personal-Information">

                                {/* <Typography component="div" className="mapcontainer">
                                    <Typography component="div" className="Personal-Informationsheading">
                                        <Typography component="h2" variant="h5">Company Point of Contact</Typography>
                                    </Typography>
                                    <CompanyDetails register={register} errors={errors} control={control} trigger={trigger} />
                                </Typography> */}
                            </Grid>
                            <Grid item xs={12} sm={5} md={4} >
                                <Typography component="div" className="Personal-Informationsheading">
                                    <Typography component="h2" variant="h5" >Documents uplaod</Typography>
                                    <Autocomplete
                                        disablePortal
                                        control={control}
                                        options={supplierDocumentTypeData}
                                        sx={{ width: 300 }}
                                        error={!!errors.documentType}
                                        helperText={errors.documentType?.message}
                                        getSelectedDoctype={(option) => option}
                                        renderInput={(params) => <TextField {...params} label="Document Type"
                                        onChange={handleOnChange} 
                                         />}
                                    />
                                    <UploadFiles selectedDocumentType={selectedDocumentType} supportedFormats={supplierSupportedFormat} documentTypes={supplierDocumentTypeData}/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="Personal-Information">
                        <Button variant="contained" color="primary" disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Register
                        </Button>
                    </Grid>

                </Grid>


            </form>
        </Typography>

    </>;
};

export default ManageProfileSD;