/* eslint-disable react/prop-types */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Etoile(props) {
  const [value, setValue] = React.useState(props.etoile);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Note: {value === 0 ? 'Pas encore de note soyez le premier !' : null}</Typography>
        <Rating
          name="simple-controlled"
          value={Math.floor(value)}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
    </div>
  );
}
