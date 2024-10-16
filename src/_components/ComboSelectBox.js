import React, { forwardRef } from 'react';
import { TextField, Autocomplete, FormControl } from '@mui/material';

const ComboSelectBox = forwardRef(({ value, boxLabel, options, handleChange }, ref) => {
    return (
        <FormControl fullWidth margin="normal">
            <Autocomplete
                disablePortal
                selectOnFocus
                clearOnBlur
                id="combo-box-demo"
                options={options}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                value={options.find(option => option.value === value) || null}
                onChange={(e, newValue) => handleChange(newValue ? newValue.value : null)}
                renderInput={(params) => <TextField {...params} label={boxLabel} ref={ref} />}
            />
        </FormControl>
    );
});

export default ComboSelectBox;
