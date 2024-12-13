import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardDetail from '_components/CardDetail';
import Grid2 from '@mui/material/Grid2';
import { useEffect } from 'react';

const Home = () => {
  const authUser = useSelector(x => x.auth.value);
  const navigate = useNavigate();
  const user = authUser?.Data;
  const isAdmin= user?.UserDetails?.isAdmin;
  let data = user?.UserAccess?.flatMap(item => {
    switch (item.PortalKey.toLowerCase()) {
      case 'ai':
        return [{
          name: "accountinquiry",
          title: item.PortalName,
          description: item.PortalName,
          path: item.IsMandateDone ? "accountInquiry/dashboard" : "accountInquiry/manageProfile"
        }];
      case 'ea':
        return [{
          name: "energyAssistance",
          title: item.PortalName,
          description: item.PortalName,
          path: item.IsMandateDone ? "energyAssistance/dashboard" : "energyAssistance/manageProfile"
        }];
      case 'mb':
        return [{
          name: "marketer",
          title: item.PortalName,
          description: item.PortalName,
          path: item.IsMandateDone ? "energyAssistance/dashboard" : "energyAssistance/manageProfile"
        }];
      case 'mc':
        return [{
          name: "mapcenter",
          title: item.PortalName,
          description: item.PortalName,
          path: item.IsMandateDone ? "mapcenter/dashboard" : "mapcenter/manageProfile"
        }];
      default:
        return [];
    }
  }) || [];

  const usermanagement = {
    title: "User Management",
    name: "userManagement",
    description: "User Management",
    path: "userManagement/managedprofile"
  };

  data = isAdmin ? [...data, usermanagement ] : data;

  useEffect(() => {
    console.log(data);
    if (data.length === 1) {
      // If the user has access to only one portal, navigate to that portal directly
      navigate(`/${data[0].path}`);
    }
  }, [data, navigate]);

  const handleClick = (path) => {
    console.log(`Card ${path} clicked`);
    navigate(`/${path}`);
  };

  // Ensure data is an array before mapping
  if (!Array.isArray(data)) {
    return null;
  }

  if (data.length === 1) {
    // Render nothing if the user is being redirected
    return null;
  }

  return (
    <Grid2 container spacing={2}>
      {data.map((card) =>
        <Grid2 xs={12} sm={6} md={4} key={card.name}>
          <CardDetail {...card} handleClick={() => handleClick(card.path)} />
        </Grid2>
      )}
    </Grid2>
  );
}

export default Home;