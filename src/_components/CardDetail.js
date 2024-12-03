import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardDetail = ({ title, description, handleClick }) => {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>

    </Card>
  );
};

export default CardDetail;
