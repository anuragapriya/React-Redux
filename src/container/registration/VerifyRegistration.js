import {  useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
const VerifyRegistration = () => {
const navigate= useNavigate();
   const handleClick=()=>
    {
        navigate('/registeration/dashboard');
    };

    return (
        <>
            <h5>
                Thanks for verification
            </h5>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="Loginbutton"
                onClick={handleClick}
            >
                Please click here to fill the pending details for the portal
            </Button>
        </>);
}

export default VerifyRegistration;