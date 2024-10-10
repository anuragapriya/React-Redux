import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Upload, Home } from "container/accountInquiry";
import { Dashboard,FileUpload } from "@mui/icons-material";
import DashboardLayout from "./DashbordLayout";

const AccountInquiryLayout = () => {
    const appMenuItems = [
        {
            name: 'Dashboard',
            link: '/accountInquiry/dashboard',
            Icon: Dashboard,
        },
        {
            name: 'Upload',
            link: '/accountInquiry/upload',
            Icon: FileUpload,
        }
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                <Route path="dashboard" element={<Home />} />
                <Route path="upload" element={<Upload />} />
            </Route>
        </Routes>
    );
}

export default AccountInquiryLayout;
