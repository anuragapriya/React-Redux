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
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
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

    return (
        <>
      {/* <div className="card m-3">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                    <Link to="../" className="btn btn-link">Cancel</Link>
                </form>
            </div>
        </div>  */}
        <div className="row m-0">
        <Grid item xs={12} sm={5} md={4} className="wglcontainerblock">
            <div className="wglcontainer">
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
                <div className="wglcontainerinn">
                <Link href="#" variant="logo" className="wgllogo">
                    <img src={images.logo} alt="logo"></img>
                </Link>
           
            <Typography component="div" className="mobilebanner">
                <Typography component="h1" variant="h5" className="Logincontent">
                    SIGN UP
                </Typography>
                <div className="paper">
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                            {...register('Name')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="Name"
                            label="Name"
                            type="text"
                            id="Name"
                            autoComplete="current-Name"
                        />
                          <TextField
                            {...register('Company Name')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="CompanyName"
                            label="Company Name"
                            type="text"
                            id="CompanyName"
                            autoComplete="Company-Name"
                        />
                        <TextField
                            {...register('PhoneNumber')}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="PhoneNumber"
                            label="PhoneNumber"
                            type="Number"
                            id="PhoneNumber"
                            autoComplete="PhoneNumber"
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
                        
                    </form>
                </div>
            </Typography>
            </div>
            </div>
        </Grid>
       
        <Grid item xs={8} sm={7} md={8} className="mobile-none">
            <div className="height-fix">
                <div className="root">
                  
                    <ul className="list-type">
                        <li>
                            <Link href="#">Solutons</Link>
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
    </>
    )
}

export default Register;