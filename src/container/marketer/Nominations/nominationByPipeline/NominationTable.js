Let's try a different approach to ensure the styles are applied correctly. Instead of using `muiTableBodyCellProps` and `muiTableHeadCellProps` within the `useMaterialReactTable` configuration, you can directly apply the styles to the `TableCell` components within the `TableHead` and `TableBody`. Here's how you can do it:

```jsx
import React, { useMemo, useState } from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  flexRender,
  MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField
} from '@mui/material';

const InterruptibleList = ({ data, handleChange }) => {

  const handleInputChange = (row, value) => {
    handleChange(row, value);
  };

  const columns = useMemo(() => [
    { accessorKey: 'AllocationGroup', header: 'GROUP', enableColumnFilter: false },
    { accessorKey: 'PreviousBalanceInterruptible', header: 'IMBALANCE - FOM', enableColumnFilter: false },
    { accessorKey: 'TotalNominationAllocations', header: 'NOMINATIONS', enableColumnFilter: false },
    { accessorKey: 'TotalUsage', header: 'USAGE', enableColumnFilter: false },
    {
      accessorKey: "ImbalanceAdjustedVolume",
      header: "ADJUSTMENT",
      Cell: ({ row }) => (
        <Box>
          <TextField
            variant="standard"
            value={row.original.adjustment}
            onChange={(e) =>
              handleInputChange(row, e.target.value)
            }
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
      ),
    },
    { accessorKey: 'DailyRequiredVolume', header: 'DRV', enableColumnFilter: false },
    { accessorKey: 'MonthEndImbalanceInterruptible', header: 'IMBALANCE - EOM', enableColumnFilter: false },
    { accessorKey: 'ThresholdValue', header: '±15% TOLERANCE', enableColumnFilter: false },
    { accessorKey: 'OutsideThresholdAmount', header: '>15% TOLERANCE', enableColumnFilter: false },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
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
  });

  console.log('Table State:', table.getState()); // Log the table state to check the grouping and expansion

  return (
    <div>
      <TableContainer sx={{ maxHeight: '400px' }}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    align="left"
                    variant="head"
                    key={header.id}
                    sx={{
                      fontWeight: "bold",
                      color: "#0B254B",
                      textAlign: "left",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.Header ?? header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow key="subheader">
              <TableCell colSpan={columns.length} align="left" variant="head" key="subheader">
                Marketer1
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id} selected={row.getIsSelected()}>
                {row.getVisibleCells().map((cell, _columnIndex) => (
                  <TableCell
                    align="center"
                    variant="body"
                    key={cell.id}
                    sx={{ borderBottom: "none" }}
                  >
                    <MRT_TableBodyCellValue
                      cell={cell}
                      table={table}
                      staticRowIndex={rowIndex} //just for batch row selection to work
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <MRT_ToolbarAlertBanner stackAlertBanner table={table} /> */}
    </div>
  );
};

export default InterruptibleList;
```

By applying the `sx` prop directly to the `TableCell` components within the `TableHead` and `TableBody`, you should see the styles applied correctly. Let me know if this works for you!