import React, { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import { Sync, FilterListOff } from '@mui/icons-material';
import { ModalPopup } from '_components';
import { Delete, Deletewhite } from 'images';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MarketerGroupDetails from './MarketerGroupDetails';
import BalancingModel from './BalancingModel';
import { alertActions } from '_store';
import { useDispatch } from 'react-redux';

const MarketerGroupList = ({ marketerGroupData, rowSelection, handleChange, isModalOpen, setIsModalOpen, selectedRows, setSelectedRows,
    setRowSelection, handleDelete, handleToggleActiveStatus, handleRefresh }) => {
    const dispatch = useDispatch();
    const header = " Marketer Group";
    const data = marketerGroupData?.MarketerGroups || [];
    const marketerDate = marketerGroupData?.MarketerStartDate || new Date();
    const interruptibleBalancingModel = marketerGroupData?.BalancingModel?.map(bal => ({ value: bal.BalancingModelID, label: bal.BalancingModelName })) || [];
    const allBalancingModel = [
        ...interruptibleBalancingModel,
        { value: 4, label: "Storage Balancing" }
    ];
    const [selectedRow, setSelectedRow] = useState(null);

    const handleOpenModal = (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRow(null);
    };

    const handleRowDelete = async(row) => {
        dispatch(alertActions.clear());
        await handleDelete(row);
        setIsModalOpen(false);
        setSelectedRows([]);
        setRowSelection({});
        dispatch(alertActions.success({ message: "Marketer group deleted successfully", header: header }));
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'GroupName',
            header: 'Group Name',
            Cell: ({ cell, row }) => (
                <TextField
                    className='ServiceProvider'
                    value={cell.getValue()}
                    onChange={(e) => handleChange(e.target.value, row.original, 'GroupName')}
                    onClick={() => handleAddEdit(row)}
                />
            ),
        },
        {
            accessorKey: 'GroupType',
            header: 'Group Type',
            id: 'GroupType',
        },
        {
            accessorKey: 'JurisdictionName',
            header: 'Jurisdiction',
            id: 'JurisdictionName',
        },
        {
            accessorKey: 'StartMonth',
            header: 'Start Month',
            //filterVariant: 'date',
            filterFn: (row, columnId, filterValue) => {
                const dateValue = row.getValue(columnId);
                return dayjs(dateValue).format('MMMM YYYY').toLowerCase().includes(filterValue.toLowerCase());
            },
            Cell: ({ cell, row }) => {
                const dateValue = cell.getValue();
                const currentDate = dayjs();
                const minDate = currentDate.subtract(3, 'month');
                const maxDate = currentDate.add(3, 'month');
                const marketerStartDate = dayjs(marketerDate);
                const isDisabled = dayjs(dateValue).isBefore(currentDate, 'month') || dayjs(dateValue).isSame(currentDate, 'month');

                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className='SelectedDate '
                            views={['year', 'month']}
                            value={dayjs(dateValue)}
                            inputFormat="MMM yyyy"
                            onChange={(newValue) => handleChange(newValue.toISOString(), row.original, 'StartMonth')}
                            minDate={marketerStartDate.isAfter(minDate) ? marketerStartDate : minDate}
                            maxDate={maxDate}
                            disabled={isDisabled}
                            slotProps={{
                                textField: (params) => <TextField {...params} />
                            }}
                        />
                    </LocalizationProvider>
                );
            },
        },
        {
            accessorKey: 'EndMonth',
            header: 'End Month',
            //filterVariant: 'date',
            filterFn: (row, columnId, filterValue) => {
                const dateValue = row.getValue(columnId);
                return dayjs(dateValue).format('MMMM YYYY').toLowerCase().includes(filterValue.toLowerCase());
            },
            Cell: ({ cell, row }) => {
                const dateValue = cell.getValue();
                const startMonth = dayjs(row.original.StartMonth);
                const currentDate = dayjs();
                const minDate = startMonth.isAfter(currentDate) ? startMonth : currentDate;
                const maxDate = currentDate.add(4, 'month');

                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className='SelectedDate '
                            views={['year', 'month']}
                            value={dayjs(dateValue)}
                            inputFormat="MMM yyyy"
                            onChange={(newValue) => {
                                if (newValue.isAfter(startMonth)) {
                                    handleChange(newValue.toISOString(), row.original, 'EndMonth');
                                }
                            }}
                            minDate={minDate}
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
            accessorKey: 'BalancingModelID',
            header: 'Balancing Model',
            id: 'BalancingModelID',
            filterFn: (row, columnId, filterValue) => {
                const balancingModelID = row.getValue(columnId);
                if (!balancingModelID) {
                    return false;
                }

                const balancingModel = allBalancingModel.find(model => model.value === balancingModelID);
                if (!balancingModel) {
                    return false;
                }
                return balancingModel.label.toLowerCase().includes(filterValue.toLowerCase());
            },
            Cell: ({ row, column }) => {
                const columnKey = column.id || column.accessorKey;
                const balancingModelList = (row?.original.GroupType?.toLowerCase() === "firm"
                    ? [{ value: 4, label: "Storage Balancing" }]
                    : interruptibleBalancingModel);
                const defaultValue = row.original.GroupType?.toLowerCase() === "firm" ? 4 : row.original.BalancingModelID;
                return (
                    <BalancingModel
                        marketerGroupID={row.original.ID}
                        value={defaultValue}
                        label={`Select ${column.columnDef.header}`}
                        onChange={(value) => handleChange(value, row.original, columnKey)}
                        options={balancingModelList}
                    // onDatesChange={(startMonth, endMonth) => {
                    //     handleChange(startMonth.toISOString(), row.original, 'StartMonth');
                    //     handleChange(endMonth.toISOString(), row.original, 'EndMonth');
                    // }}
                    />
                )
            }
        },
    ], [handleChange]);

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
        // enableExpandAll: false,
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
                'mrt-row-select',
                'GroupName',
                'GroupType',
                'JurisdictionName',
                'StartMonth',
                'EndMonth',
                'BalancingModelID',
                'mrt-row-actions'
            ],
            sorting: [
                {
                    id: 'GroupName',
                    desc: false,
                },
                {
                    id: 'GroupType',
                    desc: false,
                },
                {
                    id: 'JurisdictionName',
                    desc: false,
                },
                {
                    id: 'StartMonth',
                    desc: false,
                },
                {
                    id: 'EndMonth',
                    desc: false,
                },
                {
                    id: 'BalancingModelID',
                    desc: false,
                },

            ],
        },
        renderTopToolbarCustomActions: () => (
            <Box
                sx={{
                    display: 'flex',
                    gap: '16px',
                    padding: '8px',
                    flexWrap: 'wrap',
                }}
            >
                <Tooltip title="Clear filter" className='Deactivate'>
                    <div>
                        <IconButton onClick={handleRefresh} >
                            <FilterListOff variant="contained" color="secondary" />
                        </IconButton>
                    </div>
                </Tooltip>
                <Tooltip title="Delete Selected" className='DeleteSelected'>
                    <div>
                        <IconButton onClick={handleToggleActiveStatus} disabled={selectedRows?.length === 0}>
                            <img src={Deletewhite} alt="Delete"  ></img>
                        </IconButton>
                    </div>
                </Tooltip>
            </Box>
        ),
        renderRowActions: ({ row }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }} className='tableicons'>
                <IconButton className='delete' >
                    <img src={Delete} alt="Delete" onClick={handleOpenModal}></img>
                </IconButton>
                {isModalOpen && <ModalPopup
                    header={header}
                    message1="Are you sure you want to delete this marketer group?"
                    btnPrimaryText="Confirm"
                    btnSecondaryText="Cancel"
                    handlePrimaryClick={() => handleRowDelete(row.original)}
                    handleSecondaryClick={() => handleCloseModal()}
                />
                }
            </div>
        ),
        renderDetailPanel: ({ row }) => (
            <Box sx={{ padding: 2 }}>
                <MarketerGroupDetails marketerGroup={row.original} balancingModels={allBalancingModel} />
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

export default MarketerGroupList;