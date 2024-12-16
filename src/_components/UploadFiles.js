import React from "react";
import { Button,  Typography } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import images from '../images';
import { styled } from '@mui/material/styles';

export default function UploadFiles() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
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
        const file = event.target.files[0]; // Get the first selected file
        if (file) {
            //we can set value which is received from parent component.
            //   onFileChange(file); 
            // Pass the file to the parent via the callback update in the props
        }
    };
    return (
        <div >
            <Typography component="div" className="UploadContainer">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography className="Personal-Informationsheading" >
                            {/* <Typography component="h2">Upload your Documents </Typography> */}
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            className="Uploadfiles"
                            startIcon={<img src={images.materialsymbolsupload} alt="Do You Need Support" ></img>}
                        >
                            <span>Upload your files here</span>
                            <span type="file" onChange={handleFileInputChange} className="Browsechoose"> Browse and choose the file(s) you want to upload </span>
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple />
                        </Button>
                        <Typography component="div" className="SupportedFormats">
                            <Typography component="h3">Supported Formats</Typography>
                            <Typography component="div" className="fileformat">
                                <span>.pdf</span>
                                <span>.jpg</span>
                                <span>.png</span>
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </Typography>
        </div>
    );
}