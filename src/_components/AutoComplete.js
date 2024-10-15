import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

const ComboSelectBox = ({boxLabel, options, handleChange }) => {
    const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
      ];
    const [value, setValue] = useState(null);

    const handleSelectChange = (newValue) => {
        setValue(newValue);
        handleChange(newValue);
    };

    const inputRenderer = (params) => <TextField {...params} label={boxLabel} />;
    return (
        <Autocomplete
            disablePortal
            selectOnFocus
            clearOnBlur
            id="combo-box-demo"
            options={options}
            sx={{ width: 300 }}
            value={value}
            onChange={handleSelectChange}
            renderInput={inputRenderer}
        />
    );
}

export default ComboSelectBox;