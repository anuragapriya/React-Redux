import React, { useState } from 'react';
import {FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText,IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ErrorIcon from '@mui/icons-material/Error'; // Import an error icon from Material-UI

const PasswordField = ({ register, error, helperText, onFocus, onBlur, inputColors, isPasswordFocused }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <>
            <FormControl variant="outlined" fullWidth margin="normal" error={!!error}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    endAdornment={
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
                    }
                    label="Password"
                    className={inputColors['password']}
                />
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </>
    );
};

export default PasswordField;