import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '_store';

import ExportToPDF from '_utils/exportPdf';
import ExportToCsv from '_utils/exportCsv';
import Download from '_utils/Download';
//import { ExportCsv, ExportPdf } from '@material-table/exporters'; 

const UserList = () => {
    const users = useSelector(x => x.users.list);
    const dispatch = useDispatch();
    const rows= users?.value;

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    const headers =[{header:"Name"},{header:"Company Name"},{header:"User Name"}];

 

    return (
        <div>
            <h1>Users</h1>
            <Link to="add" className="btn btn-sm btn-success mb-2">Add User</Link>
           <Download rows={rows} headers={headers}></Download>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Company Name</th>
                        <th style={{ width: '30%' }}>Username</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.value?.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.companyName}</td>
                            <td>{user.username}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`edit/${user.id}`} className="btn btn-sm btn-primary me-1">Edit</Link>
                                <button onClick={() => dispatch(userActions.delete(user.id))} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>                                
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;