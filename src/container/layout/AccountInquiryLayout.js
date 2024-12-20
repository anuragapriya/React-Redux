import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Upload, AccountSearch, ManageProfileAI } from "container/accountInquiry";
import { Dashboard,FileUpload ,People} from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";

const AccountInquiryLayout = () => {
    const authUser = useSelector(state => state.auth.value);

    const isProfileCompleted = authUser?.Data?.UserAccess.find(item => item.PortalKey.toLowerCase() === "ai")?.IsMandateDone;

    const menuItems = [
        {
            name: 'Account Search',
            link: 'dashboard',
            Icon: Dashboard,
        },
        {
            name: 'Upload',
            link: 'upload',
            Icon: FileUpload,
        }
    ];

    const appMenuItems = isProfileCompleted ? menuItems : [];

    return (
        <Routes>
            <Route path="manageProfile" element={<ManageProfileAI />} />
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                <Route path="dashboard" element={<AccountSearch />} />
                <Route path="upload" element={<Upload />} />
            </Route>
        </Routes>
    );
}

export default AccountInquiryLayout;
