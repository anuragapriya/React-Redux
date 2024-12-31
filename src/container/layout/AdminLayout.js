import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home, Users } from "container/admin";
import { ManageAccounts ,AppSettingsAlt,SupportAgent,QuestionAnswerOutlined,NotificationsNone} from "@mui/icons-material";
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
            name: 'FAQ',
            link: 'faq',
            Icon: QuestionAnswerOutlined,
        },
        ,
        {
            name: 'Help Desk',
            link: 'helpdesk',
            Icon: SupportAgent,
        },
    ];
    return (
        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>                   
                <Route path='userprofile' element={<Users />} />
                <Route path="configuration" element={<Configuration />} />
                <Route path="announcement" element={<UnderConstruction/>}/>
                <Route path="faq" element={<UnderConstruction/>}/>
                <Route path="helpdesk" element={<UnderConstruction/>}/>
            </Route>
        </Routes>
    );
}

export default UsersLayout;
