import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import InterruptibleList from './InterruptibleList';
import dayjs from 'dayjs';
import { getByInterruptible } from '_utils/constant';

const Interruptible = () => {
  const [data, setData] = useState([]);
  const [editedRowId, setEditedRowId] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
   setData(getByInterruptible.Data);
}, [setData]);

  const handleChange = (newValue, rowData, field) => {
    setEditedRowId((prev) => {
      const updatedRows = { ...prev };
      if (!updatedRows[rowData.ID]) {
        updatedRows[rowData.ID] = { ...rowData };
      }
      updatedRows[rowData.ID][field] = newValue;
      return updatedRows;
    });
    const newData = data.map(row => row.ID === rowData.ID ? { ...row, [field]: newValue } : row);
    setData(newData);
    setIsDataChanged(true);
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Data saved:', data);
  };

  return (
    <div>
      <InterruptibleList data={data} setData={setData} handleChange={handleChange} />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default Interruptible;