import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from 'react-redux';
import { userActions, alertActions } from '_store';
import images from '../../images';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        companyName: Yup.string()
            .required('Company Name is required'),
        phoneNumber: Yup.string()
            .required('Last Name is required')
            .max(10, 'Phone number must be at least 10 digit'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            // redirect to login page and display success alert
            navigate('/');
            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    const onCancel = () => {
        navigate('/');
    }
    return (
        <>
            <Typography component="div" className="mobilebanner">
                <Typography component="h1" variant="h5" className="Logincontent">
                    SIGN UP
                </Typography>
                <div className="paper">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('name')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Name"
                            type="text"
                            id="name"
                            autoComplete="current-Name"
                            error={errors.name?.message}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            {...register('companyName')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="companyName"
                            label="Company Name"
                            type="text"
                            id="companyName"
                            autoComplete="companyName"
                            error={errors.companyName?.message}
                            helperText={errors.companyName?.message}
                        />
                        <TextField
                            {...register('phoneNumber')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="phoneNumber"
                            label="PhoneNumber"
                            type="Number"
                            id="phoneNumber"
                            autoComplete="phoneNumber"
                            error={errors.phoneNumber?.message}
                            helperText={errors.phoneNumber?.message}
                        />
                        <TextField
                            {...register('username')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email Address"
                            name="username"
                            error={errors.username?.message}
                            helperText={errors.username?.message}
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
                            error={errors.password?.message}
                            helperText={errors.password?.message}
                        />
                         <TextField
                            {...register('confirmPassword')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="confirmpassword"
                            error={errors.confirmPassword?.message}
                            helperText={errors.confirmPassword?.message}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="Loginbutton"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            SIGN UP
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="Loginbutton"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
            </Typography>
        </>
    )
}

export default Register;