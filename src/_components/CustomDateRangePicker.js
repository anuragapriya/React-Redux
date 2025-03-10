
// import React from "react";
// import { Controller } from 'react-hook-form';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { FormControl, TextField, InputAdornment, IconButton, Dialog, DialogContent } from '@mui/material';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import { makeStyles } from "@material-ui/core/styles";
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';

// dayjs.extend(customParseFormat);

// const useStyles = makeStyles({
//   disabledDate: {
//     color: '#d3d3d3', // Grey color for disabled dates
//     pointerEvents: 'none', // Disable click events
//   },
// });

// const CustomDateRangePicker = ({
//   control,
//   trigger,
//   name,
//   minimumDate = new Date(), // Default to current date if not provided
//   label,
//   error,
//   helperText,
//   handleBlur
// }) => {
//   const [open, setOpen] = React.useState(false);
//   const classes = useStyles();

//   const handleOpen = (event) => {
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const parseDate = (date) => (date ? dayjs(date) : null);

//   const formatValue = (value) => {
//     if (value[0] && value[1]) {
//       return `${dayjs(value[0]).format('MM/DD/YYYY')} - ${dayjs(value[1]).format('MM/DD/YYYY')}`;
//     }
//     return '';
//   };

//   return (
//     <FormControl fullWidth margin="normal">
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <Controller
//           name={name}
//           control={control}
//           render={({ field }) => (
//             <>
//               <TextField
//                 label={label}
//                 value={formatValue(field.value || [null, null])}
//                 onClick={handleOpen}
//                 onBlur={handleBlur}
//                 error={!!error}
//                 helperText={helperText}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleOpen}>
//                         <CalendarTodayIcon />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Dialog open={open} onClose={handleClose}>
//                 <DialogContent>
//                   <DateRangePicker
//                     calendars={1}
//                     value={field.value || [null, null]}
//                     onChange={(newValue) => {
//                       field.onChange(newValue);
//                       trigger(name);
//                       handleClose();
//                     }}
//                     minDate={parseDate(minimumDate)}
//                     renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
//                       const isDisabled = day.isBefore(parseDate(minimumDate));
//                       return React.cloneElement(dayComponent, {
//                         className: isDisabled ? classes.disabledDate : '',
//                       });
//                     }}
//                     renderInput={(startProps, endProps) => (
//                       <>
//                         <TextField {...startProps} style={{ display: 'none' }} />
//                         <TextField {...endProps} style={{ display: 'none' }} />
//                       </>
//                     )}
//                   />
//                 </DialogContent>
//               </Dialog>
//             </>
//           )}
//         />
//       </LocalizationProvider>
//     </FormControl>
//   );
// };

// export default CustomDateRangePicker;
