import React, { useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { AutocompleteTable } from '_components';

const UserProfileAI = ({ data, setData, errors, setErrors, editedRowId, setEditedRowId, handleChange }) => {
    const roles = [{RoleId:'1',RoleName:'Admin'},{RoleId:'2',RoleName:'Contributor'}];
    const statuses = [{StatusId:'1',StatusName:'Submitted'},{StatusId:'2',StatusName:'Approved'}];
    const agencies = [{AgencyId:'1',AgencyName:'Agency1'},{AgencyId:'2',AgencyName:'Agency2'}];

    const columns = [
      { accessorKey: 'FullName', header: 'Name' },
      {
        accessorKey: 'RoleID',
        header: 'Role',
        Cell: ({ cell }) => (
          <AutocompleteTable
            value={cell.getValue()}
            onChange={(newValue) => {
              setEditedRowId(cell.row.original.ID);
              handleChange(newValue, cell.row.original, 'RoleID');
            }}
            options={roles}
            getOptionLabel={(option) => option.RoleName}
            error={errors[cell.row.original.ID]?.RoleID}
            helperText={errors[cell.row.original.ID]?.RoleID ? 'Role is required' : ''}
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
              setEditedRowId(cell.row.original.ID);
              handleChange(newValue, cell.row.original, 'StatusID');
            }}
            options={statuses}
            getOptionLabel={(option) => option.StatusName}
            error={errors[cell.row.original.ID]?.StatusID}
            helperText={errors[cell.row.original.ID]?.StatusID ? 'Status is required' : ''}
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
              setEditedRowId(cell.row.original.ID);
              handleChange(newValue, cell.row.original, 'AgencyID');
            }}
            options={agencies}
            getOptionLabel={(option) => option.AgencyName}
            error={errors[cell.row.original.ID]?.AgencyID}
            helperText={errors[cell.row.original.ID]?.AgencyID ? 'Agency is required' : ''}
          />
        )
      }
    ];

    return (
      <MaterialReactTable
        columns={columns}
        data={data}
        options={{
          search: false,
          paging: false,
        }}
      />
    );
  };

export default UserProfileAI;