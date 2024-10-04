import React from "react";
import PasswordChecklist from "react-password-checklist";
import { Box, Typography } from '@mui/material';

const PasswordCheck = (props) => {
    const { password, confirmPassword } = props;

    // Ensure the password is a string
    const isPasswordValid = typeof password === "string";
    const isConfirmPasswordValid = typeof confirmPassword === "string";

    const isLengthValid = (password) => {
        if (!password) return false; 
        return password.length >= 8 && password.length <= 16;
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
            <Typography variant="h6">Your password must contain:</Typography>
            <PasswordChecklist
                rules={["specialChar", "number", "capital", "match", "lowercase", "minAndmaxLength"]}
                value={isPasswordValid ? password : ""}
                valueAgain={isConfirmPasswordValid ? confirmPassword : ""}
                minLength={8}
                maxLength={16} 
                minAndmaxLength={isLengthValid(password)}
                specialCharsRegex={/[~`!@#$%^&*()_+\-={};':"<>?,./|]/}
                messages={{
                    minAndmaxLength: "8-16 characters.",
                    lowercase: "Lower case letter (a-z).",
                    capital: "Upper case letter (A-Z).",
                    number: "Number (0-9)",
                    specialChar: "Special character (!@#$%^&*<>?/:;+-)",
                    match: "Password does not match with Confirm Password",
                }}
            />
        </Box>
    );
};

export default PasswordCheck;
