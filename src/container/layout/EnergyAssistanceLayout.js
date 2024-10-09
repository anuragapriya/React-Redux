import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Home, Jurisdiction } from "container/energyAssistance";
import { Dashboard, People } from "@mui/icons-material";
import { makeStyles } from '@material-ui/core/styles';
import DashboardLayout from "./DashbordLayout";

const EnergyAssistanceLayout = () => {
    const appMenuItems = [
        {
            name: 'Dashboard',
            link: '/energyAssistance',
            Icon: Dashboard,
        },
        {
            name: 'Jurisdiction',
            link: 'jurisdiction',
            Icon: People,
        }
    ];
    return (

        <Routes>
            <Route element={<DashboardLayout appMenuItems={appMenuItems} />}>
                <Route index element={<Home />} />
                <Route path="jurisdiction" element={<Jurisdiction />} />
            </Route>
        </Routes>

    );
}

export default EnergyAssistanceLayout;
