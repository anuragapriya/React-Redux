import React from "react";
import Grid from "@material-ui/core/Grid";
import images from '../../images';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from 'react-redux';
import { authActions,alertActions } from '_store';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
export default function ResetPassword(props) {
   const dispatch = useDispatch();
   const validationSchema = Yup.object().shape({
      username: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required')
      });
   const formOptions = { resolver: yupResolver(validationSchema) };
   const { register, handleSubmit, formState } = useForm(formOptions);
   const { errors, isSubmitting } = formState;
   function onSubmit({ username, password }) {
   try {
   return dispatch(authActions.login({ username, password }));
   } catch (error) {
   dispatch(alertActions.error(errors));
   }
   }

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
      >
      <Box  className="  modalpopup">
        <Box className=" row modalpopupinner">
         <Grid item xs={3}  className="ResetLogo p-0">
            <img src={images.ResetpasswordLogo} alt="ResetLogo" />
         </Grid>
         <Grid item xs={9} className="">
            <p id="child-modal-title">Enter Your Email or phone number and we will send you a link
               / code to reset Your password 
            </p>
         </Grid>
         <form className="form p-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="Emailicons">
            <img src={images.Emailicon} alt="Emailicon" />
                     <TextField
                     {...register('Email')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="username"
                     label="Email"
                     name="username"
                     autoFocus
                     />
                     </div>
                     <div className="Emailicons">
                     <img src={images.Phoneicon} alt="Phoneicon" />
                     <TextField
                     {...register('PhoneNumber ')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="PhoneNumber"
                     label="PhoneNumber"
                     type="PhoneNumber"
                     id="PhoneNumber"
                     autoComplete="current-password"
                     />
                     </div>
                    
                     
                  </form>
      {/* <Button onClick={handleClose}>x</Button>  */}
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="Loginbutton"
            >
         SEND LINK TO EMAIL / CODE TO PHONE
         </Button>
         </Box>
      </Box>
   </Modal>
</React.Fragment>


</>
);
}