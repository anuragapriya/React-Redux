import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const MultiSelectInput = ({ options, onChange, label, error, helperText, handleBlur }) => {

  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (event, value, reason) => {
    if (reason === 'selectOption' && value[value.length - 1]?.value === 'Select All') {
      if (selectedOptions.length === options.length) {
        setSelectedOptions([]);
        onChange([]);
      } else {
        setSelectedOptions(options);
        onChange(options);
      }
    } else {
      const filteredValue = value.filter(option => option.value !== 'Select All');
      setSelectedOptions(filteredValue);
      onChange(filteredValue);
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Autocomplete
        multiple
        options={[{ label: 'Select All', value: 'Select All' }, ...options]}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}
        filterOptions={createFilterOptions({ matchFrom: 'start' })}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={option.value === 'Select All' ? selectedOptions.length === options.length : selected}
            />
            {option.label}
          </li>
        )}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label={label} 
            placeholder="Search options" 
            error={error}
            helperText={helperText}
            onBlur={handleBlur}
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
      />
    </Box>
  );
}

export default MultiSelectInput;