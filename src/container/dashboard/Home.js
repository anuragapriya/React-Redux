import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardDetail from '_components/CardDetail';
import Grid2 from '@mui/material/Grid2';
import { useEffect } from 'react';

const Home = () => {
  const authUser = useSelector(x => x.auth.value);
  const navigate = useNavigate();

  const data = authUser?.UserAccess?.flatMap(item => {
    switch (item.PortalName.toLowerCase()) {
      case 'accountinquiry':
        return [{
          name: "accountInquiry",
          title: "Account Inquiry",
          description: "Account Inquiry",
          path: item.IsProfileCompleted ? "accountInquiry/dashboard" : "accountInquiry/manageProfile"
        }];
      case 'energyassistance':
        return [{
          name: "energyAssistance",
          title: "Energy Assistance",
          description: "Energy Assistance",
          path: item.IsProfileCompleted ? "energyAssistance/dashboard" : "energyAssistance/manageProfile"
        }];
      case 'bbs':
        return [{
          title: "BBS",
          name: "bbs",
          description: "BBS",
          path: "bbs/dashboard"
        }];
      case 'marketer':
        return [{
          title: "Marketer",
          name: "marketer",
          description: "Marketer",
          path: ""
        }];
      case 'mapcenter':
        return [{
          title: "Map Center",
          name: "mapcenter",
          description: "Map Center",
          path: ""
        }];
      case 'usermanagement':
        return [{
          title: "User Management",
          name: "userManagement",
          description: "User Management",
          path: "userManagement/managedprofile"
        }];
      default:
        return []; // Return an empty array for unknown PortalName
    }
  }) || []; // Fallback to an empty array if authUser or UserAccess is undefined

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