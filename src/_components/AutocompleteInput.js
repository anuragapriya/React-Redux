
import React from 'react';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

const AutocompleteInput = ({ control, name, label, options, error, helperText, handleBlur, onFocus, inputColor }) => (
    <FormControl fullWidth margin="normal">
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    disablePortal
                    selectOnFocus
                    clearOnBlur
                    options={options}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value}
                    value={options.find(option => option.value === field.value) || null}
                    onChange={(e, newValue) => {
                        console.log('Selected Portal:', newValue);
                        field.onChange(newValue ? newValue.value : null);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name} // Ensure the name attribute is set
                            label={label}
                            error={!!error}
                            helperText={helperText}
                            onBlur={(e) => {
                                field.onBlur(e);
                                handleBlur(e);
                            }}
                            onFocus={onFocus}
                            className={inputColor}
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
                            }}
                        />
                    )}
                />
            )}
        />
    </FormControl>
);

export default AutocompleteInput;