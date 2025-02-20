import { FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
const CustomFormControl = ({ id,disable, label, type, register, errors, handleBlur, handleFocus }) => {
    const handleKeyDown = (e) => {
        if (type === 'number' && (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
    };
 return ( <FormControl  id={id} variant="outlined" fullWidth margin="normal"  error={!!errors[id]}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <OutlinedInput
            id={id}
            type={type}
            {...register(id, { required: `${label} is required` })}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={disable || false}
            endAdornment={
                errors[id] ? (
                    <InputAdornment position="end">
                        <ErrorIcon style={{ color: 'red' }} />
                    </InputAdornment>
                ) : null
            }
            label={label}           
        />
        <FormHelperText>{errors[id]?.message}</FormHelperText>
    </FormControl>

        )}

export default CustomFormControl;