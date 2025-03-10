import React, { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import { Box,  TextField, Tooltip ,Typography } from '@mui/material';
import { PlayCircleOutline, PauseCircleOutline,   Sync ,FilterListOff} from '@mui/icons-material';
import { ModalPopup, MultiSelectAutocomplete, MultiSelectMenu } from '_components';
import { MarketerDetails } from "container/admin";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const ReportsList = ({ marketerData, rowSelection, handleChange, isModalOpen, setIsModalOpen, onLockToggle, selectedRows, setSelectedRows,
    setRowSelection, handleToggleActiveStatus, handleRefresh }) => {

    const uetFiles = marketerData?.UETFileDate?.map(uet => ({ value: uet.UETFileID.toString(), label: uet.UETFileName })) || [];
    const data = marketerData?.Marketers || [];
    const [selectedRow, setSelectedRow] = useState(null);

    const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);

    const handleMultiSelectChange = (newValue, row, columnKey) => {
        handleChange(newValue, row.original, columnKey);
        setIsConfirmEnabled(true);
    };

    const handleInputChange = (value, row, columnKey) => {
        handleChange(value, row.original, columnKey);
        setIsConfirmEnabled(true);
    };

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    const handleLockToggle = (selectedRow) => {
        onLockToggle(selectedRow);
        setIsModalOpen(false);
    }

    const columns = useMemo(() => {
        const baseColumns = [
            {
                accessorKey: 'FileName', header: 'File NameD',
                Cell: ({ row }) => (
                    <span onClick={() => handleAddEdit(row)} >
                        {row.original.PortalID}
                    </span>
                ),
            },
            {
                accessorKey: 'Marketer',
                header: 'Marketer',
                Cell: ({ cell, row }) => (
                    <TextField
                        className='ServiceProvider'
                        value={cell.getValue()}
                        onChange={(e) => handleInputChange(e.target.value, row, 'MarketerName')}
                    />
                ),
            },
            {
                accessorKey: 'FileType',
                header: 'File Type',
                //filterVariant: 'date',
                filterFn: (row, columnId, filterValue) => {
                    const dateValue = row.getValue(columnId);
                    return dayjs(dateValue).format('MM/DD/YYYY').toLowerCase().includes(filterValue.toLowerCase());
                  //  return dayjs(dateValue).isSame(dayjs(filterValue), 'day');
                },
                Cell: ({ cell, row }) => {
                    const dateValue = cell.getValue();
                    const currentDate = dayjs();
                    const minDate = currentDate.subtract(3, 'month');
                    const maxDate = currentDate.add(3, 'month');
                    const marketerStartDate = dayjs(row.original.MarketerStartDate);

                    return (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                className='SelectedDate'
                                views={['year', 'month', 'day']}
                                value={dayjs(dateValue)}
                                onChange={(newValue) => handleInputChange(newValue.toISOString(), row, 'StartDate')}
                                minDate={marketerStartDate.isAfter(minDate) ? marketerStartDate : minDate}
                                maxDate={maxDate}
                                slotProps={{
                                    textField: (params) => <TextField {...params} />
                                }}
                            />
                        </LocalizationProvider>
                    );
                },
            },
            {
                accessorKey: 'lastupdate',
                header: 'last update',
                Cell: ({ cell, row }) => (
                    <TextField
                        className='ServiceProvider'
                        type="number"
                        value={cell.getValue()}
                        onChange={(e) => handleInputChange(e.target.value, row, 'ServiceProvider')}
                        error={isNaN(cell.getValue())}
                        helperText={isNaN(cell.getValue()) ? "Only numeric values allowed" : ""}
                    />
                ),
            },
         
        ];

        return baseColumns;
    }, [handleChange, uetFiles]);

    const handleAddEdit = (row) => {
        row.toggleExpanded();
    };

    const table = useMaterialReactTable({
        columns,
        data,
        enableHiding: false,
        columnFilterDisplayMode: 'popover',
        enableFullScreenToggle: false,
        enableColumnActions: false,
        paginationDisplayMode: 'pages',
        enableRowActions: true,
        enableRowSelection: true,
        enableExpandAll: false,
        positionExpandColumn: 'first',
        positionActionsColumn: "last",
        positionToolbarAlertBanner: 'none',
        autoResetPageIndex: false,
        state: {
            rowSelection,
        },
        getRowId: (row) => row.UserId, // Ensure unique IDs for rows
        onRowSelectionChange: (newRowSelection) => {
            setRowSelection(newRowSelection); // Update row selection state
        },
        displayColumnDefOptions: {
            'mrt-row-expand': {
                header: "",
                size: 10, // make the expand column wider
                muiTableHeadCellProps: {
                    sx: {
                        display: 'none', // Hide the expand column
                    },
                },
                muiTableBodyCellProps: {
                    sx: {
                        display: 'none', // Hide the expand column
                    },
                },
            },
        },
        initialState: {
            columnOrder: [
                'mrt-row-expand',
                'mrt-row-select',
                'FileName',
                'Marketer',
                'FileType',
                'lastupdate',
                "Actions",
                'mrt-row-actions'
            ],
            sorting: [
                {
                  id: 'File Name', 
                  desc: false, 
                },
                {
                  id: 'Marketer', 
                  desc: false, 
                },
                {
                  id: 'File Type', 
                  desc: false, 
                },
              {
                  id: 'last update', 
                  desc: false, 
                },
              {
                  id: 'Actions', 
                  desc: false, 
                },
              
              ],
        },
    
        renderRowActions: ({ row }) => {
            return (
                <div   className='tableicons'>
                    <IconButton onClick={() => handleOpenModal(row)} className='lock'>
                        {row.original.IsActive ? <PlayCircleOutline /> : <PauseCircleOutline />}
                    </IconButton>
                    {isModalOpen && <ModalPopup
                        header="Marketer"
                        message1={selectedRow?.original.IsActive ? "Are you sure you want to deactivate marketer?" : "Are you sure you want to activate marketers?"}
                        btnPrimaryText="Confirm"
                        btnSecondaryText="Cancel"
                        handlePrimaryClick={() => handleLockToggle(selectedRow)}
                        handleSecondaryClick={() => handleCloseModal()}
                    />
                    }
                </div>
            )
        },
        renderDetailPanel: ({ row }) => (
            <Box sx={{ padding: 2 }}>
                <MarketerDetails marketer={row.original} uetFileData={marketerData?.UETFileDate} />
            </Box>
        ),
        muiExpandButtonProps: {
            sx: {
                display: 'none',
            },
        },
    });

    useEffect(() => {
        const selectedFlatRows = table.getSelectedRowModel().flatRows;
        setSelectedRows(selectedFlatRows.map((row) => row.original)); // Extract original row data
    }, [rowSelection, table]); // Re-run when rowSelection changes

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MaterialReactTable table={table} />
            </LocalizationProvider>
        </>
    );
};

export default ReportsList;