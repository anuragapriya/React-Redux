import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { alertActions, authActions } from '_store';
import Grid from "@material-ui/core/Grid";
import Box from '@mui/material/Box';
import Link from "@material-ui/core/Link";
import { Modal, Button, Typography } from '@mui/material';
import { PasswordCheck, PasswordInput } from "_components";
import { passwordValidationSchema } from "_utils/validationSchema";
import { resetFailedLabels, resetSuccessLabels } from "_utils/labels";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { labels } from "_utils/labels";
import { logo } from '../../images';
const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const id = new URLSearchParams(location.search).get('verifyId');
  const FullName = "Anu";

  const {  handleSubmit, control, formState: { errors, isValid }, watch, trigger } = useForm({
    resolver: yupResolver(passwordValidationSchema(FullName)),
  });
  const password = watch('Password', '');

  const handleBlur = async (e) => {
    const fieldName = e.target.name;
    await trigger(fieldName);
  };

  const onSubmit = async ({ password }) => {
    try {
      const result = await dispatch(authActions.resetPasswordRequest({ id, password }));
        if (result?.error) {
          dispatch(alertActions.error({
            showAfterRedirect: true,
            message: result?.error.message,
            header: resetFailedLabels.header
          }));
          return;
        }
      
      await handleClose();
      navigate('/');
      dispatch(alertActions.success({
        showAfterRedirect: true,
        message: resetSuccessLabels.message1,
        header: resetSuccessLabels.header
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
                <img src={logo} alt="logo"></img>
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