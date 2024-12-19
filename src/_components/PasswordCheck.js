import React, { useEffect, useState } from "react";
const PasswordCheck = ({ password, confirmPassword }) => {

    // Ensure the password is a string
    // const isPasswordValid = typeof password === "string";
    // const isConfirmPasswordValid = typeof confirmPassword === "string";

    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        //  match: false,
    });

    useEffect(() => {
        // if(isPasswordValid)
        validatePassword(password, confirmPassword);
    }, [password, confirmPassword]);

    const validatePassword = (password, confirmPassword) => {
        setValidations({
            length: password?.length >= 8 && password?.length <= 16,
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
                <li style={{ color: validations.length ? 'green' : 'red' }}><label class="passwordselectli">
                    <input type="checkbox" checked={validations.length} color="success"></input>
                    <span class="checkmark"></span>At least 8 Characters
                </label></li>
                {/* <li style={{ color: validations.length ? 'green' : 'red' }}>
                    <Checkbox {...label} checked={validations.length} color="success" /> At least 8 Characters
                </li> */}
                <li style={{ color: validations.uppercase ? 'green' : 'red' }}><label class="passwordselectli">
                    <input type="checkbox" checked={validations.uppercase} color="success"></input>
                    <span class="checkmark"></span>Upper case letter (A-Z).
                </label></li>
                <li style={{ color: validations.lowercase ? 'green' : 'red' }}><label class="passwordselectli">
                    <input type="checkbox" checked={validations.lowercase} color="success"></input>
                    <span class="checkmark"></span>Lower case letters (a-z).
                </label></li>
                <li style={{ color: validations.number ? 'green' : 'red' }}><label class="passwordselectli">
                    <input type="checkbox" checked={validations.number} color="success"></input>
                    <span class="checkmark"></span> Numbers (0-9)
                </label></li>
                <li style={{ color: validations.special ? 'green' : 'red' }}><label class="passwordselectli">
                    <input type="checkbox" checked={validations.special} color="success"></input>
                    <span class="checkmark"></span>Symbols (!@#$%^&*?/\|"':;+)
                </label></li>
              
            </ul>

        </div>
    );
};

export default PasswordCheck;
