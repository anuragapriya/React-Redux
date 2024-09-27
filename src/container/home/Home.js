import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home =() => {
    const auth = useSelector(x => x.auth.value);
    const tokenDate= new Date(auth?.tokenExpiry);
    return (
        <div>
            <h1>Hi {auth?.firstName}!</h1>
            <p>You're logged in with React 18 + Redux & JWT!!</p>
            <p><Link to="/users">Manage Users</Link></p>
            <h1>{tokenDate.toLocaleString()}</h1>
        </div>
    );
}

export default Home;


