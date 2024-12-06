import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const TimerModal = ({ timerCountdown, header, message1, message2, btnPrimaryText, btnSecondaryText, handleBtnPrimaryClick ,handleBtnSecondaryClick}) => {
  const [open, setOpen] = useState(true);
  const [countdown, setCountdown] = useState(timerCountdown); // Set initial countdown value

  const handleClose = () => {
    setOpen(false);
    handleBtnSecondaryClick();
  };

  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setOpen(false);
      handleBtnSecondaryClick();
    }
  }, [open, countdown]);

 
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message1 && <p>{message1}</p>}
            {message2 && <p>{message2}</p>}
            This modal will close automatically in {countdown} seconds.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {btnPrimaryText && <Button onClick={handleBtnPrimaryClick} color="primary">
            {btnPrimaryText}
          </Button>
          }
          {btnSecondaryText && <Button onClick={handleClose} color="primary">
            {btnSecondaryText}
          </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TimerModal;