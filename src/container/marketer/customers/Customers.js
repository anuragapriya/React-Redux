import React,{useState} from "react";
import { Box, Typography, Tooltip, TextField ,InputAdornment ,Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SearchIcon from '@mui/icons-material/Search';
const Customers = () => {
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {

    }
return(
    <Box className="Customermanagement">
    <Typography component="div" className='userprofilelist'>
      <Grid container direction="row" spacing={2} >
          <Grid size={{ xs: 12, sm: 6, md: 4 }}  >
              <Grid container  >
                  <Grid size={{ xs: 12, sm: 12, md: 12 }}  >
                      <Typography variant="h2" className='userprofilelistcontent'> Customers</Typography>
                  </Grid>
              </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 8 }} className="PortalName" >
              <Grid container spacing={2} className="justifyContent">
                  <Grid size={{ xs: 6, sm: 6, md: 6 }}  >
                      {/* <CustomerFilter isOpen={openComponent === 'filter'}
                          onClose={handleCloseBackdrop}
                          onOpen={() => handleOpenComponent('filter')} /> */}
                  </Grid>
              </Grid>
          </Grid>
      </Grid>
  </Typography>
  <TextField
        type="number"
        variant="outlined"
        fullWidth
        className="SearchIconinput"
        placeholder='Enter Account Number'
        margin="normal"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
        InputProps={{
            maxLength: 10, // Ensures no more than 10 digits
            pattern: "\\d{10}",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="SearchIcon" onClick={handleSearch}/>
            </InputAdornment>
          ),
          'aria-label': 'search FAQs'
        }}
      />
  </Box>
)
}

export default Customers;