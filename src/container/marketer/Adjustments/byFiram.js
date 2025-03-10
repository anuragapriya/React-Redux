import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography, Backdrop, TextField, CircularProgress, Button, Box } from "@mui/material";
import { IconButton } from "@material-ui/core";
import Grid from "@mui/material/Grid2";
import { yupResolver } from '@hookform/resolvers/yup';
import { additionalDetailsValidationSchema, companyPOCValidationSchema, companyValidationSchema, mapCenterValidationSchema } from "_utils/validationSchema";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { marketerGetData } from '_utils/constant';
import { AutocompleteInput, UploadFiles, UnderConstruction } from '_components';
import { raphaelinfo, materialsymbolsdownload, downloadIcon } from './../../../images';
import ByfiramFilter from "./byFiramFilter";
const Byfiram = () => {
    const [openComponent, setOpenComponent] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);

    const [backdropOpen, setBackdropOpen] = useState(false);
    const handleOpenComponent = (component) => {
        setOpenComponent(prev => prev === component ? null : component);
        setBackdropOpen(prev => prev === component ? false : true); // Toggle backdrop
    };
    const handleFilterSubmit = async (newData) => {
        setData(newData);
    };
    const handleCloseBackdrop = () => {
        setBackdropOpen(false);
        setOpenComponent(null);
    };
    const { register, handleSubmit, control, reset, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(mapCenterValidationSchema)
    });

    const [data, setData] = useState([
        {
            id: 1,
            group: "Group #1",
            groupImbalance: "11.237",
            imbalanceAdjustment: "997",
            inventoryBalance: "12.130",
        },
        {
            id: 2,
            group: "Group #1",
            groupImbalance: "11.237",
            imbalanceAdjustment: "997",
            inventoryBalance: "12.130",
        },
    ]);

    // Handle Input Change
    const handleInputChange = (id, value) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, imbalanceAdjustment: value } : item
            )
        );
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "group",
                header: "GROUP",
            },
            {
                accessorKey: "groupImbalance",
                header: "GROUP IMBALANCE",
            },
            {
                accessorKey: "imbalanceAdjustment",
                header: "IMBALANCE ADJUSTMENT",
                Cell: ({ row }) => (
                    <Box

                    >
                        <TextField
                            variant="standard"
                            value={row.original.imbalanceAdjustment}
                            onChange={(e) =>
                                handleInputChange(row.original.id, e.target.value)
                            }
                            InputProps={{
                                disableUnderline: true,

                            }}
                        />
                    </Box>
                ),
            },
            {
                accessorKey: "inventoryBalance",
                header: "INVENTORY BALANCE",
                Cell: ({ cell }) => (
                    <Typography sx={{ fontWeight: "500", color: "#4A4A4A" }}>
                        {cell.getValue()}
                    </Typography>
                ),
            },
        ],
        [data]
    );
    const table = useMaterialReactTable({
        columns,
        data,
        enablePagination: false,
        enableBottomToolbar: false, // Hide bottom toolbar
        enableColumnFilters: false,
        enableSorting: false,
        enableColumnActions: false,
        enableGlobalFilter: false,
        enableDensityToggle: false,
        enableColumnHiding: false,
        positionToolbarAlertBanner: "none",     // Hide the density toggle
        enableColumnVisibility: false,   // Hide the column visibility toggle
        enableFullScreenToggle: false,   // Hide the full-screen toggle
        muiTableBodyCellProps: {
            sx: { borderBottom: "none" }, // Remove borders
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: "bold",
                color: "#0B254B",
                textAlign: "left",
            },
        },
        renderToolbarInternalActions: () => null,
    });


    return (
        <Box className="Adjustmentsbyfiram">
            <Typography component="div" className='userprofilelist '>
                <Grid container direction="row" spacing={2}>
                    <Grid size={{ xs: 12, sm: 4, md: 8 }}>
                        <Grid container>
                            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                <Typography variant="h2" className='userprofilelistcontent'>Firm <span>Adjustment Activity</span></Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 8 }} >
                                <Grid container spacing={2} justifyContent="flex-end" className="MarketerManagement">
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} >
                                        <Grid container spacing={2} justifyContent="flex-end">
                                            <Grid size={{ xs: 6, sm: 6, md: 5 }}>
                                                <ByfiramFilter
                                                    handleFilterSubmit={handleFilterSubmit}
                                                    isOpen={openComponent === 'filter'}
                                                    onClose={handleCloseBackdrop}
                                                    onOpen={() => handleOpenComponent('filter')}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 6, sm: 6, md: 5 }}>
                                                <Button
                                                    variant="contained"
                                                    className='Download'
                                                    color="primary" 
                                                ><img src={downloadIcon}></img> Download
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 8 }} >
                        {/* <Grid container spacing={2} justifyContent="flex-end" className="MarketerManagement">
                            <Grid size={{ xs: 12, sm: 12, md: 8 }} >
                                <Grid container spacing={2} justifyContent="flex-end">
                                    <Grid size={{ xs: 6, sm: 6, md: 4 }}>
                                        <ByfiramFilter
                                            handleFilterSubmit={handleFilterSubmit}
                                            isOpen={openComponent === 'filter'}
                                            onClose={handleCloseBackdrop}
                                            onOpen={() => handleOpenComponent('filter')}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 6, sm: 6, md: 4 }}>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                    <div className={backdropOpen ? 'backdrop' : ''}>
                    </div>
                        <Box className="byfiramcontioner">

                            {/* Custom Title */}
                            <Typography
                                variant="h4"

                            >
                                NOVEMBER 2024
                            </Typography>

                            {/* Table */}
                            <MaterialReactTable table={table} />

                        </Box>
                   
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                    <Typography component="div" className="UploadFiles-container mapcontainer  ">
                        <Typography component="div" className="Personal-Informationsheading ">
                            <Typography component="h2" variant="h5">Document Upload  <img src={raphaelinfo} alt='raphaelinfo'></img></Typography>
                        </Typography>
                        <Typography component="div" className="passwordcheck marbottom0 selecticon">
                            <AutocompleteInput
                                control={control}
                                name="documentType"
                                label="Document Type"
                            // options={documentData}
                            // error={!!errors.documentType}
                            // helperText={errors.documentType?.message}
                            // handleBlur={handleBlur}
                            // onChange={handleOnChange}
                            />
                        </Typography>
                        <UploadFiles
                        // initialFiles={files}
                        // portalKey={portalkey}
                        // selectedDocumentType={selectedDocumentType}
                        // supportedFormats={supportedFormat}
                        // documentTypes={documentTypeData}
                        // control={control}
                        // errors={errors}
                        // onFileChange={handleFileChange}
                        // exsistingFiles={exsistingFiles}
                        />
                        <Typography component="div" className="SupportedFormats">
                            <Typography component="h3" >Download Template</Typography>
                            <div className="mar-top-16" >
                                <Typography component="div">Non-disclosure agreement
                                    <IconButton >
                                        <img src={materialsymbolsdownload} alt="material-symbols_download"></img>
                                    </IconButton>
                                </Typography>
                            </div>
                        </Typography>
                    </Typography>
                </Grid>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }} className="Personal-Information">
                <Button variant="contained" color="red" className="cancelbutton">
                    Cancel
                </Button>
                <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className='submitbutton'


                >
                    Save
                </Button>
            </Grid>


        </Box>
    );
}

export default Byfiram;