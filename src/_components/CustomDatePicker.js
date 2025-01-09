import React from 'react';
   import { Controller } from 'react-hook-form';
   import { DatePicker } from '@mui/x-date-pickers/DatePicker';
   import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
   import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
   import { FormControl, TextField, InputAdornment } from '@mui/material';
   import ErrorIcon from '@mui/icons-material/Error';

   const CustomDatePicker = ({ control, name, label, error, helperText, handleBlur }) => {
     return (
       <FormControl fullWidth margin="normal">
         <LocalizationProvider dateAdapter={AdapterDayjs}>
           <Controller
             name={name}
             control={control}
             render={({ field }) => (
               <DatePicker
                 {...field}
                 name={name}
                 label={label}
                 value={field.value || null}
                 onChange={(newValue) => field.onChange(newValue)}
                //  renderInput={(params) => (
                //    <TextField
                //      {...params}
                //      name={name}
                //      error={!!error}
                //      helperText={helperText}
                //      onBlur={(e) => {
                //        field.onBlur(e);
                //        if (handleBlur) {
                //          handleBlur(e);
                //        }
                //      }}
                //      InputProps={{
                //        ...params.InputProps,
                //        endAdornment: (
                //          <>
                //            {params.InputProps.endAdornment}
                //            {error && (
                //              <InputAdornment position="end">
                //                <ErrorIcon style={{ color: 'red' }} />
                //              </InputAdornment>
                //            )}
                //          </>
                //        ),
                //      }}
                //    />
                //  )}
               />
             )}
           />
         </LocalizationProvider>
       </FormControl>
     );
   };

   export default CustomDatePicker;