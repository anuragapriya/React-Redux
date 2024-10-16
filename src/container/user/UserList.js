import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { userActions } from '_store';
import AddEdit from './ManageProfile';
import { ErrorBoundary, Download } from '_components';
import { labels } from '_utils/constant';

const UserList = () => {
  const filename = 'Users';
  const users = useSelector((x) => x.users?.list);
  const dispatch = useDispatch();
  const rows = users?.value;

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [title, setTitle] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: 'userName',
        header: 'Name',
        enableSorting: true,
      },
      {
        accessorKey: 'companyName',
        header: 'Company Name',
        enableSorting: true,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true,
      },
    ],
    []
  );

  const data = useMemo(() => {
    return rows
      ? rows.map((user) => ({
        ...user,
        userName: `${user.firstName} ${user.lastName}`,
      }))
      : [];
  }, [rows]);

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  const handleAddEdit = (id) => {
    setSelectedRowId(id);
    setOpen(true);
    if (id) {
      setTitle(labels.manageProfileLabel);
    }
    else {
      setTitle(labels.signUpLabel);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRowId(null);
    dispatch(userActions.getAll());
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
    enableGlobalFilter: false,
    enableFullScreenToggle: false,
    enableColumnActions: false,
    paginationDisplayMode: 'pages',
    enableRowActions: true,
    initialState: {
      columnOrder: [
        'userName',
        'companyName',
        'email',
        'mrt-row-select', // move the built-in selection column to the end of the table
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
        {/* <Button variant="contained" color="primary" onClick={() => handleAddEdit(null)}>
          Add
        </Button> */}
      </Box>
    ),
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="contained" color="primary" onClick={() => handleAddEdit(row.original.id)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => dispatch(userActions.delete(row.original.id))}>
          Delete
        </Button>
      </div>
    ),
  });

  return (
    <ErrorBoundary>
      <MaterialReactTable table={table} />
      <AddEdit title={title} open={open} handleClose={handleClose} selectedrowId={selectedRowId} />
    </ErrorBoundary>
  );
};

export default UserList;