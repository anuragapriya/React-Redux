import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { alertActions } from '_store';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import images from 'images';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PasswordCheck, PasswordInput } from "_components";
import { passwordValidationSchema } from "_utils/validationSchema";
import { resetSuccessLabels } from "_utils/labels";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [inputColors, setInputColors] = useState({});

  const { register, handleSubmit, control, formState: { errors, isValid }, watch, trigger } = useForm({
    resolver: yupResolver(passwordValidationSchema),
  });
  const password = watch('password', '');

  const handleBlur = (e) => {
    const fieldName = e.target.name;
    const fieldError = errors[fieldName];

    setInputColors(prevColors => ({
      ...prevColors,
      [fieldName]: !fieldError && e.target.value ? 'inputBackground' : ''
    }));

    trigger(fieldName); // Trigger validation for the field
  };

  const onSubmit = async ({ password }) => {
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

  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      className="displayblock"
    >
      <Box className="modalpopup">
        <Box className="row modalpopupinner">
          <div className="row m-0">
            <Grid item xs={3} className="ResetLogo p-0">
              <img src={images.ResetpasswordLogo} alt="ResetLogo" />
            </Grid>
            <Grid item xs={9} className="Newpassword">
              <h5>New Password</h5>
              <span>Enter your new password</span>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit)} className='newpassword-list'>
              <PasswordInput
                control={control}
                name="password"
                label="Password"
                rules={{ required: 'Password is required' }}
                errors={errors}
                handleBlur={handleBlur}
                inputColors={inputColors}
              />
              <PasswordCheck password={password} confirmPassword='' />
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
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

export default NewPassword;