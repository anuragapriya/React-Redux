import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import {  Users ,Announcement} from "container/admin";
import { ManageAccounts ,AppSettingsAlt,SupportAgent,QuestionAnswerOutlined,NotificationsNone,SupportAgentOutlined} from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout";
import { Configuration } from "container/configurations";
import UnderConstruction from "_components/UnderConstruction";

const UsersLayout = () => {

    const appMenuItems = [
        {
            name: 'User Profiles',
            link: 'userprofile',
            Icon: ManageAccounts,
        },
        {
            name: 'Configuration',
            link: 'configuration',
            Icon: AppSettingsAlt,
        //    items:[ { name: 'View Profile', link: 'configuration' },
        //     { name: 'Edit Profile', link: 'userprofile' },
        //    ]
        },
        {
            name: 'Announcement',
            link: 'announcement',
            Icon: NotificationsNone,
        },
        {
            name: 'Help Desk',
            Icon: SupportAgent,
               items:[ {Icon: SupportAgentOutlined, name: 'Support', link: 'support' },
            {Icon: QuestionAnswerOutlined, name: 'FAQ', link: 'faq' },
           ]
        },
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>                   
                <Route path='userprofile' element={<Users />} />
                <Route path="configuration" element={<Configuration />} />
                <Route path="announcement" element={<Announcement/>}/>
                <Route path="faq" element={<UnderConstruction/>}/>
                <Route path="support" element={<UnderConstruction/>}/>
            </Route>
        </Routes>
    );
}

export default UsersLayout;
