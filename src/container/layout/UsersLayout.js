import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home, ManagedProfile } from "container/user";
import { Dashboard ,LibraryBooks} from "@mui/icons-material";
import DashboardLayout from "./DashbordLayout";

const UsersLayout = () => {

    const appMenuItems = [
        {
            name: 'Managed Profile',
            link: 'managedprofile',
            Icon: Dashboard,
        },
        // {
        //     name: 'Dashboard',
        //     link: 'dashboard',
        //     Icon: Dashboard,
        // },
        // {
        //     name: 'Users',
        //     link: 'users',
        //     Icon: People,
        // },
        // {
        //     name: 'Users',
        //     Icon: LibraryBooks,
        //     items: [
        //         {
        //             name: 'Managed Profile',
        //             link: 'managedprofile',
        //          },
                // {
                //     name: 'Add User',
                //     link: 'users/add',
                // },
        //     ],
        // },
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                 {/* <Route path="dashboard" element={<ManagedProfile />} />  */}
                <Route path='managedprofile' element={<Home />} />
                {/* <Route path="users/add" element={<AddEdit />} />
                <Route path="users/edit/:id" element={<AddEdit />} /> */}
            </Route>
        </Routes>
    );
}

export default UsersLayout;
