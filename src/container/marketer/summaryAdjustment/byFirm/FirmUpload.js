import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { alertActions } from "_store";
import { fileExtension, fileSizeReadable, fileTypeAcceptable } from '_utils';
import * as XLSX from 'xlsx';
import { materialsymbolsupload, raphaelinfo } from 'images';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const FirmUpload = ({
    multiple = true,
    supportedFormats,
    maxFiles = Infinity,
    maxFileSize = Infinity,
    minFileSize = 0,
    data,
    setData,
    setSelectedDate
}) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null); // Add a reference to the file input element
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

    const handleError = (error, file) => {
        dispatch(alertActions.error(error.message));
    };

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const convertToNumber = (value) => {
        return parseInt(value.replace(/,/g, ''), 10);
      };

    const handleChange = async (event) => {
        dispatch(alertActions.clear());
        event.preventDefault();
        let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        if (multiple === false && filesAdded.length > 1) {
            filesAdded = [filesAdded[0]];
        }

        for (let i = 0; i < filesAdded.length; i += 1) {
            const file = filesAdded[i];

            file.extension = fileExtension(file);
            file.sizeReadable = fileSizeReadable(file.size);

            if (!fileTypeAcceptable(supportedFormats, file)) {
                handleError({
                    code: 1,
                    message: 'Invalid file format. Only excel files are supported.',
                }, file);
                break;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                // Validate schema
                const requiredColumns = ['__EMPTY', '__EMPTY_1', '__EMPTY_2', '__EMPTY_3'];
                const rowsToCheck = [jsonData[1], jsonData[2], jsonData[3]];
                const isSchemaValid = rowsToCheck.every(row => requiredColumns.every(col => col in row));
                if (!isSchemaValid) {
                    handleError({
                        code: 4,
                        message: 'The uploaded file does not match the required format.',
                    }, file);
                    return;
                }

                if (jsonData.length === 0) {
                    handleError({
                        code: 2,
                        message: 'The uploaded file contains no data.',
                    }, file);
                    return;
                }

                // Extract month and year
                const month = jsonData[1].__EMPTY.split(' ')[3]; // Assuming the month is in the second row, first cell
                const datePublished = jsonData[2].__EMPTY.split(': ')[1]; // Assuming the date published is in the third row, first cell
                const year = new Date(datePublished).getFullYear();

                const currentDate = dayjs();
                const day = currentDate.date();

                const parsedDate = dayjs(`${year}-${month}-${day}`);
                const formattedDate = parsedDate.format('YYYY-MM-DDTHH:mm:ss');

                const tableDetails = jsonData.slice(4);
                // Check if "Monthly Imbalance Adjustment" column is empty
                const isColumnEmpty = tableDetails.every(row => (!row.hasOwnProperty('__EMPTY_2') || !row.__EMPTY_2) ||
                (!row.hasOwnProperty('__EMPTY') || !row.__EMPTY));
                if (isColumnEmpty) {
                    handleError({
                        code: 3,
                        message: 'Monthly Imbalance Adjustment or Firm Group column is empty.',
                    }, file);
                    return;
                }

                // Extract table data
                const tableData = jsonData.slice(3).map(row => ({
                    AllocationGroup: row.__EMPTY,
                    MonthlyGroupImbalance: row.__EMPTY_1 && formatNumber(row.__EMPTY_1),
                    ImbalanceAdjustedVolume: row.__EMPTY_2 && formatNumber(row.__EMPTY_2),
                    PreviousBalanceFirm:row.__EMPTY_3 && formatNumber(row.__EMPTY_3),
                }));

                const validateData = tableData.slice(1);

                // Validate firm group names and inactive marketers
                const validData = [];
                const invalidGroupNames = [];
                const inactiveGroupNames = [];
                validateData.forEach(row => {
                    const original = data.find(item => item.AllocationGroup === row.AllocationGroup);
                    if (!original) {
                        invalidGroupNames.push(row.AllocationGroup);
                    } else if (original.isInactive) {
                        inactiveGroupNames.push(row.AllocationGroup);
                    } else {
                        validData.push(row);
                    }
                });

                const updatedData = data.map(item => {
                    const adjustment = validData.find(adj => adj.AllocationGroup === item.AllocationGroup);
                    return {
                        ...item,
                        ImbalanceAdjustedVolume: adjustment ? adjustment.ImbalanceAdjustedVolume : item.ImbalanceAdjustedVolume,
                        EffectiveDate: formattedDate,
                        isEditing:item.ImbalanceAdjustedVolume !== convertToNumber(adjustment.ImbalanceAdjustedVolume) ? true :false
                    };
                });

                setData(updatedData);
               // setSelectedDate(dayjs(updatedData[0]?.EffectiveDate));

                if (invalidGroupNames.length > 0) {
                    dispatch(alertActions.error({
                        message: `${invalidGroupNames.length} rows were skipped because they contain invalid firm group names.`,
                    }));
                    return;
                }
                if (inactiveGroupNames.length > 0) {
                    dispatch(alertActions.error({
                        message: `${inactiveGroupNames.length} rows were skipped because they contain inactive firm group names.`,
                    }));
                    return;
                }
                dispatch(alertActions.success({ message: 'File uploaded successfully.' }));
            };
            reader.readAsArrayBuffer(file);
        }

        // Reset the file input value to allow re-uploading the same file
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle file input change
        }
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
                        startIcon={<img src={materialsymbolsupload} alt="Upload" />}
                    >
                        <span> Upload your files here</span>
                        <span type="file" onChange={handleFileInputChange} className="Browsechoose"> Browse and choose the file(s) you want to upload </span>
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleChange}
                            ref={fileInputRef} // Add the reference here
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
            </Grid>
        </Typography>
    );
};

export default FirmUpload;