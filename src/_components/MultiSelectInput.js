import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Autocomplete, InputAdornment} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import ErrorIcon from '@mui/icons-material/Error';
const MultiSelectInput = ({ options, onChange, label, error, helperText, handleBlur, name }) => {
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const handleChange = (event, value, reason) => {
    if (reason === 'clear') {
      setSelectedOptions([]);
      onChange([]);
      return;
    }
  
    if (reason === 'removeOption') {
      const removedValue = value.map(option => option.value);
      const filteredValue = selectedOptions.filter(option => removedValue.includes(option.value));
      setSelectedOptions(filteredValue);
      onChange(filteredValue);
      return;
    }
  
    const checkedValue = event.target.value;
    const isChecked = event.target.checked;
  
    if (checkedValue === 'Select All') {
      if (selectedOptions.length === options.length) {
        setSelectedOptions([]);
        onChange([]);
      } else {
        setSelectedOptions(options);
        onChange(options);
      }
    } else {
      let filteredValue;
      if (isChecked) {
        // Add the checked item to the selected options
        filteredValue = [...selectedOptions, options.find(option => option.value === checkedValue)];
      } else {
        // Remove the unchecked item from the selected options
        filteredValue = selectedOptions.filter(option => option.value !== checkedValue);
      }
  
      filteredValue = filteredValue.filter(option => option.value !== 'Select All');
      setSelectedOptions(filteredValue);
      onChange(filteredValue);
    }
  };

  const isOptionSelected = (option) => {
    return selectedOptions.some(selectedOption => selectedOption.value === option.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Autocomplete
        multiple
        options={[{ label: 'Select All', value: 'Select All' }, ...options]}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        filterOptions={createFilterOptions({ matchFrom: 'start' })}
        renderOption={(props, option) => {
          const isSelected = option.value === 'Select All' ? selectedOptions.length === options.length : isOptionSelected(option);
          return (
            <li {...props}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={isSelected}
                value={option.value} // Set the value here
              />
              {option.label}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={label} 
            placeholder="Search options" 
            error={!!error}
            helperText={helperText}
            onBlur={handleBlur}
            InputProps={{
              ...params.InputProps,
              name:name,
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
        renderTags={(value, getTagProps) => 
          value.length > 2 
            ? <Chip label={`${value.length} options selected`} />
            : value.map((option, index) => (
                <Chip label={option.label} {...getTagProps({ index })} />
              ))
        }
        value={selectedOptions}
        onChange={handleChange}
        name={name}
      />
    </Box>
  );
}

export default MultiSelectInput;