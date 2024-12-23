import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import base64ToFile from "_utils/files/base64ToFile";
import { convertToBase64 } from '_utils';
import { uploadLabels } from "_utils/labels";
import ModalPopup from "./ModalPopup";

const UploadFiles = ({
    portalKey,
    selectedDocumentType,
    multiple = true,
    documentTypes,
    supportedFormats,
    maxFiles = Infinity,
    maxFileSize = Infinity,
    minFileSize = 0,
    onFileChange,
    initialFiles = []
}) => {

    const [files, setFiles] = useState(initialFiles);
    const [open, setOpen] = useState(false);
    const [fileToRemove, setFileToRemove] = useState(null);
    const dispatch = useDispatch();
    const idCounter = useRef(1);

    useEffect(() => {
        setFiles(initialFiles);
    }, [initialFiles]);

    const handleError = (error, file) => {
        dispatch(alertActions.error(error.message));
    };

    const handleChange = async (event) => {
        event.preventDefault();
        let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        if (documentTypes && documentTypes.length > 0 && !selectedDocumentType) {
            dispatch(alertActions.error({
                message: 'Please select any Document Type',
                header: "Validation Error"
            }));
            return;
        }

        if (multiple === false && filesAdded.length > 1) {
            filesAdded = [filesAdded[0]];
        }

        const fileResults = [];
        for (let i = 0; i < filesAdded.length; i += 1) {
            const file = filesAdded[i];

            file.DocumentTypeID = documentTypes && documentTypes.length > 0 ? selectedDocumentType : `files-${idCounter.current}`;

            file.extension = fileExtension(file);
            file.sizeReadable = fileSizeReadable(file.size);

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

            const base64 = await convertToBase64(file);
            const fileData = {
                ID: null, // This will be updated if replacing an existing file
                DocumentTypeID: file.DocumentTypeID,
                FileName: file.name,
                Format: file.extension,
                Size: file.size,
                Portalkey: portalKey, // Replace with actual portal key if needed
                File: base64
            };

            fileResults.push(fileData);
        }

        setFiles(prevFiles => {
            const updatedFiles = prevFiles.map(prevFile => {
                const newFile = fileResults.find(newFile => newFile.DocumentTypeID === prevFile.DocumentTypeID);
                return newFile ? { ...newFile, ID: prevFile.ID } : prevFile;
            });

            const newUniqueFiles = fileResults.filter(newFile => 
                !prevFiles.some(prevFile => prevFile.DocumentTypeID === newFile.DocumentTypeID)
            );

            const newFiles = [...updatedFiles, ...newUniqueFiles];
            onFileChange(newFiles); 
            return newFiles;
        });
    };

    const handleFileRemove = (documentTypeId) => {
        setFiles(prevFiles => {
            const updatedFiles = prevFiles.filter(prevFile => prevFile.DocumentTypeID !== documentTypeId);
            onFileChange(updatedFiles); // Notify parent component of file changes
            return updatedFiles;
        });
        setOpen(false);
    };

    const handleDialogOpen = (documentTypeId) => {
        setFileToRemove(documentTypeId);
        setOpen(true);
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

    const handleOpen = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleDownload = (base64String, fileName) => {
        base64ToFile(base64String, fileName);
    };

    return (
        <Typography component="div" className="UploadContainer">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={12}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        className="Uploadfiles"
                        startIcon={<img src={images.materialsymbolsupload} alt="Upload" />}
                    >
                        <span> Upload your files here</span>
                        <span type="file" onChange={handleFileInputChange} className="Browsechoose"> Browse and choose the file(s) you want to upload </span>
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleChange}
                        />
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                    <Typography component="div" className="SupportedFormats">
                        <Typography component="h3">Supported Formats</Typography>
                        <Typography component="div" className="fileformatlist">
                            {supportedFormats && supportedFormats.map(format => <span key={format}>{format}</span>)}
                        </Typography>
                    </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                    <Typography component="div" className="SupportedFormats">
                        <Typography component="h2">Uploaded Documents</Typography>
                        <Typography component="div" className="fileformat">
                            {documentTypes && documentTypes.map(type => {
                                const uploadedDocument = files.filter(x => x.DocumentTypeID === type.DocumentTypeID);
                                if (uploadedDocument && uploadedDocument.length > 0) {
                                    return (
                                        <div className="mar-top-16"  key={type.DocumentTypeID}>
                                            <Typography component="h4">{type.DocumentType}</Typography>
                                            <Typography component="div"><span>{type.DocumentDescription}</span>
                                            <IconButton onClick={() => handleDownload(uploadedDocument[0].File, uploadedDocument[0].FileName)}>
                                                <img src={images.materialsymbolsdownload} alt="material-symbols_download"></img>
                                            </IconButton>
                                            <IconButton onClick={() => handleDialogOpen(type.DocumentTypeID)}>
                                                <img src={images.midelete} alt="material-midelete"></img>
                                            </IconButton>
                                            </Typography> 
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div style={{ display: 'flex', gap: '0.5rem' }} key={type.DocumentTypeID}>
                                           
                                            <Typography component="div"><span>{type.DocumentDescription}</span></Typography>
                                        </div>
                                    );
                                }
                            })}
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
            {open && <ModalPopup
                    header={uploadLabels.header}
                    message1={uploadLabels.message1}
                    btnPrimaryText={uploadLabels.btnPrimaryText}
                    btnSecondaryText={uploadLabels.btnSecondaryText}
                    handlePrimaryClick={()=>handleFileRemove(fileToRemove)}
                />}
        </Typography>
    );
};

export default UploadFiles;