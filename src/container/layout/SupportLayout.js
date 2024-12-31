import { UnderConstruction } from "_components";
import * as React from "react";
import { Routes, Route } from 'react-router-dom';

const SupportLayout = () => {

    return (        
        <Routes>
            <Route path="faq" element={<UnderConstruction />} /> 
            <Route path="trainig" element={<UnderConstruction />} />            
        </Routes>        
    );
}

export default SupportLayout;