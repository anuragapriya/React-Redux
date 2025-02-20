import React, { useState } from 'react';
import {Modal, Button, TextField, MenuItem, Select, FormControl, InputLabel, TextareaAutosize, Box,Typography } from '@mui/material';
import Grid from "@material-ui/core/Grid";
import {  labels } from "_utils/labels";
import Link from "@material-ui/core/Link";
import { logo } from 'images';

const RejectReason = ({ open, onConfirm, handleClose }) => {
    const [reason, setReason] = useState('');
    const [newReason, setNewReason] = useState('');
    const [comments, setComments] = useState('');
    const reasonList = [
        { label: 'Invalid or unknown company', value: 'invalidCompany' },
        { label: 'Invalid email address', value: 'invalidEmail' },
        { label: 'Invalid tax ID', value: 'invalidTaxID' },
        { label: 'Other (add new reason)', value: 'other' }
    ]

    const handleReasonChange = (event) => {
        setReason(event.target.value);
        if (event.target.value !== 'other') {
            setNewReason('');
        }
    };

    const handleNewReasonChange = (event) => {
        setNewReason(event.target.value);
    };

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    const handleConfirm = () => {
        const rejectionReason = reason === 'other' ? newReason : reason;
        onConfirm(rejectionReason, comments);
    };

    return (
        <Modal
            open={open}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box className="modalpopup">
                <Box className="row modalpopupinner">
                    <Grid item xs={12} className="forgotpassword p-0">
                        <Link href="#" variant="logo" className="wgllogo">
                            <img src={logo} alt="logo"></img>
                            {labels.eServicePortal}
                        </Link>
                        <Typography component="h2" variant="body1">
                            Rejection Reason
                        </Typography>
                    </Grid>
                    <Box>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="reject-reason-label">Select Reason for Rejection</InputLabel>
                            <Select
                                labelId="reject-reason-label"
                                value={reason}
                                onChange={handleReasonChange}
                            >
                                {reasonList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {reason === 'other' && (
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Enter new reason"
                                value={newReason}
                                onChange={handleNewReasonChange}
                                aria-label="Enter new reason"
                            />
                        )}
                        <TextareaAutosize
                            minRows={4}
                            placeholder="Comments (optional)"
                            style={{ width: '100%', marginTop: '16px' }}
                            value={comments}
                            onChange={handleCommentsChange}
                            aria-label="Comments"
                        />
                        {/* <Typography component="div" className="CreateMarketerbutton"> */}
                            <Button
                                variant="contained"
                                className='submitbutton'
                                color="primary"
                                onClick={handleConfirm}
                                disabled={reason === '' || (reason === 'other' && newReason.trim() === '')} w
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className="cancelbutton"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        {/* </Typography> */}
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default RejectReason;