import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
  MRT_ExpandAllButton,
} from 'material-react-table';
import { Box, Stack } from '@mui/material';

const InterruptibleList = ({ data = [] }) => {
  const columns = useMemo(() => [
    { accessorKey: 'MarketerName', header: 'Marketer' },
    { accessorKey: 'firmGroupName', header: 'Firm Group Name' },
    { accessorKey: 'imbalanceAtFOM', header: 'Imbalance at FOM' },
    { accessorKey: 'nominations', header: 'Nominations' },
    { accessorKey: 'usage', header: 'Usage' },
    { accessorKey: 'adjustments', header: 'Adjustments' },
    { accessorKey: 'drv', header: 'DRV' },
    { accessorKey: 'imbalanceAtEOM', header: 'Imbalance at EOM' },
    { accessorKey: 'thresholdVolume', header: '15% Threshold Volume' },
    { accessorKey: 'outsideThresholdVolume', header: 'Outside Threshold Volume' },
    { accessorKey: 'comments', header: 'Comments' },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data,
    displayColumnDefOptions: {
      'mrt-row-expand': {
        Header: () => (
          <Stack direction="row" alignItems="center">
            <MRT_ExpandAllButton table={table} />
            <Box>Groups</Box>
          </Stack>
        ),
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.getValue(grouping[grouping.length - 1]);
        },
        enableResizing: true,
        muiTableBodyCellProps: ({ row }) => ({
          sx: (theme) => ({
            color:
              row.depth === 0
                ? theme.palette.primary.main
                : row.depth === 1
                  ? theme.palette.secondary.main
                  : undefined,
          }),
        }),
        size: 200,
      },
    },
    enableGrouping: true,
    enableColumnResizing: true,
    groupedColumnMode: 'remove',
    initialState: {
      density: 'compact',
      expanded: true, //expand all groups by default
      grouping: ['MarketerName'], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: 'firmGroupName', desc: false }],
    },
  });

  console.log('Table State:', table.getState()); // Log the table state to check the grouping and expansion

  return <MaterialReactTable table={table} />;
};

export default InterruptibleList;