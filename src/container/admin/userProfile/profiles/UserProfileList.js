import React, { useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Visibility, DeleteForever, Lock, LockOpen, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
import { AutocompleteTable, Download } from '_components';

const UserProfileMB = ({ data,userProfiles, setData, errors, setErrors, editedRowId, setEditedRowId, handleChange }) => {
  const roles = userProfiles?.Roles?.map(role => ({ value: role.RoleID, label: role.RoleName })) || [];
  const statuses = userProfiles?.Statuses?.map(status => ({ value: status.StatusID, label: status.StatusName })) || [];
  const agencies = userProfiles?.Agencies?.map(agency => ({ value: agency.AgencyID, label: agency.AgencyName })) || [];
  const jurisdictions=userProfiles?.Jurisdictions.map(jurisdiction => ({ value: jurisdiction.JurisdictionID, label: jurisdiction.JurisdictionName })) || [];

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
          error={errors[cell.row.original.id]?.RoleID}
          helperText={errors[cell.row.original.id]?.RoleID ? 'Role is required' : ''}
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
        error={errors[cell.row.original.id]?.StatusID}
        helperText={errors[cell.row.original.id]?.StatusID ? 'Status is required' : ''}
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
        error={errors[cell.row.original.id]?.AgencyID}
        helperText={errors[cell.row.original.id]?.AgencyID ? 'Agency is required' : ''}
      />
      )
    },
    {
      accessorKey: 'JurisdictionID',
      header: 'Jurisdiction',
      Cell: ({ cell }) => (
        <AutocompleteTable
        value={cell.getValue()}
        onChange={(newValue) => {
          setEditedRowId(cell.row.original.id);
          handleChange(newValue, cell.row.original, 'JurisdictionID');
        }}
        options={agencies}
        error={errors[cell.row.original.id]?.JurisdictionID}
        helperText={errors[cell.row.original.id]?.JurisdictionID ? 'Jurisdiction is required' : ''}
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
    positionExpandColumn: 'first',
    initialState: {
      columnOrder: [
        'mrt-row-expand',
        'FullName',
        'RoleID',
        'AgencyID',
        'JurisdictionID',
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
    muiExpandButtonProps: {
        sx: {
          display: 'none',
        },
      },
  });

  return (
    <MaterialReactTable table={table} />
  );
};

export default UserProfileMB;