import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Typography, Backdrop, TextField, CircularProgress, Button, Box } from "@mui/material";
import { IconButton } from "@material-ui/core";
import Grid from "@mui/material/Grid2";
import { yupResolver } from '@hookform/resolvers/yup';
import { additionalDetailsValidationSchema, companyPOCValidationSchema, companyValidationSchema, mapCenterValidationSchema } from "_utils/validationSchema";
import { alertActions } from '_store';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { marketerGetData } from '_utils/constant';
import { AutocompleteInput, UploadFiles, UnderConstruction } from '_components';
import { CommonConfimationmodal, ModalPopup } from '_components';
import { marketerAction } from '_store/marketer.slice';
import dayjs from 'dayjs';
import { raphaelinfo, materialsymbolsdownload, downloadIcon } from './../../../images';
import ByfiramFilter from "./byFiramFilter";
import { MultiSelectInput } from '_components';
const ByInterruptible = () => {
    const [openComponent, setOpenComponent] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);
 const [roleData, setRoleData] = useState([]);
  const [selectedRoleID, setSelectedRoleID] = useState(null);
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
    const handleRoleChange = (newValue) => {
        setSelectedRoleID(newValue);
    };
    const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName);
    };
    const { register, handleSubmit, control, reset, formState: { errors, isValid }, trigger } = useForm({
        resolver: yupResolver(mapCenterValidationSchema)
    });

    const [data, setData] = useState([
        {
            group: "Group #1",
            imbalance: -1032,
            nomination: 4230,
            usage: 539,
            adjustment: 2000,
            drv: 4225,
            imbalanceEOM: 591,
            tolerance: 634,
            year: 2025,
        },
        {
            group: "Group #2",
            imbalance: -1032,
            nomination: 4230,
            usage: 539,
            adjustment: 2000,
            drv: 4225,
            imbalanceEOM: 2556,
            tolerance: 634,
            year: 2025,
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
                accessorKey: "imbalance",
                header: "Imbalance - Fom",
            },
            {
                accessorKey: "nomination",
                header: "Nomination",
            },
            {
                accessorKey: "usage",
                header: "Usage",
            },
            {
                accessorKey: "adjustment",
                header: "Adjustment",
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

                accessorKey: "drv",
                header: "drv",
            },
            {

                accessorKey: "imbalanceEOM",
                header: "Imbalance - eom",
            },
            {

                accessorKey: "tolerance",
                header: "±15% Tolerance",
            },
            {

                accessorKey: "year",
                header: ">15% Tolerance",
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
        <Box className="Adjustmentsbyfiram Adjustmentsbyfiram-coantainer">
            <Typography component="div" className='userprofilelist '>
                <Grid container direction="row" spacing={2}>

                    <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                        <Typography variant="h2" className='userprofilelistcontent'>interruptible <span>Adjustment Activity</span></Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12, md: 8 }} >
                        <Grid container spacing={2} justifyContent="flex-end" className="MarketerManagement">
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
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                    <div className={backdropOpen ? 'backdrop' : ''}>
                    </div>
                        <Box className="byfiramcontioner">

                            {/* Custom Title */}
                            <Typography
                                variant="h4"

                            >
                                NOVEMBER 2024
                            </Typography>
                            <Typography component="div" className='passwordcheck  marbottom0 selecticon'>
                               
                            </Typography>

                            {/* Table */}
                            <MaterialReactTable table={table} />

                        </Box>
                    
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

export default ByInterruptible;