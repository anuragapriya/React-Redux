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
import { authActions } from '_store';

import logo from "assets/Frame 2208.png";
import bannerimag from "assets/Frame 2173.jpg";
import  '../../styles/Login.css';



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
        return dispatch(authActions.login({ username, password }));
    }

    return (
        <div className="row m-0">
            <Grid item xs={12} sm={5} md={4} className="pb-10">
                <div>
                    <Link href="#" variant="logo" className="wgllogo">
                        <img src={logo} alt="logo"></img>
                    </Link>
                </div>
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
                            <Link href="#" variant="ResetPassword" className="ResetPassword">
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
            </Grid>
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
            <Grid item xs={8} sm={7} md={8} className="mobile-none">
                <div className="height-fix">
                    <div className="root">
                        <img src={bannerimag} alt="bannerimag" />
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
    );
}
