import React, { useState, useEffect, useRef } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { Lock, LockOpen, Sync, FilterListOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box, Typography, Tooltip, TextField } from '@mui/material';
import { Delete, Deletewhite } from 'images';
import { ModalPopup } from '_components';
import { alertActions } from '_store';
import { useDispatch } from 'react-redux';

const PipelineNominationList = ({ data, fromDate, toDate, selectedRows, setSelectedRows,
  handleChange, handleDelete, handleRefresh, handleToggleActiveStatus, isModalOpen, setIsModalOpen }) => {
  const tableContainerRef = useRef(null);
  const dispatch = useDispatch();
  const header ="Nomination By Pipeline";
  const generateDateRange = (start, end) => {
    const dates = [];
    let currentDate = dayjs(start);
    const endDate = dayjs(end);

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
      dates.push(currentDate.format('DD/MM'));
      currentDate = currentDate.add(1, 'day');
    }
    return dates;
  };

  const transformData = (data) => {
    if (!data || !data.NominationData || !data.NominationData.ContractData) {
      return { transformed: [], columns: [] };
    }

    const transformed = [];
    const dateRange = generateDateRange(fromDate, toDate);

    data.NominationData.ContractData.forEach(contract => {
      const row = { ContractID: contract.ContractID };
      dateRange.forEach(date => {
        row[date] = 0; // Initialize with empty string
      });
      contract.ContractDetails.forEach(detail => {
        const date = dayjs(detail.ContractDate).format('DD/MM');
        if (row.hasOwnProperty(date)) {
          row[date] = detail.ContractValue;
        }
      });
      transformed.push(row);
    });

    const columns = [
      { header: 'Contract#', accessorKey: 'ContractID', id: 'ContractID' },
      ...dateRange.map(date => ({
        accessorKey: date,
        header: date,
        id: date,
        Cell: ({ cell, row }) => (
          <TextField
            className='ServiceProvider'
            value={cell.getValue() || ''}
            onChange={(e) => handleChange(e.target.value, row.original, cell.column.id)}
          />
        ),
      }))
    ];

    return { transformed, columns };
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRowDelete = async (row) => {
    dispatch(alertActions.clear());
    await handleDelete(row);
    setIsModalOpen(false);   
  };

  const { transformed, columns } = transformData(data);
  const [tableData, setTableData] = useState(transformed);

  useEffect(() => {
    setTableData(transformed);
  }, [data]);

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableHiding: false,
    enableSorting: false,
    enableColumnFilters: false,
    columnFilterDisplayMode: 'popover',
    enableFullScreenToggle: false,
    enableColumnActions: false,
    paginationDisplayMode: 'pages',
    enableRowActions: true,
    enableRowSelection: true,
    positionExpandColumn: 'first',
    positionActionsColumn: 'last',
    positionToolbarAlertBanner: 'none',
    layoutMode: 'grid-no-grow',
    initialState: {
      columnPinning: { left: ['mrt-row-select', 'ContractID'], right: ['mrt-row-actions'] },
    },
    onRowSelectionChange: ({ selectedRowModel }) => {
      setSelectedRows(selectedRowModel.rows.map(row => row.original));
    },
    renderRowActions: ({ row }) => (
      <div style={{ display: 'flex', gap: '0.5rem' }} className='tableicons'>
        <IconButton className='delete' >
          <img src={Delete} alt="Delete" onClick={handleOpenModal}></img>
        </IconButton>
        {isModalOpen && <ModalPopup
          header={header}
          message1="Are you sure you want to delete this contract?"
          btnPrimaryText="Confirm"
          btnSecondaryText="Cancel"
          handlePrimaryClick={() => handleRowDelete(row.original)}
          handleSecondaryClick={() => handleCloseModal()}
        />
        }
      </div>
    ),
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Tooltip title="Refresh" className='Deactivate'>
          <div>
            <IconButton onClick={handleRefresh} >
              <FilterListOff variant="contained" color="secondary" />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Delete Selected" className='DeleteSelected'>
          <div>
            <IconButton onClick={handleToggleActiveStatus} disabled={selectedRows?.length === 0}>
              <img src={Deletewhite} alt="Delete"  ></img>
            </IconButton>
          </div>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <div style={{ overflowX: 'auto' }} ref={tableContainerRef}>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default PipelineNominationList;