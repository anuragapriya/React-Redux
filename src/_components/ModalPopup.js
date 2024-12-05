import React, { useState } from "react";
import { Grid, Box, Modal, Button,Link} from '@mui/material';
import images from "images";
const ModalPopup =({header,message1,message2, btnPrimaryText, btnSecondaryText,handlePrimaryClick})=>
{
    const [open,setOpen]= useState(true);
    const handleClose=()=>{
        setOpen(false);
    }
    return (
        <><React.Fragment>
         <Modal
            open={open}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            className="displayblock">
            <Box className="  modalpopup">
               <Box className=" row modalpopupinner">
                    <Grid item xs={3} >
                        <img src={images.tickicon} alt="Emailicon" />
                     </Grid>                   
                     <Grid item xs={9}>
                        <h5><b>{header}</b></h5>
                        {message1 && <p> {message1}</p>}
                        {message2 && <p> {message2}</p>}
                        {btnPrimaryText && <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="Loginbutton"
                            onClick={handlePrimaryClick}
                        >
                           {btnPrimaryText}
                        </Button>}
                        {btnSecondaryText && <Link href="#" onClick={handleClose}>{btnSecondaryText}</Link> }
                     </Grid>
               </Box>
            </Box>
         </Modal>
      </React.Fragment>
      </>
    );

};

export default ModalPopup;