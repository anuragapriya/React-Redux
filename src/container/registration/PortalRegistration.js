import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import CardDetail from '_components/CardDetail';
import Grid2 from '@mui/material/Grid2';
import { useEffect } from 'react';
import { registrationActions } from '_store/registration.slice';

const PortalRegistration = () => { 
    const dispatch = useDispatch();   
    const navigate = useNavigate();
    const portals = useSelector((x) => x.registration?.portalData);

    useEffect(() => {
        dispatch(registrationActions.getPortalData());
      }, [dispatch]);

    const data =Array.isArray(portals) && portals?.flatMap(item => {
        switch (item.PortalKey.toLowerCase()) {
            case 'ai':
                return [{
                    name: item.PortalKey,
                    title: item.PortalName,
                    description: item.PortalName,
                    path: "registration/accountInquiry"
                }];
            case 'ea':
                return [{
                    name: item.PortalKey,
                    title: item.PortalName,
                    description: item.PortalName,
                    path: "registration/energyAssistance"
                }];
            case 'mc':
                return [{
                    name: item.PortalKey,
                    title: item.PortalName,
                    description: item.PortalName,
                    path: "registration/mapCenter"
                }];
            case 'mb':
                return [{
                    name: item.PortalKey,
                    title: item.PortalName,
                    description: item.PortalName,
                    path: "registration/bbs"
                }];
            case 'sd':
                return [{
                    name: item.PortalKey,
                    title: item.PortalName,
                    description: item.PortalName,
                    path: "registration/diversity"
                }];
            default:
                return [];
        }
    }) || [];

    const handleClick = (path) => {
        console.log(`Card ${path} clicked`);
        navigate(`/${path}`);
    };

    return (
        <Grid2 container spacing={2}>
            {data.map((card) =>
                <Grid2 xs={12} sm={6} md={4} key={card.name}>
                    <CardDetail {...card} handleClick={() => handleClick(card.path)} />
                </Grid2>
            )}
        </Grid2>
    );
};

export default PortalRegistration;