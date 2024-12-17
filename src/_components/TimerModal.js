import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import images from "images";
import { labels } from "_utils/labels";
import { Link, Typography} from '@mui/material';
 
const TimerModal = ({alertType, timerCountdown, header, message1, message2, btnPrimaryText, btnSecondaryText, handleBtnPrimaryClick ,handleBtnSecondaryClick}) => {
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
        <Typography component="div" className="Verifyemail width590">
        <Link href="#" variant="logo" className="wgllogo">
                            <img src={images.logo} alt="logo"></img>
                            {labels.eServicePortal}
                        </Link> 
        <DialogTitle id="alert-dialog-title"  className="headercontent" >{header}</DialogTitle>
        <DialogContent className='p-0 alertpopup'>
          {/* {alertType && <img src={images.Check} alt="Check"></img>} */}
         { alertType && <img src={ alertType==='error' ? images.error : images.Check} alt="Check"></img>}                  
         
         
          <DialogContentText id="alert-dialog-description" className="p-0">
            {message1 && <p className="modalpopupcontent">{message1}</p>}
            {message2 && <p className="modalpopupcontent">{message2}</p>}
            <p className="modalpopupcontent modalpopupcontenterror" >It will close automatically in {countdown} seconds.</p>
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          {btnPrimaryText && <Button  className="Loginbutton" onClick={handleBtnPrimaryClick} color="primary">
            {btnPrimaryText}
          </Button>
          }
          {btnSecondaryText && <Button className="closebutton" onClick={handleClose} color="primary">
            {btnSecondaryText}
          </Button>
          }
        </DialogActions>
        </Typography>
      </Dialog>
    </div>
  );
}

export default TimerModal;