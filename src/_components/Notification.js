import { Modal, Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { alertActions } from '_store';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const Notification = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(x => x.alert.value);

    useEffect(() => {
        // clear alert on location change
        dispatch(alertActions.clear());
    }, [location]);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
    };

    if (!alert) return null;

    return (
        <div>
            <Modal open={alert? true : false}  aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                <CheckCircleOutlineRoundedIcon></CheckCircleOutlineRoundedIcon>
                    {alert?.header && (<Typography id="modal-modal-title" variant="h6" component="h2">
                        {alert.header}
                    </Typography>)
                    }
                    <IconButton
                        aria-label="close"
                        onClick={() => dispatch(alertActions.clear())}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {alert.message}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default Notification;
