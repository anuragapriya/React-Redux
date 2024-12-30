import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';
import Link from "@material-ui/core/Link";
import { logo  , supporticonblue} from '../images';
import { labels } from "_utils/labels";
const Nav = ({isAuthenticated}) => {
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!isAuthenticated) return null;

    return (
        // <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        //     <div className="navbar-nav">
        //         <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
        //         <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
        //     </div>
        // </nav>
        <div className='container'>
         <nav className="navbar navbar-expand  nav-bar-container">
         
         <div className="navbar-nav">
                <Link href="/home" variant="logo" className="wgllogo">
                     <img src={logo} alt="logo"></img>
                     {labels.eServicePortal}
                 </Link>
                 <div className='nav-linksbuttons'>
                 <Link href="#" variant="logo" className="headseticon">
                     <img src={supporticonblue} alt="Support"></img>
                     Support?
                 </Link>
                 <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button>
                 </div>
             {/* <NavLink to="/home" className="nav-item nav-link">Home</NavLink>
             <button onClick={logout} className="btn btn-link nav-item nav-link">Logout</button> */}
         </div>
        
     </nav>
     </div>
    );
}

export default Nav;