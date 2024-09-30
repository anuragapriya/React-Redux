import React,{useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { Modal, Box } from '@mui/material';
import { alertActions } from '_store';
import images from "images";


const Notification = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector(x => x.alert.value);

    useEffect(() => {
        // clear alert on location change
        dispatch(alertActions.clear());
    }, [location]);

    if (!alert) return null;

    const handleClose=()=>{
        dispatch(alertActions.clear());
    }

    return (
        <><React.Fragment>
         <Modal
            open={alert?true:false}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
            className="displayblock">
            <Box className="  modalpopup">
               <Box className=" row modalpopupinner">

                  <div className="row">
                     <Grid item xs={3} >
                        <img src={images.tickicon} alt="Emailicon" />
                     </Grid>
                     <Grid item xs={9}>
                        <h5><b>{alert.header}</b></h5>
                        <p> {alert.message}</p>
                     </Grid>
                  </div>
               </Box>
            </Box>
         </Modal>
      </React.Fragment>
      </>
    );
};

export default Notification;
