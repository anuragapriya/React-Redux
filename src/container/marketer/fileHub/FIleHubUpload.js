import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { raphaelinfo } from '../../../images';
import { AutocompleteInput, UploadFiles, UnderConstruction } from '_components';
import { useForm } from 'react-hook-form';
import { IconButton } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import { alertActions,filehubAction } from '_store';
import { fileHubSupportedFormat } from '_utils/constant';
import Grid from "@mui/material/Grid2";
import { materialsymbolsupload, materialsymbolsdownload } from 'images';
import { convertToBase64, base64ToFile, fileExtension, fileSizeReadable, fileTypeAcceptable } from '_utils';
const FileHubUpload = ({setIsDataChanged,onSubmit,setfiles,marketerData,isAdmin}) => {
    const header="FileHub";
    const [selectedDocumentType, setSelectedDocumentType] = useState(2);
    const dispatch = useDispatch();
    const maxFileSize = 5000000;
    const minFileSize = 0;
    const multiple = true;
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const downloadSample = async() =>{
        
            dispatch(alertActions.clear());
            const transofrmed={
                "FileName":"DRV_Sample.xlsx"
            }
            try {
              const result = await dispatch(filehubAction.get(transofrmed)).unwrap();
              const sampleFileData = result;
              console.log(result);
              handleDownload(result?.File,result?.FileName)
             
            } catch (error) {
              console.error('Fetch Error:', error); // Log any errors
              dispatch(alertActions.error({
                message: error?.message || error,
                header: `${header} Failed`
              }));
            }
        
            
    }
    const handleDownload = async(base64String, fileName) => {
        await base64ToFile(base64String, fileName);
    };
    const DocumentTypes = [{
        "DocID": 1,
        "DocName": "UET"
    },
    {
        "DocID": 2,
        "DocName": "DRV"
    },
    {
        "DocID": 3,
        "DocName": "DC Nomination"
    }]
    const DocumentList = DocumentTypes?.map(x => ({
        label: x.DocName,
        value: x.DocID
    })) || [];
    

    const marketerList = marketerData?.map(x => ({
        label: x.MarketerName,
        value: x.MarketerID
    })) || [];
    const handleOnChange = (event, newvalue) => {
        setSelectedDocumentType(newvalue);
    };
    const handleError = (error, file) => {
        dispatch(alertActions.error(error.message));
    };
    const handleUpload = async (event) => {
        event.preventDefault();
        let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        if (multiple === false && filesAdded.length > 1) {
            filesAdded = [filesAdded[0]];
        }
        const fileResults = [];
        for (let i = 0; i < filesAdded.length; i += 1) {
            const file = filesAdded[i];
            file.extension = fileExtension(file);
            file.sizeReadable = fileSizeReadable(file.size);

            if (file.size > maxFileSize) {
                handleError({
                    code: 2,
                    message: `${file.name} is too large`,
                }, file);
                return;
            }

            if (file.size < minFileSize) {
                handleError({
                    code: 3,
                    message: `${file.name} is too small`,
                }, file);
                return;
            }

            if (!fileTypeAcceptable(fileHubSupportedFormat, file)) {
                handleError({
                    code: 1,
                    message: `${file.name} is not a valid file type`,
                }, file);
                return;
            }

            const base64 = await convertToBase64(file);

            const fileData = {
                ID: null,
                AdditionalID: 0,
                DocumentTypeID: 0,
                FileName: file.name,
                Format: file.extension,
                Size: file.size,
                File: base64,
                Url: null
            };

            fileResults.push(fileData);
        }
        setfiles(prevFiles => [...prevFiles, ...fileResults]);
        setIsDataChanged(true);
       
    }


    const { register,handleSubmit, control, reset, formState: { errors, isValid }, trigger } = useForm({
    });
    return (
        <>

            <Typography component="div" className="SupportedFormats">
                <form onSubmit={handleSubmit(onSubmit)}>
                <Typography component="div" className=" Personal-Informationsheading" >
                    <Typography component="h2" variant="h5" >Documents upload <img onClick={downloadSample} src={raphaelinfo} alt='raphaelinfo'></img> </Typography>
                  { isAdmin? <AutocompleteInput
                            control={control}
                            name="marketer"
                            label="Marketer"
                            options={marketerList}
                        /> : null}
                           <AutocompleteInput
                            control={control}
                            name="doctype"
                            label="File Type"
                            options={DocumentList}
                        />

                    <Typography component="div" className='UploadContainer'>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    tabIndex={-1}
                                    className="Uploadfiles"
                                    startIcon={<img src={materialsymbolsupload} alt="Upload" />}>
                                    <span> Upload your files here</span>
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleUpload}
                                        multiple
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography component="div" className="SupportedFormats">
                                    <Typography component="h3">Supported Formats</Typography>
                                    <Typography component="div" className="fileformatlist">
                                        {fileHubSupportedFormat && fileHubSupportedFormat.map(format => <span key={format}>{format}</span>)}
                                    </Typography>
                                </Typography>
                            </Grid>
                            <Grid>
                                {/* <Grid item xs={12} sm={6} md={4} className='supplierDetailes'>
                                    <Typography component="div" className="SupportedFormats Personal-Informationsheading">
                                        <Typography component="h2">Uploaded Documents</Typography>
                                        <Typography component="div" >
                                            {files && files.map((file) =>
                                                <Typography component="div" className="marginbottom">
                                                    <Typography component="span" className="DocumentDescription">{file?.FileName}</Typography>
                                                    <Typography component="div" className="DocumentTypeID">
                                                        <IconButton onClick={() => handleDownload(file?.File, file?.FileName)}>
                                                         
                                                            <img src={materialsymbolsdownload} alt='download'></img>
                                                        </IconButton>
                                                    </Typography>
                                                </Typography>
                                            )}
                                        </Typography>
                                    </Typography>
                                </Grid> */}

                            </Grid>

                        </Grid>
                    </Typography>
                </Typography>
                </form>
            </Typography>
        </>
    )
}

export default FileHubUpload;