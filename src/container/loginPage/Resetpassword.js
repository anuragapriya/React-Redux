import React from "react";
import Grid from "@material-ui/core/Grid";
import images from '../../images';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from 'react-redux';
import {  alertActions } from '_store';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
export default function ResetPassword(props) {
   const open = props.open;
   const handleClose = props.handleClose;
   const onSubmitToOTP= props.onSubmitToOTP;
   const dispatch = useDispatch();
   const validationSchema = Yup.object().shape({
      email: Yup.string().required('Email is required'),
      phoneNumber: Yup.string().required('PhoneNumber is required')
   });
   const formOptions = { resolver: yupResolver(validationSchema) };
   const { register, handleSubmit, formState } = useForm(formOptions);
   const { errors, isSubmitting } = formState;
   function onSubmit({ email, phoneNumber }) {
      try {
         //return dispatch(authActions.login({ email, phoneNumber  }));
         handleClose();
         onSubmitToOTP();
      } catch (error) {
         dispatch(alertActions.error(errors));
      }
   }


   return (
      <><React.Fragment>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
         >
            <Box className="  modalpopup">
               <Box className=" row modalpopupinner">
                  <Grid item xs={3} className="ResetLogo p-0">
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
                           {...register('email')}
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           id="email"
                           label="Email"
                           name="email"
                           autoFocus
                           error={errors.email?.message}
                           helperText={errors.email?.message}
                        />
                     </div>
                     <div className="Emailicons">
                        <img src={images.Phoneicon} alt="Phoneicon" />
                        <TextField
                           {...register('phoneNumber')}
                           variant="outlined"
                           margin="normal"
                           required
                           fullWidth
                           name="phoneNumber"
                           label="PhoneNumber"
                           type="PhoneNumber"
                           id="phoneNumber"
                           autoComplete="phoneNumber"
                           error={errors.phoneNumber?.message}
                           helperText={errors.phoneNumber?.message}
                        />
                     </div>
                     <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="Loginbutton"
                        disabled={isSubmitting}
                     >
                        SEND LINK TO EMAIL / CODE TO PHONE
                     </Button>
                  </form>
                  {/* <Button onClick={handleClose}>x</Button>  */}

               </Box>
            </Box>
         </Modal>
      </React.Fragment>
      </>
   );
}