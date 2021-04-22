/* eslint-disable react/prop-types */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating(props) {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Note:</Typography>
        {props.stars ? <Rating name="read-only" value={props.stars} readOnly /> : ' Pas encore de note'}
      </Box>
    </div>
  );
}
