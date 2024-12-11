import React, { useEffect, useState } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const PasswordCheck = ({ password, confirmPassword }) => {

    // Ensure the password is a string
    const isPasswordValid = typeof password === "string";
    const isConfirmPasswordValid = typeof confirmPassword === "string";

    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        //  match: false,
    });

    useEffect(() => {
        validatePassword(password, confirmPassword);
    }, [password, confirmPassword]);

    const validatePassword = (password, confirmPassword) => {
        setValidations({
            length: password.length >= 8 && password.length <= 16,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>']/.test(password),
            // match: password && password === confirmPassword,
        });
    };
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div className="passwordselect">
            <p>Your password must contain</p>
            <ul>
                <li style={{ color: validations.length ? 'green' : 'red' }}>
                    <Checkbox {...label} checked={validations.length} color="success" /> At least 8 Characters
                </li>
                <li style={{ color: validations.uppercase ? 'green' : 'red' }}>
                    <Checkbox {...label} checked={validations.uppercase} color="success" /> Upper case letter (A-Z).
                </li>
                <li style={{ color: validations.lowercase ? 'green' : 'red' }}>
                    <Checkbox {...label} checked={validations.lowercase} color="success" /> Lower case letters (a-z)
                </li>
                <li style={{ color: validations.number ? 'green' : 'red' }}>
                    <Checkbox {...label} checked={validations.number} color="success" /> Numbers (0-9)
                </li>
                <li style={{ color: validations.special ? 'green' : 'red' }}>
                    <Checkbox {...label} checked={validations.special} color="success" />Symbols (!@#$%^&*?/\|"':;+)
                </li>
                {/* <li style={{ color: validations.match ? 'green' : 'red' }}>
                    Passwords match.
                </li> */}
            </ul>

        </div>
    );
};

export default PasswordCheck;
