import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error'; // Import an error icon from Material-UI

const PasswordField = ({ register,trigger, error, helperText, onFocus, onBlur, isPasswordFocused }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputColor, setInputColor] = useState('');

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleBlur = (e) => {
        onBlur(e); // Call the parent onBlur function
        setInputColor(!error && e.target.value ? 'inputBackground' : '');
    };

    return (
        <TextField
            {...register('password')}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={helperText}
            onFocus={onFocus}
            onBlur={(e) => {
                handleBlur(e);
                trigger('password');
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {error && (
                            <ErrorIcon style={{ color: 'red' }} />
                        )}
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
                style: { backgroundColor: inputColor } // Apply the background color
            }}
        />
    );
};

export default PasswordField;