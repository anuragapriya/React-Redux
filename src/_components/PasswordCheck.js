import React, { useEffect, useState } from "react";

const PasswordCheck = ({ password,userName, onValidationChange }) => {
    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        fullname:false
    });

    useEffect(() => {
        validatePassword(password,userName);
    }, [password]);

    const validatePassword = (password,userName) => {
        const newValidations = {
            length: password?.length >= 16, //&& password?.length <= 16,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>']/.test(password),
            fullname: password && !password.toLowerCase().includes(userName.toLowerCase()),
        };
        setValidations(newValidations);

        const isPasswordValid = Object.values(newValidations).every(Boolean);
        onValidationChange(isPasswordValid);
    };

    return (
        <div className="passwordselect">
            <p>Your password must contain</p>
            <ul>
                <li style={{ color: validations.length ? 'green' : 'red' }}>
                    <label className="passwordselectli">
                        <input type="checkbox" checked={validations.length} readOnly />
                        <span className="checkmark"></span>At least 16 Characters
                    </label>
                </li>
                <li style={{ color: validations.uppercase ? 'green' : 'red' }}>
                    <label className="passwordselectli">
                        <input type="checkbox" checked={validations.uppercase} readOnly />
                        <span className="checkmark"></span>Upper case letter (A-Z).
                    </label>
                </li>
                <li style={{ color: validations.lowercase ? 'green' : 'red' }}>
                    <label className="passwordselectli">
                        <input type="checkbox" checked={validations.lowercase} readOnly />
                        <span className="checkmark"></span>Lower case letters (a-z).
                    </label>
                </li>
                <li style={{ color: validations.number ? 'green' : 'red' }}>
                    <label className="passwordselectli">
                        <input type="checkbox" checked={validations.number} readOnly />
                        <span className="checkmark"></span>Numbers (0-9)
                    </label>
                </li>
                <li style={{ color: validations.special ? 'green' : 'red' }}>
                    <label className="passwordselectli">
                        <input type="checkbox" checked={validations.special} readOnly />
                        <span className="checkmark"></span>Symbols (!@#$%^&*?/\|"':;+)
                    </label>
                </li>
                <li style={{ color: validations.fullname ? 'green' : 'red' }}>
                    <label className="passwordselectli">
                        <input type="checkbox" checked={validations.fullname} readOnly />
                        <span className="checkmark"></span>Password should not contain your FullName
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default PasswordCheck;