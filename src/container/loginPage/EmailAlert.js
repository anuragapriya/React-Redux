import React from "react";
import Grid from "@material-ui/core/Grid";
import images from '../../images';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
export default function Alert(props) {



// reset password
const [open, setOpen] = React.useState(false);
const handleOpen = () => {
setOpen(true);
};
const handleClose = () => {
setOpen(false);
};
return (
<><React.Fragment>
   <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className="displayblock">
      <Box  className="  modalpopup">
        <Box className=" row modalpopupinner">
        
        <div className="row">
           <Grid item xs={3} >
            <img src={images.tickicon} alt="Emailicon" />
            </Grid>
            <Grid item xs={9}>
            <h5><b>Email Sent</b></h5>
                    <p> Check your email and open the link we sent you to continue. </p>
                 
                     </Grid>
                     </div>
         
      
         </Box>
      </Box>
   </Modal>
</React.Fragment>
{/* Email Verification end */}

</>
);
}