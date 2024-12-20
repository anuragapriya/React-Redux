import React from 'react';
import { FormControl, TextField, InputAdornment,Autocomplete, Checkbox, ListItemText } from '@mui/material';
import { Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const MultiSelectAutocomplete = ({ control, name,value, label, options, error, helperText, handleBlur, onFocus, inputColor,onChange }) => (
    <FormControl fullWidth margin="normal"  className={inputColor}>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                multiple
                    disablePortal
                    selectOnFocus
                    clearOnBlur
                    options={options}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    value={ value }
                    
                    // value={ options?.find(option => option.value === field.value. || value) || null}
                    onChange={(event, newValue) => onChange(newValue)}
                    disableCloseOnSelect
                    renderOption={(props, option, state) => (
                        <li {...props}>
                          <Checkbox
                          icon={icon}
                            checked={state.selected}
                            checkedIcon={checkedIcon}
                            value={option.value}
                         
                          />
                          <ListItemText primary={option.label} />
                        </li>
                      )}
                    renderInput={(props) => <TextField {...props} 
                    label={label}
                    name={name} 
                    error={!!error}
                    helperText={helperText}
                    onBlur={(e) => {
                        field.onBlur(e);
                        handleBlur(e);
                    }}
                    onFocus={onFocus}
                    InputProps={{
                        ...props.InputProps,
                        endAdornment: (
                            <>
                                {props.InputProps.endAdornment}
                                {error && (
                                    <InputAdornment position="end">
                                        <ErrorIcon style={{ color: 'red' }} />
                                    </InputAdornment>
                                )}
                            </>
                        ),
                    }}
                    />}
                    
                />
            )}
        />
    </FormControl>
);

export default MultiSelectAutocomplete;