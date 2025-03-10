import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { usePromiseTracker } from 'react-promise-tracker';
import { store, authActions } from '_store';
import PrivateRoute from './PrivateRoute';
import { Nav, LoadingOverlay, Notification, SessionTimeout } from '_components';
import { LoginLayout, ForgotPasswordLayout } from 'container/layout';
import { Home } from 'container/dashboard';
import Container from '@material-ui/core/Container';
import RegistrationLayout from 'container/layout/RegistrationLayout';
import { DashboardLayout } from 'container/layout';
import { Configuration } from "container/configurations";
import { Users, Announcement, Support, FAQ, Marketers, MarketersGroup } from "container/admin";
import { HomeEA, Jurisdiction } from 'container/energyAssistance';
import { AccountInquiry, AccountSearch, Upload } from 'container/accountInquiry';
import { getAppMenus } from '_utils';
import { AnnouncementCenter, AnnouncementView, FAQView } from 'container/headers';
import { HomeMC ,MapCenter } from 'container/mapCenter';
import { PipelineDelivery, PipelineNomination, GroupNomination, Interruptible,Byfiram ,ByInterruptible ,FileHub, Reports, Customers } from 'container/marketer';
import { HomeSD } from 'container/suplierDiversity';
import { Customer } from 'container/admin';
import Firm from 'container/marketer/summaryAdjustment/byFirm/Firm';
import { ActivityList } from 'container/user';
import SuplierDiversity from 'container/suplierDiversity/SuplierDiversity';


const RouteList = () => {
  const promiseTracker = usePromiseTracker();
  const intervalRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [portalID,setPortalID]=useState(null);
  const logout = () => dispatch(authActions.logout());
  const authUser = useSelector(x => x.auth?.value);
  const user = authUser?.Data;
  const adminList = user?.UserAccess?.filter(access =>
    ["admin", "reviewer"].includes(access.Role.toLowerCase())
  );

  const portalData = adminList ? adminList?.map(admin => ({
    PortalId: admin.PortalId,
    PortalName: admin.PortalName,
    PortalKey: admin.PortalKey,
  })) : [];

  const isAuthenticated = useSelector(x => x.auth.isAuthenticated);
  const savedMenuItems = sessionStorage.getItem('appMenuItems');

  const [appMenuItems, setAppMenuItems] = useState([]);

  useEffect(() => {
    const newMenu = savedMenuItems ? JSON.parse(savedMenuItems) : [];
    setAppMenuItems(newMenu);
  }, [savedMenuItems]);

  
  const getToken = useCallback(() => {
    const auth = store.getState().auth.value;
    if (auth?.Data) {
      const tokenExpiry = auth?.Data?.UserDetails?.tokenExpiry;
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const tokenExpiryDateTime = new Date(tokenExpiry);
      tokenExpiryDateTime.setMinutes(tokenExpiryDateTime.getMinutes() - 2); // 2 minutes before expiry
      const targetHours = tokenExpiryDateTime.getHours();
      const targetMinutes = tokenExpiryDateTime.getMinutes();
      const targetSeconds = tokenExpiryDateTime.getSeconds();
      if (hours === targetHours && minutes === targetMinutes && seconds === targetSeconds) {
        dispatch(authActions.refreshToken());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => getToken(), 1000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [getToken]);
 
  const handleCardClick = (portalKey, isMBAdmin, path) => {
    const selectedPortal = portalData.find(p=>p.PortalKey.toLowerCase()===portalKey.toLowerCase());
    const menus = getAppMenus(portalKey, isMBAdmin);
    const userMenuIndex = menus.findIndex(menu => menu.name === 'Users');
    if (userMenuIndex !== -1) {
      menus[userMenuIndex] = getUserMenus(menus[userMenuIndex]);
    }
    setPortalID(selectedPortal?.PortalId);
    setAppMenuItems(menus);
    sessionStorage.setItem('appMenuItems', JSON.stringify(menus));
    navigate(`/${path}`);
  };

  const getUserMenus = (userMenu) => {
    const menuItems = portalData.map((p, index) => ({
      name: p.PortalName,
      link: `userprofile/${p.PortalId}`,
      orderID: index
    }));
    userMenu = { ...userMenu, items: menuItems };
    return userMenu;
  }

  return (
    <div>
      <Nav isAuthenticated={isAuthenticated} portalID={portalID} />
      <Notification />
      <LoadingOverlay loading={promiseTracker.promiseInProgress}></LoadingOverlay>
      <div className="container inputtags admincontent">
        <Container maxWidth="lg" className="admincontentContainer">
          <DashboardLayout appMenuItems={appMenuItems} />
          <Routes>
            {/* private */}
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="home" element={<Home handleCardClick={handleCardClick} />} />
              <Route path='/userprofile/:portal' element={<Users />} />
              <Route path="/configuration" element={<Configuration />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/marketer" element={<Marketers />} />
              <Route path="/marketerGroup" element={<MarketersGroup />} />
              <Route path="/faqCreate" element={<FAQ />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboardEA" element={<HomeEA />} />
              <Route path="/jurisdiction" element={<Jurisdiction />} />
              <Route path="/dashboardAI" element={<AccountInquiry />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboardMC" element={<MapCenter />} />
              <Route path="/dashboardSD" element={<SuplierDiversity />} />
              <Route path="/faqView" element={<FAQView />} />
              <Route path="/notification" element={<AnnouncementCenter />} />
              <Route path="/pipelinedelivery" element={<PipelineDelivery />} />
              <Route path="/nominationPipeline" element={<PipelineNomination />} />
              <Route path="/nominationGroup" element={<GroupNomination />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/byfirm" element={<Firm/>} />
              <Route path="/byInterruptible" element={<Interruptible/>} />
              <Route path="/FileHub" element={<FileHub/>} />
              <Route path="/Reports" element={<Reports/>} />
              <Route path="/customerDetails" element={<Customers/>}/>
              <Route path="/activityLog/:portalID" element={<ActivityList/>}/>
            </Route>
            {/* public */}
            <Route path="/*" element={<LoginLayout isAuthenticated={isAuthenticated} />} />
            <Route path="registration/*" element={<RegistrationLayout />} />
            <Route path="forgotpassword/*" element={<ForgotPasswordLayout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <SessionTimeout onLogout={logout} isAuthenticated={isAuthenticated} />
        </Container>
      </div>
    </div>
  );
}

export default RouteList;