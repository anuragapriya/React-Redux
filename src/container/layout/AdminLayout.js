import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "container/admin";
import { Dashboard ,Settings} from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";
import { Configuration } from "container/configurations";

const UsersLayout = () => {

    const appMenuItems = [
        {
            name: 'Managed Profile',
            link: 'userprofile',
            Icon: Dashboard,
        },
        {
            name: 'Configuration',
            link: 'configuration',
            Icon: Settings,
        //    items:[ { name: 'View Profile', link: 'configuration' },
        //     { name: 'Edit Profile', link: 'userprofile' },
        //    ]
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
                <Route path='userprofile' element={<Home />} />
                <Route path="configuration" element={<Configuration />} />
            </Route>
        </Routes>
    );
}

export default UsersLayout;
