import React, { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import IconButton from '@mui/material/IconButton';
import { Box,  TextField, Tooltip ,Typography } from '@mui/material';
import { PlayCircleOutline, PauseCircleOutline,   Sync ,FilterListOff} from '@mui/icons-material';
import { ModalPopup, MultiSelectAutocomplete, MultiSelectMenu } from '_components';
import  FileHubDetails  from "./FileHubDetails";
import dayjs from 'dayjs';
import { Delete } from 'images';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const FileHubList = ({ marketerData, handleDelete, rowSelection, handleChange, isModalOpen, setIsModalOpen, onLockToggle, selectedRows, setSelectedRows,
    setRowSelection, handleToggleActiveStatus, handleRefresh }) => {

    //const uetFiles = marketerData?.UETFileDate?.map(uet => ({ value: uet.UETFileID.toString(), label: uet.UETFileName })) || [];
   // const data = marketerData?.Marketers || [];
    const [selectedRow, setSelectedRow] = useState(null);

    //const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);

    // //const handleMultiSelectChange = (newValue, row, columnKey) => {
    //     handleChange(newValue, row.original, columnKey);
    //     setIsConfirmEnabled(true);
    // };

    // const handleInputChange = (value, row, columnKey) => {
    //     handleChange(value, row.original, columnKey);
    //     setIsConfirmEnabled(true);
    // };
    

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
    
  const handleRowDelete = (row) => {
    handleDelete(row);
    setSelectedRows([]);
    setRowSelection({});
  };



    //         {
    //             accessorKey: 'PortalID', header: 'Portal ID',
    //             Cell: ({ row }) => (
    //                 <span onClick={() => handleAddEdit(row)} >
    //                     {row.original.PortalID}
    //                 </span>
    //             ),
    //         },
    //         {
    //             accessorKey: 'MarketerName',
    //             header: 'Marketer Name',
    //             Cell: ({ cell, row }) => (
    //                 <TextField
    //                     className='ServiceProvider'
    //                     value={cell.getValue()}
    //                     onChange={(e) => handleInputChange(e.target.value, row, 'MarketerName')}
    //                 />
    //             ),
    //         },
    //         {
    //             accessorKey: 'StartDate',
    //             header: 'Start Date',
    //             //filterVariant: 'date',
    //             filterFn: (row, columnId, filterValue) => {
    //                 const dateValue = row.getValue(columnId);
    //                 return dayjs(dateValue).format('MM/DD/YYYY').toLowerCase().includes(filterValue.toLowerCase());
    //               //  return dayjs(dateValue).isSame(dayjs(filterValue), 'day');
    //             },
    //             Cell: ({ cell, row }) => {
    //                 const dateValue = cell.getValue();
    //                 const currentDate = dayjs();
    //                 const minDate = currentDate.subtract(3, 'month');
    //                 const maxDate = currentDate.add(3, 'month');
    //                 const marketerStartDate = dayjs(row.original.MarketerStartDate);

    //                 return (
    //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                         <DatePicker
    //                             className='SelectedDate'
    //                             views={['year', 'month', 'day']}
    //                             value={dayjs(dateValue)}
    //                             onChange={(newValue) => handleInputChange(newValue.toISOString(), row, 'StartDate')}
    //                             minDate={marketerStartDate.isAfter(minDate) ? marketerStartDate : minDate}
    //                             maxDate={maxDate}
    //                             slotProps={{
    //                                 textField: (params) => <TextField {...params} />
    //                             }}
    //                         />
    //                     </LocalizationProvider>
    //                 );
    //             },
    //         },
    //         {
    //             accessorKey: 'ServiceProvider',
    //             header: 'Service Provider',
    //             Cell: ({ cell, row }) => (
    //                 <TextField
    //                     className='ServiceProvider'
    //                     type="number"
    //                     value={cell.getValue()}
    //                     onChange={(e) => handleInputChange(e.target.value, row, 'ServiceProvider')}
    //                     error={isNaN(cell.getValue())}
    //                     helperText={isNaN(cell.getValue()) ? "Only numeric values allowed" : ""}
    //                 />
    //             ),
    //         },
    //         {
    //             accessorKey: 'UETFileID',
    //             header: 'UET File Type',
    //             id: 'UETFileID',
    //             enableSorting: true,
    //             filterVariant: 'multi-select',
    //             filterSelectOptions: uetFiles,
    //             // filterFn: (row, columnId, filterValue) => {
    //             //     const rowValue = row.getValue(columnId);
    //             //     const selectedValues = rowValue.split(','); // Split the comma-separated values
    //             //     return selectedValues.some(value => {
    //             //       const file = uetFiles.find(file => file.value === value);
    //             //       return file?.label.toLowerCase().includes(filterValue.toLowerCase());
    //             //     });
    //             // },
    //             Cell: ({ row, column }) => {
    //                 const columnKey = column.id || column.accessorKey;
    //                 const selectedValues = row.original[columnKey]?.split(',') || [];
    //                 return (
    //                     <Typography component="div" className='marbottom0 selecticon margintop10'>
    //                     <MultiSelectMenu
    //                         options={uetFiles}
    //                         onChange={(newValue) => handleMultiSelectChange(newValue, row, columnKey)}
    //                         label="UET File Type"
    //                         value={selectedValues.join(',')}
    //                     />
    //                     </Typography>
    //                 );
    //             }
    //         }
    //     ];

    //     return baseColumns;
    // }, [handleChange, uetFiles]);
    const datalist = [
        {
        FileName: "9094839_SFES_9232",
         Marketer: "Marketer #1",
         FileType: "READ",
         lastupdate: "11/11/2024",
          
           },
      ];
    const columns = [
        {
          accessorKey: "FileName",
          header: "File Name",
          Cell: ({ row }) => (
            <span onClick={() => handleAddEdit(row)} >
              <Typography sx={{ ml: 1 }}>{row.original.FileName}</Typography>
           
            </span>
          ),
        },
        { accessorKey: "Marketer", header: "Marketer" },
        { accessorKey: "FileType", header: "File Type" },
        {
          accessorKey: "lastupdate",
          header: "last update",
          Cell: ({ cell }) => (
            <Box >
              {cell.getValue()}
            </Box>
          ),
        },
      
      ];
 
    const handleAddEdit = (row) => {
        row.toggleExpanded();
       
    };
    // const handleAddEdit = (row) => {
    //     setRowSelection((prev) => ({
    //         ...prev,
    //         [row.id]: !prev[row.id],
    //     }));
    // };

    const table = useMaterialReactTable({
        columns,
        data: datalist,
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
                'Announcement',
                'Portal',
                'StartDate',
                'ServiceProvider',
                "UETFileID",
                'mrt-row-actions'
            ],
            sorting: [
                {
                    id: 'Announcement', 
                    desc: false, 
                  },
                  {
                    id: 'Portal', 
                    desc: false, 
                  },
                  {
                    id: 'Date', 
                    desc: false, 
                  },
                {
                    id: 'Status', 
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
                <Tooltip title="Refresh" className='Deactivate'>
                    <div>
                        <IconButton onClick={handleRefresh} >
                            <FilterListOff variant="contained" color="secondary" />
                        </IconButton>
                    </div>
                </Tooltip>
                <Tooltip title="Deactivate" className='Deactivate'>
                    <div>
                        <IconButton onClick={handleToggleActiveStatus} disabled={selectedRows?.length === 0}>
                            <PauseCircleOutline variant="contained" color="secondary" />
                        </IconButton>
                    </div>
                </Tooltip>
            </Box>
        ),
        renderRowActions: ({ row }) => {
            return (
                <div   className='tableicons'>
                    <IconButton className='delete' >
                    <img src={Delete} alt="Delete" onClick={handleOpenModal}></img>
                </IconButton>
                {isModalOpen && <ModalPopup
                    header="Profile Delete"
                    message1="Are you sure you want to delete this AnnouncementCenter?"
                    btnPrimaryText="Confirm"
                    btnSecondaryText="Cancel"
                    handlePrimaryClick={() => handleRowDelete(row.original)}
                    handleSecondaryClick={() => handleCloseModal()}
                />
                }
                </div>
            )
        },
        renderDetailPanel: ({ row }) => (
            <Box sx={{ padding: 2 }}>
                <FileHubDetails  />
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

export default FileHubList;