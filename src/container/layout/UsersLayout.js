import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { UserList, AddEdit, Home } from "container/user";
import { Dashboard ,LibraryBooks} from "@mui/icons-material";
import DashboardLayout from "./DashbordLayout";

const UsersLayout = () => {

    const appMenuItems = [
        {
            name: 'Dashboard',
            link: '/userManagement/dashboard',
            Icon: Dashboard,
        },
        // {
        //     name: 'Users',
        //     link: 'users',
        //     Icon: People,
        // },
        {
            name: 'Users',
            Icon: LibraryBooks,
            items: [
                {
                    name: 'Manage User',
                    link: 'users/view',
                },
                {
                    name: 'Add User',
                    link: 'users/add',
                },
            ],
        },
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                <Route path="dashboard" element={<Home />} />
                <Route path='users/view' element={<UserList />} />
                <Route path="users/add" element={<AddEdit />} />
                <Route path="users/edit/:id" element={<AddEdit />} />
            </Route>
        </Routes>
    );
}

export default UsersLayout;
