import React, { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Lock, LockOpen,Sync,FilterListOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography, Tooltip, TextField ,InputAdornment ,Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DropdownTableInput, MultiSelectMenu, ModalPopup } from '_components';
import { CustomerDetails,CustomerFilter } from 'container/admin';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
const Customer = () => {

    const data1 = [
        {
            accountNumber: "1200001234567",
            marketer: 1,
            group: 2,
            serviceAddress: "15 St. Se Washington 200035",
            associationStart: "Jan 2025",
            associationEnd: 'Feb 2025',
        },
    ];
    const [data,setData] = useState([]);
    const Marketer = [
        {
            "MarketerID": 1,
            "MarketerName": "Marketer 1"
        },
        {
            "MarketerID": 2,
            "MarketerName": "Marketer 2"
        }
    ];

    const marketer = Marketer.map(x => ({
        label: x.MarketerName,
        value: x.MarketerID
    }));
    const handleSearch = () => {
        setData(data1)
    }
    

    const handleInputChange = (value, row, columnKey) => {
        if (columnKey === "associationStart" || columnKey === "associationEnd") {
            const formattedValue = dayjs(value).format("YYYY-MM"); // Format the date before sending it to handleChange
            handleChange(formattedValue, row, columnKey); // Call handleChange to update and validate
        }
    };
    
    const handleChange = (newValue, rowData, field) => {
        let updatedRows = [...data];
        
        // If the field is a date field (associationStart or associationEnd), handle the validation
        if (field === "associationStart" || field === "associationEnd") {
            // Format the new value as YYYY-MM (if it's a date)
            newValue = dayjs(newValue).format('YYYY-MM');
        }
        
        // Validation logic for 'associationEnd' (End Date cannot be more than 4 months after Start Date)
        if (field === "associationEnd") {
            const startDate = dayjs(rowData.associationStart); // Get the current association start date
            const endDate = dayjs(newValue); // New end date value
            
            // Set the maximum end date to be 4 months after the start date
            const maxEndDate = startDate.add(4, "month");
    
            // If the end date exceeds the max end date, show an alert and prevent update
            if (endDate.isAfter(maxEndDate)) {
                alert("End Date cannot be more than 4 months from the Start Date.");
                return; // Prevent updating the value
            }
        }
        
        // Find the row in the edited rows and update the specific field
        const rowIndex = updatedRows.findIndex(row => row.UserID === rowData.UserID);
        if (rowIndex >= 0) {
            updatedRows[rowIndex][field] = newValue;
        } else {
            updatedRows.push({ ...rowData, [field]: newValue, isEdited: true });
        }
        
        // Update the state with the modified rows
        setData(updatedRows);
        console.log(updatedRows);
    };

      const handleAddEdit = (row) => {
        row.toggleExpanded();
      };


    const columns = useMemo(() => ([
        {
            accessorKey: "accountNumber",
            header: "Customer",
            Cell:({cell,row})=>(
                   <span onClick={() => handleAddEdit(row)}>
                    {cell.getValue()}
                   </span>
            )
        },
        {
            accessorKey: 'group',
            header: 'Group',
            Cell: ({ row, column }) => {
                const columnKey = column.id || column.accessorKey;
                return (
                    <DropdownTableInput
                        value={row.original[columnKey]}
                        label={`Select ${column.columnDef.header}`}
                        onChange={(value) => handleChange(value, row.original, columnKey)}
                        options={marketer}
                    />
                );
            }
        },
        {
            accessorKey: 'marketer',
            header: 'Marketer',
            Cell: ({ row, column }) => {
                const columnKey = column.id || column.accessorKey;
                return (
                    <DropdownTableInput
                        value={row.original[columnKey]}
                        label={`Select ${column.columnDef.header}`}
                        onChange={(value) => handleChange(value, row.original, columnKey)}
                        options={marketer}
                    />
                );
            }
        },
        {
            accessorKey: 'associationStart',
            header: 'Start Date',
            filterFn: (row, columnId, filterValue) => {
                const dateValue = row.getValue(columnId);
                return dayjs(dateValue).format('MM-YYYY').toLowerCase().includes(filterValue.toLowerCase());
            },
            Cell: ({ cell, row }) => {
                const dateValue = cell.getValue();
                const minDate = dayjs().startOf("month");
                const maxDate = dayjs().add(3, "month").endOf("month");
                const marketerStartDate = dayjs(row.original.MarketerStartDate);
    
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className='SelectedDate'
                            views={['year', 'month']}
                            value={dayjs(dateValue)}
                            onChange={(newValue) => {
                                const formattedValue = newValue ? newValue.format("YYYY-MM") : "";
                                handleInputChange(formattedValue, row, "associationStart");
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
            accessorKey: 'associationEnd',
            header: 'End Date',
            filterFn: (row, columnId, filterValue) => {
                const dateValue = row.getValue(columnId);
                return dayjs(dateValue).format('MM-YYYY').toLowerCase().includes(filterValue.toLowerCase());
            },
            Cell: ({ cell, row }) => {
                const dateValue = cell.getValue();
                const minDate = dayjs().startOf("month");
                const maxDate = dayjs().add(6, "month").endOf("month");
                const marketerStartDate = dayjs(row.original.MarketerStartDate);
    
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className='SelectedDate'
                            views={['year', 'month']}
                            value={dayjs(dateValue)}
                            onChange={(newValue) => {
                                const formattedValue = newValue ? newValue.format("YYYY-MM") : "";
                                console.log("Selected Month & Year:", formattedValue);
                                handleInputChange(formattedValue, row, "associationEnd");
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
    ]), [data]); 

      const table = useMaterialReactTable({
        columns,
        data,
        enableHiding: false,
        columnFilterDisplayMode: 'popover',
        enableFullScreenToggle: false,
        enableColumnActions: false,
        paginationDisplayMode: 'pages',
        enableExpandAll: false,
        positionToolbarAlertBanner: 'none',
        enableMultiSort: false,
        enablePagination:false,
        enableGlobalFilter: false,
        enableDensityToggle: false,
 // Ensure unique IDs for rows
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
                'accountNumber',
                'marketer',
                "group",
                'associationStart',
                'associationEnd'
            ]
        },
        muiTableBodyProps:{
            sx: { display: data.length > 0 ? "table-row-group" : "none" }, // Hide table body when empty
        },
        renderDetailPanel: ({ row }) => (
          <Box sx={{ padding: 2 }}>
            <CustomerDetails/>
          </Box>
        ),
        muiExpandButtonProps: {
          sx: {
            display: 'none',
          },
        },
      });
    return(
        <Box className="Customermanagement">
              <Typography component="div" className='userprofilelist'>
                <Grid container direction="row" spacing={2} >
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}  >
                        <Grid container  >
                            <Grid size={{ xs: 12, sm: 12, md: 12 }}  >
                                <Typography variant="h2" className='userprofilelistcontent'> Customer Management </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 8 }} className="PortalName" >
                        <Grid container spacing={2} className="justifyContent">
                            <Grid size={{ xs: 6, sm: 6, md: 6 }}  >
                                {/* <CustomerFilter isOpen={openComponent === 'filter'}
                                    onClose={handleCloseBackdrop}
                                    onOpen={() => handleOpenComponent('filter')} /> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TextField
        type="number"
        variant="outlined"
        fullWidth
        className="SearchIconinput"
        
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="SearchIcon" onClick={handleSearch}/>
            </InputAdornment>
          ),
          'aria-label': 'search FAQs'
        }}
      />
            <Box className="Customertable">
                <MaterialReactTable
                    table={table}
                />
                </Box>
            </LocalizationProvider>
            <Grid container>
            <Grid size={{ xs: 12, sm: 12, md: 12 }} className="Personal-Information">
            <Button variant="contained" color="red" className="cancelbutton" >
              Cancel
            </Button>
            <Button type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className='submitbutton'
              
              // disabled={!isDataChanged} >
            > 
              Save
            </Button>
          </Grid>
            </Grid>
        </Box>
    )
}

export default Customer;