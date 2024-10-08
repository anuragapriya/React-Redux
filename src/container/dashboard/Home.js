import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardDetail from '_components/CardDetail'; // Ensure the path is correct
import Grid2 from '@mui/material/Grid2'; // Correct import for Grid2

const Home = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      name:"accountInquiry",
      title: "Account Inquiry",
      description: "Account Inquiry"
    },
    {
      id: 2,
      name:"energyAssistance",
      title: "Energy Assistance",
      description: "Energy Assistance"
    },
    {
      id: 3,
      title: "BBS",
      name:"bbs",
      description: "BBS"
    },
    {
      id: 4,
      title: "User Management",
      name:"users",
      description: "User Management"
    },
  ];

  const handleClick = (id,name) => {
    console.log(`Card ${name} clicked`);
    navigate(`/${name}`);
  };

  const auth = useSelector(x => x.auth.value);
  const tokenDate = new Date(auth?.tokenExpiry);

  return (
    <Grid2 container spacing={2}>
      {data.map((card) =>
        <Grid2 xs={12} sm={6} md={4} key={card.id}>
          <CardDetail {...card} handleClick={() => handleClick(card.id,card.name)} />
        </Grid2>
      )}
    </Grid2>
  );
}

export default Home;
