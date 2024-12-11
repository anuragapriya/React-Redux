import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';
import Link from "@material-ui/core/Link";
import images from '../images.js';
import { labels } from "_utils/labels";
const Nav = () => {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!auth) return null;

    return (
        // <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        //     <div className="navbar-nav">
        //         <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
        //         <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
        //     </div>
        // </nav>
         <nav className="navbar navbar-expand  nav-bar-container">
         <div className='container'>
         <div className="navbar-nav">
                <Link href="/home" variant="logo" className="wgllogo">
                     <img src={images.logo} alt="logo"></img>
                     {labels.eServicePortal}
                 </Link>
                 <div className='nav-linksbuttons'>
                 <Link href="#" variant="logo" className="headseticon">
                     <img src={images.supporticonblue} alt="Support"></img>
                     Support?
                 </Link>
                 <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
                 </div>
             {/* <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
             <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button> */}
         </div>
         </div>
     </nav>
    );
}

export default Nav;