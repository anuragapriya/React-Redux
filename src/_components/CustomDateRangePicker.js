import React from "react";
import { Controller } from 'react-hook-form';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { FormControl, TextField, InputAdornment, IconButton, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles } from "@material-ui/core/styles";
import dayjs from 'dayjs';

const useStyles = makeStyles({
  disabledDate: {
    color: '#d3d3d3', // Grey color for disabled dates
    pointerEvents: 'none', // Disable click events
  },
});

const CustomDateRangePicker = ({
  control,
  trigger,
  name,
  minimumDate = new Date(), // Default to current date if not provided
  label,
  error,
  helperText,
  handleBlur
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = (event) => {
    event.stopPropagation(); // Prevent click propagation issues
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = () => setOpen(false);

  const parseDate = (date) => (date ? new Date(date) : null);

  const formatValue = (value) => {
    if (value[0] && value[1]) {
      return `${dayjs(value[0]).format('MM/DD/YYYY')} - ${dayjs(value[1]).format('MM/DD/YYYY')}`;
    }
    return '';
  };

  return (
    <FormControl fullWidth margin="normal" style={{ position: 'relative' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <TextField
                label={label}
                onClick={handleOpen}
                variant="outlined"
                value={formatValue(field.value)}
                onBlur={(e) => {
                  if (handleBlur) {
                    handleBlur(e);
                  }
                }}
                helperText={helperText}
                error={!!error}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="end">
                        <IconButton onClick={handleOpen}>
                          <CalendarTodayIcon />
                        </IconButton>
                      </InputAdornment>
                      {error && (
                        <InputAdornment position="relative">
                          <ErrorIcon style={{ color: 'red' }} />
                        </InputAdornment>
                      )}
                    </>
                  ),
                }}
              />
              {open && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1,
                    mt: 1,
                    boxShadow: 3,
                    borderRadius: 1,
                    backgroundColor: 'white',
                  }}
                >
                  <DateRangePicker
                    calendars={1}
                    value={field.value || [null, null]}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                      trigger(name);
                      handleClose();
                    }}
                    minDate={minimumDate}
                    renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                      const isDisabled = day < minimumDate;
                      return React.cloneElement(dayComponent, {
                        className: isDisabled ? classes.disabledDate : '',
                      });
                    }}
                  />
                </Box>
              )}
            </>
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

export default CustomDateRangePicker;