import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { alertActions } from '_store';
import Grid from "@material-ui/core/Grid";
import images from 'images';
import Box from '@mui/material/Box';
import Link from "@material-ui/core/Link";
import { Modal, Button, Typography } from '@mui/material';
import { PasswordCheck, PasswordInput } from "_components";
import { passwordValidationSchema } from "_utils/validationSchema";
import { resetSuccessLabels } from "_utils/labels";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { labels } from "_utils/labels";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [inputColors, setInputColors] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { register, handleSubmit, control, formState: { errors, isValid }, watch, trigger } = useForm({
    resolver: yupResolver(passwordValidationSchema),
  });
  const password = watch('Password', '');

   const handleBlur = async (e) => {
        const fieldName = e.target.name;
        await trigger(fieldName); 
        const fieldError = errors[fieldName];

        if (fieldName === 'Password') {
            setInputColors(prevColors => ({
                ...prevColors,
                [fieldName]: isPasswordValid && !fieldError && e.target.value ? 'inputBackground' : ''
            }));
        } else {
            setInputColors(prevColors => ({
                ...prevColors,
                [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
            }));
        }       
    };

  const onSubmit = async ({ Password }) => {
    try {
      handleClose();
      navigate('/');
      dispatch(alertActions.success({
        showAfterRedirect: true,
        message: resetSuccessLabels.message1
      }));
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordValidation = (isValid) => {
    setIsPasswordValid(isValid);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className="displayblock"
    >
      <Box className="modalpopup">
        <Box className=" modalpopupinner">
          <Grid container>
            <Grid item xs={12} className="forgotpassword p-0">
              <Link href="#" variant="logo" className="wgllogo">
                <img src={images.logo} alt="logo"></img>
                {labels.eServicePortal}
              </Link>
              <Typography component="h2" variant="body1">
                New Password
              </Typography>
              <Typography component="p" variant="body1">
                Enter your new password.
              </Typography>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)} className='newpassword-list form forgotpasswordcontainer p-0'>
              <PasswordInput
                control={control}
                name="Password"
                label="Password"
                rules={{ required: 'Password is required' }}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
                isPasswordValid={isPasswordValid}
              />
              <PasswordCheck password={password} userName={''} onValidationChange={handlePasswordValidation} />
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="Loginbutton"
                  disabled={!isValid}
                >
                  RESET PASSWORD
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="buttonCancel"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

export default NewPassword;