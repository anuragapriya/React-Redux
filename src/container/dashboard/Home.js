import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardDetail from '_components/CardDetail';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  const authUser = useSelector(x => x.auth.value);
  const navigate = useNavigate();
  const user = authUser?.Data;
  const isAdmin = user?.UserDetails?.isAdmin;
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
    name: "admin",
    description: "User Management",
    path: "admin/userprofile"
  };

  data = isAdmin ? [...data, usermanagement] : data;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
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
    <div>
      {/* <h1 className='welcometext'>{`Welcome, ${user?.UserDetails?.FirstName} ${user?.UserDetails?.LastName}`}</h1>
      <Grid2 container spacing={2}>
        {data.map((card) =>
          <Grid2 xs={12} sm={6} md={4} key={card.name}>
            <CardDetail {...card} handleClick={() => handleClick(card.path)} />
          </Grid2>
        )}
      </Grid2> */}
      <Typography component="div" className=' dashbordpage'>

        <h1 className='welcometext'>{`Welcome, ${user?.UserDetails?.FirstName} ${user?.UserDetails?.LastName}`}</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container direction="row" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 12, md: 12 }}>
            <Grid size={{ xs: 12, sm: 12, md: 8 }} className='CardDetailContainer' >

              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {data.map((card) =>

                  <Grid size={{ xs: 2, sm: 4, md: 4 }} key={card.id} className="CardDetail">
                    <Item><CardDetail {...card} handleClick={() => handleClick( card.path)} /></Item>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }} className='CardDetailContainer-right'>
              <Typography variant="div" component="div" className="">
                <Typography variant="h3" component="h3" className="Announcements-text">Announcements</Typography>
                <Typography className='Announcementcontainer' component="div" >
                  <Typography className='Announcementsnew' component="div" >
                  
                  <Typography component="div">
                    <Typography component="h2">
                      29
                    </Typography>
                    <Typography component="span">
                      Nov
                    </Typography>
                    </Typography>
                    <Typography  component="div">
                        <Typography component="h3" className='title'>Management</Typography>
                        <Typography component="p" className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography>
                    </Typography>
                    
                    </Typography>
                    <Typography className='Announcementsnew' component="div" >
                  
                  <Typography component="div">
                    <Typography component="h2">
                      29
                    </Typography>
                    <Typography component="span">
                      Nov
                    </Typography>
                    </Typography>
                    <Typography  component="div">
                        <Typography component="h3" className='title'>Management</Typography>
                        <Typography component="p" className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography>
                    </Typography>
                    
                    </Typography>
                    <Typography className='Announcementsnew' component="div" >
                  
                  <Typography component="div">
                    <Typography component="h2">
                      29
                    </Typography>
                    <Typography component="span">
                      Nov
                    </Typography>
                    </Typography>
                    <Typography  component="div">
                        <Typography component="h3" className='title'>Management</Typography>
                        <Typography component="p" className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</Typography>
                    </Typography>
                    
                    </Typography>
              
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>

      </Typography>

    </div>
  );
}

export default Home;