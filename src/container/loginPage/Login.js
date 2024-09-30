import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authActions, alertActions } from '_store';
import images from '../../images';
import OTPVerification from "_components/OTPVerification";
import ResetPassword from "./Resetpassword";

export default function Login(props) {
   const [open, setOpen] = React.useState(false);
   const [otpOpen, setOtpOpen] = React.useState(false);
   const dispatch = useDispatch();
   // form validation rules 
   const validationSchema = Yup.object().shape({
      username: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required')
   });
   const formOptions = { resolver: yupResolver(validationSchema) };
   // get functions to build form with useForm() hook
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

   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   const onSubmitResetPassword = () => {
      setOtpOpen(true);
   }

   const handleOtpClose = () => {
      setOtpOpen(false);
   };

   return (
      <>
         <Typography component="div" className="mobilebanner">
            <Typography component="h1" variant="h5" className="Logincontent">
               Log In
            </Typography>
            <div className="paper">
               <form className="form" onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                     {...register('username')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="username"
                     label="Email"
                     name="username"
                     autoFocus
                     error={errors.username?.message}
                     helperText={errors.username?.message}
                  />
                  <TextField
                     {...register('password')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     error={errors.password?.message}
                     helperText={errors.password?.message}
                  />
                  <Link href="#" onClick={handleOpen} variant="ResetPassword" className="ResetPassword">
                     ResetPassword
                  </Link>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     color="primary"
                     className="Loginbutton"
                     disabled={isSubmitting}
                  >
                     LOGIN
                  </Button>
                  <Grid container>
                     <Grid item className="accountSignup">
                        <div>Don't have an account?</div>
                        <Link href="./register" variant="body2">
                           {" Sign Up"}
                        </Link>

                     </Grid>
                  </Grid>
               </form>
            </div>
         </Typography>
         <ResetPassword open={open} handleClose={handleClose} onSubmitToOTP={onSubmitResetPassword}></ResetPassword>
         <OTPVerification open={otpOpen} handleClose={handleOtpClose}></OTPVerification>
      </>
   );
}