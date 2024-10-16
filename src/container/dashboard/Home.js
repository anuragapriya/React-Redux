import { useNavigate } from 'react-router-dom';
import CardDetail from '_components/CardDetail'; 
import Grid2 from '@mui/material/Grid2'; 

const Home = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      name: "accountInquiry",
      title: "Account Inquiry",
      description: "Account Inquiry",
      path: "accountInquiry/dashboard"
    },
    {
      id: 2,
      name: "energyAssistance",
      title: "Energy Assistance",
      description: "Energy Assistance",
      path: "energyAssistance/dashboard"
    },
    {
      id: 3,
      title: "BBS",
      name: "bbs",
      description: "BBS",
      path: "bbs/dashboard"
    },
    {
      id: 4,
      title: "User Management",
      name: "userManagement",
      description: "User Management",
      path: "userManagement/managedprofile"
    },
  ];

  const handleClick = (id, path) => {
    console.log(`Card ${path} clicked`);
    navigate(`/${path}`);
  };

  return (
    <Grid2 container spacing={2}>
      {data.map((card) =>
        <Grid2 xs={12} sm={6} md={4} key={card.id}>
          <CardDetail {...card} handleClick={() => handleClick(card.id, card.path)} />
        </Grid2>
      )}
    </Grid2>
  );
}

export default Home;
