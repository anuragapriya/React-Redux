import { Outlet } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { labels } from "_utils/labels";
import { logo  , supporticonblue ,} from 'images';
const Header = () => {
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
                            <Link href="#" variant="logo" className="headseticon">
                                <img src={supporticonblue} alt="Support"></img>
                                Support?
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;