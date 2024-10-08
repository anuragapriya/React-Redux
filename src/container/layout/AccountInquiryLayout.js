import * as React from "react";
import { Routes, Route } from 'react-router-dom';
import {Home} from "container/accountInquiry";
import { AppNav } from "_components";

const AccountInquiryLayout = () => {
    return (
        <div className="p-4">
            <div className="container">
                <AppNav name ={"accountInquiry"}></AppNav>
                <Routes>
                    <Route index element={<Home />} />
                </Routes>
            </div>
        </div>
    );
}

export default AccountInquiryLayout;
