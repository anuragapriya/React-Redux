import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { PortalRegistration, VerifiedRegistration, VerifyRegistration,Header } from "container/registration";
import { ManageProfileAI } from "container/accountInquiry";
import { ManageProfileEA } from "container/energyAssistance";
import UnderConstruction from "_components/UnderConstruction";
import ManageProfileMC from "container/mapCenter/ManageProfileMC";
import MainLayout from "./MainLayout";
import DashboardLayout from "./DashboardLayout";

const RegistrationLayout = () => {

    return (
        
        <Routes>
            <Route path="verified" element={<VerifiedRegistration />} />
            <Route path="dashboard" element={<PortalRegistration />} />
            <Route element={<Header />}>
            <Route path="accountInquiry" element={<UnderConstruction />} />
            <Route path="energyAssistance" element={<UnderConstruction />} />
            <Route path="mapCenter/:portalkey/:id" element={<ManageProfileMC />} />
            <Route path="bbs" element={<UnderConstruction />} />
            <Route path="diversity" element={<UnderConstruction />} />
            </Route>
        </Routes>
        
    );
}

export default RegistrationLayout;