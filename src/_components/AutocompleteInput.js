import React from 'react';
import { FormControl, TextField, InputAdornment, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';

const AutocompleteInput = ({ control, name, value, label, options, error, helperText, handleBlur, onFocus, onChange }) => (
   <FormControl fullWidth margin="normal">
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    name={name}
                    disablePortal
                    selectOnFocus
                    clearOnBlur
                    options={options}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value}
                    value={options?.find(option => option.value === field.value || value) || null}
                    onChange={(e, newValue) => {
                        field.onChange(newValue ? newValue.value : null);
                        if (onChange) onChange(e, newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name}
                            label={label}
                            error={!!error}
                            helperText={helperText}
                            onBlur={(e) => {
                                field.onBlur(e);
                                if (handleBlur) handleBlur(e);
                            }}
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
                            }}
                        />
                    )}
                />
            )}
        />
    </FormControl>
);

export default AutocompleteInput;