import Link from "@material-ui/core/Link";
import { logo } from '../images';
import { labels } from "_utils/labels";
import { MyProfile, Support } from 'container/headers';

const Nav = ({ isAuthenticated }) => {
    if (!isAuthenticated) return null;

    return (
        <>
            <nav className="navbar navbar-expand  nav-bar-container">
                <div className='container'>
                    <div className="navbar-nav">
                        <Link href="/home" variant="logo" className="wgllogo">
                            <img src={logo} alt="logo"></img>
                            {labels.eServicePortal}
                        </Link>
                        <div className='nav-linksbuttons'>
                            <Support></Support>
                            <MyProfile></MyProfile>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <Outlet /> */}
        </>
    );
}

export default Nav;