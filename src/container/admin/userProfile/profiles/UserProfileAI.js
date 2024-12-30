import React, { useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Visibility, DeleteForever, Lock, LockOpen, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
import { AutocompleteTable, Download } from '_components';

const UserProfileAI = ({ data, setData, errors, setErrors, editedRowId, setEditedRowId, handleChange }) => {
  const roles = [{ RoleId: '1', RoleName: 'Admin' }, { RoleId: '2', RoleName: 'Contributor' }];
  const statuses = [{ StatusId: '1', StatusName: 'Submitted' }, { StatusId: '2', StatusName: 'Approved' }];
  const agencies = [{ AgencyId: '1', AgencyName: 'Agency1' }, { AgencyId: '2', AgencyName: 'Agency2' }];
  const [isLocked, setLock] = useState(false);
  const filename = 'Users';

  const columns = useMemo(() => [
    { accessorKey: 'FullName', header: 'Name' },
    {
      accessorKey: 'RoleID',
      header: 'Role',
      Cell: ({ cell }) => (
        <AutocompleteTable
          value={cell.getValue()}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue, cell.row.original, 'RoleID');
          }}
          options={roles}
          getOptionLabel={(option) => option.RoleName}
          error={errors[cell.row.original.id]?.role}
          helperText={errors[cell.row.original.id]?.role ? 'Role is required' : ''}
        />
      )
    },
    {
      accessorKey: 'StatusID',
      header: 'Status',
      Cell: ({ cell }) => (
        <AutocompleteTable
          value={cell.getValue()}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue, cell.row.original, 'StatusID');
          }}
          options={statuses}
          getOptionLabel={(option) => option.StatusName}
          error={errors[cell.row.original.id]?.status}
          helperText={errors[cell.row.original.id]?.status ? 'Status is required' : ''}
        />
      )
    },
    {
      accessorKey: 'AgencyID',
      header: 'Agency',
      Cell: ({ cell }) => (
        <AutocompleteTable
          value={cell.getValue()}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue, cell.row.original, 'AgencyID');
          }}
          options={agencies}
          getOptionLabel={(option) => option.AgencyName}
          error={errors[cell.row.original.id]?.agency}
          helperText={errors[cell.row.original.id]?.agency ? 'Agency is required' : ''}
        />
      )
    }
  ], [errors, handleChange, roles, statuses, agencies, setEditedRowId]);

  const handleAddEdit = (row) => {
    row.toggleExpanded();
  };

  const handleLock = () => setLock((lock) => !lock);

  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
    enableGlobalFilter: true,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    paginationDisplayMode: 'pages',
    enableRowActions: true,
    initialState: {
      columnOrder: [
        'FullName',
        'RoleID',
        'AgencyID',
        'StatusID',
        'mrt-row-actions', // Ensure this is included at the end
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
        <Download rows={data} headers={columns} filename={filename} />
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <IconButton onClick={() => handleAddEdit(row)}>
          <Edit variant="contained" color="primary" />
        </IconButton>
        <IconButton onClick={handleLock}>
          {isLocked ? <Lock /> : <LockOpen />}
        </IconButton>
        <IconButton>
          <DeleteForever variant="contained" color="secondary" />
        </IconButton>
      </div>
    ),
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Details for {row.original.FullName}</Typography>
      </Box>
    ),
  });

  return (
    <MaterialReactTable table={table} />
  );
};

export default UserProfileAI;