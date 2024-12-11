import React, { useState, forwardRef } from 'react';
import { TextField, Autocomplete, FormControl, InputAdornment } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error'; // Import an error icon from Material-UI

const ComboSelectBox = forwardRef(({ value, boxLabel, options, handleChange, error, helperText, onBlur, onFocus }, ref) => {
    const [inputColor, setInputColor] = useState('');

    // const handleBlur = (e) => {
    //     onBlur(e); // Call the parent onBlur function
    //     setInputColor(!error && e.target.value ? 'inputBackground' : '');
    // };

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
                        onBlur={onBlur}
                        onFocus={onFocus}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                    {error && (
                                        <InputAdornment position="end">
                                            <ErrorIcon style={{ color: 'red' }} />
                                        </InputAdornment>
                                    )}
                                </>
                            ),
                            style: { backgroundColor: inputColor } // Apply the background color
                        }}
                    />
                )}
            />
        </FormControl>
    );
});

export default ComboSelectBox;