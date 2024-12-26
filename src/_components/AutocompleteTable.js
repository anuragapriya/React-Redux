import React from 'react';
   import { Autocomplete, TextField } from '@mui/material';

   const AutocompleteTable = ({ value, onChange, options, error, helperText }) => {
     return (
       <Autocomplete
         value={value}
         onChange={(event, newValue) => onChange(newValue)}
         options={options}
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