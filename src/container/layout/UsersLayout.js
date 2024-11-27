import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { CompanyDetails, Home, UserList } from "container/user";
import { Dashboard ,Settings} from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";
import { Configuration } from "container/configurations";

const UsersLayout = () => {

    const appMenuItems = [
        {
            name: 'Managed Profile',
            link: 'managedprofile',
            Icon: Dashboard,
        },
        {
            name: 'Configuration',
            link: 'configuration',
            Icon: Settings,
        },
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
        //             link: 'dashboard',
        //          },
        //         {
        //             name: 'Add User',
        //             link: 'companyDetails',
        //         },
        //     ],
        // },
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>                   
                <Route path='managedprofile' element={<Home />} />
                <Route path="configuration" element={<Configuration />} />
                {/* <Route path="dashboard" element={<UserList />} /> 
                 <Route path="companyDetails" element={<CompanyDetails />} />
                <Route path="users/edit/:id" element={<AddEdit />} />  */}
            </Route>
        </Routes>
    );
}

export default UsersLayout;
