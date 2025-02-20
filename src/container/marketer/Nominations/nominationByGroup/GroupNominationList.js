import React, { useState, useCallback,useRef } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import dayjs from 'dayjs';
import { TextField, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const GroupNominationList = ({ data, fromDate,toDate }) => {
   const tableContainerRef = useRef(null);
  
    const handleChange = useCallback((value, rowIndex, columnId) => {
      setTableData(prevData => {
        const newData = [...prevData];
        newData[rowIndex][columnId] = value;
        return newData;
      });
    }, []);
  
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
      if (!data || !data.Data || !data.Data.NominationData || !data.Data.NominationData.ContractData) {
        return { transformed: [], columns: [] };
      }
  
      const transformed = [];
      const dateRange = generateDateRange(fromDate, toDate);
  
      data.Data.NominationData.ContractData.forEach(contract => {
        const row = { ContractName: contract.ContractName };
        dateRange.forEach(date => {
          row[date] = ''; // Initialize with empty string
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
        { header: 'Contract Name', accessorKey: 'ContractName', id: 'ContractName' },
        {
          header: () => (
            <IconButton onClick={scrollLeft}>
              <ArrowBack />
            </IconButton>
          ),
          id: 'scrollLeft',
          accessorKey: 'scrollLeft',
          disableSortBy: true,
          disableFilters: true,
        },
        ...dateRange.map(date => ({
          accessorKey: date,
          header: date,
          id: date,
          Cell: ({ cell, row }) => (
            <TextField
              className='ServiceProvider'
              value={cell.getValue() || ''}
              onChange={(e) => handleChange(e.target.value, row.index, cell.column.id)}
            />
          ),
        })),
        {
          header: () => (
            <IconButton onClick={scrollRight}>
              <ArrowForward />
            </IconButton>
          ),
          id: 'scrollRight',
          accessorKey: 'scrollRight',
          disableSortBy: true,
          disableFilters: true,
        },
      ];
  
      return { transformed, columns };
    };
  
    const { transformed, columns } = transformData(data);
    const [tableData, setTableData] = useState(transformed);
  
    const scrollLeft = () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      }
    };
  
    const scrollRight = () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };
    const table = useMaterialReactTable({
        columns,
        data:tableData,
        enableHiding: false,
        enableSorting:false,
        enableColumnFilters:false,
        columnFilterDisplayMode: 'popover',
        enableFullScreenToggle: false,
        enableColumnActions: false,
        paginationDisplayMode: 'pages',
        positionExpandColumn: 'first',
        positionActionsColumn: "last",
        positionToolbarAlertBanner: 'none',
    });
  
    return (
      <div style={{ overflowX: 'auto' }} ref={tableContainerRef}>
        <MaterialReactTable table={table} />
      </div>
    );
  };
  
  export default GroupNominationList;
  