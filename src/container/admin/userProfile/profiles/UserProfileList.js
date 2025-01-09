
import React, { useState, useMemo, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Visibility, DeleteForever, Lock, LockOpen, Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
import { AutocompleteTable, Download , AutocompleteTableInput} from '_components';
import {  UserFilter } from "container/admin";
import UserProfileDetails from './UserProfileDetails';
import Delete from '@mui/icons-material/Delete';

const UserProfileList = ({ data,userProfiles, setData, errors, handleFilterSubmit, setEditedRowId, handleChange }) => {
  const roles = userProfiles?.Roles?.map(role => ({ value: role.RoleID, label: role.RoleName })) || [];
  const statuses = userProfiles?.Statuses?.map(status => ({ value: status.StatusID, label: status.StatusName })) || [];
  const agencies = userProfiles?.Agency?.map(agency => ({ value: agency.AgencyId, label: agency.AgencyName })) || [];
  const jurisdictions=userProfiles?.Jurisdictions?.map(jurisdiction => ({ value: jurisdiction.JurisdictionID, label: jurisdiction.JurisdictionName })) || [];
  const marketers=userProfiles?.Marketers?.map(marketer => ({ value: marketer.MarketerID, label: marketer.MarketerName })) || [];


  const [isLocked, setLock] = useState(false);
  const [Portal, setPortal] = useState({});
  const handleportal = (data) => {
    setPortal(data); // Update state with data from child
    //console.log('portalId',PortalId);
  };
  useEffect(() => {
     console.log('PortalId',Portal);
  },[Portal])
  const filename = 'Users';
  console.log('data',data);
console.log('role'.marketers)
  const columns = useMemo(() => {
    const baseColumns = [{ accessorKey: 'FirstName', header: 'Name' },
    {
      accessorKey: 'RoleID',
      header: 'Role',
      Cell: ({ cell }) => {
        const roleID = cell.getValue(); // Get RoleID from the data
    const selectedRole = roles.find((role) => role.value === roleID) || null; // Find the matching role object
    return(
        <AutocompleteTable
          value={selectedRole?.value}
          onChange={(newValue) => {
            setEditedRowId(cell.row.original.id);
            handleChange(newValue?.value, cell.row.original, 'RoleID');
          }}
          options={roles}
          error={errors[cell.row.original.id]?.RoleID}
          helperText={errors[cell.row.original.id]?.RoleID ? 'Role is required' : ''}
        />
    )
        }
    },
    {
      accessorKey: 'Status',
      header: 'Status',
      Cell: ({ cell }) => (
        
        <AutocompleteTableInput
        value={cell.getValue()}
        onChange={(newValue) => {
          setEditedRowId(cell.row.original.id);
          handleChange(newValue, cell.row.original, 'Status');
        }}
        mapping={statuses} 
        error={errors[cell.row.original.id]?.StatusID}
        helperText={errors[cell.row.original.id]?.StatusID ? 'Status is required' : ''}
      />
        
      )
    }];
    if (Portal?.PortalId === 1) {
      baseColumns.push({
      accessorKey: 'AgencyID',
      header: 'Agency',
      Cell: ({ cell }) => {
        const agencyID = cell.getValue(); 
        const selectedAgency = roles.find((role) => role.value === agencyID) || null; 
        return(
        <AutocompleteTable
        value={selectedAgency?.value}
        onChange={(newValue) => {
          setEditedRowId(cell.row.original.id);
          handleChange(newValue?.value, cell.row.original, 'AgencyID');
        }}
        options={agencies}
        error={errors[cell.row.original.id]?.AgencyID}
        helperText={errors[cell.row.original.id]?.AgencyID ? 'Agency is required' : ''}
      />
      )
      }
    })
  }
    if (Portal?.PortalId === 2) {
      baseColumns.push({
      accessorKey: 'JurisdictionID',
      header: 'Jurisdiction',
      Cell: ({ cell }) => (
        <AutocompleteTable
        value={cell.getValue()}
        onChange={(newValue) => {
          setEditedRowId(cell.row.original.id);
          handleChange(newValue, cell.row.original, 'JurisdictionID');
        }}
        options={jurisdictions}
        error={errors[cell.row.original.id]?.JurisdictionID}
        helperText={errors[cell.row.original.id]?.JurisdictionID ? 'Jurisdiction is required' : ''}
      />
      )
    },{
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
    })
  } 
  if (Portal?.PortalId === 4) {
    baseColumns.push({
    accessorKey: 'MarketerID',
    header: 'Marketer',
    Cell: ({ cell }) => (
      <AutocompleteTable
      value={cell.getValue()}
      onChange={(newValue) => {
        setEditedRowId(cell.row.original.UserId);
        handleChange(newValue?.value, cell.row.original, 'MarketerID');
      }}
      options={marketers}
      error={errors[cell.row.original.id]?.MarketerID}
      helperText={errors[cell.row.original.id]?.MarketerID ? 'Marketer is required' : ''}
    />
    )
  })
}
  return baseColumns;
}, [errors, handleChange, roles, statuses, agencies, setEditedRowId]);

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
    enableRowSelection:true,
    positionExpandColumn: 'first',
    positionActionsColumn:"last",
    initialState: {
      columnOrder: [
        'mrt-row-expand',
        'mrt-row-select',
        'FirstName',
        'RoleID',
        'AgencyID',
        'JurisdictionID',
        "MarketerID",
        'Status',
        'mrt-row-actions' // Ensure this is included at the end
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
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex', gap: '0.5rem' }} className='tableicons'>
        <IconButton onClick={() => handleAddEdit(row)}>
          <Edit variant="contained" color="primary" />
        </IconButton>
        <IconButton onClick={handleLock}>
          {isLocked ? <Lock /> : <LockOpen />}
        </IconButton>
        <IconButton>
        <Delete variant="contained" color="secondary" />
        </IconButton>
      </div>
    ),
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: 2 }}>
        {/* <Typography variant="h6">Details for {row.original.FullName}</Typography> */}
        <UserProfileDetails userData={row.original}/>
      </Box>
    ),
    muiExpandButtonProps: {
        sx: {
          display: 'none',
        },
      },
  });

  return (
    <>
     <Typography variant="h6">User Profile - {data?.PortalName}</Typography> 
        <Download rows={data} headers={columns} filename={filename} />
         <UserFilter  handleFilterSubmit={handleFilterSubmit} statuses={statuses} handleportal={handleportal}/>
         <MaterialReactTable table={table} />
    </>    
  );
};

export default UserProfileList;