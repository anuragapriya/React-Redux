import { Outlet } from "react-router-dom";

const Header = () => {
    return (
        <>
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <p>Logo</p>
                <button  className="btn btn-link nav-item nav-link">Support</button>                
            </div>
        </nav>
        <Outlet />
        </>
    );
}

export default Header;