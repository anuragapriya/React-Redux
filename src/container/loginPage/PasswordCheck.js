import React, { useEffect, useState } from "react";

const PasswordCheck = (props) => {
    const { password, confirmPassword } = props;

    // Ensure the password is a string
    const isPasswordValid = typeof password === "string";
    const isConfirmPasswordValid = typeof confirmPassword === "string";

    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        match: false,
    });

    useEffect(() => {
        if (isPasswordValid && isConfirmPasswordValid) {
            validatePassword(password, confirmPassword);
        }
    }, [password, confirmPassword]);

    const validatePassword = (password, confirmPassword) => {
        setValidations({
            length: password.length >= 8 && password.length <= 16,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>']/.test(password),
            match: password === confirmPassword,
        });
    };

    return (
        <div>
            <h2>Your password must contain</h2>
            <ul>
                <li style={{ color: validations.length ? 'green' : 'red' }}>
                    8 - 16 characters.
                </li>
                <li style={{ color: validations.uppercase ? 'green' : 'red' }}>
                    Upper case letter (A-Z).
                </li>
                <li style={{ color: validations.lowercase ? 'green' : 'red' }}>
                    Lower case letter (a-z).
                </li>
                <li style={{ color: validations.number ? 'green' : 'red' }}>
                    Numbers (0-9).
                </li>
                <li style={{ color: validations.special ? 'green' : 'red' }}>
                    Symbols (!@#$%^&*?/\|"':;+)
                </li>
                <li style={{ color: validations.match ? 'green' : 'red' }}>
                    Passwords match.
                </li>
            </ul>
        </div>
    );
};

export default PasswordCheck;
