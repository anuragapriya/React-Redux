import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { supporticonblue,headseticonwhite } from 'images';
import TimerModal from '_components/TimerModal';

const Support = ({ isMainLayout }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [contactOpen, setContactOpen] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleContactOpen = () => {
        handleClose();
        setContactOpen(true);
    };

    const handleContactClose = () => {
        setContactOpen(false);
    };

    return (
        <React.Fragment>
            <Box className="Supporticon" sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Support">
                    <IconButton
                        onClick={handleClick}
                        variant="logo"
                        className={isMainLayout ? "NeedSupport" : "headseticon"}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <img src={isMainLayout ? headseticonwhite : supporticonblue} alt="Support"></img>
                        <span className='none-moblie'>Support?</span>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
            className='support-list'
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleContactOpen}>
                    Contact
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    FAQ
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Training
                </MenuItem>
            </Menu>
            {contactOpen && (
                <TimerModal
                    timerCountdown={60}
                    header="Contact Us"
                    message1="Email: test@test.com"
                    message2="Mobile: 456-546-2546"
                    btnSecondaryText="Close"
                    handleBtnSecondaryClick={handleContactClose}
                />
            )}
        </React.Fragment>
    );
}

export default Support;