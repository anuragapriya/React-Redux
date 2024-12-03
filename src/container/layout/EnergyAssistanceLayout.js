import React from "react";
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Home, Jurisdiction, ManageProfileEA } from "container/energyAssistance";
import { Dashboard, People } from "@mui/icons-material";
import DashboardLayout from "./DashboardLayout"; // Corrected spelling

const EnergyAssistanceLayout = () => {
    const authUser = useSelector(state => state.auth.value);

    const isProfileCompleted = authUser?.UserAccess.find(item => item.PortalName === "EnergyAssistance")?.IsProfileCompleted;

    const menuItems = [
        {
            name: 'Dashboard',
            key:'dashboard',
            link: 'dashboard',
            Icon: Dashboard,
        },
        {
            name: 'Jurisdiction',
            key:'jurisdiction',
            link: 'jurisdiction',
            Icon: People,
        }
    ];

    // Use the same menuItems for both cases, no need for additionalMenuItems
    const appMenuItems = isProfileCompleted ? menuItems : [];

    return (
        <Routes>
             <Route path="manageProfile" element={<ManageProfileEA />} />
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>               
                <Route path="dashboard" element={<Home />} />
                <Route path="jurisdiction" element={<Jurisdiction />} />
            </Route>
        </Routes>
    );
}

export default EnergyAssistanceLayout;
