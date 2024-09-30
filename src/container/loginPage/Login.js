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
import { authActions,alertActions } from '_store';
import images from '../../images';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Login(props) {
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
const [open, setOpen] = React.useState(false);
const handleOpen = () => {
setOpen(true);
};
const handleClose = () => {
setOpen(false);
};



return (
<>
<div className="row m-0">
   <Grid item xs={12} sm={5} md={4} className="wglcontainerblock">
      <div className="wglcontainer">
         <div className="wglcontainerinn">
         <Grid item xs={12} className="mobile-block" >
      <ul className="list-type">
         <li>
            <Link href="#" >
            Need Support
            </Link>
         </li>
         <li>
            <Link href="#" >
            Contact us
            </Link>
         </li>
      </ul>
   </Grid>
            <Link href="#" variant="logo" className="wgllogo">
            <img src={images.logo} alt="logo"></img>
            </Link>
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
         </div>
      </div>
   </Grid>
   
   <Grid item xs={8} sm={7} md={8} className="mobile-none">
      <div className="height-fix">
         <div className="root">
            {/* <img src={images.bannerImg} alt="bannerImg" /> */}
            <ul className="list-type">
               <li>
                  <Link href="#">
                  Solutons</Link>
               </li>
               <li>
                  <Link href="#" >
                  Resources
                  </Link>
               </li>
               <li>
                  <Link href="#" >
                  About
                  </Link>
               </li>
               <li>
                  <Link href="#" >
                  FAQS
                  </Link>
               </li>
               <li>
                  <Link href="#" >
                  Contact us
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   </Grid>
</div>
<div>
</div>
<React.Fragment>
   <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      >
      <Box  className="modalpopup modalpopupVerification">
       <Box>
       <Typography component="h2" variant="h5" >Hello, Maria!</Typography>
       <Typography component="p" variant="p" >We have sent a Verification code to (202)-547-3291. 
        Please entr the code below to Verify your identity and proceed with the password reset.</Typography>
       </Box>
         <form className="form p-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="row m-0">
            <Grid item xs={2}  className="ResetLogo p-0">
            <TextField
                     {...register('number')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="number"
                    
                     name="number"
                     autoFocus
                     />
         </Grid>
         <Grid item xs={2}  className="ResetLogo p-0">
            <TextField
                     {...register('number')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="number"
                    
                     name="number"
                     autoFocus
                     />
         </Grid>
         <Grid item xs={2}  className="ResetLogo p-0">
            <TextField
                     {...register('number')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="number"
                    
                     name="number"
                     autoFocus
                     />
         </Grid>
         <Grid item xs={2}  className="ResetLogo p-0">
            <TextField
                     {...register('number')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="number"
                    
                     name="number"
                     autoFocus
                     />
         </Grid>
         <Grid item xs={2}  className="ResetLogo p-0">
            <TextField
                     {...register('number')}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="number"
                    
                     name="number"
                     autoFocus
                     />
         </Grid>
                    
                     </div>
                     
                    
                     
                  </form>
      
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="Loginbutton"
            >
        VERIFY
         </Button>
         </Box>
    
   </Modal>
</React.Fragment>


</>
);
}