import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box,Button } from '@mui/material';
import { userActions } from '_store';
import Download from '_components/Download';

const UserList = () => {
  const filename='Users';
  const users = useSelector(x => x.users.list);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const rows = users?.value;

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
      }
    ],
    []
  );

  const data = useMemo(() => {
    return rows ? rows : [];
  }, [rows]);

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  const handleEdit=(id)=>{
    navigate(`edit/${id}`);
  };

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableRowActions:true,
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button variant="contained" color="primary" onClick={()=>navigate('add')} >
            Add
          </Button>
        <Download rows={data} headers={columns} filename={filename} />
        
      </Box>
    ),    
      renderRowActions:({ row }) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="contained" color="primary" onClick={()=>handleEdit(row.original.id)} >
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => dispatch(userActions.delete(row.original.id))}>
            Delete
          </Button>
        </div>
      )}
  )

  return <MaterialReactTable table={table} />
}

export default UserList;
