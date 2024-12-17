import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import Blob from 'blob';
import FormData from 'form-data';
import { Button, Typography } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import { styled } from '@mui/material/styles';
import fileExtension from "_utils/files/fileExtension";
import fileSizeReadable from '_utils/files/fileSizeReadable';
import fileTypeAcceptable from '_utils/files/fileTypeAcceptable';
import { DeleteForever, Download } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { alertActions } from "_store";
import images from '../images';

const UploadFiles = ({
    selectedDocumentType,
    multiple = true,
    documentTypes,
    supportedFormats,
    maxFiles = Infinity,
    maxFileSize = Infinity,
    minFileSize = 0,
}) => {
    const [files, setFiles] = useState([]);
    const dispatch= useDispatch();
    const idCounter = useRef(1);

    const handleError = (error, file) => {
        //console.log(`error code ${error.code}: ${error.message}`);
         dispatch(alertActions.error(error.message));
    };

    const handleChange = (event) => {
        event.preventDefault();
        let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        if (multiple === false && filesAdded.length > 1) {
            filesAdded = [filesAdded[0]];
        }

        const fileResults = [];
        for (let i = 0; i < filesAdded.length; i += 1) {
            const file = filesAdded[i];
            file.id = `files-${idCounter.current}`;
            idCounter.current += 1;
            file.documentTypeId = selectedDocumentType;
            file.extension = fileExtension(file);
            file.sizeReadable = fileSizeReadable(file.size);

            if (file.type && file.type.split('/')[0] === 'image') {
                file.preview = {
                    type: 'image',
                    url: window.URL.createObjectURL(file),
                };
            } else {
                file.preview = {
                    type: 'file',
                    url: window.URL.createObjectURL(file),
                };
            }

            if (file.size > maxFileSize) {
                handleError({
                    code: 2,
                    message: `${file.name} is too large`,
                }, file);
                break;
            }

            if (file.size < minFileSize) {
                handleError({
                    code: 3,
                    message: `${file.name} is too small`,
                }, file);
                break;
            }

            if (!fileTypeAcceptable(supportedFormats, file)) {
                handleError({
                    code: 1,
                    message: `${file.name} is not a valid file type`,
                }, file);
                break;
            }

            fileResults.push(file);
        }

        setFiles(prevFiles => {
            const updatedFiles = prevFiles.filter(prevFile => prevFile.documentType !== selectedDocumentType);
            return [...updatedFiles, ...fileResults];
        });
    };

    const handleFileRemove = (documentTypeId) => {
        setFiles(prevFiles => prevFiles.filter(prevFile => prevFile.documentTypeId !== documentTypeId));
    };

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

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle file input change
        }
    };

    const handleUploadFiles = () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append(file.id, new Blob([file], { type: file.type }), file.name || 'file');
        });

        axios.post('/files', formData).then(() => {
            window.alert(`${files.length} files uploaded successfully!`);
            setFiles([]);
        }).catch((err) => {
            console.error(`Error uploading files: ${err.message}`);
        });
    };

    const handleOpen = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    return (
        <>
            <Typography component="div" className="UploadContainer">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography className="Personal-Informationsheading">
                            {/* <Typography component="h2">Upload your Documents </Typography> */}
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            className="Uploadfiles"
                            startIcon={<img src={images.materialsymbolsupload} alt="Upload" />}
                        >
                            <span>Upload your files here</span>
                            <span type="file" onChange={handleFileInputChange} className="Browsechoose"> Browse and choose the file(s) you want to upload </span>
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleChange}
                                multiple
                            />
                        </Button>
                        <Typography component="div" className="SupportedFormats">
                            <Typography component="h3">Supported Formats</Typography>
                            <Typography component="div" className="fileformat">
                                {supportedFormats && supportedFormats.map(format => <span key={format}>{format}</span>)}
                            </Typography>
                        </Typography>
                        <Typography component="div" className="SupportedFormats">
                            <Typography component="h3">Uploaded Documents</Typography>
                            <Typography component="div" className="fileformat">
                                {documentTypes && documentTypes.map(type => {
                                    const uploadedDocument = files.filter(x => x.documentTypeId === type.documentId);
                                    if (uploadedDocument && uploadedDocument.length > 0) {
                                        return (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <span key={type.documentId}>{type.documentDescription}</span>
                                                <IconButton onClick={() => handleOpen(uploadedDocument[0].preview.url)}>
                                                    <Download variant="contained" color="secondary" />
                                                </IconButton>
                                                <IconButton onClick={() => handleFileRemove(type.documentId)}>
                                                    <DeleteForever variant="contained" color="secondary" />
                                                </IconButton>
                                            </div>
                                            // <Link  onClick={() => handleOpen(uploadedDocument[0].preview.url)} key={type.documentId}>
                                            //     {type.documentType}
                                            // </Link>
                                        );
                                    } else {
                                        return <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <span key={type.documentId}>{type.documentDescription}</span>
                                        </div>
                                    }
                                })}
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Typography>
        </>
    );
};

export default UploadFiles;