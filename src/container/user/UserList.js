import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { userActions } from '_store';
import Download from '_components/Download';
import AddEdit from './AddEdit'; // Import the modal component

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const UserList = () => {
  const filename = 'Users';
  const users = useSelector((x) => x.users.list);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rows = users?.value;

  const [open, setOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

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
    return rows ? rows : [];
  }, [rows]);

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  const handleAddEdit = (id) => {
    console.log(id);
    setSelectedRowId(id);
    setOpen(true);
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
        <Button variant="contained" color="primary" onClick={()=>handleAddEdit(null)}>
          Add
        </Button>
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
      <AddEdit open={open} handleClose={handleClose} selectedrowId={selectedRowId} />
    </ErrorBoundary>
  );
};

export default UserList;
