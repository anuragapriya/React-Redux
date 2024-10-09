import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home } from "container/accountInquiry";
import { Dashboard } from "@mui/icons-material";
import DashboardLayout from "./DashbordLayout";

const AccountInquiryLayout = () => {
    const appMenuItems = [
        {
            name: 'Dashboard',
            link: '/accountInquiry',
            Icon: Dashboard,
        }
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
}

export default AccountInquiryLayout;
