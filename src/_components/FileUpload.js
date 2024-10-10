import React, {  useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { userActions, alertActions } from '_store';
import DocumentViewer from "./DocumentViewer";



const FileUpload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [open,setOpen]= useState(false);
 
    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleClose=()=>{
        setOpen(false);
      };

      const handleViewClick=()=>{
        setOpen(true);
      };
    // form validation rules 
    const validationSchema = Yup.object().shape({
        chooseFile: Yup.string().required('FIle is required'),

    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, } = useForm(formOptions);
    const { errors, isSubmitted } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            const formData = new FormData();
            formData.append('file', files);
            await dispatch(userActions.upload(formData));

            dispatch(alertActions.success({ message: 'uploaded successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    };

    const onCancel = () => {
        navigate('/');
    };
    return (
        <>
            <Typography component="div" className="mobilebanner">
                <Typography component="h1" variant="h5" className="Logincontent">
                    File Upload
                </Typography>
                <div className="paper">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        {!isSubmitted && <>  
                         <input type="file" {...register('chooseFile')} onChange={handleFileChange} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="Loginbutton"
                            >
                                upload
                            </Button>
                        </>
                        }
                        {isSubmitted && <>
                            <Link onClick={handleViewClick}>View</Link>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="Loginbutton"
                                onClick={onCancel}
                            >
                                Delete
                            </Button>
                        </>}
                        {open && 
                        <DocumentViewer open={open} handleClose={handleClose}></DocumentViewer>
                        }
                    </form>
                </div>
            </Typography>
        </>
    )
}

export default FileUpload;