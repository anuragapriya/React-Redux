import React from "react";
import { Outlet } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import images from '../../images';
import PortalZoom from "_components/PortalZoom";
import { labels } from "_utils/labels";

const MainLayout = () => (
    <>
   
    <Grid container spacing={3}>
        <Grid item xs={12} sm={5} md={4} className="wglcontainerblock">
            <div className="wglcontainer">
                <div className="wglcontainerinn">
                    <Grid item xs={12} className="mobile-block" >
                        <ul className="list-type">
                            <li>
                                <Link href="#" >
                                    Need Support
                                </Link>
                            </li>
                            <li>
                                <Link href="#" >
                                    Contact us
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Link href="#" variant="logo" className="wgllogo">
                        <img src={images.logo} alt="logo"></img>
                        {labels.eServicePortal}
                    </Link>
                    <Outlet />
                </div>
            </div>
        </Grid>
        <Grid item xs={8} sm={7} md={8} className="mobile-none">
            <div className="height-fix">
                <div className="root">
                <PortalZoom></PortalZoom>
                <Link href="#"  className="NeedSupport"  >
                        <img src={images.headseticonwhite} alt="Do You Need Support" ></img>
                       Support?
                </Link>               
                </div>
            </div>
        </Grid>
        </Grid>
   
    </>
);

export default MainLayout;