import React from "react";
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const UserProfileDetails = ({userData}) => {
    return(
        <Box className="userInformationcontainer">
        <Typography component="h2" className='userInformation'>user Information</Typography>
        <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>


            <Typography component="div" className="UserName">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" >User Name:</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" className="textright">{userData.FullName}</Typography>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography component="div" className="UserName">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" >Company Name:</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" className="textright">{userData.AgencyID}</Typography>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography component="div" className="UserName">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" >Company Email:</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" className="textright">{userData.EmailAddress}</Typography>
                        </Grid>
                    </Grid>
                </Typography>
             
               
                


            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                <Typography component="div" className="UserName">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" >Phone Number:</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" className="textright">123-456-6543</Typography>
                        </Grid>
                    </Grid>
                </Typography>
                <Typography component="div" className="UserName">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span">Portal Access :</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" className="textright">{userData.JurisdictionID}</Typography>
                        </Grid>
                    </Grid>
                </Typography>



                <Typography component="div" className="UserName">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span">Portal Role :</Typography>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                            <Typography component="span" className="textright">{userData.RoleID}</Typography>
                        </Grid>
                    </Grid>
                </Typography>
            </Grid>
        </Grid>

    </Box>
    );
};

export default UserProfileDetails;