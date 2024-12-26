import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteTable = ({ value, onChange, options, getOptionLabel, error, helperText }) => {
  console.log('AutocompleteTable value:', value);
  console.log('AutocompleteTable options:', options);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => onChange(newValue)}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default AutocompleteTable;