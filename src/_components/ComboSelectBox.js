import React, { forwardRef } from 'react';
import { TextField, Autocomplete, FormControl } from '@mui/material';

const ComboSelectBox = forwardRef(({ value, boxLabel, options, handleChange, error, helperText }, ref) => {
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
                onChange={(e, newValue) => handleChange(newValue ? Number(newValue.value) : null)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={boxLabel}
                        ref={ref}
                        error={!!error}
                        helperText={helperText}
                    />
                )}
            />
        </FormControl>
    );
});

export default ComboSelectBox;