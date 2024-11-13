import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Upload, AccountSearch } from "container/accountInquiry";
import { Dashboard,FileUpload } from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";

const AccountInquiryLayout = () => {
    const appMenuItems = [
        {
            name: 'Account Search',
            link: 'accountSearch',
            Icon: Dashboard,
        },
        {
            name: 'Upload',
            link: 'upload',
            Icon: FileUpload,
        }
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                <Route path="accountSearch" element={<AccountSearch />} />
                <Route path="upload" element={<Upload />} />
            </Route>
        </Routes>
    );
}

export default AccountInquiryLayout;
