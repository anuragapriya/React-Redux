import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import {Home,Jurisdiction} from "container/energyAssistance";
import { AppNav } from "_components";

const EnergyAssistanceLayout = () => {
    return (
        <div className="p-4">
            <div className="container">
                <AppNav name ={"energyAssistance"}></AppNav>
                <Routes>
                    <Route index element={<Home />} />
                    <Route  path="jurisdiction" element={<Jurisdiction />} />
                </Routes>
            </div>
        </div>
    );
}

export default EnergyAssistanceLayout;
