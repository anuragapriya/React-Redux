import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { userActions } from '_store';
import Download from '_components/Download';

const UserList = () => {
  const filename='Users';
  const users = useSelector(x => x.users.list);
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

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [dispatch]);

  const data = useMemo(() => {
    return rows ? rows.map(({ email, companyName, userName }) => ({
      userName,
      companyName,
      email
    })) : [];
  }, [rows]);

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
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
    )
  });

  return <MaterialReactTable table={table} />
}

export default UserList;
