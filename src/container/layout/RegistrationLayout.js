import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import { PortalRegistration, VerifyRegistration } from "container/registration";
import { ManageProfileAI } from "container/accountInquiry";
import { ManageProfileEA } from "container/energyAssistance";
import UnderConstruction from "_components/UnderConstruction";

const RegistrationLayout = () => {

    return (
        <Routes>
            <Route path="verified" element={<VerifyRegistration />} />
            <Route path="dashboard" element={<PortalRegistration />} />
            <Route path="accountInquiry" element={<UnderConstruction />} />
            <Route path="energyAssistance" element={<UnderConstruction />} />
            <Route path="mapCenter" element={<UnderConstruction />} />
            <Route path="bbs" element={<UnderConstruction />} />
            <Route path="diversity" element={<UnderConstruction />} />
        </Routes>
    );
}

export default RegistrationLayout;