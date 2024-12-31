import React, { useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility, DeleteForever, Lock, LockOpen, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
import { AutocompleteTable, Download } from '_components';

const UserProfileAI = ({ data, userProfiles, setData, errors, setErrors, editedRowId, setEditedRowId, handleChange }) => {
  const roles = userProfiles?.Roles?.map(role => ({ value: role.RoleID, label: role.RoleName })) || [];
  const statuses = userProfiles?.Statuses?.map(status => ({ value: status.StatusID, label: status.StatusName })) || [];
  const agencies = userProfiles?.Agencies?.map(agency => ({ value: agency.AgencyID, label: agency.AgencyName })) || [];
  const [isLocked, setLock] = useState(false);
  const filename = 'Users';

  const columns = useMemo(() => [
    { field: 'FullName', headerName: 'Name', width: 150, editable: true },
    {
      field: 'RoleID',
      headerName: 'Role',
      width: 150,
      editable: true,
      filterable:true,
      renderCell: (params) => (
        <AutocompleteTable
          value={params.value}
          onChange={(newValue) => {
            setEditedRowId(params.row.id);
            handleChange(newValue?.value || '', params.row, 'RoleID');
          }}
          options={roles}
          error={errors[params.row.id]?.RoleID}
          helperText={errors[params.row.id]?.RoleID ? 'Role is required' : ''}
        />
      )
    },
    {
      field: 'StatusID',
      headerName: 'Status',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <AutocompleteTable
          value={params.value}
          onChange={(newValue) => {
            setEditedRowId(params.row.id);
            handleChange(newValue?.value || '', params.row, 'StatusID');
          }}
          options={statuses}
          error={errors[params.row.id]?.StatusID}
          helperText={errors[params.row.id]?.StatusID ? 'Status is required' : ''}
        />
      )
    },
    {
      field: 'AgencyID',
      headerName: 'Agency',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <AutocompleteTable
          value={params.value}
          onChange={(newValue) => {
            setEditedRowId(params.row.id);
            handleChange(newValue?.value || '', params.row, 'AgencyID');
          }}
          options={agencies}
          error={errors[params.row.id]?.AgencyID}
          helperText={errors[params.row.id]?.AgencyID ? 'Agency is required' : ''}
        />
      )
    }
  ], [errors, handleChange, roles, statuses, agencies, setEditedRowId]);

  const handleAddEdit = (row) => {
    row.toggleExpanded();
  };

  const handleLock = () => setLock((lock) => !lock);

  return (
    <>
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          onCellEditCommit={(params) => handleChange(params.value, params.row, params.field)}
          components={{
            Toolbar: () => (
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
            ActionsCell: (params) => (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <IconButton onClick={() => handleAddEdit(params.row)}>
                  <Edit variant="contained" color="primary" />
                </IconButton>
                <IconButton onClick={handleLock}>
                  {isLocked ? <Lock /> : <LockOpen />}
                </IconButton>
                <IconButton>
                  <DeleteForever variant="contained" color="secondary" />
                </IconButton>
              </div>
            )
          }}
        />
      </div>
    </>
  );
};

export default UserProfileAI;