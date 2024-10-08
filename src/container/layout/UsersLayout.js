import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import {UserList,AddEdit} from "container/user";

const UsersLayout = ({ ...props }) => {
    return (
        <div className="p-4">
            <div className="container">
                <Routes>
                    <Route index element={<UserList />} />
                    <Route path="add" element={<AddEdit />} />
                    <Route path="edit/:id" element={<AddEdit />} />
                </Routes>
            </div>
        </div>
    );
}

export default UsersLayout;
