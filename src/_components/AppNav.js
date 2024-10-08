import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';

const AppNav = ({ id, name }) => {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!auth) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                {(name === "users") &&
                    <>
                        <NavLink to="/users" className="nav-item nav-link">Users</NavLink>
                    </>
                }
                {name === "energyAssistance" &&
                    <>
                        <NavLink to="/energyAssistance" className="nav-item nav-link">Dashboard</NavLink>
                        <NavLink to="jurisdiction" className="nav-item nav-link">Jurisdiction</NavLink>
                    </>
                }
            </div>
        </nav>
    );
}

export default AppNav;