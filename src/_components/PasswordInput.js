import React, { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';
import ErrorIcon from '@mui/icons-material/Error';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ control, name, label, rules, errors, handleBlur, handleFocus, inputColors }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <FormControl variant="outlined" fullWidth margin="normal" error={!!errors[name]}>
                    <InputLabel htmlFor={name}>{label}</InputLabel>
                    <OutlinedInput
                        {...field}
                        id={name}
                        type={showPassword ? 'text' : 'password'}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        endAdornment={
                            <InputAdornment position="end">
                                {errors[name] && (
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
                        label={label}
                        className={inputColors[name]}
                    />
                    <FormHelperText>{errors[name]?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default PasswordInput;