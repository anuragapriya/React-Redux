import React, { useState } from "react";
import { Button, TextField, Link, Typography, Modal } from '@mui/material';
import Grid from "@material-ui/core/Grid";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


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
    return (
        <div >
            <Typography component="div" className="UploadContainer">
                <div className="row m-0">
                    <Grid item xs={12} sm={12} md={6}>
                        <div>
                            <Typography component="">Upload your Documents </Typography>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Document Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>

                            </FormControl>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                className="Uploadfiles"
                                startIcon={<CloudUploadIcon />}
                            >
                                <span>Upload your files here</span>
                                <span className="Browsechoose"> Browse and choose the file(s) you want to upload </span>
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => console.log(event.target.files)}
                                    multiple />
                            </Button>
                            <Typography component="h3">Supported Formats</Typography>
                            <Typography component="div">
                                <span>.pdf</span>
                                <span>.jpg</span>
                                <span>.png</span>
                            </Typography>

                        </div>
                    </Grid>
                    <Grid item xs={12} sm={5} md={6} className="">
                        <Typography component="">Uploaded Documents </Typography>
                        <FormControl className="width100">

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"

                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Driving License (Back)" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="width100">

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"

                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Non-disclosure Agreement" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="width100">

                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"

                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Driving License (Back)" />
                            </RadioGroup>
                        </FormControl>
                        <Typography component="p">Non-disclosure agreement</Typography>
                        <Typography component="p">Please Download NDA from this  <Link href="#" variant="body2" className="ResetPassword">
                            Link
                        </Link>  . Then Upload signed version of this NDA in PDF,PNG & JPEG Formats</Typography>
                    </Grid>

                </div>

            </Typography>
        </div>
    );
}