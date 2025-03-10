import React, { useMemo } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

const InterruptibleList = ({ data, handleChange }) => {
  const handleInputChange = (group, value) => {
    handleChange(group, value);
  };

  const columns = useMemo(() => [
    { accessorKey: 'AllocationGroup', header: 'GROUP', enableColumnFilter: false },
    { accessorKey: 'PreviousBalanceInterruptible', header: 'IMBALANCE - FOM', enableColumnFilter: false },
    { accessorKey: 'TotalNominationAllocations', header: 'NOMINATIONS', enableColumnFilter: false },
    { accessorKey: 'TotalUsage', header: 'USAGE', enableColumnFilter: false },
    {accessorKey: "ImbalanceAdjustedVolume",
      header: "ADJUSTMENT",
      Cell: ({ row }) => (
        <Box>
          <TextField
            variant="standard"
            value={row.original.ImbalanceAdjustedVolume || ''}
            onChange={(e) =>
              handleInputChange(row, e.target.value)
            }
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
      ),
    },
    { accessorKey: 'DailyRequiredVolume', header: 'DRV', enableColumnFilter: false },
    { accessorKey: 'MonthEndImbalanceInterruptible', header: 'IMBALANCE - EOM', enableColumnFilter: false },
    { accessorKey: 'ThresholdValue', header: '±15% TOLERANCE', enableColumnFilter: false },
    { accessorKey: 'OutsideThresholdAmount', header: '>15% TOLERANCE', enableColumnFilter: false },
  ], []);

  const groupedData = useMemo(() => {
    const marketers = {};
    data?.InterruptibleData?.forEach(item => {
      if (!marketers[item.CompanyID]) {
        marketers[item.CompanyID] = {
          CompanyName: item.CompanyName,
          groups: []
        };
      }
      marketers[item.CompanyID].groups.push(item);
    });
    return Object.values(marketers);
  }, [data]);

  return (
    <div>
      <TableContainer sx={{ maxHeight: '400px' }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.accessorKey}
                  sx={{
                    fontWeight: "bold",
                    color: "#0B254B",
                    textAlign: "left",
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedData.map((marketer, marketerIndex) => (
              <React.Fragment key={marketerIndex}>
                <TableRow key={`marketer-${marketerIndex}`}>
                  <TableCell colSpan={columns.length} variant="head" sx={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
                    {marketer.CompanyName}
                  </TableCell>
                </TableRow>
                {marketer.groups.map((group, groupIndex) => (
                  <TableRow key={groupIndex}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.accessorKey}
                        sx={{ borderBottom: "none" }}
                      >
                        {column.accessorKey === "ImbalanceAdjustedVolume" ? (
                          <TextField
                            variant="standard"
                            value={group[column.accessorKey] || ''}
                            onChange={(e) =>
                              handleInputChange(group, e.target.value)
                            }
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        ) : (
                          group[column.accessorKey]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


export default InterruptibleList;