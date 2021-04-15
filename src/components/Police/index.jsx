import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Police(props) {
  const classes = useStyles();
  const [police, setPolice] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    // eslint-disable-next-line react/prop-types
    props.onChangePolice(event.target.value);
    setPolice(event.target.value);
    console.log(event);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Selectionner </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={police}
          onChange={handleChange}>
          <MenuItem value={'"New Tegomin", serif'}>
            <Typography style={{ fontFamily: '"New Tegomin", serif' }}>Police Tegomin</Typography>
          </MenuItem>
          <MenuItem value={'"Dancing Script", serif'}>
            <Typography style={{ fontFamily: '"Dancing Script", serif' }}>Police Dancing</Typography>
          </MenuItem>
          <MenuItem value={'"Source Serif Pro", serif'}>
            <Typography style={{ fontFamily: '"Source Serif Pro", serif' }}>Police serif Pro</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
