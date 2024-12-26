import React from 'react';
import {MaterialReactTable} from 'material-react-table';
import { AutocompleteTable } from '_components';

const UserProfileAI = ({ data, setData, errors, setErrors, editedRowId, setEditedRowId, handleChange }) => {
  const roles = [{RoleId:'1',RoleName:'Admin'},{RoleId:'2',RoleName:'Contributor'}];
  const statuses = [{StatusId:'1',StatusName:'Submitted'},{StatusId:'2',StatusName:'Approved'}];
  const agencies = [{AgencyId:'1',AgencyName:'Agency1'},{AgencyId:'2',AgencyName:'Agency2'}];

  const columns = [
    { accessorKey: 'FullName', header: 'Name' },
    {
      accessorKey: 'role',
      header: 'Role',
      Cell: ({ cell }) => (
        <AutocompleteTable
          value={cell.getValue()}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue, cell.row.original, 'role');
          }}
          options={roles}
          getOptionLabel={(option) => option.RoleName}
          error={errors[cell.row.original.id]?.role}
          helperText={errors[cell.row.original.id]?.role ? 'Role is required' : ''}
        />
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell }) => (
        <AutocompleteTable
          value={cell.getValue()}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue, cell.row.original, 'status');
          }}
          options={statuses}
          getOptionLabel={(option) => option.StatusName}
          error={errors[cell.row.original.id]?.status}
          helperText={errors[cell.row.original.id]?.status ? 'Status is required' : ''}
        />
      )
    },
    {
      accessorKey: 'agency',
      header: 'Agency',
      Cell: ({ cell }) => (
        <AutocompleteTable
          value={cell.getValue()}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue, cell.row.original, 'agency');
          }}
          options={agencies}
          getOptionLabel={(option) => option.AgencyName}
          error={errors[cell.row.original.id]?.agency}
          helperText={errors[cell.row.original.id]?.agency ? 'Agency is required' : ''}
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